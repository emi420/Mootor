/**
* Code inspired by Mootor (https://github.com/emi420/Mootor)
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/


(function($, angular, Mootor) {
    
    /**
    * UIFormGeo geolocates 
    */
    
    // Overrides _onSuccess method for use with Angular model
    Mootor.UIFormGeo._onSuccess = function(self, position) {
       
        var element = self._$coverHTML,
            scope =  angular.element(element).scope(),
            oModel = element.getAttribute("ng-model").split("."),
            modelName = oModel[0],
            modelField = oModel[1] || undefined,
            strCoords = Mootor.UIFormGeo.__onSuccess(self, position);
    
        if (modelField) {
            scope[modelName][modelField] = strCoords;
        } else {
            scope[modelName] = strCoords;
        }
        
    }
    
    /**
    * UIFormDraw draws 
    */
    
    // Overrides _onSuccess method for use with Angular model
    Mootor.UIFormDraw._save = function(self, position) {
       
        var element = self._$coverHTML,
            scope =  angular.element(self._$coverHTML).scope(),
            oModel = self._$originalElement.getAttribute("ng-model").split("."),
            modelName = oModel[0],
            modelField = oModel[1] || undefined;

        self._$img.onload = function() {
            
            console.log("Updated model " + modelName + "." + modelField);

            if (modelField) {
                scope[modelName][modelField] = self._$img.src;
            } else {
                scope[modelName] = self._$img.src;
            }

            self.close();
        }
        self._$img.src = self._$canvas.toDataURL();
    
    }

    /**
    * UIFormCameraSingle take or choose a single picture
    */
    

    // Overrides _save method for use with Angular model 

    Mootor.UIFormCameraSingle._onImgLoad = function(self) {
        
        self._scope = angular.element(self._$coverHTML).scope();
        
        var element = self._$coverHTML,
            scope =  angular.element(element).scope(),
            oModel = self._$originalElement.getAttribute("ng-model").split("."),
            modelName = oModel[0],
            modelField = oModel[1] || undefined;
        
            if (modelField) {
                scope[modelName][modelField] = self._$img.src;
            } else {
                scope[modelName] = self._$img.src;
            }

    }
    Mootor.UIFormCameraSingle._onImgLoadError = function(self) {
        var element = self._$coverHTML,
            scope =  angular.element(element).scope(),

            oModel = self._$originalElement.getAttribute("ng-model").split("."),
            modelName = oModel[0],
            modelField = oModel[1] || undefined;
            
        if (scope && scope[modelName]) {
            if (modelField) {
                scope[modelName][modelField] = "";
            } else {
                scope[modelName] = "";
            }
        }
    }

    // Angular Directives
    
    angular.module('ngMootorUIForm', [])

        .directive('ngCameraSingle', [ '$parse', '$timeout', function($parse, $timeout) {
            return {
              replace: true,
              templateUrl: 'm-html/m-uiformcamerasingle.html'
          
            };
         }])

         .directive('ngDraw', [ '$parse', '$timeout', function($parse, $timeout) {
             return {
               replace: true,
               templateUrl: 'm-html/m-uiformdraw.html'
             };
          }])

          .directive('ngGeo', [ '$parse', '$timeout', function($parse, $timeout) {
              return {
                replace: false
              };
           }])
           

           
 }(window.angular.element, window.angular, window.Mootor));

