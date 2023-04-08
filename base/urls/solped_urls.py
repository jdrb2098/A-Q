from django.urls import path
from base.views import solped_views as views


urlpatterns = [
    path('create-solped/', views.create_solped, name="create-solped")
]