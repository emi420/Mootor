/**
* The UIHeader class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UIHeader
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIHeader,
    
        UINavBar,
        UIView,
        View,
        UIApp;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    
    // Event handlers

    UIApp.on("init", function(self) {

        // FIXME CHECK (parentElement?)
        var headerEl = self.el.parentElement.getElementsByTagName("header")[0];

        if (headerEl) {
            self.header = new UIHeader({
                el: headerEl
            });
        }
    });

    UIView.on("init", function(self) {
        var headerEl = self.panel.el.getElementsByTagName("header")[0];

        if (headerEl) {
            self.panel.el.removeChild(headerEl);

            self.header = new UIHeader({
                el: headerEl
            });

            self.view.on("load", function(self) {
                // FIXME CHECK (parentElement?)
                var headerEl = m.app.ui.el.parentElement.getElementsByTagName("header")[0];
                m.app.ui.el.parentElement.replaceChild(
                    self.ui.header.el,
                    headerEl
                )
            });
        } else {

            self.view.on("load", function(self) {
                // FIXME CHECK (parentElement?)
                var headerEl = m.app.ui.el.parentElement.getElementsByTagName("header")[0];
                m.app.ui.el.parentElement.replaceChild(
                    m.app.ui.header.el,
                    headerEl
                )
            });


        }
    });

    // Private constructors

    UIHeader = Mootor.UIHeader = function(options) {
        this.el = options.el;
        this.$el = $(this.el);
    };

    // Prototypal inheritance

    $.extend(UIHeader.prototype, UINavBar.prototype);

    
    // Private static methods and properties

    $.extend(UIHeader, {
        // code here
    });

    // Public methods

    $.extend(UIHeader.prototype, {
        
        /**
        * Title
        * The text to display in the header
        * If called with no arguments returns the current title
        *
        * @method title
        * @param {string} [title] The text for the title
        * @return {String} 
        * @chainable
        */
        title: function(title) {
            var titleEl = this.el.getElementsByTagName("h1")[0];
            if (title !== undefined) {
                titleEl.innerHTML = title;
            } else {
                return titleEl.innerHTML;
            }
        }
    });  
          
}(window.$, window.Mootor));
