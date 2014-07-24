/**
* UIFormDate is a date input of a form
*
* @class UIFormDate
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormDate,
        UIForm,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormDate = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormDate.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormDate, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-date");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $value,
                    updateValue;
                
                updateValue = function() {
                    // Value is the text of the selected option or the placeholder text
                    var value = element.value;
                    $value.html(value);
                }

                /*jshint multistr: true */
                coverHTML = '<div class="m-select m-select-cover">\
                    <span class="m-value">Select ...</span>\
                    <span class="m-icon-arrow-down-small m-select-icon"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML).insertBefore(element);
                $value = $cover.find(".m-value");
                inputs.addClass("m-date-hidden");      
                inputs.removeClass("m-date");                   

                $element.on("change", updateValue);

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

    $.extend(UIFormDate.prototype, {
    });        

    if (m.context.os.ios === true) {
        UIForm.registerControl(UIFormDate);  
    }


}(window.$, window.Mootor));
