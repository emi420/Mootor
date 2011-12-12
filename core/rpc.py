import urllib2
from django.utils import simplejson
from django.conf import settings
from django.http import HttpResponse

class RPC(object):
    def run(self, method = '', params = ''):
        jsonstr = '{"method":"' + method + '","params":["' + params + '"],"id": 1}'
        try:
            request = urllib2.Request(settings.JSON_RPC_URL, 
                        headers = {"Content-Type": "application/json",},
                        data = jsonstr)
            response = urllib2.urlopen(request).read()
        except urllib2.HTTPError, e:
            return HttpResponse(e.read())
    
        jsonres = simplejson.loads(response)['result']
        return simplejson.loads(jsonres)
 

