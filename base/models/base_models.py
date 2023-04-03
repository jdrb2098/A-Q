from django.db import models
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from django.utils import timezone

import uuid

from .managers import CustomUserManager

magnitudes_CHOICES = (
    (1, 'Longitud'),
    (2, 'Volumen'),
    (3, 'Cantidad'),
    (4, 'Peso'),
    (5, 'Superficie'),
    (6, 'Temperatura'),
    (7, 'Tiempo')
)

nivel_prioridad_CHOICES = (
    (1, 'Alta'),
    (2, 'Media'),
    (3, 'Baja')
)

incoterms_CHOICES = (
    ('EXW', 'EXW Ex Works / En Fábrica'),
    ('FCA-F', 'FCA Fábrica o Almacén '),
    ('FCA-T', 'FCA Terminal'),
    ('CPT', 'CPT Carriage Paid To / Transporte pagado hasta'),
    ('TIP', 'CIP Carriage and Insurance Paid / Transporte y seguro pagados hasta'),
    ('DAP', 'DAP Delivered At Place/ Entregado en punto de destino'),
    ('DPU', 'DPU Delivered at place Unloaded/ Entregado en el lugar de descarga'),
    ('DDP', 'DDP Delivered Duty Paid/ Entregado con derechos pagados'),
    ('FAS', 'FAS Free Alongside Ship/ Libre al costado del buque'),
    ('FOB', 'FOB Free On Board/ Libre a bordo'),
    ('CFR', 'CFR Cost and Freight/ Coste y Flete'),
    ('CIF', 'CIF Cost, Insurance and Freight/ Coste, Seguro y Flete'),
)


class Enterprise(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Categoria(models.Model):
    id_categoria = models.CharField(primary_key=True, editable=False)
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre


class SubCategoria(models.Model):
    id_sub_categoria = models.CharField(primary_key=True, editable=False)
    nombre = models.CharField(max_length=255)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)




