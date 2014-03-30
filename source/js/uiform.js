

/**
* The UIForm is a form to input data
*
* @class UIForm
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIForm,
        UIView,
        UI;

    // Dependences

    UI = Mootor.UI;
    UIView = Mootor.UIView;

    // Private constructors

    UIForm = function(element) {
        console.log("UIForm",element);
    };

    // Event handlers

    UIView.registerEnhancement(".m-form",UIForm);

    // Prototypal inheritance
    $.extend(UIForm.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIForm, {
   
    });

    // Public methods and properties

    $.extend(UIForm.prototype, {
        
        /**
        * Serialize form's data
        *
        * @method serialize
        * @return {Object} Serialized data in a JSON object
        */
        serialize: function() {
            
        },

        /**
        * Clear all form fields
        *
        * @method clear
        * @chainable
        */
        clear: function() {
            // code here
        }
    });        
}(window.$, window.Mootor));
