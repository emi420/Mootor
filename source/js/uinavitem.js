/**
* The UINavItem is an item of a UINavBar, like an action button or an anchor link
*
* @class UINavItem
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UINavItem,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    Mootor.UINavItem = UINavItem = function(options) {

        var navEl,
            aEl;

        if (options.container !== undefined) {
            navEl = document.createElement("nav"),
            aEl = document.createElement("a");            
            if (options.className) {
                aEl.setAttribute("class", options.className)
            }
            navEl.appendChild(aEl);
            options.container.appendChild(navEl);
        }
        
        this.el = navEl;
        this.$el = $(navEl);

    };

    // Prototypal inheritance
    $.extend(UINavItem.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UINavItem, {
   
    });

    // Public methods and properties

    $.extend(UINavItem.prototype, {
        
        /**
        * Block/Unblock or return block status.
        *
        * @method blocked
        * @param {Boolean} [blocked] Whether the item is blocked
        * @return {Boolean} Whether the panel is blocked
        * @chainable
        */
        blocked: function(blocked) {
            // code here
        }

    });        
}(window.$, window.Mootor));
