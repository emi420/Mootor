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
        _pendingGo,
        _lastHash;
                    
    // Dependencies
    
    App = Mootor.App;
    Route = Mootor.Route;
    
    // Private constructors

    Router = Mootor.Router = function() {
    };

    // Event handlers

    window.onpopstate = function() {
        
        var urlBack;

        if (_lastHash === window.location.hash) {
            urlBack = m.app.history[m.app.history.length - 2];
            if (urlBack !== undefined) {
                _appGo(urlBack);
            } else {
                _appGo(window.location.hash);
            }
        } else {
            _appGo(window.location.hash);
        }

        _lastHash = window.location.hash;

    };


    _appGo = function(url) { 
        _pendingGo = url;
    };

    App.on("ready", function() {
        _appGo = function(url) {
            m.app.go(url);
        };
        if (_pendingGo === undefined) {
            _pendingGo = window.location.hash
        }
        
        m.app.go(_pendingGo);
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
            Route = Mootor.Route;
            
            if (view === undefined) {
                var s,
                    route,
                    match;
                    
                    if (url === undefined) {
                    //    debugger;
                    }

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
