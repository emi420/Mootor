/**
* UIFormCamera is a camera pseudo-input of a form
*
* @class UIFormCamera
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormCamera,
        UIFormCameraPicture,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormCamera = function() {
        // code here
    };

    UIFormCameraPicture = functon() {
        UIFormCameraPicture,
    }

    // Prototypal inheritance
    $.extend(UIFormCamera.prototype, UI.prototype);
    $.extend(UIFormCamera.prototype, UIFormPseudoInput.prototype);

    // Private static methods and properties

    $.extend(UIFormCamera, {
   
    });

    $.extend(UIFormCameraPicture, {
   
    });

    // Public methods and properties

    $.extend(UIFormCamera.prototype, {
        
        /**
        * Take a picture
        *
        * @method take
        * @chainable
        */
        take: function(){
            // code here
        },

        /**
        * Choose a picture
        *
        * @method choose
        * @chainable
        */
        choose: function(){
            // code here
        },
        
        /**
        * Returns all pictures paths
        *
        * @method all
        * @return {Array} Array of pictures paths
        * @chainable
        */
        all: function() {
             // code here
        },
        
        /**
        * Remove picture from input
        *
        * @param {UIFormCameraPicture} picture Picture to be removed
        * @method remove
        */
        remove: function(picture) {
            // code here
        }
        
    }); 
    
    $.extend(UIFormCameraPicture.prototype, {
        /**
        * Export picture data
        *
        * @method export
        * @return {String} Exported data (ej: base 64 string)
        * @param {Array} options A list of options
        * @chainable
        */
        export: function(options) {
             // code here
        }                
    });    

}(window.$, window.Mootor));
