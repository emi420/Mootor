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

    UI = Mootor.UI;
    Event = Mootor.Event;
    View = Mootor.View;
        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var el = UI._container;
        this.el = el;
        this.view = view;

        Event.on("UIPanel:init:"+this.view.id, function(uiview) {
            Event.dispatch("UIView:init", self.ui);
        });


    };

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
