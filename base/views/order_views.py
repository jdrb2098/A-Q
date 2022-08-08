from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress, User
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime

import hashlib
from backend.settings import PAYU_API_KEY, PAYU_MERCHANTID

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

        order = Order.objects.create(
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

            item = OrderItem.objects.create(
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

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        splitTotalPrice = str(order.totalPrice).split(".")
        intTotalPrice = splitTotalPrice[0]
    
        signature = PAYU_API_KEY + '~' + PAYU_MERCHANTID + '~' + 'Kattalei' + str(order._id) + '~' + intTotalPrice + '~COP'
        signatureUtf8 = signature.encode("utf-8")

        hash = hashlib.md5(signatureUtf8)
        order.hash = hash.hexdigest()
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
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
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')