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
        View;

    // Dependences

    Event = Mootor.Event;
    UI = Mootor.UI;
    View = Mootor.View;

    // Event handlers
    
    View.on("init", function(self) {
        
        var applyEnhancements = function (index,element) {
            new UIView._enhancements[index].className(element);    
        };
        
        self.ui = new UIView(self);

        self.ui.el = document.createElement("div");
        self.ui.$el = $(self.ui.el);

        if (View._getHtmlPath(self) !== undefined) {
            self.ui.el.innerHTML = View._getHtmlPath(self);                
        } else {
            self.on("getHtml", function(self) {
                self.ui.el.innerHTML = View._getHtmlPath(self);
            });
        }

        self.on("getHtml", function() {
            UIView.dispatch("init", self.ui);
        });

        self.on("ready", function() {
            for (var index in UIView._enhancements) {
                $(UIView._enhancements[index].selector).each(
                    applyEnhancementsÒ(index, this)
                );    
            }
        });

        self.on("load", function() {
            // console.log("uiview load")
            var footerHeight = $(".m-footer-container").height();
            var headerHeight = $(".m-header-container").height();
            self.ui.el.style.height = (m.app.ui.el.offsetHeight - footerHeight - headerHeight) + "px";
        });

    });

        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var self = this;
        self.view = view;
    };


    // Private static methods and properties

    Event.extend(UIView, "UIView");

    // Private static methods and properties

    $.extend(UIView, {
        // code here
    });

    // Public methods

    UIView.prototype = {
        // code here
    };

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
