/**
* The Route class is for defining a route
*
* @class Route
* @constructor
* @module Router
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/


(function ($, Mootor) {

    "use strict";

    var Route;

    // Private constructors
    
    Route = Mootor.Route = function(regex, view) {
        this.regex = regex;
        this.view = view;
    };
    
    // Private static methods and properties

    $.extend(Route, {
        // code here
    });

    // Public methods

    $.extend(Route.prototype, {
        
        /**
        * The URL regex referenced by this route
        *
        * @property regex
        * @type String
        * @example
        *     url_regex = m.app.route("index.html").regex;
        */
        regex: "",

        /**
        * The view that implements this route
        * If called with no parameters, it returns the currently set view in this route.
        *
        * @method view
        * @param {View} [view] - The view that implements this route
        * @return view
        * @example
        *     url_view = m.app.route("index.html").view;
        */
        view: {}

    });        

}(window.$, window.Mootor));
