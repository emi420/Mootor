/**
* UIFormDraw is a draw pseudo-input of a form
*
* @class UIFormDraw
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormDraw,
    
        UI,
        UIForm,
        UIFormVirtualInput;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    UIFormVirtualInput = Mootor.UIFormVirtualInput;
    
    // Private constructors

    UIFormDraw = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormDraw.prototype, UI.prototype);
    $.extend(UIFormDraw.prototype, UIFormVirtualInput.prototype);

    // Private static methods and properties

    $.extend(UIFormDraw, {
        _init: function(uiview) {
            
            var inputs,
                i,                
                $element,
                coverHTML,
                $cover,
                $label,
                $icon,
                $canvas;
                
            inputs = uiview.$el.find(".m-draw");
            inputs.each(function(index,element) {
                    
                $element = $(element);

                $label = $("label[for=" + element.getAttribute("id") + "]");

                coverHTML = '<div class="m-draw m-draw-cover">\
                    <span class="m-draw-icon m-icon-arrow-right-small"></span>\
                </div>';
                
                $cover = element.$cover = $(coverHTML).insertBefore(element);
                $label.insertBefore($cover.find(".m-draw-icon"))
                $element.hide();
                
                $canvas = $('<div class="m-draw-canvas">\
                        <div class="m-draw-canvas-header">\
                            <span class="m-draw-cancel">Cancel</span>\
                            <span class="m-draw-done">Done</span>\
                        </div>\
                        <canvas></canvas>\
                        <div class="m-draw-canvas-footer">\
                            <span class="m-draw-erase m-icon-erase"></span>\
                        </div>\
                    </div>');
                
                $canvas.hide();
                    
                $canvas.insertBefore(document.body.lastChild);
                
                // FIXME CHECK: hardcoded value (190 pixels)
                $canvas.find("canvas").css("height",  (m.app.ui.el.offsetHeight - 190) + "px");

                $(".m-draw-cancel").on("tap click", function() {
                    $canvas.hide();
                });
                
                $label[0].onclick = function() {
                    return false;
                }
                // FICKE CHECK
                $cover.on("click tap", function() {
                    $canvas.show();
                });
            });
            
        }
    });

    // Public methods and properties

    $.extend(UIFormDraw.prototype, {

        /**
        * Export draw data
        *
        * @method export
        * @return {String} Exported data (ej: base 64 string)
        * @param {Array} options A list of options
        * @chainable
        */
        export: function(options) {
             // code here
        },

        /**
        * Clear draw
        *
        * @method clear
        * @chainable
        */
        clear: function() {
            // code here
        }
        
    });        
    
    UIForm.registerControl(UIFormDraw);  

}(window.$, window.Mootor));
