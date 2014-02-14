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
        console.log("on app init (router)");
        var views = App._options.views,
            viewCount = views.length,
            app = m.app,
            i;            
            
        for (i = 0; i < viewCount; i++) {
            app.router.route(views[i], app.view(views[i]));
        }
        
        
    });   

    // Private constructors

    Router = Mootor.Router = function() {
        // code here
    };

    // Private static methods and properties

    $.extend(Router, {
        _collection: {}
    });

    // Public methods

    $.extend(Router.prototype, {
        
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
    
    $.extend(App.prototype, {
        /**
        * Returns Router instance
        *
        * @method router
        * @for m.app
        * @return Router
        */
        router: new Router()
    });
          
}(window.$, window.Mootor));
