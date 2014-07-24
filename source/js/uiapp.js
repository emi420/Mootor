/**
* The UIApp class is the UI representation of an app
*
* @class UIApp
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UIApp,
    
        UI,
        App,
        View,
        Event;

    // Dependences

    UI = Mootor.UI;
    Event = Mootor.Event;
    App = Mootor.App;
    View = Mootor.View;

    // Private constructors

    UIApp = Mootor.UIApp = function() {
        var $container;

        App = Mootor.App;

        if (App._options.container) {
            $container = App._options.container;
        }
        else {
            $("html").addClass("m-html");
            $container = $("body");
        }
        $container.addClass("m-app");
        
        // Update context viewport
        m.context.viewport = {
            width: $container.width(),
            height: $container.height()
        };

        // Event handlers
    
        window.addEventListener("resize", function() {
            m.context.viewport = {
                width: $container.width(),
                height: $container.height()
            };
        });

        this.$el = $("<div>").addClass("m-views-container");

        // Disable transitions on Android
        m.app.settings("uipanel-transitions", m.context.os.android !== true);

        if (m.app.settings("uipanel-transitions") !== true) {
            this.$el.addClass("m-no-transitions");
        }
        
        this.el = this.$el[0];        
        this.$el.appendTo($container);
        this.$container = $container;

        UIApp.dispatch("init", this);
        
    };
    
    // Event handlers
    
    App.on("init", function(self) {
        $.extend(self, {
           ui: new UIApp()
        });
    });    

    // Extends from UI

    $.extend(UIApp.prototype, UI.prototype);


    // Private static methods and properties

    Event.extend(UIApp, "UIApp");

    // Public methods

    $.extend(UIApp.prototype, {
    
    });  
    
    App.on("ready", function() {
           var links = $("a"),
               setEvent,
               onClick;
            
        
       // Android/iOS fixes
       setEvent = function(el, href) {
           $(el).on("tap", function(e) {
               m.app.go(href);
           });
           el.addEventListener("touchend", function(e) {
               e.preventDefault();
           });
       };
      if ( 'ontouchstart' in window ) {
           onClick = function() {
               return false;
           };
       } else {
           onClick = function() {
               m.app.go(href);
               return false;
           };
       }
    
       $.extend(UIApp, {
           _improveLinksForTouch: function(links) {
               var i,
                   href;
               if ( 'ontouchstart' in window ) {
                   for (i = links.length; i--;) {
                       href = links[i].getAttribute("href");
                       links[i].onclick = onClick;
                       if (href !== null && m.app.route(links[i].getAttribute("href")) !== undefined) {
                           setEvent(links[i], href);
                       }
                   }
               } 
           }
       });
       
       UIApp._improveLinksForTouch(links);
       
   });


}(window.$, window.Mootor, window.m));
