/**
* The UIView class is the UI representation of a view
*
* @class UIView
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, document) {

    "use strict";

    var UIView,
    
        UI,
        Event,
        View,
        UIApp;

    // Dependences

    Event = Mootor.Event;
    UI = Mootor.UI;
    View = Mootor.View;
    UIApp = Mootor.UIApp;

    // Event handlers

    View.on("init", function(self) {
        self.ui = new UIView(self);
    });
    
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var self = this;
        this.view = view;
        this.el = document.createElement("div");
        this.$el = $(this.el);

        view.on("getHtml", function() {
            UIView._loadHTML(self, View._getHtmlPath(view))
        });

        // Apply enhacements (ie: controls like UIFormSelect, etc..)
        view.on("ready", function() {
            UIView._applyEnhancements(self);
            if (m.context.os.iphone === true || m.context.os.ipad === true) {
                UIView._preventiOSNativeBounce(self);
            }
        });
        
    };


    // Private static methods and properties

    Event.extend(UIView, "UIView");

    // Private static methods and properties

    $.extend(UIView, {
        
        _applyEnhancements: function(self) {
            var i,
                applyEnhancements;
                
            applyEnhancements = function (i, element) {
                new UIView._enhancements[i].className(element);    
            };
            for (i in UIView._enhancements) {
                $(UIView._enhancements[i].selector).each(
                    applyEnhancements(i, self)
                );    
            }
        },
        
        _preventiOSNativeBounce: function(self) {
            var el = self.el,
                blockScroll,
                unblockScroll,
                _stopEvent,
                view = self.view;
            
            _stopEvent = function(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            // Block/unblock scroll
            blockScroll = function() {
                window.setTimeout(function() {
                    if (el.scrollHeight <= el.offsetHeight) {
                        document.addEventListener("touchmove", _stopEvent);
                    }
                }, Mootor.UIPanel._transitionDuration);
            };
            unblockScroll = function() {
                if (el.scrollHeight >= el.offsetHeight) {
                    document.removeEventListener("touchmove", _stopEvent);
                }
            };
            view.on("load", function() {
                blockScroll();
            });
            view.on("unload", function() {
                unblockScroll();
            });
            window.addEventListener("resize", unblockScroll);

            // Only for webkit
            el.addEventListener("overflowchanged", unblockScroll);            
            
            // Prevent iOS bounce
            el.addEventListener('scroll', function(e) {
                var scrollTop = el.scrollTop,
                    offsetHeight = el.scrollHeight - el.offsetHeight;
                    
                if (scrollTop < 1) {
                    el.scrollTop = 1;
                } else if (scrollTop > (offsetHeight - 1)) {
                    el.scrollTop = offsetHeight - 1;
                }
            }, false);

            
        },
        _loadHTML: function(self, html) {
            self.el.innerHTML = html;
            UIView.dispatch("init", self);
        }
    });

    // Public methods

    UIView.prototype = {
    };

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
