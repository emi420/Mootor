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

        _init: function(self, selector) {
            var inputs,
                i;
                
            inputs = self.$el.find(selector);
            
            // code here

        },
        
    });

    // Public methods and properties

    $.extend(UIFormText.prototype, {
    });      
    
    UIForm.registerControl(".m-text", UIFormText);  

}(window.$, window.Mootor));
