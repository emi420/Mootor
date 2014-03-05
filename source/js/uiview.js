/**
* The UIView class is the UI representation of a view
*
* @class UIView
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, document) {

    "use strict";

    var UIView,
    
        UI,
        Event,
        View;

    // Dependences

    Event = Mootor.Event;
    UI = Mootor.UI;
    View = Mootor.View;

    // Event handlers
    
    Event.on("View:startInit", function(self) {
        self.ui = new UIView(self);
    });
        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var self = this;

        self.view = view;
        UIView.dispatch("init", self);

    };


    // Private static methods and properties

    $.extend(UIView, {
        on: function(event, callback) {
            Event.on("UIView:" + event, callback); 
        },
        dispatch: function(event, self) {
            Event.dispatch("UIView:" + event, self);
        }
    });

    // Public methods

    UIView.prototype = {
        // code here
    }

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
