/*
 * Mootor Events
 */

 /*
  *     TODO: 
  *
  *     - Init-time branching
  *     - Event delegation
  */

(function (Moo) {
    var Drag,
        Tap,
        listeners;

    /*
     *      Tap
     */
    Tap = function (element, callback) {

        element.onclick = function () { return false; };
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
            lastY: 0,
            velocity: {x: 0, y: 0},
            time: 0
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

            // Prevent defaults on certain elements
            // FIXME CHECK: this is a temporary patch
            if (e.target.type !== "text" && e.target.type !== "input") {

                // Prevent default listeners
                if (e.preventDefault) {
                    e.preventDefault();
                }

                // Stop event propagation
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

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

            var date = new Date();

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

            // Time of last touch (for velocity calc)
            this.drag.time = date.getMilliseconds();

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

            var listeners = Moo.Event.listeners,
                distanceOriginX,
                distanceOriginY,
                date = new Date();

            this.drag.distanceOriginX = this.drag.startX - this.drag.lastX;
            this.drag.distanceOriginY = this.drag.startY - this.drag.lastY;

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
            distanceOriginX = Math.abs(this.drag.distanceOriginX);
            distanceOriginY = Math.abs(this.drag.distanceOriginY);

            // Time of last touch (for velocity calc)
            this.drag.time = date.getMilliseconds() - this.drag.time;

            // Velocity
            this.drag.velocity.x = this.drag.distanceX / this.drag.time * 100;
            this.drag.velocity.y = this.drag.distanceY / this.drag.time * 100;

            // Detect draggingY
            if (distanceOriginY > 0 && distanceOriginY > distanceOriginX && listeners.isDraggingX === false) {

                listeners.isDraggingY = true;

            // Detect draggingX
            } else if (distanceOriginX > 0 && listeners.isDraggingY === false) {

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
    Moo.Event = {

        /*
         *      bind
         */
        bind: function (el, eventtype, callback) {

            var listeners = Moo.Event.listeners,
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

    Moo.extend(Moo.Event);

    /*
     *      Private
     */

    // Event listeners
    Moo.Event.listeners = listeners = {
        count: 0,
        isDraggingX: false,
        isDraggingY: false
    };
}($));

