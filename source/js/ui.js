/**
* The UI class is the class for all user interface elements.
* It is not directly used, but extended by many other classes.
*
* @class UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI,
        Event;
        
    // Dependencies
    
    Event = Mootor.Event;    

    // Private constructors

    UI = Mootor.UI = function() {
        var el;
        el = document.createElement("div");
        el.setAttribute("class", "m-panel-container");
        document.body.appendChild(el);
        this._container = el;
    };

    // Private static methods and properties

    $.extend(UI, {
        // code here
    });
    
    // Event handlers
    Event.on("App:init", function(self) {
        Mootor.UI = new UI();
    });

    // Public methods

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
        
}(window.$, window.Mootor));
