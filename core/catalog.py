from core.rpc import RPC

class Catalog(object):
    def getProductsByCategoryUrl(category_name = '')
       return RPC.run('getProductsByCategoryUrl', category_name)
