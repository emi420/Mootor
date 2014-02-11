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
        App;
        
    // Dependencies
    
    App = Mootor.App;

    // Private constructors

    View = Mootor.View = function(options) {
        this.id = options.id;
        View.init(options, this);
    };

    
    // Private static methods and properties
    
    $.extend(View, {        
        _init: function(options, self) {
            var id = self.id,
                path = "views/" + id + "/" + id,
                pathJs = path + ".js",
                pathHtml = path + ".html",
                _navigationMode = "panel";

            self._navigationMode = _navigationMode;
            
            View._getHtml({

                path: pathHtml,

                onSuccess: function(data) {
                    
                    var el = document.createElement("section");

                    el.id = id;
                    self.$el = $(el);
                    self.$el.appendTo("#main");
                    self.$el.html(data); 

                    self[_navigationMode] = App[_navigationMode]({
                        id: id
                    });

                    View.getScript({

                        path: pathJs,

                        onSuccess: function() {
                           if (self.onInit !== undefined) {
                               self.onInit();
                           }
                        }

                    });
                }

            });

        },

        _getHtml: function(options) {
            $.get(
                options.path,
                options.onSuccess
            );
        },

        /* //Disabled from showing in yuidoc, it's a private method. Removed asterisk from this line. //
        * Helper function to load a remote script via a <script> element in the <head>.
        *
        * @method _getScript
        * @param {String} path The path to load
        * @param {Function} onSuccess A function to be called if the request is successful
        * @param {Function} onError  A function to be called if the request fails
        */
        _getScript: function (options) {
            var script = document.createElement("script"),
                $script = $(script);
        
            script.src = options.path;
            $("head").append(script);
            $script.one("load", {path: options.path}, options.onSuccess);
            $script.one("error", {path: options.path}, options.onError);
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

        },

        /**
        * Gets or sets the source for the JavaScript of this view.
        * 
        * @method script
        * @return string
        * @default /views/[viewid]/[viewid].js
        */  
        script: function(source) {

        },

        /**
        * Gets or sets the source for the CSS StyleSheet of this view.
        * 
        * @method css
        * @return string
        * @default /views/[viewid]/[viewid].css
        */  
        css: function(source) {

        }
    });    

}(window.$, window.Mootor, window.document));
