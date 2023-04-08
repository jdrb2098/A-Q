from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from base.models import Solped, SolpedItem, Product
from base.serializers import SolpedSerializer, SolpedItemsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


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
    solped_serializer = SolpedSerializer(data=request.data, partial=True)
    if solped_serializer.is_valid():
        solped = solped_serializer.save(creator_user=request.user)
        # Crear items
        items_data = request.data.get('items')
        for item_data in items_data:
            product = Product.objects.get(pk=item_data.get('product_id'))
            SolpedItem.objects.create(
                solped=solped,
                product=product,
                name=item_data.get('name'),
                quantity=item_data.get('quantity'),
                price=product.price * item_data.get('quantity'),
                image=product.image
            )
        return Response(solped_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(solped_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
