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

    UIFormGeo = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormGeo.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormGeo, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-geo");
            inputs.each(function(index,element) {
                var $element,
                    $coverHTML,
                    $cover,
                    $value,
                    $button,
                    onSuccess,
                    onError,
                    originalHtml;
            
    			$element = $(element);
            
                $coverHTML = $('<button class="' + element.className + '"><span class="m-icon m-icon-map-pin-small"></span> ' + element.value + '</button>');
                $button = $coverHTML.find("button");
                $element.addClass("m-hidden");
                
                $coverHTML.insertBefore(element);
                originalHtml = $coverHTML[0].innerHTML;
                
                onSuccess = function(position) {
                    var coords,
                        strCoords;
                    coords = position.coords;
                    strCoords = (Math.ceil(coords.latitude * 100) / 100) + "," + (Math.ceil(coords.longitude * 100) / 100);
                    $element[0].value = strCoords;
                    $element.change();
                }

                onError = function() {
                    alert("Error");
                    $coverHTML[0].innerHTML = originalHtml;
                }
                $coverHTML[0].onclick = function(){return false};
                $coverHTML.on("tap click", function(e) {
                    this.innerHTML = '<span class="m-icon m-icon-loading-small"></span>';
                    navigator.geolocation.getCurrentPosition(
                        onSuccess, 
                        onError,
                        { timeout: 10000, enableHighAccuracy: true }
                    );
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                });
                
                $element.on("change", function() {
                    var strValue =  $element[0].value;
                    if (strValue) {
                        $coverHTML[0].innerHTML = '<span class="m-icon m-icon-map-pin-small"></span> ' + strValue;
                    } else {
                        $coverHTML[0].innerHTML = originalHtml;
                    }
                });

            });
        }
   
    });

    // Public methods and properties

    $.extend(UIFormGeo.prototype, {
    });        

    UIForm.registerControl(UIFormGeo);  


}(window.$, window.Mootor));
