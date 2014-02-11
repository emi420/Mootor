/**
* The Route class is for defining a route
*
* @class Route
* @constructor
* @module Router
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var Route;

    // Private constructors
    
    Route = Mootor.Route = function() {
        // code here
    };
    
    // Private static methods and properties

    $.extend(Route, {
        // code here
    });

    // Public methods

    $.extend(Route.prototype, {
        
        /**
        * The URL referenced by this route
        *
        * @property URL
        * @type String
        */
        url: "",

        /**
        * An array with the parameters passed to the page
        * If called with no parameters, it returns the currently set params in this route.
        *
        * @method params
        * @param {array} [params] - An array with the parameters passed to the page
        * @return array
        */
        params: function(params) {

        },

        /**
        * The view that implements this route
        * If called with no parameters, it returns the currently set view in this route.
        *
        * @method view
        * @param {View} [view] - The view that implements this route
        * @return view
        */
        view: function(view) {

        },

    });        

}(window.$, window.Mootor));
