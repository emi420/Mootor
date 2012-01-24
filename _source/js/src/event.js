/*
 * Mootor Events (coded by emi420@gmail.com)
 */

 /*
  *     TODO: 
  *
  *     - Event Delegation 
  *     - Remove Mootor.listeners array
  *     - In-time branching
  */
 
(function (Mootor) {

    "use strict";

    var Drag,
        Touch,
        Orientation,
        preventDefault,
        Click;

    // Utils

    preventDefault = function (element) {

        // Prevents default callback
        element.addEventListener('click', function (e) { e.preventDefault(); }, false);
        element.onclick = function () {return false; };

        // Disable selection, copy, etc
        element.style.webkitTouchCallout = "none";
        element.style.webkitUserSelect = "none";
        element.style.webkitUserDrag = "none";
        element.style.webkitUserModify = "none";
        element.style.webkitHighlight = "none";

    };

    // Touch

    Touch = function (element) {

        this.element = this;
        this.el = element;

        // Prevent default listeners and styles
        preventDefault(element);

        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchend', this, false);

    };

    // Touch Handler
    Touch.prototype.handleEvent = function (e) {

        switch (e.type) {
        case 'touchstart':
            this.onTouchStart(e);
            break;
        case 'touchend':
            this.onTouchEnd(e);
            break;
        }

    };

    // Touch Start
    Touch.prototype.onTouchStart = function () {

        if (this.onTouchStart.callback !== undefined) {
            this.onTouchStart.callback.call();
        }

    };

    // Touch End
    Touch.prototype.onTouchEnd = function () {

        if (this.onTouchEnd.callback !== undefined) {
            this.onTouchEnd.callback(this.el.rel);
        }

    };

    // Drag 
    Drag = function (element) {

        this.el = element;
        this.touch = {
            startX: 0,
            endX: 0,
            lastX: 0,
            startY: 0,
            endY: 0,
            lastY: 0
        };

        // Prevent default listeners and styles
        preventDefault(element);

        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchmove', this, false);
        element.addEventListener('touchend', this, false);

    };

    // Dreag Handler
    Drag.prototype.handleEvent = function (e) {

        switch (e.type) {
        case 'touchstart':
            this.onDragStart(e);
            break;
        case 'touchmove':
            this.onDragMove(e);
            break;
        case 'touchend':
            this.onDragEnd(e);
            break;
        }

    };

    // Drag Start
    Drag.prototype.onDragStart = function (e) {

        var e_touch = e.touches[0];
        this.touch.lastX = this.touch.startX = e_touch.clientX;
        this.touch.lastY = this.touch.startY = e_touch.clientY;

    };

    // Drag Move
    Drag.prototype.onDragMove = function (e) {

        var e_touch = e.touches[0],
            distanceX = e_touch.clientX - this.touch.lastX,
            distanceY = e_touch.clientY - this.touch.lastY,
            threshold = 15,
            distanceFromOriginX,
            distanceFromOriginY;
        this.touch.lastX = e_touch.clientX;
        this.touch.lastY = e_touch.clientY;
        distanceFromOriginX = this.touch.startX - this.touch.lastX;
        distanceFromOriginY = this.touch.startY - this.touch.lastY;

        // Set isDragging flags

        if (Math.abs(distanceFromOriginX) > threshold && Mootor.listeners.isDraggingY === false) {
            Mootor.listeners.isDraggingX = true;
        }
        if (Math.abs(distanceFromOriginY) > threshold && Mootor.listeners.isDraggingX === false) {
            Mootor.listeners.isDraggingY = true;
        }

        // Callback

        if (this.onDragMove.callback !== undefined) {
            this.onDragMove.callback({
                distanceX: distanceX,
                distanceFromOriginX: distanceFromOriginX,
                distanceY: distanceY,
                distanceFromOriginY: distanceFromOriginY
            });
        }

    };

    // Drag End
    Drag.prototype.onDragEnd = function () {

        var distanceX = this.touch.startX - this.touch.lastX,
            distanceY = this.touch.startY - this.touch.lastY;

        if (this.onDragEnd.callback !== 'undefined') {
            this.onDragEnd.callback({
                distanceX: distanceX,
                distanceY: distanceY
            });
        }

        Mootor.listeners.isDraggingX = false;
        Mootor.listeners.isDraggingY = false;

    };

    // Orientation
    Orientation = function (element, callback) {

        this.callback = callback;
        this.element = this;
        element.addEventListener("orientationchange", this, false);

    };

    // Handler
    Orientation.prototype.handleEvent = function (e) {

        if (e.type === 'orientationchange') {
            this.onOrientationChange(e);
        }

    };

    // Change
    Orientation.prototype.onOrientationChange = function () {

        this.callback();

    };
    
    // *** EXPERIMENTAL ***
    
    // Click
    
    Click = function (element, callback) {

        this.el = element;
        this.callback = callback;
        this.el.addEventListener('click', this, false);
        this.initX = 0;
        this.lastX = 0;

    }
    
    Click.prototype.handleEvent = function(e) {

        switch (e.type) {
        case 'click':
            this.onClick(e);
            break;
        }
        //debugger;
        
    }
        
    // On Click
    Click.prototype.onClick = function(e) {

        // Instancia de Click
        console.log("Click instance: " + this);
        // Evento
        console.log("Event: " + e);
        // Elemento en donde ocurre el evento
        console.log("Click on element: " + this.el);
        // Callback
        console.log("Callback: " + this.callback);
                
        var distance = e.clientX - this.lastX;
        this.lastX = e.clientX;
        var result = {
            distance: distance,
            callback: this.callback
        }
        
        // Calling callback
        if (typeof this.callback === "object") {
            this.callback.callback(result)
        } else {
            this.callback(result);
        }

    }

    // *** EXPERIMENTAL ***

    Mootor.Event = {

        bind: function (el, eventtype, callback) {

            var listenerId = Mootor.listeners.count,
                listenerCount = 1,
                listener,
                i = 0;

            switch (eventtype) {

            // *** EXPERIMENTAL ***
            case 'clickEnd':
                // New 'click' handler
                return new Click(el, callback);
                break;

            // *** EXPERIMENTAL ***

            case 'dragMove':
                el.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                listener = Mootor.listeners[listenerId] = new Drag(el);
                listener.onDragMove.callback = callback;
                listener.id = listenerId;

                Mootor.listeners.count += 1;
                break;

            case 'dragEnd':

                for (i = 0; i < Mootor.listeners.count; i++) {
                    if (Mootor.listeners[i].el === el) {
                        listenerId = i;
                        listenerCount = 0;
                    }
                }
                if (listenerCount > 0) {
                    Mootor.listeners[listenerId] = new Drag(el);
                    Mootor.listeners.count += listenerCount;
                }
                listener = Mootor.listeners[listenerId];
                listener.onDragEnd.callback = callback;
                listener.id = listenerId;
                break;

            case 'touchStart':
                console.log("touch start");
                break;
                
            case 'touchEnd':
                listener = Mootor.listeners[listenerId] = new Touch(el);
                listener.onTouchEnd.callback = callback;
                listener.id = listenerId;
                Mootor.listeners.count += 1;
                break;

            // FIXME CHECK: orientation event support on Android 
            // and other devices that lack of this event 
            case "orientationChange":
                listener = Mootor.listeners[listenerId] = new Orientation(el, callback);
                listener.id = listenerId;
                Mootor.listeners.count += 1;
                break;

            }
        }

    };

    Mootor.extend(Mootor.Event);

    /*
     * Private
     */

    Mootor.listeners = {
        count: 0,
        isDraggingX: false,
        isDraggingY: false
    };

}(Mootor));

window.Mootor = Mootor;