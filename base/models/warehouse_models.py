
from django.db import models
from django.contrib.auth.models import  AbstractBaseUser, PermissionsMixin
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from django.utils import timezone
from base.models.base_models import Enterprise
import uuid

from ..managers import CustomUserManager


class Bodegas(models.Model):
    nombre = models.CharField(max_length=200)
    is_principal = models.BooleanField(default=False)
    direccion = models.TextField()
    empresa = models.ForeignKey(Enterprise, on_delete=models.CASCADE)