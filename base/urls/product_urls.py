from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('create-category/', views.create_categories, name="create-category"),
    path('', views.get_categories, name="categories"),
    path('<str:pk>/', views.get_category, name="category"),
    path('update/<str:pk>/', views.update_category, name="update-category"),
    path('delete/<str:pk>/', views.delete_category, name="delete-category"),
]
