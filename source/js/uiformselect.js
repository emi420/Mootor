/**
* UIFormSelect is a select input of a form
*
* @class UIFormSelect
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
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
            
            var inputs,
                i;
                
            inputs = uiview.$el.find(".m-select");
            inputs.each(function(index,element) {
                var $element = $(element);

                var coverHTML = '<div class="m-select m-select-cover">\
                    <span class="m-value"></span>\
                    <span class="m-icon-arrow-down-small"></span>\
                </div>';

                var $cover = element.$cover = $(coverHTML).insertBefore(element);
                var $value = $cover.find(".m-value");

                updateValue();
                $element.on("change", updateValue);

                $element.on("focus", function(e) {
                    var me = document.createEvent("MouseEvents");
                    me.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    var worked = e.target.dispatchEvent(me);                
                })

                function updateValue() {
                    // Value is the text of the selected option or the placeholder text
                    var value = element.options[element.selectedIndex].text || element.placeholder;
                    $value.html(value);
                }
            });
        }
   
    });

    // Public methods and properties

    $.extend(UIFormSelect.prototype, {
    });        

    UIForm.registerControl(UIFormSelect);  

}(window.$, window.Mootor));
