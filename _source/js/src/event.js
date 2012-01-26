/*
 * Mootor Events (coded by emi420@gmail.com)
 */

 /*
  *     FIXME: 
  *
  *     - Init-time branching
  *     - Optimize me & micro-optimize
  */

(function (Mootor) {

    "use strict";

    var Drag,
        Tap;
        
    /*
     *      Tap
     */

    Tap = function (element, callback) {

        element.addEventListener("mouseup", callback, false);
        element.addEventListener("touchend", callback, false);

    };

    /*
     *      Drag
     */

    Drag = function (element, callback) {
    
        var i,
            events = [
                'mousedown', 'touchstart'
            ];

        this.el = element;
        this.callback = callback;
        this.thresholdY = 15;
        this.thresholdX = 15;

        this.drag = {
            startX: 0,
            endX: 0,
            lastX: 0,
            startY: 0,
            endY: 0,
            lastY: 0
        };

        // Bind initial events
        
        for (i = 0; i < events.length; i++) {
            Mootor.eventwrapper.addEventListener(events[i], this, false);
            Mootor.eventwrapper.addEventListener(events[i], this, false);
        }
        Mootor.eventwrapper.onclick = function() { return false; };

    };

    // Event handler
    
    Drag.prototype = {
    
        handleEvent: function (e) {
        
            if (e.preventDefault) {
                e.preventDefault();
            };
            if (e.stopPropagation) {
                e.stopPropagation();
            };

            switch (e.type) {
            case 'mousedown':
            case 'touchstart':
                this.start(e);
                break;
            case 'touchend':
            case 'mouseup':
                this.end(e);
                break;
            case 'mousemove':
            case 'touchmove':
                this.move(e);
                break;
            }

        },

        // On move start

        start: function (e) {
        
            var listeners = Mootor.Event.listeners;

            // Initialize values
            if (e.clientX || e.clientY) {
                this.drag.startX = e.clientX;
                this.drag.startY = e.clientY;
            } else {
                this.drag.startX = e.touches[0].clientX;
                this.drag.startY = e.touches[0].clientY;
            }
            this.drag.lastX = this.drag.startX;
            this.drag.lastY = this.drag.startY;
            
            // Add listeners
            Mootor.eventwrapper.addEventListener('mousemove', this, false);
            Mootor.eventwrapper.addEventListener('mouseup', this, false);
            Mootor.eventwrapper.addEventListener('touchmove', this, false);
            Mootor.eventwrapper.addEventListener('touchend', this, false);

            // Callback
            this.callback.onDragStart(this.drag);

        },

        // On move

        move: function (e) {

            var listeners = Mootor.Event.listeners;

            this.drag.distanceFromOriginX = this.drag.startX - this.drag.lastX;
            this.drag.distanceFromOriginY = this.drag.startY - this.drag.lastY;

            if (e.clientX || e.clientY) {
            
                // Mouse
                this.drag.distanceX = e.clientX - this.drag.lastX;
                this.drag.distanceY = e.clientY - this.drag.lastY;
                this.drag.lastX = e.clientX;
                this.drag.lastY = e.clientY;
                
            } else {
            
                // Touch
                this.drag.distanceX = e.touches[0].clientX - this.drag.lastX;
                this.drag.distanceY = e.touches[0].clientY - this.drag.lastY;
                this.drag.lastX = e.touches[0].clientX;
                this.drag.lastY = e.touches[0].clientY;
            }
            
            // Set isDragging flags            

            if (Math.abs(this.drag.distanceFromOriginX) > this.thresholdX && listeners.isDraggingY === false) {
                listeners.isDraggingX = true;
            }
            if (Math.abs(this.drag.distanceFromOriginY) > this.thresholdY && listeners.isDraggingX === false) {
                listeners.isDraggingY = true;
            }

            //
            // Callback

            if (this.callback.onDragMove !== undefined) {
                this.callback.onDragMove(this.drag);
            }

        },
        
        // On move end

        end: function (e) {

            var listeners = Mootor.Event.listeners;

            // Update values
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.distanceFromOriginX = this.initX - e.lastX;
            this.distanceFromOriginY = this.initY - e.lastY;
           
            // Remove listeners
            Mootor.eventwrapper.removeEventListener('mousemove', this, false);
            Mootor.eventwrapper.removeEventListener('mouseup', this, false);
            Mootor.eventwrapper.removeEventListener('touchmove', this, false);
            Mootor.eventwrapper.removeEventListener('touchend', this, false);
            
            // Callback
            this.callback.onDragEnd(this.drag);
            
            listeners.isDraggingY = false;
            listeners.isDraggingX = false;
                        
        }

    };
    
    /*
     *      Public
     */

    Mootor.Event = {

        bind: function (el, eventtype, callback) {

            var listeners = Mootor.Event.listeners,
                listenerId = listeners.count,
                listener,
                i,
                listenerCount = 1;
            
            // Look if element has a listener instance
            for (i = 0; i <  listeners.count; i++) {
                if (listeners[i].el === el) {
                    listenerId = i;
                    listenerCount = 0;
                }
            }

            // If element doesn't a listener, create
            // a new listener instance
            if (listenerCount > 0) {
                switch (eventtype) {
                case "onDragStart":
                case "onDragEnd":
                case "onDragMove":
                    listener = new Drag(el, callback);
                    break;
                case "onTap":
                    listener = new Tap(el, callback);
                    break;
                }
                listeners.count += 1;
                listeners[listenerId] = listener;
            } else {
                // If element has a listener, use
                // that listener instance
                listener = listeners[listenerId];
            }

            // Set listener callback
            listener[eventtype] = callback;

        }

    };

    Mootor.extend(Mootor.Event);

    /*
     *      Private
     */

    // Event listeners
    Mootor.Event.listeners = {
        count: 0,
        isDraggingX: false,
        isDraggingY: false
    };

}(Mootor));

window.Mootor = Mootor;

