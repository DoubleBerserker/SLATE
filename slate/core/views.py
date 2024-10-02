from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def home(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())


def webcamPrediction(request):
    template = loader.get_template('webcamPrediction.html')
    print("Successful webcam prediction")
    return HttpResponse(template.render())