/**
* UIFormVirtualInput is a virtual-input item of a form
*
* @class UIFormVirtualInput
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormVirtualInput,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormVirtualInput = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormVirtualInput.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormVirtualInput, {
   
    });

    // Public methods and properties

    $.extend(UIFormVirtualInput.prototype, {

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
    
    Mootor.UIFormVirtualInput = UIFormVirtualInput;

}(window.$, window.Mootor));
