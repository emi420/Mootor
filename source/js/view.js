/*
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {

    "use strict";
    
    var View,
        App;
        
    // Dependencies
    
    App = $.__App;

    // Private constructors

    /**
    * The View class handles each screen of the application. 
    * A list of views is specified in the applications options
    * and the files are loaded from the views/ folder.
    * Each view has a viewName.js and a viewName.html file.
    * The viewName.js file defines options for the view.
    *
    * @class View
    * @constructor
    * @param {Object} options An object defining options for the current view.
    * * constructor - A function that will be run after the view has loaded (optional).
    * * animation - a string defining the type of animation used to show this view (one of: "slide-left", "slide-right", "none").
    */

    View = function(options) {
        this.id = options.id;
        View.init(options, this);
    }
    
    // Private static methods and properties
    
    $.extend(View, {
        
        init: function(options, self) {
            var id = self.id,
                path = "views/" + id + "/" + id,
                pathJs = path + ".js",
                pathHtml = path + ".html",
                _navigationMode = "panel";

            self._navigationMode = _navigationMode;
            
            View.getHtml({

                path: pathHtml,

                onSuccess: function(data) {
                    
                    var el = document.createElement("section");

                    el.id = id;
                    self.$el = $(el);
                    self.$el.appendTo("#main")
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
                        },

            		});
                },

            });

        },

        getHtml: function(options) {
            $.get(
                options.path,
                options.onSuccess
            );
        },

        /**
        * Helper function to load a remote script via a <script> element in the <head>.
        *
        * @method getScript
        * @param {String} path The path to load
        * @param {Function} onSuccess A function to be called if the request is successful
        * @param {Function} onError  A function to be called if the request fails
        */
        getScript: function (options) {
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
    	* Title contains the friendly name for the current view.
    	* 
    	* @property title
    	* @type {string}
    	* @default ""
    	*/	
    	title: "",
    	options: {},


    	/**
    	* ID contains the internal name for the current view, which applies to file names and internal references such as the views definition in the application's options.
    	* 
    	* @property id
    	* @type {string}
    	* @default ""
    	*/	
    	id: "",

    	/**
    	* Sets the title of the view and raises an event.
    	*
    	* @method setTitle
    	* @param {String} title The new title
    	* @return {Boolean} Returns true on success
    	*/
    	setTitle: function (title) {
        	this.title = title;    
        	return true;
    	},

    	/**
    	* Displays the panel
    	*
    	* @method show
    	*/
    	show: function() {
    		this[this._navigationMode].show();
    	},

    	/**
    	* Hides the panel 
    	*
    	* @method show
    	*/
    	hide: function() {
    		this[this._navigationMode].hide();
    	}

        
    });
    
    // Extends App prototype
    
    $.extend(App.prototype, {
       view: function(options) {
           return new View(options);
       } 
    });
    
}(window.$));