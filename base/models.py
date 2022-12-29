from django.db import models
from django.contrib.auth.models import  AbstractBaseUser, PermissionsMixin
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from django.utils import timezone

import uuid

from .managers import CustomUserManager

class Enterprise(models.Model):
    
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return self.name

class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        SUPPLIER = "SUPPLIER", "Supplier"
        USUARIO = "USUARIO", "AppUserLv1"
        USUARIOAUTH = "USUARIOAUTH", "AppUserLv2"
        COMPRADORNEGOCIADOR = "COMPRADORNEGOCIADOR", "AppUserLv3"
        

    base_role = Role.ADMIN
    role = models.CharField(max_length=50, choices=Role.choices)
    enterprise = models.OneToOneField(Enterprise, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    username = (models.CharField(max_length=50, default='0'))
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    
    objects = CustomUserManager()
    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)
    def __str__(self):
        return self.email

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True,editable=False)
    nombre = models.CharField(max_length=255)
    def __str__(self):
        return self.nombre


class Product(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    referenceCode=models.CharField(max_length=200, null=True, blank=True)
    cantidad = models.IntegerField(null=True, blank=True, default=0)
    unidadDeMedida = models.CharField(max_length=200, null=True, blank=True)
    is_bien = models.BooleanField(default=False)
    is_service = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)
    

    def __str__(self):
        return self.name

class Solped(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    is_Autorized = models.BooleanField(default=False)
    fachaDeAtorizacion = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    fechaDeEntrega = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class SolpedItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    solped = models.ForeignKey(Solped, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    solped = models.OneToOneField(
        Solped, on_delete=models.CASCADE, null=True, blank=True)
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
