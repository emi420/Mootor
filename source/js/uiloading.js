/**
* The UILoading is the loading indicator 
*
* @class UILoading
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($) {
    // Force strict mode for ECMAScript
    "use strict";

    var UI,
        UILoading;

    // Private constructors
    UILoading = function() {
    };

    //This Class extends UI
    UI = Mootor.ns("UI");
    UILoading.prototype = UI.prototype;


    //Add this Class as a Mootor module
    $.extend(Mootor.mod, {UILoading: UILoading});
    
    // Private static methods and properties

    $.extend(UILoading, {
   
    });

    //Public methods

    $.extend(UILoading.prototype, {
        
        /**
        * Set the style for the loading animation
        *
        * @method style
        * @param {object} [options] Style options TODO: Define this object's structure
        * @return {UILoading} 
        * @chainable
        */
        style: function(options) {
            
        }
    });        
}(window.$));
