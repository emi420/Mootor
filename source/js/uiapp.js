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
        var el;
        el = document.createElement("div");
        el.setAttribute("class", "m-panel-container");
        document.body.appendChild(el);
        this.el = el;
        this.$el = $(el);
    };
    
    // Event handlers
    Event.on("App:init", function(self) {
        $.extend(m.app, {
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
