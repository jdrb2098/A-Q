from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Solped, SolpedItem, ShippingAddress, User, CategoriasProducto
from base.serializers import ProductSerializer, SolpedSerializer

from rest_framework import status
from datetime import datetime


from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Solped.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            cedula=data['shippingAddress']['cedula'],
            numeroTelefonico=data['shippingAddress']['numeroTelefonico'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = SolpedItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        template = render_to_string('orderInfo.html',
                {   'address':shipping.address,
                    'name':request.user.first_name,
                    'city':shipping.city,
                    'country':shipping.country,
                    'cedula':shipping.cedula,
                    'postalCode':shipping.postalCode,
                    'totalPrice':order.totalPrice,
                    'numeroTelefonico':shipping.numeroTelefonico,
                    }
                  )
        # (5) send an Email whith the shipping info           
        email = EmailMessage(
        'Datos de Envio',
        template,
        settings.EMAIL_HOST_USER,
        ['natural.kattalei@gmail.com'],
        )
        email.fail_silently= False
        email.send()    

        serializer = SolpedSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = SolpedSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Solped.objects.all()
    serializer = SolpedSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Solped.objects.get(_id=pk)
        splitTotalPrice = str(order.totalPrice).split(".")
        intTotalPrice = splitTotalPrice[0]
        order.hash = hash.hexdigest()
        if user.is_staff or order.user == user:
            serializer = SolpedSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    template = render_to_string('isPaidEmail.html',{'name':request.user.first_name})
    email = EmailMessage(
        'informacion de compra',
        template,
        settings.EMAIL_HOST_USER,
        [request.user.email],
    )
    email.fail_silently= False
    email.send()
    order = Solped.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Solped.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')


@api_view(['GET'])
def buscar_solpeds_por_categorias(request):
    data = request.data
    categorias_productos= CategoriasProducto.objects.filter(id_categoria__in= data['categorias'])
    categorias_productos_list=[]
    for i in categorias_productos:
        categorias_productos_list.append(i.id_producto)
    
    solped_items = SolpedItem.objects.filter(product__in=categorias_productos_list)
    solped_items_list = []
    
    for i in solped_items:
        solped_items_list.append(i.solped._id)
    solped = Solped.objects.filter(_id__in=solped_items_list)
    print(solped)
    serializer = SolpedSerializer(solped,many=True)

    return Response({'Success':True,'solpeds':serializer.data}, status=status.HTTP_200_OK)