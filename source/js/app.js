/**
* The App class defines the main object of the applications
* It handles creating the views.
*
* @class App
* @constructor
* @param {Object} options An object defining options for the application.
* * views - An array with a list of view names
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var App;

    // Private constructors
    App = function(options) {
        App.init(options, this);
    };

    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {App: App});
    
    // Private static methods and properties

    $.extend(App, {
    
        views: {},
        
        currentView: undefined,
    
        init: function(options, self) {
            // Defer init until dom loaded
            $(function($){
                if (options) {
                    App.initViews(options.views, self);    
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
                
                App.views[i] = view;

            }
            
        },
    
    });

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

        
}(window.$));
