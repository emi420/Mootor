

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
        UI,
        View;
        
    // Dependences

    UI = Mootor.UI;
    UIView = Mootor.UIView;
    View = Mootor.View;

    // Private constructors

    Mootor.UIForm = UIForm = function(element) {
        console.log("UIForm",element);
    };
    
    // Event handlers

    UIView.on("init", function(self) {
        var i;
        for (i in UIForm._controls) {
            UIForm._controls[i].constructor._init(self);
        }
    });


    // Prototypal inheritance
    $.extend(UIForm.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIForm, {
        /**
        * Controls
        * @private
        */
        _controls: [],

        registerControl: function(constructor) {
            UIForm._controls.push({
                constructor: constructor
            });
        }
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
