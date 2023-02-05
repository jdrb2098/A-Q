from django.urls import path
from base.views import solped_views as views


urlpatterns = [
    path('create-solped/', views.CreateSolped.as_view(), name= "create-solped")
]