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
        Event,
        View;

    // Dependences

    Event = Mootor.Event;
    View = Mootor.View;
    UI = Mootor.UI;
        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        this.view = view;
        Event.dispatch("UIView:init", this);
    };

    // Event handlers
    
    Event.on("View:init", function(self) {
        self.ui = new UIView(self);
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
