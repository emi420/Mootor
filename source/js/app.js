/*
 *  @author Emilio Mariscal (emi420 [at] gmail.com)
 *  @author Martín Szyszlican (martinsz [at] gmail.com)
 */

(function ($, Mootor) {

    "use strict";

    var App,
        Event;

    // Dependencies

    Event = Mootor.Event;

    // Private constructors
    
    /**
    * The App class defines the main object of the applications
    *
    * @class App
    * @constructor
    *  @module App
    * @param {Object} options An object defining options for the application.
    * * views - An array with a list of view names
    */
    App = Mootor.App = function(options) {
        this._options = options;
        $(function(){
            Event.dispatch("App:init", self);   
        });
    };

    // Public methods

    App.prototype = {
        
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
        },
        
        /**
        * Set callbacks for app events
        * @method on
        * @return App instance
        */    
        on: function(event, callback) {
            Event.on("App:" + event, callback);
        },
        
        /* 
        * Remove callbacks for app events
        * @method off
        * @return App instance
        */    
        off: function(event, callback) {
        }
        
    };
    
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
