/**
* UIFormDraw is a draw pseudo-input of a form
*
* @class UIFormDraw
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor, m) {
    
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
            
            var inputs = uiview.$el.find(".m-draw");
            inputs.each(function(index,element) {
                var self = new UIFormDraw();
                UIFormDraw._makeUI(self, element);
                UIFormDraw._addListeners(self);
            });
            
        },
        
        _makeUI: function(self, element) {

            var $element,
                coverHTML,
                $cover,
                $label,
                $canvas,
                $canvasContainer,
                h,
                w;
                        
            
            $element = $(element);

            $label = $("label[for=" + element.getAttribute("id") + "]");

            /*jshint multistr: true */
            coverHTML = '<div class="m-draw m-draw-cover"> \
                <span class="m-draw-icon m-icon-arrow-right-small"></span> \
            </div>';
        
            $cover = element.$cover = $(coverHTML).insertBefore(element);
            $label.insertBefore($cover.find(".m-draw-icon"));
            $element.hide();
        
            $canvasContainer = $('<div class="m-draw-canvas"> \
                    <div class="m-draw-canvas-header"> \
                        <span class="m-draw-cancel">Cancel</span> \
                        <span class="m-draw-done">Done</span> \
                    </div> \
                    <canvas></canvas> \
                    <div class="m-draw-canvas-footer"> \
                        <span class="m-draw-erase m-icon-erase"></span> \
                    </div> \
                </div>');
        
            $canvasContainer.hide();
            
            $canvasContainer.insertBefore(document.body.lastChild);
        
            // FIXME CHECK: hardcoded values (pixels)
            $canvas = $canvasContainer.find("canvas");

            h = m.app.ui.$container.height() - 190;
            w = m.app.ui.$container.width() - 40;
            
            $canvas.css("height",  h + "px");
            $canvas[0].setAttribute("height",  h + "px");

            $canvas.css("width", w + "px");
            $canvas[0].setAttribute("width",  w + "px");

            $(".m-draw-cancel").on("tap click", function() {
                $canvasContainer.hide();
            });

            $(".m-draw-erase").on("tap click", function() {
                self.clear();
            });
        
            $label[0].onclick = function() {
                return false;
            };
            // FICKE CHECK
            $cover.on("click tap", function() {
                $canvasContainer.show();
            });
        
            self._$cover = $cover;
            self._$canvasContainer = $canvasContainer;
            self._$canvas = $canvas;
            self._$label = $label;
            self._$ctx = $canvas[0].getContext("2d");
            self._canvasOffsetLeft = 0;
            self._canvasOffsetTop = 0;
            self._$ctx.strokeStyle = "black";
            self._$ctx.lineWidth = 2;
            self._$ctx.fillStyle = "black";
            self._drawing = false;
        },
        
        _addListeners: function(self) {
            
            var $canvas = self._$canvas,
                ctx = self._$ctx,
                lastX,
                lastY,
                offsetLeft,
                offsetTop;
                
            $canvas.on("touchstart", function(e) {
                self._canvasOffsetLeft = $canvas.offset().left - $(window).scrollLeft();
                self._canvasOffsetTop = $canvas.offset().top - $(window).scrollTop();

                lastX = e.changedTouches[0].clientX - self._canvasOffsetLeft;
                lastY = e.changedTouches[0].clientY - self._canvasOffsetTop;


                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(lastX, lastY, 2, 2);
                ctx.closePath();

                e.stopPropagation();
                e.preventDefault();                

                offsetLeft = self._canvasOffsetLeft;
                offsetTop = self._canvasOffsetTop;
            });
            
            $canvas.on("touchmove", function(e) {
                var x,
                    y,
                    touchX = e.changedTouches[0].clientX,
                    touchY = e.changedTouches[0].clientY;

                x = touchX - offsetLeft;
				y = touchY - offsetTop;

                ctx.beginPath();
                ctx.moveTo(lastX,lastY);
                ctx.lineTo(x,y);
                ctx.stroke();
                ctx.closePath();

                lastX = x;
                lastY = y;

                e.stopPropagation();
                e.preventDefault();

            });
            
            $canvas.on("touchend", function(e) {

                e.stopPropagation();
                e.preventDefault();
                
            });
        }
        
    });

    // Public methods and properties

    $.extend(UIFormDraw.prototype, {
        
        _$canvas: undefined,
        _$cover: undefined,
        _$label: undefined,
        

        /**
        * Export draw data
        *
        * @method export
        * @return {String} Exported data (ej: base 64 string)
        * @param {Array} options A list of options
        * @chainable
        */
        "export": function() {
            // code here
        },

        /**
        * Clear draw
        *
        * @method clear
        * @chainable
        */
        clear: function() {
            
            var ctx = this._$ctx,
                $canvas = this._$canvas,
                w = $canvas.width(),
                h = $canvas.height();
      
            // Store the current transformation matrix
            ctx.save();
        
            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
        
            // Restore the transform
            ctx.restore();
        }
        
    });        
    
    UIForm.registerControl(UIFormDraw);  

}(window.$, window.Mootor, window.m));
