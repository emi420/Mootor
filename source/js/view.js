/**
* The View class handles each screen of the application. 
* A list of views is specified in the applications options
* and the files are loaded from the views/ folder.
* Each view has a viewName.js and a viewName.html file.
* The viewName.js file defines options for the view.
*
* @class View
* @module View
* @constructor
* @param {Object} options An object defining options for the current view.
* * constructor - A function that will be run after the view has loaded (optional).
* * animation - a string defining the type of animation used to show this view (one of: "slide-left", "slide-right", "none").
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, document) {

    "use strict";
    
    var View,
        App,
        Event;
    
        
    // Dependencies
    
    App = Mootor.App;
    Event = Mootor.Event;
    
    // Event handlers

    Event.on("App:init", function(app) {
        var options = app._options,
            views = options.views,
            viewCount = views.length,
            i;
            
            
        for (i = 0; i < viewCount; i++) {
            app.view(views[i]);
        }
        
        
    });   
    
    // Private constructors

    View = Mootor.View = function(options) {
        this.id = options.id;
        View._init(options, this);
    };

    
    // Private static methods and properties
    
    $.extend(View, {        

        /**
        * Views collection
        * @private
        */
        _collection: [],
    
        /**
        * Current active view
        * @private
        */
        _current: undefined,
        
        /**
        * Initialize View instances for app
        *
        * @private
        * @method _initViews
        * @param {Array} views A list of view names to be initialized
        * @param {App} self App instance
        */
        _initViews: function (views, self) {
            var i,
                viewCount = views.length;
                
            for (i = 0; i < viewCount; i++) {
                App._views.push(
                    self.view({
                        id: views[i]
                    })
                );
            }
            
        },

        /**
        * Init View instance, load HTML, CSS and JavaScript files for the view
        *
        * @private
        * @method _init
        * @param {Array} options A list of options
        * @param {View} self View instance
        */
        _init: function(options, self) {
            
            // FIXME CHECK: hardcoded value
            var _navigationMode = "panel";
            
            // Set navigation mode
            self._navigationMode = _navigationMode;
            
            // Load Html, Css and JavaScript
            Event.on("View:getHtml", function(view) {
                console.log("OK");
                View._getScript(self);
            })

            View._getHtml(self);
            View._getCss(self);
            
            View._collection.push(self);
            
        },

        /**
        * Get view HTML
        *
        * @private
        * @method _getHtml
        * @param {View} self View instance
        */
        _getHtml: function(self) {
            var path,
                id = self.id;
                
            path = "views/" + id + "/" + id + ".html";
            $.get(
                path,
                function(source) {
                    self._html = source;
                    Event.dispatch("View:getHtml", self)
                }
            );
        },

        /*
        * Get view script
        * @method _getScript
        * @private
        * @param {View} self View instance
        */
        _getScript: function (self) {
            var path,
                id = self.id,
                script,
                $script;
                
            path = "views/" + id + "/" + id + ".js";
            
            script = document.createElement("script"),
                $script = $(script);
        
            script.src = path;
            script.type = "text/javascript";
            $("head").append(script);
            $script.one("load", {
                path: path
            }, function() {
                self._script = path;                
                Event.dispatch("View:getScript", self)
            });
        },

        /*
        * Get view CSS
        * @method _getCSS
        * @private
        * @param {View} self View instance
        */
        _getCss: function (self) {
            var path,
                id = self.id,
                link,
                $link;
                
            path = "views/" + id + "/" + id + ".css";
            
            link = document.createElement("link");
            $link = $(link);
        
            link.href = path;
            link.type = "text/css";
            link.rel = "stylesheet";

            $("head").append(link);
            
            $link.one("load", {
                path: path
            }, function() {
                self._css = path;
                Event.dispatch("View:getCss", self)
            });
        },
        
        _get: function(id) {
            var i,
                collection = View._collection,
                length = collection.length;
                
            for (i = length; i--;) {
                if (collection[i].id === id) {
                    return View._collection[i];
                } else {
                    return undefined;
                }
            }
        }
                
    });

    // Public instance prototype
    
    $.extend(View.prototype, {

        /**
        * A reference to the UI representation of this view
        *
        * @property ui
        * @type UIView
        */
        ui: {},
        
        /**
        * Title is the friendly name for the current view.
        * When called without parameters, returns a string containing the title. When called with parameters, sets the title.
        * 
        * @method title
        * @param {string} [title] New title for this view.
        * @return string
        */  
        title: function(title) {

        },

        /**
        * Sets an event handler for the view
        * Possible values for event: load, beforeLoad, unload, beforeUnload, init
        * TODO: Define which parameters are passed to the callback function.
        * 
        * @method on
        * @param {string} event Defines in which event the handler will be called
        * @param {function} callback The function to be called when the event is fired.
        * @return View
        */  
        on: function(event,callback) {

        },

        /**
        * Unsets event handlers for the view
        * Possible values for event: load, beforeLoad, unload, beforeUnload, init
        * 
        * @method off
        * @param {string} event Defines in which event we want to unset handlers
        * @param {function} [callback] If this parameter is specified, only that function is removed. Otherwise all callbacks for this event are removed.
        * @return View
        */  
        off: function(event,callback) {

        },

        /**
        * Removes the view from the app (and from the screen)
        * 
        * @method remove
        * @return View
        */  
        remove: function() {

        },

        /**
        * Inserts the view to the app
        * 
        * @method insert
        * @return View
        */  
        insert: function() {

        },

        /**
        * Gets or sets the source for the HTML of this view.
        * 
        * @method html
        * @return string
        * @default /views/[viewid]/[viewid].html
        */  
        html: function(source) {
            if (source === undefined) {
                return this._html;
            }
        },

        /**
        * Gets or sets the source for the JavaScript of this view.
        * 
        * @method script
        * @return string
        * @default /views/[viewid]/[viewid].js
        */  
        script: function(source) {
            if (source === undefined) {
                return this._script;
            }
        },

        /**
        * Gets or sets the source for the CSS StyleSheet of this view.
        * 
        * @method css
        * @return string
        * @default /views/[viewid]/[viewid].css
        */  
        css: function(source) {
            if (source === undefined) {
                return this._css;
            }            
        }
    });    
    
    $.extend(App.prototype, {

        /**
        * Create or get a view
        *
        * @method view
        * @param {String} id The id of the view
        * @for View
        * @param {String} [options] The options object for the view
        * @return View the referenced view object
        */
        view: function(id, options) {
            var i,
                views = View._collection,
                viewCount = views.length,
                view;
            
            for (i = 0; i < viewCount; i++) {
                if (views[i].id === id) {
                    view = views[i];
                }
            }
            
            if (view !== undefined) {
                return view;
            } else {
                if (options === undefined) {
                    options = {};
                }
                options.id = id;
                return new View(options);
            }
        },
        
    })

}(window.$, window.Mootor, window.document));
