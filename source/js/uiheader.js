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
        App,
        UI,
        headerContainerEl;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    UI = Mootor.UI;
    
    // Event handlers

    UIApp.on("init", function(self) {

        // FIXME CHECK (parentElement?)
        var headerEl = self.el.parentElement.getElementsByTagName("header")[0];
        
        headerContainerEl = document.createElement("div");
        headerContainerEl.setAttribute("class","m-header-container");
        headerEl.parentElement.replaceChild(headerContainerEl, headerEl);
        headerContainerEl.appendChild(headerEl);

        if (headerEl) {
            self.header = new UIHeader({
                el: headerEl
            });
        }
        m.app.ui.header.hide()
        
    });

    UIView.on("init", function(self) {
        
        var headerEl = self.panel.el.getElementsByTagName("header")[0];

        if (headerEl) {

            self.header = new UIHeader({
                el: headerEl
            });
            
            self.panel.el.removeChild(headerEl);
            headerContainerEl.appendChild(headerEl);
            
            self.header.hide();

            self.view.on("load", function(self) {
               self.ui.header.show();
            });

            self.view.on("unload", function(self) {
               self.ui.header.hide();
            });

        } else {
            self.view.on("load", function(self) {
               m.app.ui.header.show()
            });

            self.view.on("unload", function(self) {
                m.app.ui.header.hide()
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
            self.back.$el.addClass("m-header-back");
            self.back.hide();
            self.back.$el.on("tap", function(e) {
                m.app.back();
            });
            self.back.el.onclick = function(e) {
                return false;
            };
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
        * @example
        *     m.app.view("index").ui.header.back.hide();
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
        * @example
        *     m.app.view("index").ui.header.title("My title");
        */
        title: function(title) {
            var titleEl = this.el.getElementsByTagName("h1")[0];
            if (title !== undefined) {
                titleEl.innerHTML = title;
            } else {
                return titleEl.innerHTML;
            }
            return this;
        }
        
    });  
          
    // Prototypal inheritance

    $.extend(UIHeader.prototype, UINavBar.prototype);
    $.extend(UIHeader.prototype, UI.prototype);

}(window.$, window.Mootor));
