
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
    
    var self = this;
    
    this.options = options;
    this._initScripts = [];

    // Add to internal apps collection
    _collection.push(this);

    if (options.noInit !== true) {
        // Initialize instance
        App.init(options, this);
    } else {
        this.init = function(options) {    
            $.extend(self.options, options);        
            App.init(options, self);
        }
    }

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
   if (options.html !== undefined) {
       this.html = options.html;
   }
   if (options.script !== undefined) {
       this.script = options.script;
   }
   if (options.path !== undefined) {
       this.path = options.path;
   }
   if (options.init !== undefined) {
       this.init = options.init;
   }
   
   appInstance.views.push(this);
   
   // If a Nav object instance is passed
   // then get a navigation item by id and
   // define the onLoadContent method of that item
   // as a function that load this View instance
   if (options.nav !== undefined) {
       navItem = options.nav.get(this.id);

       if (options.onLoad !== undefined) {
           navItem.onLoad = options.onLoad;
       }
       if (options.ui !== undefined) {
           navItem.ui = options.ui;
       }

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
            
      if (view.cached !== true) {
    
          var callback = function() {},
              viewPath = "",
              scriptPath = "",
              templatePath = "",
              optionsNav = options.nav,
              reqOptions = {};
              
          if (options === undefined) {
              options = {};
          } else {
              if (options.reload === true) {
                reqOptions = {reload: true}
              }
          }
    
          if (options.callback !== undefined) {
              callback = options.callback; 
    
          } else {
    
              callback = function(response) {
             
                  view.cached = true;

                  // Load view into element

                  if (options.el !== undefined) {           
                      $(options.el).html(response);          
                  } else {                             
                      $(view.el).html(response);        
                  }

                  if (typeof view.init === "function") {
                      view.init();
                  }
                            
              };
    
          }
          
          if (view.path === undefined) {
              scriptPath = this.path + "/" + view.id + "/" + view.id + ".js";              
          } else {
              scriptPath =  this.path + "/" + view.path + ".js";              
          }

          if (view.script !== undefined) {

              callback(view.html);
              
              this._initScripts.push(function() { view.script.init(options) });
                  
          } else {

              if (view.templatePath !== undefined) {
                  templatePath = view.templatePath;          
              } else {
                  if (view.path === undefined) {
                      templatePath = "/" + view.id + "/" + view.id
                  } else {
                      templatePath = "/" + view.path;              
                  }
              }
              
              viewPath = this.path + templatePath + ".html";

              // Template
              $.ajax({
                    url: viewPath,
                    callback: function(response) {
                        callback(response);
                        $.require(scriptPath,function(){},reqOptions);   
                    }
              });
              
          }
          
       }
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
        /**
         * Get
         * @method data.get
         * @example
         *      $("myapp").app().data.get("title");
         */    
        get: function(key) {
            return _collection[key];
        },
        /**
         * Set
         * @method data.set
         * @example
         *      $("myapp").app().data.set("title","Home page");
         */    
        set: function(key, value) {
            _collection[key] = value;
            return value;
        },
        /**
         * Unset
         * @method data.unset
         * @example
         *      $("myapp").app().data.unset("title");
         */  
         unset: function(key) {
            var i;
            for (i in _collection) {
                if (i === key) {
                    delete(_collection[i]);
                }
            }
        }
    }
    
};
  
// Private static methods

/**
 * App
 */     
var _collection = [];

$.extend({
    
    init: function(options, self) {
        var i,
            moduleNamePosition,
            href = window.location.href,
            view,
            viewId,
            draftView,
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
        
        if (self.views !== undefined) {
            options.views = self.views;
        }
            
        // Create views
        self.views = [];

        if (options.views !== undefined) {
            for (i = 0; i < options.views.length; i++) {
                if (typeof options.views[i] === "string") {
                    viewId = options.views[i];
                } else {
                    viewId = options.views[i].id;                    
                }
                
                draftView = options.views[i];
                
                view = new View({
                    el: $("#" + viewId).el,
                    id: viewId,
                    nav: options.nav,
                    html: draftView.html,
                    script: draftView.script,
                    path: draftView.path,
                    onLoad: draftView.onLoad,
                    ui: draftView.ui,
                    init: draftView.init
                }, self);

            }
        }
        
        // Load view by URL, example: /myapp/#myPanel2
        // TODO: init app
        if ((moduleNamePosition = href.lastIndexOf("#")) > -1) {
            viewId = href.substring(moduleNamePosition, href.length).replace("#","");
            if (viewId !== undefined) {
                options.nav.set(viewId);
            }               
        }
                
    },
    
    get: function(id) {
        var i;
        for (i = _collection.length; i--;) {
            if (_collection[i].id === id || _collection[i].options.id === id) {
                return _collection[i];
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
