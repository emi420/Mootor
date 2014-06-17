/**
* UIFormFieldset is a fieldset item of a form
*
* @class UIFormFieldset
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormFieldset,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormFieldset = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormFieldset.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormFieldset, {
   
    });

    // Public methods and properties

    $.extend(UIFormFieldset.prototype, {
        
        /**
        * Disable/enable input field
        *
        * @method disabled
        * @param {boolean} state State of the input, true if disabled false if enabled 
        * @return {boolean} Boolean state
        */
        disabled: function() {
            // code here
        }

    });        
}(window.$, window.Mootor));
