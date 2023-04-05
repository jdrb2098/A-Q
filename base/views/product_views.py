from unicodedata import category
from django.shortcuts import render
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.serializers import ProductSerializer, CategoriaSerializer, SubCategoriaSerializer
from rest_framework import status
from base.models import *

@api_view(['POST'])
@permission_classes([])
def create_categories(request):
    #user = request.user
    data = request.data
    category = Categoria.objects.create(
        #user=user,
        nombre=data['nombre'],
        id_categoria=data['id_categoria']
    )
    serializer = CategoriaSerializer(category, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([])
def get_categories(request):
    categories = Categoria.objects.all()
    serializer = CategoriaSerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([])
def get_category(request, pk):
    try:
        category = Categoria.objects.get(pk=pk)
        serializer = CategoriaSerializer(category, many=False)
        return Response(serializer.data)
    except Categoria.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=404)


@api_view(['PUT'])
@permission_classes([])
def update_category(request, pk):
    try:
        category = Categoria.objects.get(pk=pk)
        data = request.data
        category.nombre = data['nombre']
        category.id_categoria = data['id_categoria']
        category.save()
        serializer = CategoriaSerializer(category, many=False)
        return Response(serializer.data)
    except Categoria.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=404)


@api_view(['DELETE'])
@permission_classes([])
def delete_category(request, pk):
    try:
        category = Categoria.objects.get(pk=pk)
        category.delete()
        return Response({'message': 'Categoria eliminada correctamente'})
    except Categoria.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=404)


""" SubCategoria """


# Vista para crear una nueva subcategoría
@api_view(['POST'])
@permission_classes([])
def create_subcategory(request):
    data = request.data
    sub_category = SubCategoria.objects.create(
        nombre=data['nombre'],
        id_sub_categoria=data['id_sub_categoria'],
        categoria=Categoria.objects.get(id_categoria=data['categoria'])
    )
    serializer = SubCategoriaSerializer(sub_category, many=False)
    return Response(serializer.data)


# Vista para leer todas las subcategorías
@api_view(['GET'])
@permission_classes([])
def get_subcategories(request):
    subcategorias = SubCategoria.objects.all()
    serializer = SubCategoriaSerializer(subcategorias, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Vista para leer una subcategoría específica por clave primaria (pk)
@api_view(['GET'])
@permission_classes([])
def get_subcategory(request, pk):
    try:
        subcategoria = SubCategoria.objects.get(pk=pk)
    except SubCategoria.DoesNotExist:
        return Response({"message": "Subcategoría no encontrada"}, status=404)

    serializer = SubCategoriaSerializer(subcategoria)
    return Response(serializer.data)


# Vista para actualizar una subcategoría existente
@api_view(['PUT'])
@permission_classes([])
def update_subcategory(request, pk):
    try:
        subcategoria = SubCategoria.objects.get(id_sub_categoria=pk)
    except SubCategoria.DoesNotExist:
        return Response({'error': 'La subcategoría no existe'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SubCategoriaSerializer(subcategoria, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para eliminar una subcategoría existente
@api_view(['DELETE'])
@permission_classes([])
def delete_subcategory(request, pk):
    try:
        subcategoria = SubCategoria.objects.get(id_sub_categoria=pk)
    except SubCategoria.DoesNotExist:
        return Response({'error': 'La subcategoría no existe'}, status=status.HTTP_404_NOT_FOUND)

    subcategoria.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# Vista para leer todas las subcategorías, con filtro por categoría
@api_view(['GET'])
@permission_classes([])
def filter_subcategories(request, pk):
    try:
        subcategorias = SubCategoria.objects.filter(categoria=pk)
    except SubCategoria.DoesNotExist:
        return Response({"message": "No se encontraron subcategorías para la categoría especificada"}, status=404)

    serializer = SubCategoriaSerializer(subcategorias, many=True)
    return Response(serializer.data)


""" Productos """


@api_view(['GET'])
def get_products(request):
    query = request.query_params.get('keyword')
    if query == None:
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
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    id_categoria = request.data['id_categoria']
    product = Product.objects.create(
        user=user,
        #id_producto=f'{id_categoria}{id_subcategoria}{codigoproducto}',
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


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


#@api_view(['GET'])
#def get_banners(request):
    #banners = Banner.objects.all()
    #serializer = BannerSerializer(banners, many=True)
    #return Response(serializer.data)


#def get_articulos(request):
    #articulos = articulos.objects.all()
    #serializer = ArticulosSerializer(articulos, many=True)
    #return Response(serializer.data)