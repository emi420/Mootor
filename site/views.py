from os import environ
import urllib2
import json
from django.utils import simplejson
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
#from models import Category, Product
from django.shortcuts import render_to_response
#from django.core.paginator import Paginator
from django.core import serializers


#
#    TODO: Tener en cuenta la deserializacion de claves naturales: 
#      https://docs.djangoproject.com/en/dev/topics/serialization/#natural-keys
#      y el encoding
#      https://docs.djangoproject.com/en/dev/topics/serialization/#notes-for-specific-serialization-formats


# Static content

def index(request):
     return render_to_response('templates/index.html', {'is_home': 1})

# Dynamic content

def category(request, category_name = ''):
     # FIXME: id de categoria, ver si la solucion es usar natural-keys 
     category_id = 1

     # FIXME: Pasar a parametros de configuracion y un handler para
     #        las consultas al webservice (json-rpc)
     url = 'http://50.116.1.212:9000/api/rpc/catalog/'
     d = '{"method":"getCategory","params": ["test"], "id": 1}'
     response = 0
     try:
        request = urllib2.Request(url, 
                        headers = {"Content-Type": "application/json",},
                        data = d)
        response = urllib2.urlopen(request).read()
     except urllibr2.HTTPError, e:
        return HttpResponse(e.read())
    
     json_string = simplejson.loads(response)['result']
     products = simplejson.loads(json_string)
     return render_to_response('templates/category.html', {'products': products}
    
)

def product(request, category_name = '', product_name = ''):
     return HttpResponse('product')
