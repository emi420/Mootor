(function($) {
    
    "use strict";       

    $(document).ready(function() {

       var nav = {},
           app = {},
           i;
           
       console.log("Ready! making app...");
           
       /*
        * Navigation init
        */        
       nav = $("#main").nav();
             
       nav.header.navLinks = $(nav.header.el).find(".moo-nav");       
         
       /*
        * Create App
        */
                       
       app = $.app({
           id: "main",
           path: "views",
           views: [
                "index",
                "gestures",
                "ui",
                "ui_map",
                "core",
                "core_selector",
                "core_ready",
                "nav",
                "fx",
                "app"
           ],
           nav: nav
       });
       
       /*
        * Settings
        */
        
       app.settings = {
           debug: true
       };

       $.extend({
           /*
            * Pre-load views
            */   
           preload: function(id, options) {
                var view = app.get(id),
                    navInstance = nav.get(id);
                
                app.load(
                     view,
                     navInstance
                );               
           },
           /*
            * Go to view (load nav / app view)
            */   
           go: function(id, options) {
                if (options !== undefined) {
                    if (options.direction !== undefined) {
                        nav._config.direction = options.direction;                                        
                    } else {
                        nav._config.direction = 0;                                        
                    }
                } else {
                    nav._config.direction = 0;                    
                }
                nav.set(id);
           },
           /*
            * Preload and go to view
            */   
           preloadAndGo : function(id, options) {
               app.preload(id);
               app.go(id);
           }
           
       }, app);

       
       /*
        * App controllers
        */
        
       /*
        *
        * Example:
        *
        * $("#mybutton").onTapEnd(function() {
        *   alert("hello!");
        * });
        */       
       
       /*
       * Initialization
       */
       
       // Preload all views
       for (i = app.views.length; i--;) {
           app.preload(app.views[i].id);      
       }

   });
   
}(Mootor));



