from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
 
    url(r'^$', 'ufront.site.views.index', name='index'),

    # Dynamic content: Categories, products 
    url(r'^(.*)/$', 'ufront.site.views.category', name='category'),
    url(r'^(.*)/(.*).html$', 'ufront.site.views.product', name='product'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
) 
