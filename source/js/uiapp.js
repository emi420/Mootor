/**
* The UIApp class is the UI representation of an app
*
* @class UIApp
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI,
        UIApp;

    // Dependences

    UI = Mootor.UI;

    // Private constructors

    UIApp = Mootor.UIApp = function() {
        var container;
        var app = m.app;

        $("html").addClass("m-html");
        if (app.container) {
            container = app.container;
        }
        else {
            container = $("body");
        }
        container.addClass("m-app");
        this.el = $("<div>").addClass("m-views-container")
        this.el.appendTo(container);
    };

    // Private static methods and properties

    $.extend(UIApp, {
        // code here
    });

    // Prototypal inheritance

    $.extend(UIApp.prototype, UI.prototype);

    // Public methods

    $.extend(UIApp.prototype, {
        
        /**
        * Show/Hide the loading indicator
        *
        * @method loading
        * @param {Boolean} [show] Show or hide the loading indicator
        * @return {Boolean}
        */
        loading: function(show) {
            
        }

    });        

}(window.$, window.Mootor));
