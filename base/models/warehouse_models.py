
from django.db import models
from base.models.seguridad_models import Enterprise


class ShippingAddress(models.Model):
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postal_code = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    # shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True) # Ya esta en la oferta
    _id = models.AutoField(primary_key=True, editable=False)
    identification_card = models.CharField(max_length=10, null=True, blank=True, db_column='cedula') # Eso deberia ser del usuario no de la direccion
    phone_number = models.CharField(max_length=15, null=True, blank=True) # Eso es del usuario

    def __str__(self):
        return str(self.address)


class Warehouse(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    is_principal = models.BooleanField(default=False)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE)
