/**
* UIButton is a button element, it uses UIForm to extend elements with aria-roles
*
* @class UIButton
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIButton,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;

    // Event handelers
    
    // Private constructors

    UIButton = function() {
        // Code here
    };

    // Prototypal inheritance
    $.extend(UIButton.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIButton, {

        _init: function(uiview) {
            var buttons;
                
            buttons = uiview.$el.find(".m-button");
            
            // code here

            buttons.attr("aria-role","button");

        }
        
    });

    // Public methods and properties

    $.extend(UIButton.prototype, {
    });      
    
    UIForm.registerControl(UIButton);  

}(window.$, window.Mootor));
