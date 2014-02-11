/**
* A Panel to show views
*
* @class UIPanel
* @extends UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI,
        UIPanel;
        
    // Dependences 
    
    UI = Mootor.UI;    

    // Private constructors

    UIPanel = Mootor.UIPanel = function(options) {
        UIPanel.init(options, this);
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
        _init: function(options, self) {
            
            var $el = $("#" + options.id);
            self.$el = $el;

            if (options.transition !== undefined) {
                self.transition = options.transition;
            } else {
                self.transition = "slide-right";
            }
        
            $el.hide();
            $el.addClass("moo-panel");

            self.addTransitionClass();
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

            var self = this,
                $el = self.$el;
            
            switch (self.transition) {
                case "slide-left":
                case "slide-right":
                    $el.addClass("moo-transition-slide");
                    break;
                default:
                    $el.addClass("moo-transition-" + self.transition);
            }
            return self;
        },

        removeTransitionClass: function() {
            var self = this;
            self.$el.removeClass("moo-transition-slide moo-transition-none");
            return self;
        },

        /**
        * Shows a panel using the specified transition
        *
        * @method show
        * @return {Object} Returns the same object it's applied to, to allow chaining.
        */
        show: function(){
            var self = this,
                $el = self.$el;
                
            switch (self.transition) {
                case "slide-left":
                    self.reposition("left");
                    self.slideIn();
                    break;

                case "slide-right":
                    self.reposition("right");
                    self.slideIn();
                    break;

                default:
                    $el.show();
                    break;
            }
            return this;
        },

        reposition: function(side) {

            var self = this,
                $el = self.$el,
                newPosition,
                evalPosition;

            if (side == "left") {
                evalPosition = ($el.left < clientWidth);
                newPosition = clientWidth;
            }
            else if (side == "right") {
                evalPosition = ($el.left > -1);
                newPosition = -clientWidth;
            }

            //Reposition the panel outside the right edge
            if  (evalPosition) {

                //Temporarily remove the transition
                self.removeTransitionClass();
                self.addTransitionClass("none");

                //Move panel outside stage
                $el.css({
                    left: newPosition
                });
            }
            return this;
        },

        slideIn: function() {
            //A timeout is needed for the browser to process the possible repositioning
            var self = this,
                $el = self.$el;
                
            window.setTimeout(function() {

                //Add back the transition (it's useless in the case it was not removed)
                self.removeTransitionClass();
                self.addTransitionClass(self.transition);

                //Move panel to stage
                $el.show().css({
                    left: 0
                });

            }, 1);		
            return this;
        },

        /**
        * Hides a panel using the specified transition
        *
        * @method hide
        * @return {Object} Returns the same object it's applied to, to allow chaining.
        */
        hide: function(){
            var self = this,
                $el = self.$el;

            switch (self.transition) {
                case "slide":
                case "slide-left":
                    $el.css({
                        left: clientWidth
                    });
                    break;
                case "slide-right":
                    $el.css({
                        left: clientWidth
                    });
                    break;
                default:
                    $el.hide();
            }
        return this;
        }
    });

}(window.$, window.Mootor));