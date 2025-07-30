
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone


from ..managers import CustomUserManager


class Enterprise(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    high_priority_day = models.IntegerField(null=True, blank=True)
    medium_priority_day = models.IntegerField(null=True, blank=True)
    low_priority_day = models.IntegerField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Area(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    enterprise = models.OneToOneField(Enterprise, on_delete=models.SET_NULL, null=True)
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(unique=True, db_column='TzemailUsuario')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    username = models.CharField(max_length=50, default='0')
    phone = models.CharField(max_length=20, blank=True, null=True)
    identification_card = models.CharField(max_length=10, null=True, blank=True, db_column='cedula')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class CostCenter(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=250)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, null=True)
    budget = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    request_authorizer = models.ForeignKey(User, on_delete=models.CASCADE)
