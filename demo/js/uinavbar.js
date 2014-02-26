/**
* The UINavBar class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UINavBar
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI,
        UINavBar;
        
    // Dependences
    
    UI = Mootor.UI;

    // Private constructors

    UINavBar = Mootor.UINavBar = function() {
        // code here
    };

    // Prototypal inheritance
    
    $.extend(UINavBar.prototype, UI.prototype);
    
    // Private static methods and properties

    $.extend(UINavBar, {
        // code here
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

}(window.$, window.Mootor));
