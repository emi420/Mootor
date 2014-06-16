/**
* The UI class is the class for all user interface elements.
* It is not directly used, but extended by many other classes.
*
* @class UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI;
    
    // Private constructors

    UI = Mootor.UI = function() {
    };

    // Private static methods and properties

    $.extend(UI, {
        // code here
    });
    
    // Public methods

    $.extend(UI.prototype, {
        
        /**
        * DOM element
        *
        * @property el
        * @return {DOM Element}
        * @example
        *     appDOMElement = m.app.ui.el;
        *     appDOMElement.addEventListener("touchend", function() {
        *         console.log("Header was touched.");
        *     });
        */
        el: undefined,
        
        /**
        * Zepto/jQuery object for DOM element
        *
        * @property $el
        * @return {Zepto/jQuery object instance}
        * @example
        *     $appDOMElement = m.app.ui.$el;
        *     $appDOMElement.on("tap", function() {
        *         console.log("Header was tapped.");
        *     });
        */
        $el: undefined ,
        
        /**
        * Shows element (not necesarily, since the element's parent might be hidden or out of view)
        *
        * @method show
        * @return {UI}
        * @example
        *     m.app.ui.show();
        */
        show: function() {
            this.$el.removeClass("m-hidden");
        },

        /**
        * Hides element from view
        *
        * @method hide
        * @return {UI}
        * @example
        *     m.app.ui.hide();
        */
        hide: function() {
            this.$el.addClass("m-hidden");
        }
    });
        
}(window.$, window.Mootor));
