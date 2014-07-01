/**
* A Panel to show views
*
* @class UIPanel
* @extends UI
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UIPanel,
        
        UI,
        View,
        UIView,
        UIApp,
        Event;
        
    // Dependences 

    Event = Mootor.Event;
    UI = Mootor.UI;  
    View = Mootor.View;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    
    // Event handlers

    UIView.on("init", function(self) {
        var view = self.view;
        
        self.panel = new UIPanel(view);
        self.panel.el = self.el;
        self.panel.$el = $(self.el);
        self.panel.hide();
        
        UIPanel.on("transitionEnd", function() {
            if (Mootor.App._currentView !== view) {
                view.ui.panel.hide();    
            } 
        });
        
        view.on("load", function() {

            self.panel.position("right").show();

            UIPanel._startTransition();
            
            if (m.app.settings("uipanel-transitions") === true) {
                window.setTimeout(function() {
                    UIPanel.dispatch("transitionEnd", self.panel);
                }, UIPanel._transitionDuration);
            }

            UIPanel.on("transitionEnd", function() {
                self.panel.position("left");
            });
            

            if (m.app.settings("uipanel-transitions") !== true) {
                UIPanel.dispatch("transitionEnd", self.panel);
            }
            
        });
    
        view.on("unload", function() {
            self.panel.position("left");
        }); 
                
    });
    
    UIApp.on("init", function() {
        
        UIPanel._addTransitionClass();    
        UIPanel._setTransitionDuration();
        if (m.context.os.ipad === true || m.context.os.iphone === true) {
            m.app.ui.$el.addClass("m-ios");
        }
          
    });

  
    // Private constructors

    UIPanel = Mootor.UIPanel = function(view) {
        UIPanel._init(this, view);
    };

    // Prototypal inheritance

    $.extend(UIPanel.prototype, UI.prototype);
    Event.extend(UIPanel, "UIPanel");
    
    
    // Private static methods and properties
        
    $.extend(UIPanel, {

        DEFAULT_TRANSITION: "hslide",
        
        //Initialize panel

        /**
        * Initialize  a panel
        *
        * @method _init
        * @private
        */
        _init: function(self, view) {

            var $el,
                el;

            el = view.ui.el;
            $el = $(el);
            
            $el.addClass("m-panel overthrow");
            
            self.transition(UIPanel.DEFAULT_TRANSITION);

            m.app.ui.$el.append(el);            
            
        },
        
        _startTransition: function () {
            
            var uiapp = m.app.ui;
            
            if (m.app.settings("uipanel-transitions") === true) {
                uiapp.$el.addClass("m-transition-hslide");
                uiapp.$el.addClass("m-transition-hslide-left").removeClass("m-transition-hslide-right");
            }
            
            UIPanel.on("transitionEnd", function () {
                if (m.app.settings("uipanel-transitions") === true) {
                    uiapp.$el.removeClass("m-transition-hslide");
                    uiapp.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");
                }
            });
        },
        
        _addTransitionClass: function () {
            var uiapp = m.app.ui;

            if (UIPanel.DEFAULT_TRANSITION == "hslide") {
                uiapp.$el.addClass("m-transition-hslide m-double-width");
                uiapp.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");
            }
        },
        
        _transitionDuration: null,
        
        _setTransitionDuration: function() {

            var getStyleBySelector,
                transitionDurationCSS,
                transitionDurationMiliseconds,
                t;
            
                getStyleBySelector = function ( selector ) {
               var sheetList = document.styleSheets,
                   ruleList,
                   i, j, ss;

               /* look through stylesheets in reverse order that
                  they appear in the document */
               for (i=sheetList.length-1; i >= 0; i--)
               {
                    if (!sheetList[i].href) {
                        continue;
                    }
                    ss = sheetList[i].href.split("/");
                   
                   if (ss[ss.length-1] != "mootor.css") {
                        continue;
                   }
                   
                   ruleList = sheetList[i].cssRules;
                   
                   for (j=0; j<ruleList.length; j++)
                   {
                       if (ruleList[j].type == window.CSSRule.STYLE_RULE && 
                           ruleList[j].selectorText == selector)
                       {
                           return ruleList[j].style;
                       }   
                   }
               }
               return null;
            };


            t = getStyleBySelector(".m-app .m-transition-hslide");
            
            if (t !== null) {
                transitionDurationCSS = t.transitionDuration || t.webkitTransitionDuration || t.operaTransitionDuration || t.mozTransitionDuration;
                transitionDurationMiliseconds = parseFloat(transitionDurationCSS) * 1000;
            } else {
                transitionDurationMiliseconds = 0;
            }

            UIPanel._transitionDuration = transitionDurationMiliseconds;
        }        
        
    });

    // Public prototype    
    
    $.extend(UIPanel.prototype, {

        _transition: UIPanel.DEFAULT_TRANSITION,

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
                var $el = $(this.el);
                return $el.hasClass("m-position-left") ? "left" : "right"; 
            }
            
        },

        /**
        * Block/Unblock or return block status.
        *
        * @method blocked
        * @param {Boolean} [blocked] Whether the panel is blocked
        * @return {Boolean} Whether the panel is blocked
        */
        /*
        blocked: function(blocked) {
            
        },
        */

        /**
        * Set or get transition type
        *
        * @method transition
        * @param {String} [transition] Transition type. MUST be one of: slide-left, slide-right, none
        * @return {String} Transition type
        */
        transition: function(transition) {
            if (transition) {
                this._transition = transition;
            }
            else {
                return this._transition;
            }
        },
        
        /**
        * Set callback function for an event
        *
        * @method on
        * @param {String} event Event string name
        * @return {Function} Callback function
        * @example
        *     m.app.view("index").panel.on("transitionEnd", function(self) {
        *         console.log("transition end!")
        *     });
        */
        on: function(event, callback) {
            UIPanel.on(event, callback);    
            return this;            
        }

    });
    
}(window.$, window.Mootor, window.m));