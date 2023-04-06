
from django.db import models
from base.models.seguridad_models import Enterprise


class Warehouse(models.Model):
    name = models.CharField(max_length=200)
    is_principal = models.BooleanField(default=False)
    address = models.TextField()
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
