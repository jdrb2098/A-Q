from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Solped, SolpedItem, User
from base.serializers import ProductSerializer, SolpedSerializer
from rest_framework import status
from datetime import datetime




def crear_solped(request):
    user = request.user
    return 



