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

    var UI,
        UIView,
        Event;

    // Dependences

    Event = Mootor.Event;
        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var el = app.ui.el;
        this.el = el;
        this.view = view;
    };
    
    // Event handlers
    Event.on("View:init", function(self) {
        $.extend(self, {
            ui: new UIView(self)
        })
        Event.dispatch("UIView:init", self.ui);
    });

    // Private static methods and properties

    $.extend(UIView, {
        
    });

    // Public methods

    UIView.prototype = {
        // code here
    }

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
