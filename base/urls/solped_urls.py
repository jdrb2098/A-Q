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
    path('get-solpeds-user/', views.get_solpeds_by_user, name="get-solpeds-user"),
    path('get-odc-user/', views.get_odc_by_user, name="get-odc-user"),
    path('get-orders-user/', views.get_orders_by_user, name="get-orders-user"),
    path('get-item-document/<str:pk>/', views.get_documents_for_item, name='get-documents-for-item'),
    path('get-solped-items-document/<str:pk>/', views.get_documents_for_solped, name='get_documents_for_solped'),
    path('upload-document-item/<str:pk>/', views.upload_document_item, name='upload-document-item'),
]