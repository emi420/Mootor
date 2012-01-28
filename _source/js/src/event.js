/*
 * Mootor Events
 */

 /*
  *     TODO: 
  *
  *     - Init-time branching
  *     - Event delegation
  */

(function (Mootor) {

    "use strict";

    var Drag,
        Tap,
        listeners;

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

        this.drag = {
            startX: 0,
            endX: 0,
            lastX: 0,
            startY: 0,
            endY: 0,
            lastY: 0
        };

        // Bind initial events

        for (i = events.length; i--;) {
            element.addEventListener(events[i], this, false);
            element.addEventListener(events[i], this, false);
        }
        element.onclick = function () { return false; };

    };

    /*
     *      Event handler
     */
    Drag.prototype = {

        handleEvent: function (e) {

            // Prevent default listeners
            if (e.preventDefault) {
                e.preventDefault();
            }

            // Stop event propagation
            if (e.stopPropagation) {
                e.stopPropagation();
            }

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

        /*
         *      On move start
         */
        start: function (e) {

            // Initialize values
            if (e.clientX || e.clientY) {
                // Click
                this.drag.startX = e.clientX;
                this.drag.startY = e.clientY;
            } else {
                // Touch
                this.drag.startX = e.touches[0].clientX;
                this.drag.startY = e.touches[0].clientY;
            }
            this.drag.lastX = this.drag.startX;
            this.drag.lastY = this.drag.startY;

            // Add listeners
            this.el.addEventListener('mousemove', this, false);
            this.el.addEventListener('mouseup', this, false);
            this.el.addEventListener('touchmove', this, false);
            this.el.addEventListener('touchend', this, false);

            // Callback
            this.callback.onDragStart(this.drag);

        },

        /*
         *     On move
         */
        move: function (e) {

            var listeners = Mootor.Event.listeners,
                distanceFromOriginX,
                distanceFromOriginY;

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
            distanceFromOriginX = Math.abs(this.drag.distanceFromOriginX);
            distanceFromOriginY = Math.abs(this.drag.distanceFromOriginY);

            // Detect draggingY
            if (distanceFromOriginY > 0 && distanceFromOriginY > distanceFromOriginX && listeners.isDraggingX === false) {

                listeners.isDraggingY = true;

            // Detect draggingX
            } else if (distanceFromOriginX > 0 && listeners.isDraggingY === false) {

                listeners.isDraggingX = true;

            }

            // Set largeMove flag
            this.drag.largeMove = false;

            // Callback
            if (this.callback.onDragMove !== undefined) {
                this.callback.onDragMove(this.drag);
            }

        },

        /*
         *     On move end
         */
        end: function (e) {

            // Update values
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.distanceFromOriginX = this.initX - e.lastX;
            this.distanceFromOriginY = this.initY - e.lastY;

            // Remove listeners
            this.el.removeEventListener('mousemove', this, false);
            this.el.removeEventListener('mouseup', this, false);
            this.el.removeEventListener('touchmove', this, false);
            this.el.removeEventListener('touchend', this, false);

            // Callback
            this.callback.onDragEnd(this.drag);

            // Set isDragging flags
            listeners.isDraggingY = false;
            listeners.isDraggingX = false;

        }

    };

    /*
     *      Public
     */
    Mootor.Event = {

        /*
         *      bind
         */
        bind: function (el, eventtype, callback) {

            var listeners = Mootor.Event.listeners,
                listenerId = listeners.count,
                listener,
                i,
                listenerCount = 1;

            // Look if element has a listener instance
            
            // FIXME CHECK: expensive query
            for (i = listeners.count; i--;) {
                if (listeners[i].el === el) {
                    listenerId = i;
                    listenerCount = 0;
                }
            }

            if (listenerCount > 0) {

                // If element doesn't have a listener, 
                // create a new listener instance
                switch (eventtype) {
                case "onDrag":
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
    Mootor.Event.listeners = listeners = {
        count: 0,
        isDraggingX: false,
        isDraggingY: false
    };

}(Mootor));

