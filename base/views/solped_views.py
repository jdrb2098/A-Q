from base.models import Solped, SolpedItem, Product, ObservationsSolped, Category, User, Warehouse, ShippingAddress
from base.serializers import SolpedSerializer, SolpedItemsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
import openpyxl
from django.http import HttpResponse
from ..models.solped_models import status_CHOICES
from datetime import datetime


@api_view(['POST'])
@permission_classes([])
def create_solped(request):
    # Crear solped
    total_price = 0
    solped_serializer = SolpedSerializer(data=request.data, partial=True)
    if solped_serializer.is_valid():
        #solped = solped_serializer.save(creator_user=request.user)
        solped = solped_serializer.save(creator_user=User.objects.get(pk=1))
        # Crear items
        items_data = request.data.get('items')
        for item_data in items_data:
            product = Product.objects.get(pk=item_data.get('product_id'))
            SolpedItem.objects.create(
                solped=solped,
                product=product,
                quantity=item_data.get('quantity'),
                price=product.price * item_data.get('quantity'),
            )
            total_price += product.price * item_data.get('quantity')
        solped_serializer.save(total_price=total_price)
        return Response(solped_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(solped_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Deberian estar todas las observaciones o solo la ultima? bien
# Quien es el comprador? La persona que creo la solped o la persona que la aprobo?
# El almacen es de los clientes o de la empresa?
# Que es el documento?
# Si no hay observaciones, que se debe mostrar?
# El valor total es el valor de la solped o el de los items? (esNC)
# Cual formato de fecha se debe usar?
# El almacen es el nombre de la bodega?
@api_view(['GET'])
@permission_classes([])
def get_solped_excel(request, pk):
    solped = Solped.objects.get(pk=pk)
    if solped is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        # Crear un nuevo archivo de Excel
        workbook = openpyxl.Workbook()

        # Agregar una hoja al archivo de Excel
        worksheet = workbook.active
        worksheet.title = 'Solped'

        # Agregar los encabezados de columna
        columns = ['Codigo de Material', 'Descripcion del Material', 'Categoria', 'Numero de SOLPED', 'Centro de Costos', 'Usuario Creador de Solped', 'Cantidades',
                   'Unidades de Medida', 'Valor Unitario', 'Valor Total', 'Comprador', 'Estado Actual', 'Fecha de Creación de la SOLPED', 'Fecha de Solución de la SOLPED',
                   'Lugar de Requerimiento', 'Almacen', 'Observaciones']
        row_num = 1
        for col_num, column_title in enumerate(columns, 1):
            cell = worksheet.cell(row=row_num, column=col_num)
            cell.value = column_title

        items = SolpedItem.objects.filter(solped=solped)
        observation = ObservationsSolped.objects.filter(solped=solped)
        observations = ''
        for obs in observation:
            observations += '- '
            observations += obs.observation
            observations += '  '

        # Agregar los datos de la Solped por producto
        if items:
            for item in items:
                category = Category.objects.get(pk=item.product.category_id)
                warehouse = Warehouse.objects.get(pk=solped.warehouse)
                address = ShippingAddress.objects.get(pk=warehouse.shipping_address)
                row_num += 1
                row = [
                    item.product.reference_code if item.product.reference_code else 'No hay codigo de material',
                    item.product.description if item.product.description else 'No hay descripcion',
                    category.name,
                    solped.pk,
                    solped.cost_center if solped.cost_center else 'No hay centro de costo',
                    solped.creator_user.username if solped.creator_user else 'No hay creador',
                    item.quantity if item.quantity else 'No hay cantidad',
                    #item.product.unit_measure if item.product.unit_measure else 'No hay unidad de medida',
                    'Unidad de medida',
                    item.product.price if item.product.price else 'No hay precio',
                    item.price if item.price else 'No hay precio',
                    #solped.buyer_user.username if solped.buyer_user else 'No hay comprador',
                    'Comprador',
                    status_CHOICES[solped.status-1][1] if solped.status else 'No hay estado actual',
                    solped.createdAt.strftime("%Y-%m-%d, %H:%M:%S") if solped.createdAt else 'No hay fecha de creacion',
                    solped.authorization_date.strftime("%Y-%m-%d, %H:%M:%S") if solped.authorization_date else 'No hay fecha de solucion',
                    solped.warehouse.shipping_address.address if solped.warehouse.shipping_address else 'No hay direccion',
                    address.address if address else 'No hay direccion',
                    solped.warehouse if solped.warehouse else 'No hay almacen',
                    observations if observations else 'No hay observaciones',
                ]
                for col_num, cell_value in enumerate(row, 1):
                    cell = worksheet.cell(row=row_num, column=col_num)
                    cell.value = cell_value

            # Configurar las dimensiones de la columna
            for col in worksheet.columns:
                max_length = 0
                column = col[0].column_letter
                for cell in col:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(str(cell.value))
                    except:
                        pass
                adjusted_width = (max_length + 2)
                worksheet.column_dimensions[column].width = adjusted_width

            # Guardar el archivo de Excel
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=solped.xlsx'
            workbook.save(response)

            return response


@api_view(['PUT'])
@permission_classes([])
def authorization_solped(request, pk):
    solped = Solped.objects.get(pk=pk)
    if solped is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        solped.authorization_date = datetime.now()
        solped_serializer = SolpedSerializer(solped, data=request.data, partial=True)
        if solped_serializer.is_valid():
            solped_serializer.save()
            return Response(solped_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(solped_serializer.errors, status=status.HTTP_400_BAD_REQUEST)