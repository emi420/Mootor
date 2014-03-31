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

            // code here

        }
   
    });

    // Public methods and properties

    $.extend(UIFormSelect.prototype, {
    });        

    UIForm.registerControl(UIFormSelect);  

}(window.$, window.Mootor));
