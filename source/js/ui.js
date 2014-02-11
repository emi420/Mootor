/**
* The UI class is the class for all user interface elements.
* It is not directly used, but extended by many other classes.
*
* @class UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UI;

    // Private constructors
    UI = function() {
    };

    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UI: UI});

    
    // Private static methods and properties

    $.extend(UI, {
   
    });

    //Public methods

    $.extend(UI.prototype, {
        
        /**
        * Shows element (not necesarily, since the element's parent might be hidden or out of view)
        *
        * @method show
        * @return {UI}
        */
        show: function() {
            
        },

        /**
        * Hides element from view
        *
        * @method hide
        * @return {UI}
        */
        hide: function() {
            
        }
    });
        
}(window.$));
