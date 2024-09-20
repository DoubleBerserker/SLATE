from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def home(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())


def prediction(request):
    template = loader.get_template('prediction.html')
    return HttpResponse(template.render())
