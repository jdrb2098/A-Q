from django.db import models

from ..models import *

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

priority_level_CHOICES = (
    (1, 'Alta'),
    (2, 'Media'),
    (3, 'Baja')
)

status_CHOICES = (
    (1, 'Creada'),
    (2, 'Autorizada'),
    (3, 'Cancelada'),
    (4, 'En proceso'),
    (5, 'Finalizada')
)


class Solped(models.Model):
    creator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creador')
    description = models.TextField()
    assigned_negotiator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='negociador')
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, null=True, blank=True)
    resolution_deadline = models.DateField()
    total_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    authorization_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    priority_level = models.TextField(choices=priority_level_CHOICES)
    status = models.IntegerField(choices=status_CHOICES, null=True, blank=True, default=1)
    document = models.FileField(blank=True, null=True)
    cost_center = models.ForeignKey(CostCenter, on_delete=models.CASCADE, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class ObservationsSolped(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    observation = models.TextField()
    solped = models.ForeignKey(Solped, on_delete=models.CASCADE, null=True, blank=True)


#El precio deberia ser estimado por el usuario y deberia haber precio por unidad
class SolpedItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    solped = models.ForeignKey(Solped, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class Offer(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    solped = models.OneToOneField(Solped, on_delete=models.CASCADE, null=True)
    tax_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    delivery_time = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    warranty = models.TextField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class PurchaseHistory(models.Model):
    material_name = models.CharField(max_length=255)
    material_code = models.CharField(max_length=50)
    supplier = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    unit_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)


class SuppliersEvent(models.Model):
    event_title = models.CharField(max_length=255)
    description = models.TextField()
    view_document = models.BooleanField(default=True)
    solped = models.ForeignKey(Solped, on_delete=models.CASCADE)
    can_upload_documents = models.BooleanField(default=True)
    documents = models.FileField(blank=True, null=True)
    icoterms = models.TextField(choices=incoterms_CHOICES, null=True, blank=True)
    is_private = models.BooleanField(default=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()


class PrivateEvent(models.Model):
    event = models.ForeignKey(SuppliersEvent, on_delete=models.SET_NULL, null=True, blank=True)
    supplier = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
