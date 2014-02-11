/**
* The UIView class is the UI representation of a view
*
* @class UIView
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI,
        UIView;


    // Dependences

    UI = Mootor.UI;
        
    // Private constructors

    UIView = Mootor.UIView = function() {
        // code here
    };


    // Private static methods and properties

    $.extend(UIView, {
   
    });

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

    // Public methods

    $.extend(UIView.prototype, {
        
        /**
        * A reference to the view
        *
        * @property view
        * @type View
        */
        view: {
            
        }
    });        
}(window.$, window.Mootor));
