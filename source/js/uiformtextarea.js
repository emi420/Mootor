/**
* UIFormTextArea is a textarea input of a form
*
* @class UIFormTextArea
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormTextArea,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormTextArea = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormTextArea.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormTextArea, {
        _init: function(uiview) {
            var inputs;
                
            inputs = uiview.$el.find(".m-textarea");

        }
   
    });

    // Public methods and properties

    $.extend(UIFormTextArea.prototype, {
    });        

    UIForm.registerControl(UIFormTextArea);  

}(window.$, window.Mootor));
