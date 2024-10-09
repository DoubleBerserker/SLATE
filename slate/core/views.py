from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
import tensorflow
import numpy as np


def home(request):
    return render(request, 'index.html')


def webcamPrediction(request):
    return render(request, 'webcamPrediction.html')


def get_prediction(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'POST':
            if 'sequence[0][]' in request.POST:
                seq = []
                for i in range(0, 10):
                    seq.append(request.POST.getlist("sequence[" + str(i) + "][]"))

                tensor = np.array(seq)
                tensor = tensor.astype(np.float64)
                tensor = np.expand_dims(tensor, axis=0)

                model = tensorflow.keras.models.load_model('C:\op\Projects\DoubleBerserker\SLATE\slate\core\/asl.keras')

                res = model.predict(tensor)
                print(res)
                return HttpResponse(res)

            else:
                return HttpResponse("Sequence not found")
        else:
            return HttpResponseBadRequest("Request method not POST")

    else:
        return HttpResponseBadRequest("Request method not valid")
