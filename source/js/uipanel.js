/**
* A Panel to show views
*
* @class UIPanel
* @extends UI
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI,
        UIPanel,
        Event;
        
    // Dependences 
    
    UI = Mootor.UI;    
    Event = Mootor.Event;
    
    Event.on("UIView:init", function(self) {
        $.extend(self, {
            panel: new UIPanel(self)
        })
    });

    // Private constructors

    UIPanel = Mootor.UIPanel = function(uiview) {
        UIPanel._init(uiview, this);
    };

    // Prototypal inheritance

    $.extend(UIPanel.prototype, UI.prototype);

    // Private static methods and properties
        
    $.extend(UIPanel, {
        
        //Initialize panel

        /**
        * Initialize  a panel
        *
        * @method _init
        * @private
        */
        _init: function(uiview, self) {
            
            var $el,
                el;
            
            el = uiview.el = self.el = document.createElement("div");
            $el = uiview.$el = self.$el = $(el);

            self.uiview = uiview;    
            el.setAttribute("class", "m-panel");
            
            Mootor.UI.el.appendChild(el);            
            
            $el.addClass("m-panel");
            self.hide()
        }

    });

    //Public prototype    
    
    $.extend(UIPanel.prototype, {

        /**
        * Move the element to the specified coordinates. 
        * If coordinates are not specified, it returns coordinates object with the current position.
        *
        * @method position
        * @param {object} [coordinates] Object with coordinates. Example: {x: 0, y: 0}
        * @return {object} Object with coordinates. Example: {x: 0, y: 0}
        */
        position: function(coordinates) {
            
        },

        /**
        * Resize the element to the specified dimentions. 
        * If dimentions are not specified, it returns dimentions object with the current size.
        *
        * @method size
        * @param {object} [dimentions] Object with dimentions. Example: {w: 0, h: 0}
        * @return {object} Object with dimentions. Example: {w: 0, h: 0}
        */
        size: function() {
            
        },

        /**
        * Block/Unblock or return block status.
        *
        * @method blocked
        * @param {Boolean} [blocked] Whether the panel is blocked
        * @return {Boolean} Whether the panel is blocked
        */
        blocked: function(blocked) {
            
        },

        /**
        * Set or get transition type
        *
        * @method transition
        * @param {String} [transition] Transition type. MUST be one of: slide-left, slide-right, none
        * @return {String} Transition type
        */
        transition: function() {
            
        },

        addTransitionClass: function() {

        },

        removeTransitionClass: function() {

        },

        reposition: function(side) {

        },

        slideIn: function() {

        },

    });

}(window.$, window.Mootor));