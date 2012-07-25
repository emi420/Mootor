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
           
       // TODO: independence of Nav plugin
       this.nav = options.nav;
       
       if (options.el.id !== undefined) {
           this.id = options.el.id;
       }
       appInstance.views.push(this);
    
       // TODO: independence of Nav plugin
       this.nav.get(this.id).onLoad = function() {
           if (self.cached === false) {
               appInstance.load(self, this);
           }
       }
       
       this.cached = false;
        
       return this;
    };
          
    // Public instance prototypes
    
    /**
     * App
     */  
    App.prototype = {
    
        // Load a view
        // TODO: independence of Nav plugin
        load: function(view, panelInstance) {
        
          // Template
          $.ajax({
                url: this.path + "views/" + view.id + "/" + view.id + ".html",
                callback: function(response) {
                   $(view.el).html(response);
                   view.cached = true;
                   
                   // TODO: independence of Nav plugin
                   if (typeof panelInstance.onLoadCallback === "function") {
                       panelInstance.onLoadCallback();                                     
                   } 
                }
          });
          
          // Controller
          $.require(this.path + "views/" + view.id + "/" + view.id + ".js");
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
            
            if (options.path !== undefined) {
                self.path = options.path;
            } else {
                self.path = "";
            }
            
            console.log(self.path);
                
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
