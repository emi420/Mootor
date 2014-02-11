/**
* The UIHeader class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UIHeader
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UINavBar,
        UIHeader;

    // Private constructors
    UIHeader = function() {
    };

    //This Class extends UI
    UINavBar = Mootor.ns("UINavBar");
    UIHeader.prototype = UINavBar.prototype;


    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UIHeader: UIHeader});
    
    // Private static methods and properties

    $.extend(UIHeader, {
   
    });

    //Public methods

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
}(window.$));
