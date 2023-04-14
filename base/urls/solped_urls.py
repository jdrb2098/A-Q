from django.urls import path
from base.views import solped_views as views


urlpatterns = [
    path('create-solped/', views.create_solped, name="create-solped"),
    path('get-solped-excel/<str:pk>/', views.get_solped_excel, name="get-solped-excel"),
    path('authorization-solped/<str:pk>/', views.authorization_solped, name="authorization-solped"),
]