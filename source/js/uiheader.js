/**
* The UIHeader class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UIHeader
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UINavBar,
        UIHeader;

    // Dependences

    UINavBar = Mootor.UINavBar;

    // Private constructors

    UIHeader = Mootor.UIHeader = function() {
        // code here
    };

    // Prototypal inheritance

    $.extend(UIHeader.prototype, UINavBar.prototype);

    
    // Private static methods and properties

    $.extend(UIHeader, {
        // code here
    });

    // Public methods

    $.extend(UIHeader.prototype, {
        
        /**
        * Title
        * The text to display in the header
        * If called with no arguments returns the current title
        *
        * @method title
        * @param {string} [title] The text for the title
        * @return {String} 
        * @chainable
        */
        title: function(title) {
            
        }
    });  
          
}(window.$, window.Mootor));
