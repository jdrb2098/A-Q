from unicodedata import category
from django.shortcuts import render
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.serializers import ProductSerializer, CategorySerializer, SubCategorySerializer
from rest_framework import status
from base.models import *

""" Categorias """
# Vista para crear una nueva categoría
@api_view(['POST'])
@permission_classes([])
def create_categories(request):
    #user = request.user
    data = request.data
    category = Category.objects.create(
        #user=user,
        name=data['name'],
        id_category=data['id_category']
    )
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


# Vista para leer todas las categorías
@api_view(['GET'])
@permission_classes([])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# Vista para leer una categoría específica por clave primaria (pk)
@api_view(['GET'])
@permission_classes([])
def get_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=404)


@api_view(['PUT'])
@permission_classes([])
def update_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        data = request.data
        category.id_category = data.get('id_category')
        category.name = data.get('name')
        category.save()
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=404)


@api_view(['DELETE'])
@permission_classes([])
def delete_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response({'message': 'Categoria eliminada correctamente'})
    except Category.DoesNotExist:
        return Response({'error': 'Categoria no encontrada'}, status=404)


""" SubCategoria """


# Vista para crear una nueva subcategoría
@api_view(['POST'])
@permission_classes([])
def create_subcategory(request):
    data = request.data
    sub_category = SubCategory.objects.create(
        name=data['name'],
        id_sub_category=data['id_sub_category'],
        category=Category.objects.get(id_categoria=data['category'])
    )
    serializer = SubCategorySerializer(sub_category, many=False)
    return Response(serializer.data)


# Vista para leer todas las subcategorías
@api_view(['GET'])
@permission_classes([])
def get_subcategories(request):
    subcategory = SubCategory.objects.all()
    serializer = SubCategorySerializer(subcategory, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Vista para leer una subcategoría específica por clave primaria (pk)
@api_view(['GET'])
@permission_classes([])
def get_subcategory(request, pk):
    try:
        subcategory = SubCategory.objects.get(pk=pk)
    except SubCategory.DoesNotExist:
        return Response({"message": "Subcategoría no encontrada"}, status=404)

    serializer = SubCategorySerializer(subcategory, many=False)
    return Response(serializer.data)


# Vista para actualizar una subcategoría existente
@api_view(['PUT'])
@permission_classes([])
def update_subcategory(request, pk):
    subcategory = SubCategory.objects.get(pk=pk)
    data = request.data
    subcategory.id_sub_category = data.get('id_sub_category')  # actualiza el id
    subcategory.name = data.get('name')  # actualiza el nombre
    subcategory.category = Category.objects.get(id_category=data.get('category'))  # actualiza la categoría
    subcategory.save()
    serializer = SubCategorySerializer(subcategory, many=False)

    return Response(serializer.data, status=status.HTTP_200_OK)


# Vista para eliminar una subcategoría existente
@api_view(['DELETE'])
@permission_classes([])
def delete_subcategory(request, pk):
    try:
        subcategory = SubCategory.objects.get(pk=pk)
    except SubCategory.DoesNotExist:
        return Response({'error': 'La subcategoría no existe'}, status=status.HTTP_404_NOT_FOUND)

    subcategory.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# Vista para leer todas las subcategorías, con filtro por categoría
@api_view(['GET'])
@permission_classes([])
def filter_subcategories(request, pk):
    try:
        subcategories = SubCategory.objects.filter(category=pk)
    except SubCategory.DoesNotExist:
        return Response({"message": "No se encontraron subcategorías para la categoría especificada"}, status=404)

    serializer = SubCategorySerializer(subcategories, many=True)
    return Response(serializer.data)


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
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([])
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([])
def create_product(request):
    name = request.data.get('name')
    categories_ids = request.data.get('categories')
    subcategories_ids = request.data.get('subcategories')

    product = Product.objects.create(
        name=name,
        price=request.data.get('price'),
        brand=request.data.get('brand'),
        description=request.data.get('description'),
        image=request.data.get('image'),
        unit_price=request.data.get('unit_price'),
        reference_code=request.data.get('reference_code'),
        quantity=request.data.get('quantity'),
    )

    if categories_ids is not None:
        for category_id in categories_ids:
            category = Category.objects.get(id_category=category_id)
            CategoryProduct.objects.create(id_category=category, id_product=product)

    if subcategories_ids is not None:
        for subcategory_id in subcategories_ids:
            subcategory = SubCategory.objects.get(id_sub_category=subcategory_id)
            SubCategoryProduct.objects.create(id_sub_category=subcategory, id_product=product)

    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([])
def update_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)

    product.name = request.data.get('name', product.name)
    product.price = request.data.get('price', product.price)
    product.brand = request.data.get('brand', product.brand)
    product.description = request.data.get('description', product.description)
    product.image = request.data.get('image', product.image)
    product.unit_price = request.data.get('unit_price', product.valor_unitario)
    product.reference_code = request.data.get('reference_code', product.referenceCode)
    product.quantity = request.data.get('quantity', product.cantidad)
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([])
def delete_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)

    product.delete()

    return Response({'message': 'Producto eliminado exitosamente'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([])
def create_category_product(request):
    category_id = request.data.get('category_id')
    product_id = request.data.get('product_id')

    category = Category.objects.get(id_category=category_id)
    product = Product.objects.get(id_product=product_id)

    CategoryProduct.objects.create(id_category=category, id_product=product)

    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([])
def create_subcategory_product(request):
    subcategory_id = request.data.get('subcategory_id')
    product_id = request.data.get('product_id')

    subcategory = SubCategory.objects.get(id_sub_category=subcategory_id)
    product = Product.objects.get(id_product=product_id)

    SubCategoryProduct.objects.create(id_sub_category=subcategory, id_product=product)

    return Response(status=status.HTTP_201_CREATED)


"""
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