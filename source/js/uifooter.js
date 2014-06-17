/**
* The UIFooter class is a navigational element at the bottom of the page (footer)
*
* @class UIFooter
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
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
        UI;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    UI = Mootor.UI,
    
    
    // Private constructors

    UIFooter = Mootor.UIFooter = function(options) {
        this.nav = new UINavBar({
            container: options.el,
            type: options.type
        });
        this.type = options.type;
        this.el = this.nav.el;
        this.$el = $(this.el);
        if (this.$el.find("nav").length < 1) {
            this.el.appendChild(document.createElement("nav"));
        }
    };

    // Event handlers
    UIView.on("init", function(self) {
        UINavBar.createBar("footer",self, UIFooter);
    });

    UIApp.on("init", function(self) {
        UINavBar.initBar("footer",self, UIFooter);
    });
    // Private static methods and properties

    $.extend(UIFooter, {
        
    });

    // Prototypal inheritance

    $.extend(UIFooter.prototype, UINavBar.prototype);
    $.extend(UIFooter.prototype, UI.prototype);

}(window.$, window.Mootor));
