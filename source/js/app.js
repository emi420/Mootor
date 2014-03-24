/*
 *  @author Emilio Mariscal (emi420 [at] gmail.com)
 *  @author Martín Szyszlican (martinsz [at] gmail.com)
 */

(function ($, Mootor) {

    "use strict";

    var App,
    
        Event,
        View;

    // Dependencies

    Event = Mootor.Event;
    View = Mootor.View;

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

    // Private static 
    
    $.extend(App, {
  
      /**
        * The application's version number
        * Note: It's not Mootor version, this value is defined in application code, not framework code.
        *
        * @property version
        * @type Strign
        */
        _version: undefined,

        _settings: {}
    });
    
    Event.extend(App, "App");
    
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
        * The application's version number
        * Note: It's not Mootor version, this value is defined in application code, not framework code.
        *
        * @method version
        * @param {String} [version] The version number or name
        * @return {String} Version number or name
        */
        version: function(version) {
            if (version !== undefined) {
                App._version = version;
            }
            return App._version;
        },

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
            if (value !== undefined) {
                // this.settings[key] = value;
                App._settings[key] = value;
            }
            // return this.settings[key] = value;
            return App._settings[key];
        },

        /**
        * Go to a view
        *
        * @method go
        * @chainable
        * @param {String} url The url to go
        * @return Route
        */
        go: function(url) {
            var route;
            route =  m.app.route(url);
            if (route !== undefined) {
                App._currentRoute = route;
                App.dispatch("go", this);
                if (this.history[this.history.length - 2] !== route.url) {
                    this.history.push(route.url);    
                } else {
                    this.history.pop();    
                }
                console.log(this.history);
            } else {
                throw(new Error("Route " + url + " is not defined"));
            }                       
            return route
        },        

        /**
        * Go to the previous view in the history
        *
        * @method back
        * @chainable
        * @return Route
        */
        back: function() {
            var url = m.app.history[m.app.history.length - 2];
            if (url !== undefined) {
                m.app.go(url);
            }
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
        * Set callbacks for app events
        * @method on
        * @chainable
        * @return App instance
        */    
        on: function(event, callback) {
            App.on(event, callback);
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
            App.dispatch("init", this);   
            this.init = function() { return self };
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
