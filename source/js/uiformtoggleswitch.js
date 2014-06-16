/**
* UIFormToggleSwitch is a toggle switch pseudo-input of a form
*
* @class UIFormToggleSwitch
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormToggleSwitch,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormToggleSwitch = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormToggleSwitch.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormToggleSwitch, {
   
    });

    // Public methods and properties

    $.extend(UIFormToggleSwitch.prototype, {

        /**
        * Set/get input toggle switch value
        *
        * @method value
        * @param {Boolean} value Value of the input
        */
        value: function(value) {
            // code here
        }  
        
    });        

}(window.$, window.Mootor));
