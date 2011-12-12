from os import environ
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import render_to_response
from core.catalog import Catalog
from django.conf import settings

def index(request):
     return render_to_response('templates/home/index.html', {'is_home': 1})

def category(request, category_name = ''):
     # FIXME: id de categoria, ver si la solucion es usar natural-keys 
     category_id = 1
     catalog = Catalog()
     products = catalog.getProductsByCategoryUrl(category_name)
     context = {}
     context['media_url'] = settings.MEDIA_URL
     return render_to_response('templates/catalog/category.html', {'products': products, 'context': context})

