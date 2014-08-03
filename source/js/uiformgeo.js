/**
* UIFormGeo detect geolocation
*
* @class UIFormGeo
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormGeo,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormGeo = Mootor.UIFormGeo = function(element) {
        UIFormGeo.__init(this, element);
    };

    // Prototypal inheritance
    if (UI) {
        $.extend(UIFormGeo.prototype, UI.prototype);
    }

    // Private static methods and properties

    $.extend(UIFormGeo, {

        _init: function(uiview) {
            var elements;
            elements = uiview.$el.find(".m-geo");
            elements.each(function(index,element) {
                new UIFormGeo([element]);
            });
        },
        
        __init: function(self, element) {
            self._$coverHTML = element[0];
            self._$icon = self._$coverHTML.parentElement.getElementsByClassName("m-geo-icon")[0];
            self._$originalHtml = self._$coverHTML.innerHTML;
            UIFormGeo._addEventListeners(self);
            $(self._$coverHTML).addClass("m-geo-input"); 
            
        },
                
        _addEventListeners: function(self) {
            var self = self;
            self._$coverHTML.parentElement.addEventListener("click", function() {
               UIFormGeo._getCurrentPosition(self); 
               window.setTimeout(function() {
                   self._$coverHTML.setAttribute("disabled", "disabled");
               }, 200);
            });
        },
        
        __onSuccess: function(self, position) {
            var coords,
                strCoords;

            coords = position.coords;
            strCoords = (Math.ceil(coords.latitude * 10000) / 10000) + "," + (Math.ceil(coords.longitude * 10000) / 10000);
            $(self._$coverHTML).addClass("m-geo-located");
            self._$coverHTML.value = strCoords;
            return strCoords;
        },

        _onSuccess: function(self, position) {
            UIFormGeo.__onSuccess(self, position);
        },

        _onError: function(self) {
            $(self._$coverHTML).removeClass("m-geo-located");
            self._$coverHTML.innerHTML = self._$originalHtml;
            window.setTimeout(function() {
                self._$coverHTML.removeAttribute("disabled");
            }, 200);
        },

        _getCurrentPosition: function(self) {

            $(self._$icon).removeClass("ion-location");
            $(self._$icon).addClass("ion-loading-c");

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $(self._$icon).addClass("ion-location");
                    $(self._$icon).removeClass("ion-loading-c");
                    UIFormGeo._onSuccess(self, position);
                },
                function(e) {
                    $(self._$icon).addClass("ion-location");
                    $(self._$icon).removeClass("ion-loading-c");
                    UIFormGeo._onError(self);
                },
                { timeout: 10000, enableHighAccuracy: true }
            );
        }
   
    });

    // Public methods and properties

    $.extend(UIFormGeo.prototype, {
        // code here
    });        

    if (UIForm) {
        UIForm.registerControl(UIFormGeo);  
    }


}(window.$, window.Mootor));
