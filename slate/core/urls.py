from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('webcam/', views.webcam_prediction, name='webcam'),
    path('temp/', views.temp, name='video'),
    path('learn/', views.learn, name='learn'),
    path('learn/beginner/', views.beginner, name='beginner'),
    path('learn/beginner/letters', views.letters, name='letters')
    # path('getPrediction/', views.get_prediction, name='getPrediction') # Server-side ML model capability
]