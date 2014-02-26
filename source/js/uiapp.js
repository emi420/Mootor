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
        UIApp,
        App;

    // Dependences

    UI = Mootor.UI;
    Event = Mootor.Event;
    App = Mootor.App;

    // Private constructors

    UIApp = Mootor.UIApp = function() {
        var $container,
            app = m.app,
            self = this;

        if (Mootor.App._options.container) {
            $container = Mootor.App._options.container;
        }
        else {
            $("html").addClass("m-html");
            $container = $("body");
        }
        $container.addClass("m-app");

        this.$el = $("<div>").addClass("m-views-container")
        this.el = this.$el[0];        
        this.$el.appendTo($container);
        
        Event.dispatch("UIApp:init", this);
    
    };
    
    // Event handlers
    Event.on("App:init", function(self) {
        $.extend(self, {
           ui: new UIApp()
        });
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
