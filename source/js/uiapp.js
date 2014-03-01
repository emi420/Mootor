/**
* The UIApp class is the UI representation of an app
*
* @class UIApp
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIApp,
    
        UI,
        App;

    // Dependences

    UI = Mootor.UI;
    Event = Mootor.Event;
    App = Mootor.App;

    // Private constructors

    UIApp = Mootor.UIApp = function() {
        var $container,
            app = m.app,
            self = this;

        App = Mootor.App;

        if (App._options.container) {
            $container = App._options.container;
        }
        else {
            $("html").addClass("m-html");
            $container = $("body");
        }
        $container.addClass("m-app");

        this.$el = $("<div>").addClass("m-views-container")
        this.el = this.$el[0];        
        this.$el.appendTo($container);

        this.addTransitionClass();      

        UIApp.setTransitionDuration();
        
        Event.dispatch("UIApp:init", this);
        
    };
    
    // Event handlers
    
    Event.on("App:init", function(self) {
        $.extend(self, {
           ui: new UIApp()
        });
    });    

    Event.on("View:load", function(self) {
        m.app.ui.startTransition();
    }); 

    // Extends from UI

    $.extend(UIApp.prototype, UI.prototype);


    // Private static methods and properties
        
    $.extend(UIApp, {
        transitionDuration: null,
        setTransitionDuration: function() {

            var getStyleBySelector = function ( selector ) {
               var sheetList = document.styleSheets;
               var ruleList;
               var i, j;

               /* look through stylesheets in reverse order that
                  they appear in the document */
               for (i=sheetList.length-1; i >= 0; i--)
               {
                   ruleList = sheetList[i].cssRules;
                   for (j=0; j<ruleList.length; j++)
                   {
                       if (ruleList[j].type == CSSRule.STYLE_RULE && 
                           ruleList[j].selectorText == selector)
                       {
                           return ruleList[j].style;
                       }   
                   }
               }
               return null;
            }


            var t = getStyleBySelector(".m-app .m-transition-hslide");

            var transitionDurationCSS = t.transitionDuration || t.webkitTransitionDuration || t.operaTransitionDuration || t.mozTransitionDuration;
            var transitionDurationMiliseconds = parseFloat(transitionDurationCSS) * 1000;
            UIApp.transitionDuration = transitionDurationMiliseconds;
        }
    });

    // Public methods

    $.extend(UIApp.prototype, {
        addTransitionClass: function () {
            this.$el.addClass("m-transition-hslide m-double-width");
            this.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");

        },
        startTransition: function () {
            var self = this;

            self.$el.addClass("m-transition-hslide");
            self.$el.addClass("m-transition-hslide-left").removeClass("m-transition-hslide-right");
            
            self.onTransitionEnd(function () {
                self.$el.removeClass("m-transition-hslide");
                self.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");
            })
        },

        onTransitionEnd: function(callback) {     
            setTimeout(callback,UIApp.transitionDuration);
        }
    });        

}(window.$, window.Mootor));
