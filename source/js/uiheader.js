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
        UIApp,
        UINavItem,
        App;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    
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

            self.header = new UIHeader({
                el: headerEl
            });

            self.panel.el.removeChild(headerEl);

            self.view.on("load", function(self) {
                var headerEl = m.app.ui.el.parentElement.getElementsByTagName("header")[0];
                m.app.ui.el.parentElement.replaceChild(
                    self.ui.header.el,
                    headerEl
                )
            });
        } else {

            self.view.on("load", function(self) {
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
        this.nav = new UINavBar({
            container: options.el
        });
        this.el = this.nav.el;
        this.$el = $(this.el);
        UIHeader._initBackButton(this);
    };

    
    // Private static methods and properties

    $.extend(UIHeader, {
        
        _initBackButton: function(self) {
            var backEl = document.createElement("a"),
                backNavEl = document.createElement("nav");
                
            backNavEl.appendChild(backEl);
            backNavEl.setAttribute("class", "m-nav-header-back-container");

            self.el.appendChild(backNavEl);
            
            self.back = new UINavItem({
                el: backEl
            });
            self.back.$el.addClass("m-header-back")
            self.back.hide();
            self.back.$el.on("tap click", function() {
                m.app.back();
            });
            App.on("go", function(app) {
                if (app.history.length > 1) {
                    self.back.show();
                } else {
                    self.back.hide();
                }
            });            
        }
        
    });

    // Public methods

    $.extend(UIHeader.prototype, {
        
        /**
        * Back
        * The back button
        *
        * @object back
        * @return {UINavItem} 
        */
        back: {},
        
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
          
    // Prototypal inheritance

    $.extend(UIHeader.prototype, UINavBar.prototype);

}(window.$, window.Mootor));
