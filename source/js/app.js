/*
 *  @author Emilio Mariscal (emi420 [at] gmail.com)
 *  @author Martin Szyszlican (martinsz [at] gmail.com)
 */

(function ($, Mootor, m) {

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
    * @module App
    * @private
    * @param {Object} options An object defining options for the application.
    * * views - An array with a list of view names
    */
    App = Mootor.App = function() {
    };

    // Private static 
    
    $.extend(App, {
  
        _version: undefined,

        _settings: {}
    });
    
    Event.extend(App, "App");
    
    // Public methods

    App.prototype = {

        /**
        * The application's version number
        * Note: It's not Mootor version, this value is defined in application code, not framework code.
        *
        * @method version
        * @param {String} [version] The version number or name
        * @return {String} Version number or name
        * @example
        *     m.app.version("beta1");
        *     if (m.app.version().indexOf("beta") > -1) {
        *         console.log("Warning: beta version")
        *     }
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
        * @example
        *     m.app.settings("debug", true);
        *     if (m.app.settings("debug") === true) {
        *          console.log("Debug mode activated.");
        *     }
        *     
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
        * Go to an url
        *
        * @method go
        * @param {String} url The url to go
        * @return Route
        * @example
        *     m.app.go("/product/15/");
        */
        go: function(url, _noPushState) {
            var route,
                stateObj;
                
            route =  m.app.route(url);

            
            if (route !== undefined) {
                App._currentRoute = route;
                App.dispatch("go", this);
                
                stateObj = { view: route.view.id };
        
                if (_noPushState !== true) {
                    if (route.url === "") {
                        route.url = " ";
                    }
                    window.history.pushState(stateObj, route.view.id, route.url);
                }
                                    
            } else {
                throw(new Error("Route " + url + " is not defined"));
            }                       
            return route;
        },        

        /**
        * Go to the previous view in the history
        *
        * @method back
        * @chainable
        * @return Route
        * @example
        *     m.app.back();
        */
        back: function() {
            window.history.back();
            return this;
        },        

        /**
        * Set callbacks for app events
        * @method on
        * @chainable
        * @return App instance
        * @example
        *     m.app.on("ready", function(self) {
        *         console.log("App started.");
        *     });
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
        
        /** TODO
        off: function(event, callback) {
            return this;
        },
        */
        
        /*
        * Initialize app
        * @chainable
        * @method init
        * @return App instance
        * @example
        *     m.app.on("init", function() {
        *          console.log("App initialized.");
        *     })
        *     m.app.init();
        */
        init: function() {
            var self = this;
            App.dispatch("init", this);   
            this.init = function() { return self; };
            return this;
        }
        
    };
    
    $.extend(m, {        
        /**
        * Creates a new app with the defined options.
        * If the app is already created, it can be called without options to have a reference to the Mootor app. 
        *
        * App instance factory
        *
        * @method app 
        * @for window.m
        * @param {Array} [views] A list of view names to be initialized
        * @return App
        * @example
        *     window.m.app({
        *       views: [
        *          "index",
        *          "view1"
        *       ]
        *     });
        */
        app: function(options) {
            if (App.app === undefined) {
                if (options === undefined) {
                    options = {};
                }
                App.app = new App(options);
                App._options = options;
                this.app = App.app;
                return this.app;
            }
        }
    });


}(window.$, window.Mootor, window.m));
