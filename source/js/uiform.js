

/**
* The UIForm is a form to input data
*
* @class UIForm
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
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

        /**
         * @method registerControl
         * @param {Object} Constructor An object with a private _init method
         * @example
         *     UIForm.registerControl(UIFormText);  
         *
         */
        registerControl: function(constructor) {
            UIForm._controls.push({
                constructor: constructor
            });
        }

    });

}(window.$, window.Mootor));
