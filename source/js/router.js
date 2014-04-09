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
        _appGo,
        _pendingGo;
            
    // Dependencies
    
    App = Mootor.App;
    Route = Mootor.Route;
    
    // Private constructors

    Router = Mootor.Router = function() {
    };

    // Event handlers


    _appGo = function(url) { 
        _pendingGo = window.location.hash;
        console.log("_pendingGo   ",_pendingGo)
    };


    var callAppGo = function() {
        console.log("callAppGo")
        _appGo(window.location.hash);
    };

    window.onpopstate = callAppGo;

    if ($.browser.firefox) {
       $(callAppGo);
    }


    App.on("ready", function() {
        _appGo = function(url) {
            m.app.go(url,true);
        };
        if (_pendingGo !== window.undefined) {
            m.app.go(_pendingGo);
        }
        else {
            console.log("No pending go on app ready");
        }
    });

    // Private static methods and properties

    $.extend(Router, {
        _collection: {}
    });

    
    $.extend(App.prototype, {
        
        /**
        * Create a route
        *
        * @method route
        * @param {string} url Regular expresion string
        * @param {string} url URL to route
        * @param {View} view View object
        * @return Route
        * @example
        *     // Set route
        *     m.app.route("index.html", m.app.view("index"));
        *     /
        *     // Get route
        *     route = m.app.route("index.html");
        */
        route: function(url, view) {
            if (url == window.undefined && view == window.undefined) {
                console.error("Router.route called with undefined url and view",url,view);                
                return false;
            }
            if (url == window.undefined) {
                console.error("Router.route called with undefined url for view: ",view);                
                return false;
            }

            Route = Mootor.Route;
            
            if (view === undefined) {
                var s,
                    route,
                    match;

                for (s in Router._collection) {
                    match = url.match(new RegExp(s));
                    if (match !== null) {
                        route = Router._collection[s];
                        route.view.params = match.slice(1, match.length);
                        route.url = url;
                        return route;
                    }
                }
                return undefined;
            } else {
                Router._collection[url] = new Route(url, view);
                return Router._collection[url];
            }
        }
    });
          
}(window.$, window.Mootor));
