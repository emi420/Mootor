/**
* UIFormSelect is a select input of a form
*
* @class UIFormSelect
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormSelect,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormSelect = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormSelect.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormSelect, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-select");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $value,
                    updateValue;

                updateValue = function() {
                    // Value is the text of the selected option or the placeholder text
                    var value = element.options[element.selectedIndex].text || element.placeholder;
                    if (value !== undefined) {
                        $value.html(value);
                    }
                }
                
                /*jshint multistr: true */
                coverHTML = '<div class="m-select m-select-cover">\
                    <span class="m-value"></span>\
                    <span class="m-icon-arrow-down-small m-select-icon"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML).insertBefore(element);
                $value = $cover.find(".m-value");

                updateValue();
                $element.on("change", function() {
                    if (this === element) {
                        updateValue();
                    }
                });

                $element.on("tap", function() {
                    $element.focus();
                });
                $element.on("focus", function() {
                    var me = document.createEvent("MouseEvents");
                    me.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                });

            });
        }
   
    });

    // Public methods and properties

    $.extend(UIFormSelect.prototype, {
    });        

    UIForm.registerControl(UIFormSelect);  

}(window.$, window.Mootor));
