from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('create-category/', views.create_categories, name="create-category"),
    path('categories/', views.get_categories, name="categories"),
    path('category/<str:pk>/', views.get_category, name="category"),
    path('update-category/<str:pk>/', views.update_category, name="update-category"),
    path('delete-category/<str:pk>/', views.delete_category, name="delete-category"),
    path('create-subcategory/', views.create_subcategory, name="create-subcategory"),
    path('subcategories/', views.get_subcategories, name="subcategories"),
    path('subcategory/<str:pk>/', views.get_subcategory, name="subcategory"),
    path('update-subcategory/<str:pk>/', views.update_subcategory, name="update-subcategory"),
    path('delete-subcategory/<str:pk>/', views.delete_subcategory, name="delete-subcategory"),
    path('filter-subcategories/<str:pk>/', views.filter_subcategories, name="filter-subcategory"),
    path('create-product/', views.create_product, name="create-product"),
    path('top-products/', views.get_top_products, name="top-products"),
    path('update-product/<str:pk>/', views.update_product, name="update-product"),
    path('delete-product/<str:pk>/', views.delete_product, name="delete-product"),
    path('', views.get_products, name="products"),
    path('<str:pk>/', views.get_product, name="product"),
]
