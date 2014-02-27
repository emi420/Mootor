/**
* The UILoading is the loading indicator 
*
* @class UILoading
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    // Force strict mode for ECMAScript
    "use strict";

    var UILoading,
        
        UIApp,
        UI;

    // Dependences

    UI = Mootor.UI;
    UIApp = Mootor.UIApp;

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
    

    $.extend(UIApp.prototype, {
        
        /**
        * Show/Hide the loading indicator
        *
        * @method loading
        * @for UIApp
        * @param {Boolean} [show] Show or hide the loading indicator
        * @return {Boolean}
        */
        loading: function(show) {
            
        }

    });   
      
}(window.$, window.Mootor));
