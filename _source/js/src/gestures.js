/*
 * Mootor Gestures
 */

(function (Moo) {
    "use strict";

    var createKey,
        addGesture,
        fire;

    Moo.extend({
        gestures: {
            list: []
        }
    }, Moo);

    // Create key for element
    createKey = function (el) {
        if (el.rel !== undefined) {
            return el.rel;
        }
        if (typeof el === "object") {
            return el;
        }
    };

    addGesture = function (options) {
        var gestureList = Moo.gestures.list,
            type = options.type,
            fn = options.fn,
            callback = options.callback,
            key = createKey(fn.el);

        if (gestureList[key] === undefined) {
            gestureList[key] = {
                event: []
            };
        }

        // Bind listeners only once
        if (gestureList[key] !== undefined) {
            fn.bind("mousedown", fn);
            fn.bind("mouseup", fn);
            fn.bind("touchstart", fn);
            fn.bind("touchend", fn);
        }

        if (gestureList[key].event[type] === undefined) {
            gestureList[key].event[type] = [];
        }
        gestureList[key].event[type].push(callback);

    };

    // Fire callbacks
    fire = function (info, callbacks) {
        var i;
        if (callbacks !== undefined) {
            for (i = callbacks.length; i--;) {
                if (callbacks[i].handleGesture !== undefined) {
                    callbacks[i].handleGesture(info);
                } else {
                    callbacks[i](info);
                }
            }
        }
    };

    /*
     *      Public
     */
    Moo.Gesture = {

        // Gestures
        onTapEnd: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapEnd"
            });
        },
        onTapStart: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapStart"
            });
        },
        onTapHold: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapHold"
            });
        },
        onDragStart: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragStart"
            });
        },
        onDragMove: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragMove"
            });
        },
        onDragEnd: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragEnd"
            });
        },

        // Handler to detect gestures and fire callbacks        
        handleEvent: function (e) {
            var key = createKey(this.el),
                info = {
                    el: this.el
                },
                gesture =  Moo.gestures.list[key],
                date = new Date(),
                clientX,
                clientY;

            e.preventDefault();

            if (e.clientX || e.clientY) {
                // Mouse
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                // Touch
                // FIXME CHECK
                try {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } catch (error) {}
            }

            // TapStart
            if (e.type === "mousedown" || e.type === "touchstart") {

                this.bind("mousemove", this);
                this.bind("touchmove", this);

                gesture.event.time = date.getTime();
                gesture.event.isDraggingY = 0;
                gesture.event.mousedown = true;
                gesture.event.tapped = false;
                gesture.event.startX = clientX;
                gesture.event.startY = clientY;

                window.setTimeout(function () {
                    // TapHold
                    if (gesture.event.mousedown === true) {
                        info.type = "tapHold";
                        fire(info, gesture.event.onTapHold);
                    }
                }, 500);

                if (gesture.event.onTapStart !== undefined) {
                    // TapStart
                    info.type = "tapStart";
                    fire(info, gesture.event.onTapStart);
                }
            }

            if (e.type === "mousemove" || e.type === "touchmove") {

                info.lastY = gesture.event.y;
                info.lastX = gesture.event.x;
                gesture.event.y = info.y = clientY;
                gesture.event.x = info.x = clientX;
                info.distanceFromOriginY = clientY - gesture.event.startY;
                info.distanceFromOriginX = clientX - gesture.event.startX;

                if (gesture.event.isDraggingY === 0) {
                    // DragStart
                    if ((clientY - gesture.event.startY) > 10) {
                        gesture.event.isDraggingY = 1;
                        info.type = "dragStart";
                        fire(info, gesture.event.onDragStart);
                    } else if ((clientY - gesture.event.startY) < -10) {
                        gesture.event.isDraggingY = -1;
                        info.type = "dragStart";
                        fire(info, gesture.event.onDragStart);
                    }
                } else {
                    // DragMove
                    info.type = "dragMove";
                    fire(info, gesture.event.onDragMove);
                }
            }

            if ((e.type === "mouseup" || e.type === "touchend") && gesture.event.tapped === false) {
                this.unbind("mousemove", this);
                this.unbind("touchmove", this);
                info.time = date.getTime() - gesture.event.time;
                gesture.event.mousedown = false;

                if (gesture.event.isDraggingY !== 0) {
                    // DragEnd
                    info.type = "dragEnd";
                    gesture.event.isDraggingY = 0;
                    fire(info, gesture.event.onDragEnd);

                } else {
                    // TapEnd
                    info.type = "tapEnd";
                    info.isDraggingY = gesture.event.isDraggingY;
                    fire(info, gesture.event.onTapEnd);
                }
            }

        }
    };

    Moo.extend(Moo.Gesture);

}(Moo));

