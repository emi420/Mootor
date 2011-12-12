from core.rpc import RPC

class Catalog(object):
    def getProductsByCategoryUrl(self, category_name = ''):
       rpc = RPC();
       return rpc.run('getProductsByCategoryUrl', category_name)
    def getCategories(self, category_name = ''):
       rpc = RPC();
       return rpc.run('getCategories', '')
