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

    var UIPanel,
        
        UI,
        View;
        
    // Dependences 
    
    UI = Mootor.UI;  
    View = Mootor.View;
    Event = Mootor.Event;  

    // Event handlers
    
    Event.on("UIView:init", function(self) {
        var view = self.view;
        
        self.panel = new UIPanel();
        self.panel.hide();

        if (View._getHtmlPath(view) !== window.undefined) {
            self.panel.el.innerHTML = View._getHtmlPath(view);                
        }
        else {
            Event.on("View:getHtml:" + view.id, function(view) {
                self.panel.el.innerHTML = View._getHtmlPath(view);
            });
        }

        Event.on("View:load:" + view.id, function(view) {
            self.panel.position("right").show();
            m.app.ui.onTransitionEnd(function() {
                self.panel.position("left");
            });
        });
    
        // on m.app.go
        Event.on("View:unload:" + view.id, function(view) {
            self.panel.position("left");
            m.app.ui.onTransitionEnd(function() {
                //This if is needed because on application start the first view is "unloaded" before it's loaded
                if (Mootor.App._currentView !== view) {
                    self.panel.hide();    
                }
            
            });
        }); 
                
    });

  
    // Private constructors

    UIPanel = Mootor.UIPanel = function() {
        UIPanel._init(this);
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
        _init: function(self) {

            var $el,
                el;
            
            el = self.el = document.createElement("div");
            $el = self.$el = $(el);
            $el.addClass("m-panel overthrow");

            m.app.ui.$el.append(el);            
            
        }
    });

    // Public prototype    
    
    $.extend(UIPanel.prototype, {

        /**
        * Move the element to the specified position inside the UIApp / m-views-container. 
        * If coordinates are not specified, it returns coordinates object with the current position.
        *
        * @method position
        * @param {object} [coordinates] Object with coordinates. Example: {x: 0, y: 0}
        * @return {object} Object with coordinates. Example: {x: 0, y: 0}
        */
        position: function(side) {
            if (side) {
                var counterSide = (side == "left" ? "right" : "left");
                this.$el.addClass("m-position-"+side).removeClass("m-position-"+counterSide);
                return this;                
            }
            else {
                return this.$el.hasClass("m-position-left") ? "left" : "right"; 
            }
            
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
            
        }

    });
    
    
}(window.$, window.Mootor));