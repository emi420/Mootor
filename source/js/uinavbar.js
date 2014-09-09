/**
* The UINavBar class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UINavBar
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UINavBar,
    
        UI,
        UIView,
        UINavItem,
        barContainerEl = [];
        
    // Dependences
    
    UI = Mootor.UI;
    UIView = Mootor.UIView;
    UINavItem = Mootor.UINavItem;

    // Private constructors

    UINavBar = Mootor.UINavBar = function(options) {
        this.el = options.container;
        this.$el = $(this.el);
        this.$el.addClass("m-navbar");
        this.$el.addClass("m-" + options.type + "-navbar");
        this.nav = UINavBar._initNavItems(this.el);
    };

    // Prototypal inheritance
    
    $.extend(UINavBar.prototype, UI.prototype);
    
    // Private static methods and properties

    $.extend(UINavBar, {
        _initNavItems: function(el) {
            if (!el) {
                console.error("UINavBar _initNavItems called without el");
                return;
            }
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
        },

        // self = uiapp
        initBar: function(barName, self, BarClass) {
            
            var barEl = self.el.parentElement.getElementsByTagName(barName)[0],
                _emptyContainer = false;
            
            barContainerEl[barName] = document.createElement("div");
            barContainerEl[barName].setAttribute("class","m-" + barName + "-container");

            if (barEl) {
                barEl.parentElement.replaceChild(barContainerEl[barName], barEl);
                barContainerEl[barName].appendChild(barEl);
            } else {
                barEl = document.createElement("div");
                self.el.parentElement.insertBefore(barContainerEl[barName], self.el);
                $(barContainerEl[barName]).hide();
                _emptyContainer = true;
            }
            
            barContainerEl[barName].addEventListener('touchmove', function(e) {
                e.preventDefault();
            });
            
            self[barName] = new BarClass({
                el: barEl,
                type: "global",
            });
            
            self[barName]._emptyContainer = _emptyContainer;
            self[barName].hide();
        },
                    
        // self = uiview
        createBar: function(barName, self, BarClass) {
            
            // FIXME CHECK
            if (self.panel) {
                
                var barEl = self.panel.el.getElementsByTagName(barName)[0];

                if (barEl) {
             
                    self[barName] = new BarClass({
                        el: barEl,
                        type: "view"
                    });
                
                    barEl.parentElement.removeChild(barEl);
                    barContainerEl[barName].appendChild(barEl);
                
                    self[barName].hideContainer();

                    self.view.on("load", function(self) {
                       self.ui[barName].showContainer(barName);
                       if (m.app.ui[barName]._emptyContainer === true) {
                           $(barContainerEl[barName]).show();
                       }
                       $(barContainerEl[barName]).show();
                    });

                    self.view.on("unload", function(self) {
                       self.ui[barName].hideContainer(barName);
                       if (m.app.ui[barName]._emptyContainer === true) {
                           $(barContainerEl[barName]).hide();
                       }
                    });

                } else {
                    self.view.on("load", function(self) {
                        m.app.ui[barName].show();
                    });

                    self.view.on("unload", function(self) {
                        m.app.ui[barName].hide();
                    });
                }
            
            }
            
        }
    });

    //Public methods

    $.extend(UINavBar.prototype, {
        hideContainer: function(barName) {
            
            this.hide();
        },
        showContainer: function(barName) {
            
            this.show();
        }

    });  

}(window.$, window.Mootor, window.m));
