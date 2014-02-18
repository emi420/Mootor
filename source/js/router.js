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
        App,
        Event;
        
    // Dependencies
    
    App = Mootor.App;
    Route = Mootor.Route;
    Event = Mootor.Event;
    
    // Event handlers

    Event.on("App:init", function(self) {
        var views = App._options.views,
            view,
            viewid,
            viewCount = views.length,
            app = m.app,
            route = app.router.route,
            i;            
            
        for (i = 0; i < viewCount; i++) {
            viewid = views[i];
            view = app.view(viewid);
            route("/" + viewid, view);
            route("#" + viewid, view);
        }
    });   



    window.onpopstate = function(event) {
      app.go(window.location.hash);
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
                return Router._collection[url];
            } else {
                return Router._collection[url] = new Route(url, view);
            }
        }
    });
          
}(window.$, window.Mootor));
