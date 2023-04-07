from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from base.models import Solped, SolpedItem, Product
from base.serializers import SolpedSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class SolpedCreateView(APIView):
    def post(self, request, format=None):
        serializer = SolpedSerializer(data=request.data)
        if serializer.is_valid():
            solped = serializer.save()
            products_data = request.data.get('products', [])
            for item in products_data:
                product, _ = Product.objects.get_or_create(name=item)
                SolpedItem.objects.create(solped=solped, product=product)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)        


@api_view(['POST'])
def create_solped(request):
    # Crear solped
    solped_serializer = SolpedSerializer(data=request.data)
    if solped_serializer.is_valid():
        solped = solped_serializer.save(creator_user=request.user)

        # Crear items
        items_data = request.data.get('items')
        for item_data in items_data:
            # Obtener producto
            product_id = item_data.get('product')
            product = Product.objects.get(product_id=product_id)

            # Crear item
            item_serializer = SolpedItemSerializer(data=item_data)
            if item_serializer.is_valid():
                item_serializer.save(solped=solped, product=product)

        return Response(solped_serializer.data)
    else:
        return Response(solped_serializer.errors, status=status.HTTP_400_BAD_REQUEST)