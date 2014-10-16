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
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormDraw = Mootor.UIFormDraw = function(element) {
        UIFormDraw.__init(this, element, {template: false});
    };

    // Prototypal inheritance
    if (UI) {
        $.extend(UIFormDraw.prototype, UI.prototype);
    }

    // Private static methods and properties

    $.extend(UIFormDraw, {
        
        _init: function(uiview) {
            var elements;
            elements = uiview.$el.find(".m-draw");
            elements.each(function(index,element) {
                new UIFormDraw(element);
            });
        },
        
        __init: function(self, element, options) {
            self._$originalElement = element;
            self.options = options;
            UIFormDraw._build(self, element);
        },
        
        _build: function(self, element) {
            
            self._$img = element.parentElement.getElementsByTagName("img")[0];
            
            if (self.options && self.options.template === false) {
                self._$coverHTML = $(UIFormDraw._template)[0];
                $(element).replaceWith(self._$coverHTML);
            } else {
                self._$coverHTML = element;
            }

            $(self._$img).addClass("m-hidden");
            self._$input = self._$coverHTML.getElementsByTagName("input")[0];
            self._$placeholder = self._$coverHTML.getElementsByClassName("m-draw-placeholder")[0];
            
            self._$modalContainer = self._$coverHTML.getElementsByClassName("m-draw-canvas")[0];

            
            // FIXME CHECK
            // init modal and add event listeners to it only once
            
            UIFormDraw._moveAttrs(self);
            
            UIFormDraw._initModal(self);
            UIFormDraw._initCanvas(self);
            UIFormDraw._setCanvasSize(self);
            UIFormDraw._addEventListeners(self);
            
            self.clear()
            
            window.onresize = function() {
                UIFormDraw._onResize(self);
            };

            self._$placeholder.innerHTML = self._$img.getAttribute("title");

        },
    
        _initModal: function(self) {
            self._$modalContainer.parentElement.removeChild(self._$modalContainer);
            if (UIFormDraw._initialized !== true) {
                document.body.appendChild(self._$modalContainer);
                UIFormDraw._initialized  = true;
                UIFormDraw._$modalContainer = self._$modalContainer;
            } else {
                self._$modalContainer = UIFormDraw._$modalContainer;
            }
        },


        _initCanvas: function(self) {
            self._$canvas = self._$modalContainer.getElementsByTagName("canvas")[0];
            self._$ctx = self._$canvas.getContext("2d");
            self._$ctx.strokeStyle = "black";
            self._$ctx.lineWidth = 2;
            self._$ctx.fillStyle = "black";
            self._$canvasHeader = self._$modalContainer.getElementsByClassName("m-draw-canvas-header")[0];
            self._$clearBtn = self._$modalContainer.getElementsByClassName("m-draw-erase")[0];
            self._$saveBtn = self._$modalContainer.getElementsByClassName("m-draw-done")[0];
            self._$cancelBtn = self._$modalContainer.getElementsByClassName("m-draw-cancel")[0];
        },
        
        _setCanvasSize: function(self) {
            var h = window.innerHeight;
            var w = window.innerWidth - 40;

            if (w > h) {
                h = h - 30;
                $(self._$canvasHeader).addClass("m-hidden")
            } else {
                h = h - 85;
                $(self._$canvasHeader).removeClass("m-hidden")
            }

            self._$canvas.style.height = h + "px";
            self._$canvas.style.width = w + "px";

            self._$canvas.setAttribute("height",  h + "px");
            self._$canvas.setAttribute("width",  w + "px");            
        },

        _moveAttrs: function(self) {
        
            var aAttrs = {
                type:         self._$input.getAttribute("type"),
                accept:       self._$input.getAttribute("accept"),
            }

            self._$coverHTML.removeAttribute("type");
            self._$coverHTML.removeAttribute("accept");
            self._$coverHTML.removeAttribute("placeholder");

            self._$input.setAttribute("type", aAttrs.type);
            self._$input.setAttribute("accept", aAttrs.accept);
        },
    
        _onResize: function(self) {
            
            
            // FIXME CHECK
            
            UIFormDraw._setCanvasSize(self);
            
            /*var self = self;
            
            self._$img.onload = function() {
                
                self._setCanvasSize();

                self._$ctx.drawImage( self._$img,0,0);
                self._$ctx.lineWidth = 2;
                self._$ctx.restore();

             }

             self._$img.src = self._$canvas.toDataURL();*/
            
        },
    
        _addEventListeners: function(self) {
        
            var 
                $canvas = self._$canvas,
                ctx = self._$ctx,
                lastX,
                lastY,
                offsetLeft,
                offsetTop;
                
            self._$coverHTML.parentElement.addEventListener("click", function(e) {
                self.open();
            });

            self._$cancelBtn.addEventListener("click", function() {
                self.close();
            });

            self._$clearBtn.addEventListener("click", function() {
                self.clear();
            });

            self._$saveBtn.addEventListener("click", function() {
                self.save();
            });

                
            $canvas.addEventListener("touchstart", function(e) {
                
                self._canvasOffsetLeft = $canvas.offsetLeft - window.scrollX;
                self._canvasOffsetTop = $canvas.offsetTop - window.scrollY;

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
            
            $canvas.addEventListener("touchmove", function(e) {
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
            
            $canvas.addEventListener("touchend", function(e) {

                e.stopPropagation();
                e.preventDefault();
                
            });

        },
        
        _save: function(self) {
            var instance = UIFormDraw._activeInstance;
            var $img = instance._$img;


            $img.onload = function() {
                instance.close();
            }
            $img.src = instance._$canvas.toDataURL();
        }
        
    });

    // Public methods and properties

    $.extend(UIFormDraw.prototype, {
        
        // Open modal or file selector
        "open": function() {
            
            var self = this;
            $(self._$modalContainer).removeClass("m-hidden");
            self.clear();
            self._$ctx.drawImage( self._$img,0,0);
            self._$ctx.lineWidth = 2;
            self._$ctx.restore();
            
            UIFormDraw._activeInstance = self;
            
        },
    
        // Clear current draw
        "clear": function() {
            var self = this,
                ctx = self._$ctx,
                $canvas = self._$canvas,
                w = $canvas.offsetWidth,
                h = $canvas.offsetHeight;
      
            // Store the current transformation matrix
            ctx.save();
        
            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
        
            // Restore the transform
            ctx.restore();
        },
        
        // Close modal
        "close": function() {
            var self = this;
            $(self._$modalContainer).addClass("m-hidden");
        },
        
        save: function() {
            var self = this;
            UIFormDraw._save(self);
        },

        options: {},
        
        _$coverHTML: {} ,
        _$canvas: {} ,
        _$modalContainer: {} ,
        _$clearBtn: {} ,
        _$saveBtn: {} ,
        _$input: {},
        _canvasOffsetLeft: 0,
        _canvasOffsetTop: 0,

    });        
    
    UIFormDraw._template = '<div class="m-draw m-draw-cover"> \
        <input class="m-hidden" type="file" class="m-draw" accept="image/*" /> \
       <span class="m-draw-placeholder">...</span> \
        <div class="m-hidden m-draw-canvas"> \
            <div class="m-draw-canvas-header"> \
                <span class="m-draw-cancel m-icon-delete-circle"></span> \
                <span class="m-draw-done m-icon-ok-circle"></span> \
            </div> \
            <canvas></canvas> \
            <div class="m-draw-canvas-footer"> \
                <span class="m-draw-erase m-icon-erase"></span> \
            </div> \
        </div> \
    </div>';
    
    if (UIForm) {
        UIForm.registerControl(UIFormDraw);  
    }

}(window.$, window.Mootor));
