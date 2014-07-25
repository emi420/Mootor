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
                $canvasHeader,
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
            $canvasHeader = $canvasContainer.find(".m-draw-canvas-header");
            
            $canvasContainer.insertBefore(document.body.lastChild);
            
             $canvasContainer[0].addEventListener("touchmove", function(e) {
                 e.preventDefault();
                 e.stopPropagation();
             })
        
            $canvas = $canvasContainer.find("canvas");

            h = m.app.ui.$container.height();
            w = m.app.ui.$container.width() - 40;

            if (w > h) {
                h = m.app.ui.$container.height() - 30;
                $canvasHeader.hide();
            } else {
                h = m.app.ui.$container.height() - 85;
                $canvasHeader.show();
            }

            $canvas.css("height",  h + "px");
            $canvas.css("width", w + "px");

            $canvas[0].setAttribute("height",  h + "px");
            $canvas[0].setAttribute("width",  w + "px");
            
            var image = new Image();

            $.extend(element, 
                {"export": function() { return image.src } },
                {
                    "import": function(data) { 
                        self._image.src = data;
                    }
                }
                ,{"clear": function() { 
                   var encodedImageData = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";                
                   self._image.src = encodedImageData;
                   self.clear();
                }}
            );

            window.onresize = function() {
                
                image.onload = function() {
                    
                    self._$ctx.save();
                
                    w = m.app.ui.$container.width() - 40;
                    h = m.app.ui.$container.height();
            
                    if (w > h) {
                        h = m.app.ui.$container.height() - 30;
                        $canvas[0].setAttribute("height",  h + "px");
                        $canvas[0].setAttribute("width",  w + "px");
                        $canvasHeader.hide();
                    } else {
                        h = m.app.ui.$container.height() - 85;
                        $canvasHeader.show();
                    }

                    $canvas.css("width", w + "px");
                    $canvas.css("height", h + "px");
                    $canvas[0].setAttribute("height",  h + "px");
                    $canvas[0].setAttribute("width",  w + "px");
            
                    self._$ctx.drawImage(image,0,0);
            
                    self._$ctx.lineWidth = 2;
                    self._$ctx.restore();

                }

                image.src = $canvas[0].toDataURL();

            }

            $(".m-draw-cancel").on("tap", function(e) {
                $canvasContainer.hide();
                e.stopPropagation();
                e.preventDefault();
                return false;
            });

            $(".m-draw-erase").on("tap", function(e) {
                e.stopPropagation();
                e.preventDefault();
                self.clear();
                return false;
            });

            $(".m-draw-done").on("tap", function(e) {
                e.stopPropagation();
                e.preventDefault();

                var encodedImageData = $canvas[0].toDataURL();                
                image.src = encodedImageData;

                $canvasContainer.hide();
                return false;
            });
        
            $label[0].onclick = function() {
                return false;
            };
            // FICKE CHECK
            $cover.on("tap", function(e) {
                e.stopPropagation();
                e.preventDefault();
                $canvasContainer.show();
                self.clear();
                self._$ctx.drawImage(self._image,0,0);
                return false;
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
            self._image = image;
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
        * @example
        *   var sign = $("#myDrawInput").m.formDraw.export();
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
