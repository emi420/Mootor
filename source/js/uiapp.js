/**
* The UIApp class is the UI representation of an app
*
* @class UIApp
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UI,
        UIApp;

    // Private constructors
    UIApp = function() {
    };

    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UIApp: UIApp});

    
    // Private static methods and properties

    $.extend(UIApp, {
   
    });

    //This Class extends UI
    UI = Mootor.ns("UI");
    UIApp.prototype = UI.prototype;

    //Public methods
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
}(window.$));
