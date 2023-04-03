
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Enterprise)
admin.site.register(Product)
admin.site.register(Solped)
admin.site.register(SolpedItem)
admin.site.register(Oferta)
admin.site.register(ShippingAddress)
admin.site.register(Categoria)
admin.site.register(CategoriasProducto)
admin.site.register(SubCategoria)



