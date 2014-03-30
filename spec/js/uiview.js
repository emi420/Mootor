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
    
    View.on("init", function(self) {
        self.ui = new UIView(self);

        self.on("getHtml", function() {
            UIView.dispatch("init", self.ui);
        });


        self.on("ready", function() {
            for (var index in UIView._enhancements) {
                $(UIView._enhancements[index].selector).each(function (i,element) {
                    new UIView._enhancements[index].className(element);    
                });    
            }
        });
    });


        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var self = this;
        self.view = view;
    };


    // Private static methods and properties

    Event.extend(UIView, "UIView");

    // Private static methods and properties

    $.extend(UIView, {
        /**
        * Element enhancements
        * @private
        */
        _enhancements: [],

        registerEnhancement: function(selector,className) {
            UIView._enhancements.push({selector:selector,className:className});
        }
    });

    // Public methods

    UIView.prototype = {
        // code here
    };

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
