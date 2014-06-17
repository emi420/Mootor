/**
* UIFormText is a text input of a form
*
* @class UIFormText
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormText,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;

    // Event handelers
    
    // Private constructors

    UIFormText = function() {
        // Code here
    };

    // Prototypal inheritance
    $.extend(UIFormText.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormText, {

        _init: function(uiview) {
            var inputs;
                
            inputs = uiview.$el.find(".m-text");

        }
        
    });

    // Public methods and properties

    $.extend(UIFormText.prototype, {
    });      
    
    UIForm.registerControl(UIFormText);  

}(window.$, window.Mootor));
