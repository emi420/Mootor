/**
* UIFormText is a text input of a form
*
* @class UIFormText
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormText,
    
        UI,
        UIView,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIView = Mootor.UIView;
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

        _init: function(self) {
            var textInputs,
                i;
                
            textInputs = self.$el.find(".m-text");

            for (i = textInputs.length; i--;) {
                UIFormText.addEventListeners(textInputs[i]); 
            }
        },
        
        addEventListeners: function(textInput) {
            $(textInput).on("tap", function() { textInput.focus(); } );
        }
    });

    // Public methods and properties

    $.extend(UIFormText.prototype, {
    });      
    
    UIForm.registerControl(".m-text", UIFormText);  

}(window.$, window.Mootor));
