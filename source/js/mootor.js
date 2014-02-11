/**
* The Mootor module handles the creation of App and Namespaces
*
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var _app;

    // Static global objects

    $.extend(window, {
        /**
        * window.m public global object
        * It is the main way to access the mootor app
        *
        * Usage: var app = window.m.app([options]);
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
            * @return App
            */
            app: function(options) {
                var App;
                if (_app === undefined) {
                    App = Mootor.ns("App");
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
            * @return object
            */
            ns: function(name) {
                if (Mootor.mod[name]) {
                    return Mootor.mod[name];    
                }
                else {
                    throw(new Error());
                }
            }
        }
    });

}(window.$));
