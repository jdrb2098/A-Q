from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Enterprise)
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Oferta)
admin.site.register(SupplierProfile)
admin.site.register(AppUserLv1Profile)
admin.site.register(AppUserLv2Profile)
admin.site.register(AppUserLv3Profile)
admin.site.register(ShippingAddress)


