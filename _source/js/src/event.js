/*
 * Mootor Gestures
 */
 
/*    
    - dragStart
    - dragEnd
    - dragMove
    - tapStart
    - tapEnd
    - tapHold
    - doubleTap
    - swipe        
    - pinch

*/


(function (Moo) {
    var Drag,
        Tap;

    /*
     *      Tap
     */
    Tap = function (element, callback) {
        this.callback = callback;
        this.el = element;
        element.onclick = function () { return false; };
        $(element).bind("mouseup", this);
        $(element).bind("touchend", this);

    };

    Tap.prototype = {
        handleEvent: function (e) {
            e.preventDefault();
            this.callback();
        }
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
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            time: 0,
            velocity: {x: 0, y: 0}
        };

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

                if (e.preventDefault) {
                    e.preventDefault();
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

            if (e.clientX || e.clientY) {
                // Click
                this.drag.startX = e.clientX;
                this.drag.startY = e.clientY;
            } else {
                // Touch
                this.drag.startX = e.touches[0].clientX;
                this.drag.startY = e.touches[0].clientY;
            }
            this.drag.x = this.drag.startX;
            this.drag.y = this.drag.startY;

            this.drag.time = date.getMilliseconds();

            this.el.addEventListener('mousemove', this, false);
            this.el.addEventListener('mouseup', this, false);
            this.el.addEventListener('touchmove', this, false);
            this.el.addEventListener('touchend', this, false);

            if (this.callback.onDragStart !== undefined) {
                this.callback.onDragStart(this.drag);
            }

        },

        /*
         *     On move
         */
        move: function (e) {

            var listeners = Moo.Event.listeners,
                distanceOriginX,
                distanceOriginY,
                date = new Date();

            this.drag.distanceOriginX = this.drag.startX - this.drag.x;
            this.drag.distanceOriginY = this.drag.startY - this.drag.y;

            if (e.clientX || e.clientY) {

                // Mouse
                this.drag.distanceX = e.clientX - this.drag.x;
                this.drag.distanceY = e.clientY - this.drag.y;
                this.drag.x = e.clientX;
                this.drag.y = e.clientY;

            } else {

                // Touch
                this.drag.distanceX = e.touches[0].clientX - this.drag.x;
                this.drag.distanceY = e.touches[0].clientY - this.drag.y;
                this.drag.x = e.touches[0].clientX;
                this.drag.y = e.touches[0].clientY;

            }

            this.drag.time = date.getMilliseconds() - this.drag.time;

            if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                distanceOriginX = Math.abs(this.drag.distanceOriginX);
                distanceOriginY = Math.abs(this.drag.distanceOriginY);

                if (distanceOriginY > 0 && distanceOriginY > distanceOriginX && listeners.isDraggingX === false) {
                    listeners.isDraggingY = true;

                } else if (distanceOriginX > 0 && listeners.isDraggingY === false) {
                    listeners.isDraggingX = true;

                }
            }

            this.drag.largeMove = false;

            if (this.callback.onDragMove !== undefined) {
                this.callback.onDragMove(this.drag);
            }

        },

        /*
         *     On move end
         */
        end: function () {

            this.drag.velocity.x = this.drag.distanceX / this.drag.time * 100;
            this.drag.velocity.y = this.drag.distanceY / this.drag.time * 100;

            this.el.removeEventListener('mousemove', this, false);
            this.el.removeEventListener('mouseup', this, false);
            this.el.removeEventListener('touchmove', this, false);
            this.el.removeEventListener('touchend', this, false);

            if (this.callback.onDragEnd !== undefined) {
                this.callback.onDragEnd(this.drag);
            }
            
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
        on: function (el, eventtype, callback) {

            var listenerId = listeners.count,
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
                listener = listeners[listenerId];
            }

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

