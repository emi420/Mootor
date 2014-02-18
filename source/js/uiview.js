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

(function ($, Mootor) {

    "use strict";

    var UI,
        UIView,
        Event;

    // Dependences

    UI = Mootor.UI;
    Event = Mootor.Event;
        
    // Private constructors

    UIView = Mootor.UIView = function(viewid) {
        // code here
    };
    
    // Event handlers
    // TODO

    // Private static methods and properties

    $.extend(UIView, {
        
        _collection: {},
        
        _set: function(view, options, self) {
            var viewid = view.id,
                uiview,
                i,
                ready = false;
            
            if ((viewid in UIView._collection) === false) {
                uiview = UIView._collection[viewid] = {};
            } else {
                uiview = UIView._collection[viewid];                
            }

            for (i in options) {
                uiview[i] = options[i];
            }
            
            if (uiview.html === true && uiview.css === true && uiview.script === true) {
                uiview.ready = true;
                Event.dispatch("UIView:ready", view);
            }
            
        },
        
        _get: function() {
            
        },
    });

    // Public methods

    UIView.prototype = {
        // code here
    }

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor));
