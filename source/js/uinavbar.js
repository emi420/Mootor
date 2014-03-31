/**
* The UINavBar class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UINavBar
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UINavBar,
    
        UI,
        UINavItem;
        
    // Dependences
    
    UI = Mootor.UI;
    UINavItem = Mootor.UINavItem;

    // Private constructors

    UINavBar = Mootor.UINavBar = function(options) {
        this.el = options.container;
        this.$el = $(this.el);
        this.$el.addClass("m-navbar");
        this.nav = UINavBar._initNavItems(this.el);
    };

    // Prototypal inheritance
    
    $.extend(UINavBar.prototype, UI.prototype);
    
    // Private static methods and properties

    $.extend(UINavBar, {
        _initNavItems: function(el) {
            var i,
                j,
                navGroupsElements = el.getElementsByTagName("nav"),
                navItemsElements,
                navGroups = [],
                navItem;
                
            for (i = navGroupsElements.length; i--; i > 1) {
                $(navGroupsElements[i]).addClass("m-nav");
                navItemsElements = navGroupsElements[i].getElementsByTagName("a");
                for (j = navItemsElements.length; j--;) {
                    navItem = new UINavItem({
                        el: navItemsElements[j]
                    });
                }
                navGroups.push();
            }
            
            return navGroups;
        }
    });

    //Public methods

    $.extend(UINavBar.prototype, {
    });  

}(window.$, window.Mootor));
