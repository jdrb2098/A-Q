from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('solpeds-por-categoria/', views.buscar_solpeds_por_categorias, name='solped-por-categoria'),
]