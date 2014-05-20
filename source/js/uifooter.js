/**
* The UIFooter class is a navigational element at the bottom of the page (footer)
*
* @class UIFooter
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIFooter,
    
        UINavBar,
        UIView,
        View,
        UIApp,
        UINavItem,
        App,
        UI,
        footerContainerEl,
        $footerContainerEl,
        _appFooter = false;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    UI = Mootor.UI,
    
    // Event handlers

    UIApp.on("init", function(self) {

        // FIXME CHECK (parentElement?)
        var footerEl = self.el.parentElement.getElementsByTagName("footer")[0];
        
        footerContainerEl = document.createElement("div");
        footerContainerEl.setAttribute("class","m-footer-container");
        footerEl.parentElement.replaceChild(footerContainerEl, footerEl);
        footerContainerEl.appendChild(footerEl);
        $footerContainerEl = $(footerContainerEl);

        if (footerEl) {
            self.footer = new UIFooter({
                el: footerEl
            });
        }
        
    });

    UIView.on("init", function(self) {
        
        var footerEl = self.panel.el.getElementsByTagName("footer")[0];

        if (footerEl) {

            self.footer = new UIFooter({
                el: footerEl
            });
            
            self.panel.el.removeChild(footerEl);
            footerContainerEl.appendChild(footerEl);
            
            self.footer.hide();

            self.view.on("load", function(self) {
               self.ui.footer.show();
            });

            self.view.on("unload", function(self) {
               self.ui.footer.hide();
            });

        } else {
            self.view.on("load", function(self) {
               m.app.ui.footer.show()
            });

            self.view.on("unload", function(self) {
                m.app.ui.footer.hide()
            });
        }     
    });
    
    // Private constructors

    UIFooter = Mootor.UIFooter = function(options) {
        this.nav = new UINavBar({
            container: options.el
        });
        this.el = this.nav.el;
        this.$el = $(this.el);
    };

    
    // Private static methods and properties

    $.extend(UIFooter, {
        
    });

    // Prototypal inheritance

    $.extend(UIFooter.prototype, UINavBar.prototype);
    $.extend(UIFooter.prototype, UI.prototype);

}(window.$, window.Mootor));
