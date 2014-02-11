/**
* The App class defines the main object of the applications
* It handles creating the views.
*
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Zepto) {

    "use strict";

    var App,
        _app;

    // Private constructors

    /**
    * @class App
    * @constructor
    * @param {Object} options An object defining options for the application.
    * * views - An array with a list of view names
    */
    App = function(options) {
        App.init(options, this);
    }
    
    // Private static methods and properties

    $.extend(App, {
    
        views: {},
        
        currentView: undefined,
    
        init: function(options, self) {
        	// Defer init until dom loaded
        	Zepto(function($){
        		App.initViews(options.views, self);
        	}) 
        },
    
        /**
        * Init views, load remote files and call the View class to handle it.
        *
        * @method initViews
        * @param {Array} views A list of view names to be initialized
        */
        initViews: function (views, self) {
            var i,
                view;
                
        	for (i = 0; i < views.length; i++) {

                view = self.view({
                    id: views[i],
                });
                
                App.views[view.id] = view;

        	}
            
        },
    
    })

    //Public methods

    $.extend(App.prototype, {
        
        /**
        * Stores the navigation history. 
        * An array of views, ordered in the sequence that they were visited by the user.
        *
        * @property history
        * @type array
        */
        history: [],

        /**
        * Application settings
        * If called with a key, returns the value. If called with key and value, sets value to key.
        *
        * @method settings
        * @param {String} key The name of the setting
        * @param {object} [value] The value of the setting
        * @returns object the setting value
        */
        settings: function(key, value) {},

        /**
        * Create or get a view
        *
        * @method view
        * @param {String} id The id of the view
        * @param {String} [settings] The settings object for the view
        * @returns View the referenced view object
        */
        view: function(id, settings) {}

        /**
        * Go to a view
        *
        * @method go
        * @param {String} id The id of the view
        * @returns Route
        */
        go: function(id) {
        }        

        /**
        * Go to the previous view in the history
        *
        * @method back
        * @returns Route
        */
        back: function(id) {
        }        

        /**
        * Go to next view in the history
        *
        * @method forward
        * @returns Route
        */
        forward: function(id) {
        }        

        /**
        * Returns a router instance
        *
        * @method router
        * @returns Router
        */
        router: function(id) {
        }        
    });

    // Public constructors

    $.extend(window, {
        /**
        * window.m public global object
        * It is the main way to access the mootor app
        *
        * @Usage: var app = window.m.app([options]);
        * @class window.m
        * @static
        */
        m: {
            /**
            * Creates a new app with the defined options.
            * If the app is already created, it can be called without options to have a reference to the Mootor app. 

            *  App instance factory
            *
            *  window.m.app({
            *    views: [
            *       "index",
            *       "view1"
            *    ]
            *  });

            *
            * @method app
            * @param {Array} [views] A list of view names to be initialized
            * @returns App
            */
            app: function(options) {
                if (_app === undefined) {
                    _app = new App(options);
                }
                return _app;
            },
            /**
            * TODO: Write this object's functionality.
            * @property context
            * @type object
            */
            context: {}
        },

        /**
        * window.Mootor public global object
        * Access modules and namespaces
        *
        * @class window.Mootor
        * @static
        */
        Mootor: {
            /**
            * TODO: Write this object's functionality.
            * @property mod
            * @type object
            */
            mod: {},
            /**
            * Creates a new namespace
            * If the namespace is already created, it returns the namespace
            *
            * @method ns
            * @param {String} name The name of the referenced namespace
            * @returns object
            */
            ns: function(name) {
            }
        }
    });
        
}(window.$, window.Zepto));
