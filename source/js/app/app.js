
// Constructors

/**
 * App
 * @class App
 * @constructor 
 * @param {AppOptions} options App options
 * @chainable
 * @example
 *       $(document).ready(function() {
 *          app = $.app({
 *              id: "trulyn",
 *              path: "views",
 *              views: [
 *                 "login",
 *                 "inspections",
 *                 "client",
 *                 "inspection"
 *              ],
 *              nav: $("#main").nav()
 *          });
 *      
 */  
var App = function (options) {

    // Initialize instance
    App.init(options, this);

    return this;

},

/**
 * View
 * @constructor
 * @param {ViewOptions} options
 * @param {App} appInstance
 */ 
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
   // define the onLoadContent method of that item
   // as a function that load this View instance
   if (options.nav !== undefined) {
       navItem = options.nav.get(this.id);
       navItem.onLoadContent = function() {
           if (self.cached === false) {
               appInstance.load(this, {
                    nav: navItem
               });
           }               
       };
   }
   
   this.cached = false;
    
   return this;
};
      
// Public instance prototypes

/**
 * App
 * @class App
 */  
App.prototype = {

    /**
     * Load a view
     * @method load
     * @param {View} view
     * @param {AppLoadOptions} options
     * @example
     *         app.load(
     *              app.get("myapp"), 
     *              nav.get("main")
     *          );
     */
    load: function(view, options) {
    
      var callback = function() {},
          viewPath = "",
          optionsNav = options.nav;

      if (options === undefined) {
          options = {};
      }

      if (options.callback !== undefined) {
          callback = options.callback; 

      } else {

          callback = function(response) {
         
              if (view.cached !== true) {
                  view.cached = true;

                  // Load view into element

                  if (options.el !== undefined) {           
                      $(options.el).html(response);          
                  } else {                             
                      $(view.el).html(response);        
                  }

              }
                                         
              // If a navItemInstance param is passed
              // and that object has an onLoadCallback function
              // then call that onLoadContentCallback function                     
              if (optionsNav !== undefined &&
                  typeof optionsNav.onLoadContentCallback === "function") {  
                  optionsNav.onLoadContentCallback();                                     
              }                           
          };

      }
      
      viewPath = this.path + "/" + view.id + "/" + view.id;
              
      // Template
      $.ajax({
            url: viewPath + ".html",
            callback: function(response) {

                // Controller
                $.require(viewPath + ".js");

                callback(response);
            }
      });
      
    },
    
    /**
     * Get a view by id
     * @method get
     * @param {string} id
     * @return {View} view
     * @example
     *      $("myapp").app().get("home");
     */
    get: function(id) {
        var i;
        for (i = this.views.length; i--;) {
            if (this.views[i].id === id) {
                return this.views[i];
            }
        }
        return null;
    },

    data: {
        _collection: {},
        
        /**
         * Get
         * @method data.get
         * @example
         *      $("myapp").app().data.get("title");
         */    
        get: function(key) {
            return this._collection[key];
        },
        /**
         * Set
         * @method data.set
         * @example
         *      $("myapp").app().data.set("title","Home page");
         */    
        set: function(key, value) {
            this._collection[key] = value;
        },
        /**
         * Unset
         * @method data.unset
         * @example
         *      $("myapp").app().data.unset("title");
         */  
         unset: function(key) {
            var i;
            for (i in this._collection) {
                if (i === key) {
                    delete(this._collection[i]);
                }
            }
        }
    }
    
};
  
// Private static methods

/**
 * App
 */     
$.extend({
    _collection: [],
    

    init: function(options, self) {
        var i,
            moduleNamePosition,
            href = window.location.href,
            view,
            viewId,
            initView,
            appId;
            
            
        if (options.id !== undefined) {
            self.id = options.id;
        }
                        
        // Initialize path
        if (options.path !== undefined) {
            self.path = options.path;
        } else {
            self.path = "";
        }
            
        // Create views
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
        
        // Add to internal apps collection
        App._collection.push(self);
        
        // Load view by URL, example: /myapp/#myPanel2
        if ((moduleNamePosition = href.lastIndexOf("#")) > -1) {
            viewId = href.substring(moduleNamePosition, href.length).replace("#","");
            if (viewId !== undefined) {
                options.nav.set(viewId);
            }               
        }
                
    },
    
    get: function(id) {
        var i;
        for (i = App._collection.length; i--;) {
            if (App._collection[i].id === id) {
                return App._collection[i];
            }
        }
    }
    
    
}, App);

// Public constructors

$.extend({
     /**
      * @class $.app
      * @constructor
      * @param {AppOptions} options App options
      * @return 
      * @example
      *
      *      // In this example "nav" view is in:
      *      // ./views/nav/nav.html
      *      // ./views/nav/nav.js
      *
      *      var nav = $("#main").nav();
      *      $.app({
      *         id: "demoApp",
      *         path: "views",
      *         views: [
      *              "nav",
      *              "item1",
      *              "item2",
      *         ],
      *         nav: nav
      *     });
      */
    app: function (options) {
    
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;            
            return new App(options);                
        }
}, $);

$.extend({
    app: function(id) {
        return App.get(this.query);
    }
});
