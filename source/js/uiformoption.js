/**
* UIFormOption is a option input of a form
*
* @class UIFormOption
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormOption,
        UIForm,
        UI;

    // Dependences

    UI = Mootor.UI,
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormOption = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormOption.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormOption, {
        _init: function(uiview) {
            
            var inputs,
                iconsRefresh,
                iconsArray = [];
                
            iconsRefresh = function() {
                var i;
                for (i = iconsArray.length;i--;) {
                    iconsArray[i].addClass("m-hidden");
                }
            }
                
            inputs = uiview.$el.find(".m-option");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $label,
                    $icon,
                    updateValue,
                    iconElementName = element.name.replace(".","_");

                updateValue = function(norefresh) {
                    if (!norefresh) {
                        $(".m-option-icon-name-" + iconElementName).addClass("m-hidden");
                    }
                    var checked = element.checked;
                    if (checked === true) {
                        $icon.removeClass("m-hidden");
                    } else {
                        $icon.addClass("m-hidden");
                    }
                } 
                               
                /*jshint multistr: true */
                coverHTML = '<div class="m-option m-option-cover">\
                    <span class="m-option-icon m-icon-ok-small m-hidden m-option-icon-name-$elementName"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML.replace("$elementName", iconElementName)).insertBefore(element);
                
                $label = $("label[for=" + element.id + "]");
                $icon = $cover.find(".m-option-icon");
                iconsArray.push($icon);
                $cover[0].appendChild($label[0]);
                
                $element.removeClass("m-option")
                $element.addClass("m-option-hidden");

                $element.on("change", updateValue);

                
                $cover.on("tap click", function() {
                    element.checked = true;
                    updateValue();
                });

                updateValue(true);
                

            });
        }   
    });

    // Public methods and properties

    $.extend(UIFormOption.prototype, {
    });        

   UIForm.registerControl(UIFormOption);  

}(window.$, window.Mootor));
