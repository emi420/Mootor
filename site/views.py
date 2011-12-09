from os import environ
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import render_to_response
from core import Catalog

# Static content

def index(request):
     return render_to_response('templates/home/index.html', {'is_home': 1})

# Dynamic content

def category(request, category_name = ''):
     # FIXME: id de categoria, ver si la solucion es usar natural-keys 
     category_id = 1
<<<<<<< HEAD

     # FIXME: Pasar a parametros de configuracion y un handler para
     #        las consultas al webservice (json-rpc)
     url = 'http://localhost:9000/api/rpc/catalog/'
     d = '{"method":"getProductsByCategoryUrl","params": ["test"], "id": 1}'
=======
     products = Catalog.getProductsByCategoryUrl(category_name)
     return render_to_response('templates/catalog/category.html', {'products': products}
>>>>>>> cf7fb754f4b22ca56a71ddc1ee49417a18a734d8
   
)

def product(request, category_name = '', product_name = ''):
     return HttpResponse('product')

