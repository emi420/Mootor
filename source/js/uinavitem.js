/**
* The UINavItem is an item of a UINavBar, like an action button or an anchor link
*
* @class UINavItem
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UI,
        UINavItem;

    // Private constructors
    UINavItem = function() {
    };

    //This Class extends UI
    UI = Mootor.ns("UI");
    UINavItem.prototype = UI.prototype;


    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UINavItem: UINavItem});
    
    // Private static methods and properties

    $.extend(UINavItem, {
   
    });

    //Public methods

    $.extend(UINavItem.prototype, {
        
        /**
        * Move the element to the specified coordinates. 
        * If coordinates are not specified, it returns coordinates object with the current position.
        *
        * @method position
        * @param {object} [coordinates] Object with coordinates. Example: {x: 0, y: 0}
        * @return {object} Object with coordinates. Example: {x: 0, y: 0}
        * @chainable
        */
        position: function(coordinates) {
            
        },

        /**
        * Block/Unblock or return block status.
        *
        * @method blocked
        * @param {Boolean} [blocked] Whether the item is blocked
        * @return {Boolean} Whether the panel is blocked
        * @chainable
        */
        blocked: function(blocked) {
            
        }
    });        
}(window.$));
