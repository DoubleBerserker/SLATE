from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('home/', views.home, name='index'),
    path('webcam/', views.webcam_prediction, name='webcam'),
    # path('getPrediction/', views.get_prediction, name='getPrediction') # Server-side ML model capability
]