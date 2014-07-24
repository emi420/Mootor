/**
* UIFormTime is a time input of a form
*
* @class UIFormTime
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormTime,
        UIForm,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormTime = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormTime.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormTime, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-time");
            inputs.addClass("m-time-hidden");                
            inputs.removeClass("m-time");                   
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

                $element.on("change", updateValue);

                $element.on("tap", function() {
                    $element.focus();
                });

            });
        }   
    });

    // Public methods and properties

    $.extend(UIFormTime.prototype, {
    });        

    if (m.context.os.ios === true) {
        UIForm.registerControl(UIFormTime);  
    }

}(window.$, window.Mootor));
