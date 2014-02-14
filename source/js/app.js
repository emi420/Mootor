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
        * @param {String} key The name of the setting\
        * @chainable
        * @param {object} [value] The value of the setting
        * @return object the setting value
        */
        settings: function(key, value) {
            return this;            
        },

        /**
        * Go to a view
        *
        * @method go
        * @chainable
        * @param {String} id The id of the view
        * @return Route
        */
        go: function(id) {
            return this;
        },        

        /**
        * Go to the previous view in the history
        *
        * @method back
        * @chainable
        * @return Route
        */
        back: function(id) {
            return this;
        },        

        /**
        * Go to next view in the history
        *
        * @method forward
        * @chainable
        * @return Route
        */
        forward: function(id) {
            return this;
        },        

        /**
        * Returns a router instance
        *
        * @method router
        * @chainable
        * @return Router
        */
        router: function(id) {
            return this;
        },
        
        /**
        * Set callbacks for app events
        * @method on
        * @chainable
        * @return App instance
        */    
        on: function(event, callback) {
            Event.on("App:" + event, callback);
            return this;
        },
        
        /* 
        * Remove callbacks for app events
        * @method off
        * @chainable
        * @return App instance
        */    
        off: function(event, callback) {
            return this;
        },
        
        /*
        * Initialize app
        * @chainable
        * @method init
        * @return App instance
        */
        init: function() {
            var self = this;
            Event.dispatch("App:init", {self: self, options: App._options});   
            this.init = function() { return this };
            return this;
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
                App._options = options;
                this.app = App.app;
                return this.app;
            }
        }
    });


}(window.$, window.Mootor));
