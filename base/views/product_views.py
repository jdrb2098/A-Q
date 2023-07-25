from django.views.decorators.csrf import csrf_exempt
from unicodedata import category
from django.shortcuts import render
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404

from base.serializers import ProductSerializer, CategorySerializer, SubCategorySerializer
from rest_framework import status
from base.models import *
import openpyxl


""" Categorias """


# Vista para crear una nueva categoría
@api_view(['POST'])
@permission_classes([])
def create_categories(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para leer todas las categorías
@api_view(['GET'])
@permission_classes([])
def get_categories(request):
    categories = Category.objects.all()
    if not categories:
        return Response({'error': 'No se encontraron categorias'}, status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Vista para leer una categoría específica por clave primaria (pk)
@api_view(['GET'])
@permission_classes([])
def get_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Category.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([])
def update_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category, data=request.data, many=False, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Category.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['DELETE'])
@permission_classes([])
def delete_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response({'message': 'Categoria eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)
    except Category.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=status.HTTP_404_NOT_FOUND)


""" SubCategoria """


# Vista para crear una nueva subcategoría
@api_view(['POST'])
@permission_classes([])
def create_subcategory(request):
    serializer = SubCategorySerializer(data=request.data)
    if serializer.is_valid():
        category_id = request.data.get('category')
        category = get_object_or_404(Category, pk=category_id)
        sub_category = serializer.save(category=category)
        response = SubCategorySerializer(sub_category)
        return Response(response.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para leer todas las subcategorías
@api_view(['GET'])
@permission_classes([])
def get_subcategories(request):
    subcategory = SubCategory.objects.all()
    if not subcategory:
        return Response({'error': 'No se encontraron subcategorías'}, status=status.HTTP_404_NOT_FOUND)
    serializer = SubCategorySerializer(subcategory, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Vista para leer una subcategoría específica por clave primaria (pk)
@api_view(['GET'])
@permission_classes([])
def get_subcategory(request, pk):
    try:
        subcategory = SubCategory.objects.get(pk=pk)
        serializer = SubCategorySerializer(subcategory, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except SubCategory.DoesNotExist:
        return Response({"message": "Subcategoría no encontrada"}, status=status.HTTP_404_NOT_FOUND)


# Vista para actualizar una subcategoría existente
@api_view(['PUT'])
@permission_classes([])
def update_subcategory(request, pk):
    try:
        subcategory = SubCategory.objects.get(pk=pk)
        print(subcategory.reference_code)
        serializer = SubCategorySerializer(subcategory, data=request.data, many=False, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)


# Vista para eliminar una subcategoría existente
@api_view(['DELETE'])
@permission_classes([])
def delete_subcategory(request, pk):
    try:
        subcategory = SubCategory.objects.get(pk=pk)
        subcategory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except SubCategory.DoesNotExist:
        return Response({'error': 'La subcategoría no existe'}, status=status.HTTP_404_NOT_FOUND)


# Vista para leer todas las subcategorías, con filtro por categoría
@api_view(['GET'])
@permission_classes([])
def filter_subcategories(request, pk):
    try:
        subcategories = SubCategory.objects.filter(category=pk)
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except SubCategory.DoesNotExist:
        return Response({"message": "No se encontraron subcategorías para la categoría especificada"}, status=status.HTTP_404_NOT_FOUND)


""" Productos """


@api_view(['GET'])
@permission_classes([])
def get_products_page(request):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''

    products = Product.objects.distinct().filter(
        Q(category__icontains=query) |
        Q(name__icontains=query)).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page is None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
@permission_classes([])
def get_products(request):
    products = Product.objects.all()
    if not products:
        return Response({'error': 'No se encontraron productos'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([])
def get_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"message": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([])
#@permission_classes([IsAuthenticated, IsAdminUser])
def create_product(request):
    #user_email = request.user
    #user = User.objects.get(email=user_email)
    #enterprise = Enterprise.objects.get(pk=user.enterprise.pk)
    #if enterprise.name != "AQ":
        name = request.data.get('name')
        category = get_object_or_404(Category, pk=request.data.get('category'))
        sub_category = get_object_or_404(SubCategory, pk=request.data.get('subcategory'))
        serial = request.data.get('serial')

        product = Product.objects.create(
            name=name,
            category=category,
            sub_category=sub_category,
            brand=request.data.get('brand'),
            description=request.data.get('description'),
            is_service=request.data.get('is_service', False),
            is_good=request.data.get('is_good', False),
            image=request.data.get('image'),
            reference_code=f"{category.reference_code}{sub_category.reference_code}{serial}"
        )

        if product is None:
            return Response({'error': 'No se pudo crear el producto'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([])
def create_products(request):
    products = request.data.get('products')
    for product in products:
        name = product.get('name')
        category = get_object_or_404(Category, pk=product.get('category'))
        sub_category = get_object_or_404(SubCategory, pk=product.get('subcategory'))
        serial = product.get('serial')

        product = Product.objects.create(
            name=name,
            category=category,
            sub_category=sub_category,
            brand=product.get('brand'),
            description=product.get('description'),
            is_service=product.get('is_service', False),
            is_good=product.get('is_good', False),
            image=product.get('image'),
            reference_code=f"{category.reference_code}{sub_category.reference_code}{serial}"
        )

        if product is None:
            return Response({'error': 'No se pudo crear el producto'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Productos Creados'}, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([])
def update_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, data=request.data, many=False, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([])
def delete_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response({'message': 'Producto eliminado exitosamente'}, status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)


# Se va a definir el formato de texto de las categorias y subcategorias?
# Como es el flujo para crear varios productos?
@csrf_exempt
@api_view(['POST'])
@permission_classes([])
def import_products_excel(request):
    try:
        file = request.FILES['file']
        if not file.name.endswith('xlsx'):
            return Response({'error': 'El archivo no es un archivo de Excel'}, status=status.HTTP_400_BAD_REQUEST)
        workbook = openpyxl.load_workbook(file)
        worksheet = workbook.active
        num = 0
        products_ids = []
        for row in worksheet.iter_rows(min_row=2):
            if not all(cell.value is None for cell in row):
                name = row[0].value
                image = row[1].value
                brand = row[2].value
                category = row[3].value
                sub_category = row[4].value
                description = row[5].value
                reference_code = row[6].value
                measure = row[7].value
                is_good = row[8].value
                is_service = row[9].value

                category = category.replace('_', ' ')
                category = Category.objects.get(name=category)
                sub_category = SubCategory.objects.get(name=sub_category)
                #measure = MeasurementUnits.objects.get(name=measure)

                product = Product.objects.create(
                    name=name,
                    image=image,
                    brand=brand,
                    category=category,
                    sub_category=sub_category,
                    description=description,
                    #measurement_unit=measure,
                    reference_code=category.reference_code + sub_category.reference_code + reference_code,
                    is_good=True if is_good == 'Si' else False,
                    is_service=True if is_service == 'Si' else False,
                )

        return Response({'message': 'Productos importados correctamente'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([])
@api_view(['POST'])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


"""
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')


@api_view(['GET'])
def get_banners(request):
    banners = Banner.objects.all()
    serializer = BannerSerializer(banners, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_articulos(request):
    articulos = articulos.objects.all()
    serializer = ArticulosSerializer(articulos, many=True)
    return Response(serializer.data)
    
"""