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
        UIView,
        UINavItem,
        barEl,
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
        this.$el.addClass("m-"+options.type+"-navbar");
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
        }
        ,
        createBar: function(barName,uiapp,barClass) {

            // FIXME CHECK (parentElement?)
            var barEl = uiapp.el.parentElement.getElementsByTagName(barName)[0];

            barContainerEl[barName] = document.createElement("div");
            barContainerEl[barName].setAttribute("class","m-"+barName+"-container");

            if (barEl) {
                barEl.parentElement.replaceChild(barContainerEl[barName], barEl);
                barContainerEl[barName].appendChild(barEl);
                barEl.barClass = barClass;
            }
            else {
                barEl = document.createElement("div"); /*Dummy object for footer initialization*/
                m.app.ui.el.parentElement.appendChild(barContainerEl[barName]);                
                $(barContainerEl[barName]).addClass("m-hidden");
            }

            uiapp[barName] = new barClass({
                el: barEl,
                type: "global"
            });
            uiapp[barName].hide();


            UIView.on("init", function(self) {
                
                var barEl = self.panel.el.getElementsByTagName(barName)[0];

                if (barEl) {
                 
                    self[barName] = new barClass({
                        el: barEl,
                        type: "view"
                    });
                    
                    self.panel.el.removeChild(barEl);
                    barContainerEl[barName].appendChild(barEl);
                    
                    self[barName].hideContainer();

                    self.view.on("beforeLoad", function(self) {
                        console.log("beforeLoad showContainer",barName);
                       self.ui[barName].showContainer(barName);
                    });

                    self.view.on("unload", function(self) {
                        console.log("unload hideContainer",barName);
                       self.ui[barName].hideContainer(barName);
                    });

                } else {
                    self.view.on("load", function(self) {
                        //console.log("load show",barName);
                        m.app.ui[barName].show()
                    });

                    self.view.on("unload", function(self) {
                        //console.log("unload hide",barName);
                        m.app.ui[barName].hide()
                    });
                }
            });            
        }
    });

    //Public methods

    $.extend(UINavBar.prototype, {
        hideContainer: function(barName) {
            this.hide();
            // console.log("hideContainer",this.el.parentElement);
            if ($(".m-"+barName+"-container .m-global-navbar").length == 0) {
                $(".m-"+barName+"-container").addClass("m-hidden");    
            }
            

        },
        showContainer: function(barName) {
            this.show();
            // console.log("showContainer",this.el.parentElement);
            if ($(".m-"+barName+"-container .m-global-navbar").length == 0) {
                $(".m-"+barName+"-container").removeClass("m-hidden");
            }
        }

    });  

}(window.$, window.Mootor));
