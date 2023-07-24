from django.urls import path
from base.views import solped_views as views


urlpatterns = [
    path('create-solped/', views.create_solped, name="create-solped"),
    path('get-solped/<str:pk>/', views.get_solped, name="get-solped"),
    path('get-solpeds/', views.get_solpeds, name="get-solpeds"),
    path('update-solped/<str:pk>/', views.update_solped, name="update-solped"),
    path('delete-solped/<str:pk>/', views.delete_solped, name="delete-solped"),
    path('get-solped-items/<str:pk>/', views.get_solped_items, name="get-solped-items"),
    path('update-solped-items/<str:pk>/', views.update_solped_items, name="update-solped-items"),
    path('get-solped-excel/<str:pk>/', views.get_solped_excel, name="get-solped-excel"),
    path('authorization-solped/<str:pk>/', views.authorization_solped, name="authorization-solped"),
    path('create-observation/', views.create_observation, name="create-observation"),
    path('get-solpeds-user/<str:pk>/', views.get_solpeds_by_user, name="get-solpeds-user"),

]