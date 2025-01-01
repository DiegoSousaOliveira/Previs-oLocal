from django.urls import path
from . import views

app_name = 'appWeathery'

urlpatterns = [
    path('', views.home, name='home'),
    path('updateMap/', views.update_map, name='update_map')
]
