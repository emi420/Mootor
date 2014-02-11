/**
* The Route class is for defining a route
*
* @class Route
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var Route;

    // Private constructors
    Route = function() {
    };


    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {Route: Route});
    
    // Private static methods and properties

    $.extend(Route, {
   
    });

    //Public methods

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
}(window.$));
