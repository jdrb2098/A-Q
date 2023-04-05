
from django.db import models
from base.models.seguridad_models import Enterprise


class Bodegas(models.Model):
    nombre = models.CharField(max_length=200)
    is_principal = models.BooleanField(default=False)
    direccion = models.TextField()
    empresa = models.ForeignKey(Enterprise, on_delete=models.CASCADE)