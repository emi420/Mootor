(function(m) {
    

    // Index view controller

    var IndexCtrlInitialized = false,
        FormHeaderCtrlInitialized = false,
        FormCtrlInitialized = false,
        IndexHeaderCtrlInitialized = false;

    angular.module('main.controllers', ['main.services'])

    
        // Index header view controller

        .controller('IndexHeaderCtrl', function ($scope) {
           if (IndexHeaderCtrlInitialized !== true) {
               $scope.create = function() {
                   m.app.go("#form");
               }
               IndexHeaderCtrlInitialized = true;
           }
        })
        
         // Index view controller
   
        .controller('IndexCtrl', function ($scope, Item) {
            
          $scope.items = Item.all();

          if (IndexCtrlInitialized !== true) {
          
              $scope.delete = function(item) {
                  window.setTimeout(function() {
                      // FIXME CHECK
                      if (confirm("¿Are you sure?") === true) {
                          Item.destroy(item.id);
                          $scope.items = Item.all();
                          $scope.$digest();
                      }
                  }, 10);
              }

              IndexCtrlInitialized = true;

          }
      
        })
        
         // Form header view controller

        .controller('FormHeaderCtrl', function ($scope) {
            if (FormHeaderCtrlInitialized !== true) {

                // Dispatch click event 
                $scope.submitForm = function() {
                    window.setTimeout(function(){
                        $("#btnFormSubmit").click();
                    }, 10)
                }

                FormHeaderCtrlInitialized = true;            
            }
        })
            
        // Form view controller

        .controller('FormCtrl', function ($scope, $stateParams, Item) {
        
        
            var promise;
        
            if ($stateParams.itemId !== undefined) {
                promise = Item.get($stateParams.itemId);
                promise.then(function(item) {
                    $scope.item = item;
                });
            } else {
                $scope.item = Item.create({});
            }


            $scope.save = function(item) {

                // TODO
                // Move this code to ngUIForm.js
                var i, _calificationOptions = m.app.view().ui.$el.find(".m-form")[0].elements.calification;
                if (_calificationOptions.value) {
                    item.calification = _calificationOptions.value;
                } else {
                    for (i = _calificationOptions.length;i--;) {
                        if (_calificationOptions[i].checked) {
                            item.calification = _calificationOptions[i].value;
                        }
                    }
                }

                try {
                    if (item.id !== undefined) {
                        item.put();
                    } else {
                        item.save();
                        window.location.replace('#form/' + item.id);
                    }
                    m.app.go("");
        
                } catch(e) {
                    alert("Oops! something went wrong. Maybe you have not free space on your device browser.");
                }
            
            };        
        })
    


}(window.m));

