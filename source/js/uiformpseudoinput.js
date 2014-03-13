/**
* UIFormPseudoInput is a pseudo-input item of a form
*
* @class UIFormPseudoInput
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormPseudoInput,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormPseudoInput = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormPseudoInput.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormPseudoInput, {
   
    });

    // Public methods and properties

    $.extend(UIFormPseudoInput.prototype, {

        /**
        * Value of the input
        *
        * @property value
        */         
        value: undefined,

        /**
        * Sets an event handler for the input
        *
        * @method on
        * @param {string} event Defines in which event the handler will be called
        * @param {function} callback The function to be called when the event is fired.
        * @return this
        */ 
        on: function(event, callback) {
            // code here
        }

    });        



}(window.$, window.Mootor));
