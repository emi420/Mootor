(function(m) {
    
    angular.module('main.services', [])
    
    .factory('Item', function($q, $window) {
        
       var ItemModel = Mootor.Data.models.Item;
        
       return {

           all: function() {
               return ItemModel.all();
           },
           
           get: function(options) {
              
               var deferred = $q.defer(),
                   item = ItemModel.get(options),
                   fail;

               // FIXME CHECK
               window.setTimeout(function() {
                   deferred.resolve(item);
               }, 1);

               return deferred.promise;
              

           },
            
           getWithPictures: function(options) {
      
              var deferred = $q.defer(),
                  item = ItemModel.get(options),
                  fail;
          
              
              if (item && item.picture === "img/no-picture.png") {
                  item.picture = "";
              }
          

              window.setTimeout(function() {
                  if (window.cordova !== undefined && item.picture) {

                      fail = function(e) {
                          console.log(e.toString());
                          deferred.resolve(item);
                      }

                      function onInitFs(fs) {
              
                        resolveLocalFileSystemURL(item.picture, function(fileEntry) {
                
                          // Get a File object representing the file,
                          // then use FileReader to read its contents.
                          fileEntry.file(function(file) {
                             var reader = new FileReader();

                             reader.onloadend = function(e) {
                                 item.picture = this.result;
                                 deferred.resolve(item);
                             };

                             reader.readAsDataURL(file);

                          }, fail);
                 
                 
                         }, fail);

                      };
  
                      window.requestFileSystem(window.PERSISTENT, 10*1024*1024, onInitFs, fail);

                  } else {
                      deferred.resolve(item);
                  }
                  
              }, 1);

              return deferred.promise;
              
          },

          create: function(options) {
              return ItemModel.create(options);
          },
          save: function() {
              return ItemModel.save();
          },
          put: function() {
              return ItemModel.put();
          },
          destroy: function(id) {
              return ItemModel.destroy(id);
          },
          count: function() {
              return ItemModel.count();
          },
          filter: function(options) {
              return ItemModel.filter(options);
          },
  
          upload: function() {
              console.log("Not implemented yet");
          }

      }

    });

}(window.m));
