from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('home/', views.home, name='index'),
    path('prediction/', views.prediction, name='prediction')
]