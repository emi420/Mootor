(function(Mootor) {

    "use strict";
    
    $.extend(Mootor, {ng: function(app, modules) {
    
          // Controller
          

          // Scope, route, parameters

          angular.module(app, modules)
                .factory('$stateParams', function($window) {
                    return {}
                });
                
          Mootor.$ngController = angular.bootstrap(document, [app]).get('$controller'); 

          Mootor.$ngMootorRoute = function(view, controller, stateParams) {
                var scopeElement = $("[ng-controller=" + controller + "]");
                var options = {};
                var $viewElement = view.ui.$el;

                options.$scope = angular.element(scopeElement).scope();
                view.$scope = options.$scope;

                view.on("load", function(self) {
                    
                    if (stateParams !== undefined) {
                        options.$stateParams = stateParams(self.params);
                    }
                    
                    view.$scope.$apply(function() {
                        Mootor.$ngController(controller, options);
                        // FIXME CHECK   
                        window.setTimeout(function() {
                            $viewElement.find("input.m-geo").change();
                            $viewElement.find("input.m-option-hidden").change();
                            $viewElement.find("select.m-select").change();
                        }, 350);
                    });
                        


                });
        
            }
            
        }
        
    });


}(window.Mootor));