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
           self = this,
           navItem;
                  
       if (options.el.id !== undefined) {
           this.id = options.el.id;
       }
       appInstance.views.push(this);
       
       // If a Nav object instance is passed
       // then get a navigation item by id and
       // define the onLoad method of that item
       // as a function that load this View instance
       if (options.nav !== undefined) {
           navItem = options.nav.get(this.id);
           navItem.onLoad = function() {
               if (self.cached === false) {
                   appInstance.load(this, {
                        nav: navItem
                   });
               }               
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
        load: function(view, options) {
        
          var callback = function() {};
          
          if (options.callback !== undefined) {
              callback = options.callback;
 
          } else {
 
              callback = function(response) {
             
                  if (view.cached !== true) {
                      view.cached = true;
    
                      if (options.el !== undefined) {
           
                          // Load view into element
                          $(options.el).html(response);
          
                      } else {
                             
                          $(view.el).html(response);
        
                      }
    
                  }
                 
                  // If a navItemInstance param is passed
                  // and that object has an onLoadCallback function
                  // then call that onLoadCallback function                     
                  if (options.nav !== undefined &&
                      typeof options.nav.onLoadCallback === "function") {                       
                      options.nav.onLoadCallback();                                     
                  }                           
              }

          }
                       
          // Template
          $.ajax({
                url: this.path + "views/" + view.id + "/" + view.id + ".html",
                callback: callback
          });
          
          // Controller
          $.require(this.path + "views/" + view.id + "/" + view.id + ".js");
        }
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

}(Mootor));
