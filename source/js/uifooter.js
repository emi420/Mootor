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

        var footerEl;
        
        if (self.el !== undefined) {
            
            footerContainerEl = document.createElement("div");
            $footerContainerEl = $(footerContainerEl);
            $footerContainerEl.addClass("m-footer-container m-hidden");

            footerEl = self.el.parentElement.getElementsByTagName("footer")[0];

            if (footerEl !== undefined) {
                _appFooter = true;
                footerEl.parentElement.replaceChild(footerContainerEl, footerEl);
            } else {
                footerEl = document.createElement("footer");
                document.body.appendChild(footerContainerEl);
            }
            
            footerContainerEl.appendChild(footerEl);
            
            self.footer = new UIFooter({
                el: footerEl
            });
            

        }
        
    });

    UIView.on("init", function(self) {
        
        var footerEl = self.panel.el.getElementsByTagName("footer")[0];
        
        if (footerEl !== undefined) {
        
            self.footer = new UIFooter({
                el: footerEl
            });
            
            self.panel.el.removeChild(footerEl);
            footerContainerEl.appendChild(footerEl);
            
            self.footer.hide();

            self.view.on("load", function(self) {
               self.ui.footer.show();
               $footerContainerEl.removeClass("m-hidden");
            });

            self.view.on("unload", function(self) {
               self.ui.footer.hide();
               $footerContainerEl.addClass("m-hidden");
            });
            
        } else {
            
            if (_appFooter === true) {                
                self.view.on("load", function(self) {
                   m.app.ui.footer.show()
                   $footerContainerEl.addClass("m-hidden");
                });

                self.view.on("unload", function(self) {
                    m.app.ui.footer.hide()
                    $footerContainerEl.removeClass("m-hidden");
                });
            } else {
                self.view.on("load", function(self) {
                    $footerContainerEl.addClass("m-hidden");
                });
            }
            
        }
        
        self.view.on("load", function() {
            self.el.style.height = (m.app.ui.el.offsetHeight - footerContainerEl.offsetHeight*2) + "px"
        });
        
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
