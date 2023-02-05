from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from base.models import Solped
from base.serializers import SolpedSerializer


class CreateSolped(CreateAPIView):
    serializer_class = SolpedSerializer
    queryset = Solped.objects.all()

