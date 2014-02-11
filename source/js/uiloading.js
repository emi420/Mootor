/**
* The UILoading is the loading indicator 
*
* @class UILoading
* @extends UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    // Force strict mode for ECMAScript
    "use strict";

    var UI,
        UILoading;

    // Dependences

    UI = Mootor.UI;

    // Private constructors

    UILoading = Mootor.UILoading = function() {
        // code here
    };

    // Prototypal inheritance

    UILoading.prototype = UI.prototype;

    
    // Private static methods and properties

    $.extend(UILoading, {
        // code here
    });

    // Public methods

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
      
}(window.$, window.Mootor));
