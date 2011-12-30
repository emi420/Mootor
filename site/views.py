from os import environ
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import render_to_response
from core.catalog import Catalog
from django.conf import settings

def index(request):
     return render_to_response('templates/index.html', {'is_home': 1})

