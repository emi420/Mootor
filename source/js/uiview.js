/**
* The UIView class is the UI representation of a view
*
* @class UIView
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UI,
        UIView;

    // Private constructors
    UIView = function() {
    };

    //This Class extends UI
    UI = Mootor.ns("UI");
    UIView.prototype = UI.prototype;


    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UIView: UIView});
    
    // Private static methods and properties

    $.extend(UIView, {
   
    });

    //Public methods

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
}(window.$));
