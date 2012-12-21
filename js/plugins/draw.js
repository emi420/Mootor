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
    this.el = options.el;
    this.init(options);
    return this;
}; 

/*
 * Public prototype
 */
DrawArea.prototype = {
    init: function(options) {
        this.canvasElement = _DrawArea.createCanvas(this);
        this.ctx = this.canvasElement.getContext("2d");
        _DrawArea.addEventListeners(this);
    }
};

var _DrawArea = {
    createCanvas: function(self) {
        var canvasElement = document.createElement("canvas");
        $(canvasElement).setClass("moo-draw-canvas");
        self.el.appendChild(canvasElement);
        return canvasElement;
    },
    addEventListeners: function(self) {
        var canvas = self.canvasElement,
            ctx = self.ctx,
            canvasX = canvas.offsetLeft,
            canvasY = canvas.offsetTop;
            
        console.log('canvasX: ' + canvasX);
        console.log('canvasY: ' +canvasY);
        
        $(canvas).onDragMove(function(gesture) {
            var x,
                y,
                lastX,
                lastY;
            
            lastX = gesture.lastX - canvasX;
            lastY = gesture.lastY - canvasY;
            x = gesture.x - canvasX;
            y = gesture.y - canvasY;
            
            gesture.e.stopPropagation();
            ctx.moveTo(lastX,lastY);
            ctx.lineTo(x,y);
            ctx.stroke();
            
            console.log('x :' + x)
            console.log('lastX :' + lastX)
            console.log('y :' + y)
            console.log('lastY :' + lastY)
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

