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
        Event,
        View;
        
    // Dependences 
    
    UI = Mootor.UI;    
    Event = Mootor.Event; 
    View = Mootor.View;   

     //TODO: This number must match the $transtionDuration variable in the SCSS
    var transitionDuration = 15000; 

    // Event handlers
    
    Event.on("UIApp:init", function(self) {
        var uiapp = self;

        self.$el.addClass("m-transition-hslide m-double-width");
        self.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");

        Event.on("View:load", function(self) {

            uiapp.$el.addClass("m-transition-hslide");

            uiapp.$el.addClass("m-transition-hslide-left").removeClass("m-transition-hslide-right");

            window.setTimeout(function() {
                uiapp.$el.removeClass("m-transition-hslide");

                uiapp.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");

                self.ui.$el.addClass("m-panel-position-left m-full-width").removeClass("m-panel-position-right m-half-width");
            }, transitionDuration);
        }); 

    });


    // Private constructors

    UIPanel = function(uiview) {
        UIPanel._init(uiview, this);
    };

    // Event handlers
    
    Event.on("UIView:init", function(self) {
        
        // Initialize panels on UIView init
        
        $.extend(self, {
            panel: new UIPanel(self)
        })

        self.panel.el.innerHTML = Mootor.View._getHtmlPath(self.view);

        $("head").append(View._get(self.view.id).script);
        
        Event.dispatch("View:getScript:" + self.view.id, self.view)
        Event.dispatch("View:init:" + self.view.id, self.view)

        // on m.app.go

        Event.on("View:unload:" + self.view.id, function(self) {
            self.ui.panel.$el.addClass("m-panel-position-left m-full-width").removeClass("m-panel-position-right m-half-width");
            setTimeout(function() {
                if (Mootor.App._currentView !== self) {
                    self.ui.panel.hide();
                }
                
                m.app.ui.$el.addClass("m-full-width").removeClass("m-double-width");
            },transitionDuration);
        }); 
        
        Event.on("View:load:" + self.view.id, function(self) {
            self.ui.panel.$el.addClass("m-panel-position-right").removeClass("m-panel-position-left");
            var visiblePanels = $(".m-panel:not(.m-hidden)").length;
            console.log("visiblePanels",visiblePanels);

            if ( visiblePanels === 0 ) {
                self.ui.panel.$el.addClass("m-half-width").removeClass("m-full-width");
            }
            self.ui.panel.show();
        }); 
    });
    

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
            
            el = self.el = uiview.el = document.createElement("div");
            $el = uiview.$el = self.$el = $(el);
            $el.addClass("m-panel");

            el.setAttribute("class", "m-panel");

            m.app.ui.$el.append(el);            
            
            self.hide();
            
        }

    });

    // Public prototype    
    
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