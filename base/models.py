from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid

class Enterprise(models.Model):
    
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return self.name

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        SUPPLIER = "SUPPLIER", "Supplier"
        APPUSERLV1 = "APPUSERLV1", "AppUserLv1"
        APPUSERLV2 = "APPUSERLV2", "AppUserLv2"
        APPUSERLV3 = "APPUSERLV3", "AppUserLv3"

    base_role = Role.ADMIN

    role = models.CharField(max_length=50, choices=Role.choices)
    Enterprise = models.OneToOneField(Enterprise, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)


class SupplierManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.SUPPLIER)


class Supplier(User):

    base_role = User.Role.SUPPLIER

    student = SupplierManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for suppliers"


@receiver(post_save, sender=Supplier)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "SUPPLIER":
        SupplierProfile.objects.create(user=instance)


class SupplierProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    supplier_id = models.IntegerField(null=True, blank=True)


class AppUserLv1Manager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.APPUSERLV1)


class AppUserLv1(User):

    base_role = User.Role.APPUSERLV1

    appUserLv1 = AppUserLv1Manager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for appUsersLv1"


class AppUserLv1Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    appUserLv1_id = models.IntegerField(null=True, blank=True)


@receiver(post_save, sender=AppUserLv1)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "APPUSERLV1":
        AppUserLv1Profile.objects.create(user=instance)

class AppUserLv2Manager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.APPUSERLV2)


class AppUserLv2(User):

    base_role = User.Role.APPUSERLV2

    appUserLv2 = AppUserLv2Manager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for appUsersLv2"


class AppUserLv2Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    appUserLv2_id = models.IntegerField(null=True, blank=True)


@receiver(post_save, sender=AppUserLv2)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "APPUSERLV2":
        AppUserLv2Profile.objects.create(user=instance)



class AppUserLv3Manager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.APPUSERLV3)


class AppUserLv3(User):

    base_role = User.Role.APPUSERLV3

    appUserLv3 = AppUserLv3Manager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for appUsersLv3"


class AppUserLv3Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    appUserLv3_id = models.IntegerField(null=True, blank=True)


@receiver(post_save, sender=AppUserLv3)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "APPUSERLV3":
        AppUserLv3Profile.objects.create(user=instance)



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    isPermission1 = models.BooleanField(default=False)
    isPermission2 = models.BooleanField(default=False)
    isPermission3 = models.BooleanField(default=False)
    email = models.EmailField(max_length=500, blank=True, null=True)
    Telefono = models.CharField(max_length=10, blank=True, null=True)
    username = models.CharField(max_length=200, blank=True, null=True)
    profile_image = models.ImageField(null=True, blank=True, upload_to='profiles/', default="profiles/user-default.png")
    created = models.DateTimeField(auto_now_add=True)
    presupuesto = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
        return str(self.username)

    class Meta:
        ordering = ['created']

    @property
    def imageURL(self):
        try:
            url = self.profile_image.url
        except:
            url = ''
        return url


class Product(models.Model):
    owner = models.ForeignKey(Profile, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
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

class Order(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
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


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
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
    solped = models.OneToOneField(Order, on_delete=models.CASCADE, null=True)
    taxPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    tiempoDeEntrega = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    garantia = models.TextField(null=True, blank=True)
    marca = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)



