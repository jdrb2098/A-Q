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


