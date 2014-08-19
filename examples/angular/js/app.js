(function(m, angular) {

    "use strict";
    
    var app = m.app({
        views: [
            "index"
        ]
    });

    app.route("^$", app.view("index"));
    app.route("^#form/(.*)", app.view("form"));
    app.route("^#form", app.view("form"));
    app.init();


    angular.module('ErrorCatcher', [])
        .factory('$exceptionHandler', function () {
            return function errorCatcherHandler(exception, cause) {
                console.error(exception.stack);
                alert("Exception: " + exception + " Cause: " + cause);
            };
        });


    m.app.on("ready", function() {
        
        Mootor.ng('main', ['ErrorCatcher', 'main.controllers', 'main.services']);
        
        Mootor.$ngMootorRoute(
            m.app.view("index"),
            "IndexCtrl"
        );

        Mootor.$ngMootorRoute(
            m.app.view("form"),
            "FormCtrl",
            function(params) { 
                return { 
                    itemId: params[0] 
                }
            }
        );
        
        
    });
    
    document.addEventListener("deviceready", function() {
        if (StatusBar) {
            StatusBar.overlaysWebView(false);
        }
    }, false);

}(window.m, angular));