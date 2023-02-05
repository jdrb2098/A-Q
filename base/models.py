from django.db import models
from django.contrib.auth.models import  AbstractBaseUser, PermissionsMixin
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from django.utils import timezone

import uuid

from .managers import CustomUserManager


magnitudes_CHOICES=(
    (1, 'Longitud'),
    (2, 'Volumen'),
    (3, 'Cantidad'),
    (4, 'Peso'),
    (5, 'Superficie'),
    (6, 'Temperatura'),
    (7, 'Tiempo')
)

nivel_prioridad_CHOICES=(
    (1, 'Alta'),
    (2, 'Media'),
    (3, 'Baja')
)

incoterms_CHOICES=(
    ('EXW','EXW Ex Works / En Fábrica'),
    ('FCA-F','FCA Fábrica o Almacén '),
    ('FCA-T','FCA Terminal'),
    ('CPT','CPT Carriage Paid To / Transporte pagado hasta'),
    ('TIP','CIP Carriage and Insurance Paid / Transporte y seguro pagados hasta'),
    ('DAP','DAP Delivered At Place/ Entregado en punto de destino'),
    ('DPU','DPU Delivered at place Unloaded/ Entregado en el lugar de descarga'),
    ('DDP','DDP Delivered Duty Paid/ Entregado con derechos pagados'),
    ('FAS','FAS Free Alongside Ship/ Libre al costado del buque'),
    ('FOB','FOB Free On Board/ Libre a bordo'),
    ('CFR','CFR Cost and Freight/ Coste y Flete'),
    ('CIF','CIF Cost, Insurance and Freight/ Coste, Seguro y Flete'),
)

class Enterprise(models.Model):
    
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return self.name

class User(AbstractBaseUser, PermissionsMixin):
    enterprise = models.OneToOneField(Enterprise, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(unique=True, db_column='TzemailUsuario')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    username = (models.CharField(max_length=50, default='0'))
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    
    objects = CustomUserManager()
    def __str__(self):
        return self.email
class Bodegas(models.Model):
    nombre = models.CharField(max_length=200)
    is_principal = models.BooleanField(default=False)
    direccion = models.TextField()
    empresa = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True,editable=False)
    nombre = models.CharField(max_length=255)
    def __str__(self):
        return self.nombre



class UnidadesMedida(models.Model):
    id_unidad_medida = models.AutoField(primary_key=True, editable=False, db_column='T055IdUnidadMedida')
    nombre = models.CharField(max_length=50, db_column='T055nombre',unique=True)
    abreviatura = models.CharField(max_length=5, db_column='T055abreviatura',unique=True)
    id_magnitud = models.PositiveSmallIntegerField(choices=magnitudes_CHOICES, db_column='T055Id_Magnitud')
    precargado = models.BooleanField(default=False, db_column='T055registroPrecargado')
    activo = models.BooleanField(default=True, db_column='T055activo')
    item_ya_usado = models.BooleanField(default=False, db_column='T055itemYaUsado')

    def __str__(self):
        return str(self.nombre)

    class Meta:
        db_table = 'T055UnidadesMedida'
        verbose_name = 'Unidad medida'
        verbose_name_plural = 'Unidades medida'
class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    referenceCode=models.CharField(max_length=200, null=True, blank=True)
    cantidad = models.IntegerField(null=True, blank=True, default=0)
    unidadDeMedida = models.ForeignKey(UnidadesMedida, on_delete=models.SET_NULL, blank=True, null=True)
    valor_unitario = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    is_bien = models.BooleanField(default=False)
    is_service = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)
    

    def __str__(self):
        return self.name


class CentroCostos(models.Model):
    nombre = models.CharField(max_length=250)
    empresa = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    presupuesto = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True) 
    autorizador_solicitudes = models.ForeignKey(User, on_delete=models.CASCADE)
class Solped(models.Model):
    usuario_creador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creador')
    descripcion = models.TextField()
    centro_de_costos = models.ForeignKey(CentroCostos, on_delete=models.CASCADE) 
    negociador_asignado = models.ForeignKey(User, on_delete=models.SET_NULL,null=True, blank=True, related_name='negociador')
    bodega = models.ForeignKey(Bodegas, on_delete=models.CASCADE)
    fecha_limite_resolucion = models.DateField()
    totalPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    is_Autorized = models.BooleanField(default=False)
    fachaDeAtorizacion = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    nivel_prioridad = models.TextField(choices=nivel_prioridad_CHOICES)
    is_cancelada = models.BooleanField(default=False)
    documento = models.FileField(blank=True,null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    

    def __str__(self):
        return str(self.createdAt)

class ObservacionesSolped(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True,blank=True)
    fecha_de_creacion = models.DateTimeField(auto_now_add=True)
    Observacion = models.TextField()
    solped = models.ForeignKey(Solped, on_delete=models.CASCADE,  null=True,blank=True)
class SolpedItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True,blank=True)
    solped = models.ForeignKey(Solped, on_delete=models.SET_NULL, null=True,blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    solped = models.OneToOneField(
        Solped, on_delete=models.CASCADE)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    cedula = models.CharField(max_length=10, null=True, blank=True)
    numeroTelefonico = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return str(self.address)


class Oferta(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    solped = models.OneToOneField(Solped, on_delete=models.CASCADE, null=True)
    taxPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    tiempoDeEntrega = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    garantia = models.TextField(null=True, blank=True)
    marca = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class CategoriasProducto(models.Model):
    id_categorias_producto = models.AutoField(primary_key=True,editable=False)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    id_producto = models.ForeignKey(Product, on_delete=models.CASCADE)

class SubCategoria(models.Model):
    id_subcategoria = models.AutoField(primary_key=True,editable=False)
    nombre = models.CharField(max_length=255)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)


class HistoricoDeCompra(models.Model):
    nombre_material = models.CharField(max_length=255)
    codigo_material = models.CharField(max_length=50)
    proveedor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    precio_unitario = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    precio_total = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)

class Evento_Proveedores(models.Model):
     titulo_evento = models.CharField(max_length=255)
     descripcion = models.TextField()
     ver_documento = models.BooleanField(default=True)
     solped = models.ForeignKey(Solped, on_delete=models.CASCADE)
     puede_cargar_documentos = models.BooleanField(default=True)
     documentos = models.FileField(blank=True, null=True)
     icoterms = models.TextField(choices=incoterms_CHOICES, null=True, blank=True)
     is_private = models.BooleanField(default=False)
     fecha_creacion = models.DateTimeField(auto_now_add=True)
     fecha_finalizacion = models.DateTimeField()

    
class EventoPrivado(models.Model):
    evento = models.ForeignKey(Evento_Proveedores, on_delete=models.SET_NULL, null=True,blank=True)
    preveedor = models .ForeignKey(User, on_delete=models.SET_NULL, null=True,blank=True)
