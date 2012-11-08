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
                
                "core",
                "core_ajax",
                "core_context",
                "core_extend",
                "core_find",
                "core_hasclass",
                "core_hide",
                "core_html",
                "core_on",
                "core_ready",
                "core_removeclass",
                "core_require",
                "core_selector",
                "core_setclass",
                "core_show",
                "core_unbind",
                
                "fx",
                "fx_translate",
                
                "gestures",
                
                "ui",
                "ui_checkbox",
                "ui_map",
                "ui_option",
                "ui_overlay",
                "ui_select",
                "ui_text",
                "ui_textarea",
                "ui_toggleswitch",
                "ui_camera",
                "ui_simplecamera",
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



