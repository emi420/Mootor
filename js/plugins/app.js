/**
 * @summary Mootor App plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */

(function ($) {

    "use strict";

	// Constructors
	
    /**
     * App
     */  
    var App = function (options) {

        // Initialize instance
        App.init(options, this);

        return this;

    },
    
    View = function(options, appInstance) {
       
       var el = this.el = options.el,
           self = this;
           
       this.nav = options.nav;
       
       if (options.el.id !== undefined) {
           this.id = options.el.id;
       }
       appInstance.views.push(this);
    
       this.nav.get(this.id).onLoad = function() {
           appInstance.load(self, this);
       }
        
       return this;
    };
          
    // Public instance prototypes
    
    /**
     * App
     */  
    App.prototype = {
        load: function(view, panelInstance) {

          // Template
          $.ajax({
                url: "views/" + view.id + "/" + view.id + ".html",
                callback: function(response) {
                   $((view).el).html(response);
                   if (typeof panelInstance.onLoadCallback === "function") {
                       panelInstance.onLoadCallback();                                          
                   } 
                }
          });
          
          // Controller
          $.require("views/" + view.id + "/" + view.id + ".js");
        }
    };

    /**
     * View
     */  
    View.prototype = {
        
    };  
      
    // Private static methods

    /**
     * App
     */     
    $.extend({
        init: function(options, self) {
            var i,
                view;
                
            self.views = [];
                
            if (options.views !== undefined) {
                for (i = 0; i < options.views.length; i++) {
                    view = new View({
                        el: $("#" + options.views[i]).el,
                        id: options.views[i],
                        nav: options.nav
                    }, self);
                }
            }    
                    
        }

    }, App);
    
    // Public constructors

    $.extend({
        app: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            
            switch (options.type) {
                default:
                    return new App(options);                
            }
        }
    }, $);

}($));
