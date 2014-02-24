/**
* The Router class is for defining routes
*
* @class Router
* @constructor
*  @module Router
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var Router,
        Route,
        App;
                
    // Dependencies
    
    App = Mootor.App;
    Route = Mootor.Route;
    
    // Event handlers

    window.onpopstate = function(event) {
      if (window.location.hash !== "") {
          app.go(window.location.hash);
      }
    };

    // Private constructors

    Router = Mootor.Router = function() {
        // code here
    };

    // Private static methods and properties

    $.extend(Router, {
        _collection: {}
    });

    
    $.extend(App.prototype, {
        
        /**
        * Create a route
        *
        * @method route
        * @param {object} options TODO: Define this object's properties
        * @return Route
        */
        route: function(url, view) {
            if (view === undefined) {
                var s,
                    route,
                    match;
                
                for (s in Router._collection) {
                    match = url.match(s)
                    if (match !== null) {
                        route = Router._collection[s];
                        route.view.params = match.slice(1, match.length);
                        return route;
                    }
                }
                return undefined;
            } else {
                return Router._collection[url] = new Mootor.Route(url, view);
            }
        }
    });
          
}(window.$, window.Mootor));
