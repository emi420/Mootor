/**
 * @summary User Interface Mootor plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */
  
(function ($) {

    "use strict";/**
 * DrawArea
 * @return {object} Draw Mootor UI DrawArea object
 */
var DrawArea = function(options) {
    _DrawArea.init(this, options);
    return this;
}; 

/*
 * Public prototype
 */
DrawArea.prototype = {
    clear: function() {
        var ctx = this.ctx,
            canvas = this.canvasElement;
        
        // Store the current transformation matrix
        ctx.save();
        
        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        
        // Restore the transform
        ctx.restore();
    },
    
    export: function(format) {
        format !== undefined ? format : "image/png";
        return this.canvasElement.toDataURL(format);
    }
    
};

var _DrawArea = {
    init: function(self, options) {
        self.el = options.el;
        self.canvasElement = _DrawArea.createCanvas(self);
        _DrawArea.setAttributes(self.canvasElement, options);
        self.ctx = self.canvasElement.getContext("2d");
        _DrawArea.addEventListeners(self);        
    },
    createCanvas: function(self) {
        var canvasElement = document.createElement("canvas");
        $(canvasElement).setClass("moo-draw-canvas");
        self.el.appendChild(canvasElement);
        return canvasElement;
    },
    setAttributes: function(canvas, options) {
        if (options.width !== undefined) {
            canvas.setAttribute("width", options.width);
        }  
        if (options.height !== undefined) {
            canvas.setAttribute("height", options.height);
        }  
    },
    addEventListeners: function(self) {
        var canvas = self.canvasElement,
            ctx = self.ctx,
            canvasX,
            canvasY;
        
        $(canvas).on("touchend", function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        
        $(canvas).on("touchmove", function(e) {
            e.stopPropagation();
            e.preventDefault();
        }); 
        
        $(canvas).onDragMove(function(gesture) {
            var x,
                y,
                lastX,
                lastY;
                
            if (canvasX === undefined) {
                canvasX = canvas.offsetLeft;
                canvasY = canvas.offsetTop;
            }

            lastX = gesture.lastX - canvasX;
            lastY = gesture.lastY - canvasY;
            x = gesture.x - canvasX;
            y = gesture.y - canvasY;

            ctx.moveTo(lastX,lastY);
            ctx.lineTo(x,y);
            ctx.stroke();
        });

        $(canvas).on("touchend", function(e) {

            var x = e.changedTouches[0].pageX - canvasX,
                y = e.changedTouches[0].pageY - canvasY;

            ctx.moveTo(x-1,y-1);
            ctx.lineTo(x,y);
            ctx.stroke();

            ctx.moveTo(x+1,y+1);
            ctx.lineTo(x,y);
            ctx.stroke();

            ctx.moveTo(x-1,y+1);
            ctx.lineTo(x,y);
            ctx.stroke();

            ctx.moveTo(x+1,y-1);
            ctx.lineTo(x,y);
            ctx.stroke();

        });

    }
}

$.extend({
    drawArea: function(options) {
        if (options === undefined) {
            options = {};
        }
        options.el = this.el;
        return new DrawArea(options);
    }
});
}(Mootor));

