/**
* UIFormDraw is a draw pseudo-input of a form
*
* @class UIFormDraw
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormDraw,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormDraw = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormDraw.prototype, UI.prototype);
    $.extend(UIFormDraw.prototype, UIFormPseudoInput.prototype);

    // Private static methods and properties

    $.extend(UIFormDraw, {
   
    });

    // Public methods and properties

    $.extend(UIFormDraw.prototype, {

        /**
        * Export draw data
        *
        * @method export
        * @return {String} Exported data (ej: base 64 string)
        * @param {Array} options A list of options
        * @chainable
        */
        export: function(options) {
             // code here
        },

        /**
        * Clear draw
        *
        * @method clear
        * @chainable
        */
        clear: function() {
            // code here
        }
        
    });        

}(window.$, window.Mootor));
