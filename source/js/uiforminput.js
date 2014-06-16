/**
* UIFormInput is an input item of a form
*
* @class UIFormInput
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormInput,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors
    
    UIFormInput = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormInput.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormInput, {
   
    });

    // Public methods and properties

    $.extend(UIFormInput.prototype, {
        
        /**
        * Disable/enable input field
        *
        * @method disabled
        * @param {boolean} state State of the input, true if disabled false if enabled 
        * @return {boolean} Boolean state
        */
        disabled: function(state) {
            
        }

    });        
}(window.$, window.Mootor));
