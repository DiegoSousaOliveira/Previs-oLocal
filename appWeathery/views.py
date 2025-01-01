from django.shortcuts import render
from django.http import JsonResponse
from opencage.geocoder import OpenCageGeocode
from dotenv import load_dotenv
import os
import requests

def home(request):
    return render(request, 'appWeathery/home.html')


def update_map(request):
    if request.method == 'GET':
        city    =  request.GET.get('city')
        state   =  request.GET.get('state')
        query   =  f'{city}, {state}, Brasil'

        load_dotenv()

        OPEN_CAGE_API_KEY   =  os.getenv('OPEN_CAGE_API_KEY', 'change-me')
        geocoder            =  OpenCageGeocode(OPEN_CAGE_API_KEY)
        results             =  geocoder.geocode(query)
        lat                 =  results[0]['geometry']['lat']
        lng                 =  results[0]['geometry']['lng']
        lang                =  'pt_br'

        OPEN_WEATHER_API_KEY    =  os.getenv('OPEN_WEATHER_API_KEY', 'change-me')
        url_request             =  f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={OPEN_WEATHER_API_KEY}&lang={lang}"
        datas_weather           =  requests.get(url_request).json()

        temp_max_celsius        =  round(datas_weather['main']['temp_max'] - 273, 2)
        temp_min_celsius        =  round(datas_weather['main']['temp_min'] - 273, 2)
        temperature_celsius     =  round(datas_weather['main']['temp'] - 273, 2)

        weather_info = {
        'city':         datas_weather['name'],
        'icon':         datas_weather['weather'][0]['icon'],
        'state':        state,
        'country':      datas_weather['sys']['country'],
        'humidity':     datas_weather['main']['humidity'],
        'pressure':     datas_weather['main']['pressure'],
        'temp_min':     temp_min_celsius,
        'temp_max':     temp_max_celsius,
        'temperature':  temperature_celsius,
        'description':  datas_weather['weather'][0]['description'],
        }

        response = JsonResponse({'lat': lat, 'lng': lng, 'weather_info': weather_info})
        return response
