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
                new UIFormGeo(element);
            });
        },
        
        __init: function(self, element) {
            self._$coverHTML = element;
            self._$input = element;
            self._$icon = self._$coverHTML.parentElement.getElementsByClassName("m-icon")[0];
            self._$originalHtml = self._$coverHTML.innerHTML;
            UIFormGeo._addEventListeners(self);
            $(self._$coverHTML).addClass("m-geo-input"); 
            
        },
                
        _addEventListeners: function(self) {
            self._$input.addEventListener("click", function() {
               UIFormGeo._getCurrentPosition(self); 
               self._$input.setAttribute("disabled", "disabled");
            });
            self._$input.addEventListener("blur", function() {
               window.setTimeout(function() {
                   self._$input.removeAttribute("disabled");
               }, 200);
            });
            
        },
        
        __onSuccess: function(self, position) {
            var coords,
                strCoords;

            coords = position.coords;
            strCoords = (Math.ceil(coords.latitude * 10000) / 10000) + "," + (Math.ceil(coords.longitude * 10000) / 10000);
            $(self._$coverHTML).addClass("m-geo-located");
            self._$input.value = strCoords;
            return strCoords;
        },

        _onSuccess: function(self, position) {
            UIFormGeo.__onSuccess(self, position);
        },

        _onError: function(self) {
            $(self._$coverHTML).removeClass("m-geo-located");
            self._$coverHTML.innerHTML = self._$originalHtml;
            self._$input.value = "";
        },

        _getCurrentPosition: function(self) {
            
            var $icon = $(self._$icon);
            
            $icon.addClass("m-icon-anim-blink");

            navigator.geolocation.getCurrentPosition(
                function(position) {

                    UIFormGeo._onSuccess(self, position);
                    $icon.removeClass("m-icon-anim-blink");
                    
                },
                function(e) {

                    UIFormGeo._onError(self);
                    $icon.removeClass("m-icon-anim-blink");
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
