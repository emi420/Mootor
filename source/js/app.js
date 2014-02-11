/*
 *  @author Emilio Mariscal (emi420 [at] gmail.com)
 *  @author Martín Szyszlican (martinsz [at] gmail.com)
 */

(function ($, Mootor) {

    "use strict";

    /**
    * The App class defines the main object of the applications
    *
    * @class App
    * @constructor
    *  @module App
    * @param {Object} options An object defining options for the application.
    * * views - An array with a list of view names
    */
    var App;

    // Private constructors
    
    App = Mootor.App = function(options) {
        App._init(options, this);
    };
    
    // Private static methods and properties

    $.extend(App, {
    
        _views: {},
        
        _currentView: undefined,
    
        _init: function(options, self) {
            // Defer init until dom loaded
            $(function(){
                if (options) {
                    App._initViews(options.views, self);    
                }
                else {
                    console.log("Can't init app without views");
                }
                
            });
        },
    
        /**
        * Init views, load remote files and call the View class to handle it.
        *
        * @private
        * @method _initViews
        * @param {Array} views A list of view names to be initialized
        */
        _initViews: function (views, self) {
            var i,
                view;
                
            for (i = 0; i < views.length; i++) {

                view = self.view({
                    id: views[i]
                });
                
                App._views[i] = view;

            }
            
        }
    
    });

    // Public methods

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
        * @return object the setting value
        */
        settings: function(key, value) {
            
        },

        /**
        * Create or get a view
        *
        * @method view
        * @param {String} id The id of the view
        * @param {String} [settings] The settings object for the view
        * @return View the referenced view object
        */
        view: function(id, settings) {

        },

        /**
        * Go to a view
        *
        * @method go
        * @param {String} id The id of the view
        * @return Route
        */
        go: function(id) {
        },        

        /**
        * Go to the previous view in the history
        *
        * @method back
        * @return Route
        */
        back: function(id) {
        },        

        /**
        * Go to next view in the history
        *
        * @method forward
        * @return Route
        */
        forward: function(id) {
        },        

        /**
        * Returns a router instance
        *
        * @method router
        * @return Router
        */
        router: function(id) {
        }        
    });
    
    $.extend(window.m, {        
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
        * @for window.m
        * @param {Array} [views] A list of view names to be initialized
        * @return App
        */
        app: function(options) {
            if (App.app === undefined) {
                App.app = new App(options);
            }
            return App.app;
        }
    });


}(window.$, window.Mootor));
