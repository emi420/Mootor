/**
* The UINavBar class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UINavBar
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UI,
        UINavBar;

    // Private constructors
    UINavBar = function() {
    };

    //This Class extends UI
    UI = Mootor.ns("UI");
    UINavBar.prototype = UI.prototype;


    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UINavBar: UINavBar});
    
    // Private static methods and properties

    $.extend(UINavBar, {
   
    });

    //Public methods

    $.extend(UINavBar.prototype, {
        
        /**
        * A nav object
        *
        * @property nav
        * @type Nav
        */
        nav: {
            
        },

        /**
        * Position
        * The nav bar is statically positioned to the top or bottom of the window
        *
        * @method position
        * @param {string} [position] The position for this nav bar, one of: "top", "bottom".
        * @return {UINavBar} 
        * @chainable
        */
        position: function(position) {
            
        }
    });        
}(window.$));
