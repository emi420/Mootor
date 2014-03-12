/**
* UIFormGeo is a date pseudo-input of a form
*
* @class UIFormGeo
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormGeo,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormGeo = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormGeo.prototype, UI.prototype);
    $.extend(UIFormGeo.prototype, UIFormPseudoInput.prototype);

    // Private static methods and properties

    $.extend(UIFormGeo, {
   
    });

    // Public methods and properties

    $.extend(UIFormGeo.prototype, {
        
        /**
        * Get current position
        *
        * @method get
        * @chainable
        */
        get: function() {
            // code here
        }   
        
    });        

}(window.$, window.Mootor));
