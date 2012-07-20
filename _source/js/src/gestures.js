
/*
 * Mootor Gestures
 */

(function ($) {
    "use strict";

    var addGesture,
        fire,
        _isListed,
        gestures,
        Gestures;
        
    Gestures = function() {
        
    };
    
    Gestures.prototype = {
        list: [],
        getByElement: function(element) {
            var i = 0;
            for (i = this.list.length; i--;) {
                if (this.list[i].el === element) {
                    return this.list[i];
                }
            }
            return null;
        },
        push: function(gesture) {
            this.list.push(gesture);
        }
    }
    
    $.gestures = new Gestures();

    addGesture = function (options) {
        var gestureList = $.gestures.list,
            type = options.type,
            self = options.fn,
            callback = options.callback,
            gesture;
    
        if ((gesture = $.gestures.getByElement(self.el)) === null) {
            gesture = {
                el: self.el,
                event: {}
            }
            gestureList.push(gesture);
        }
        
        if (gesture.event[type] === undefined) {
            gesture.event[type] = [];
        }
        
        gesture.event[type].push(callback);

        // Bind listeners only once
        self.bind("touchstart", self);
        self.bind("touchend", self);

    };
    
    _isListed = function(list, el) {
        var i;
        for (i = list.length; i--;) {
            if (list[i].el === el) {
                return true;
            }
        }
        return false;
    };

    // Fire callbacks
    fire = function (info, callbacks) {
        var i;

        info.e.preventDefault();
        
        if (callbacks !== undefined) {
            for (i = 0; i < callbacks.length; i++) {
                if (callbacks[i].handleGesture !== undefined) {
                    callbacks[i].handleGesture(info);
                } else {
                    callbacks[i](info);
                }
            }
        }
    };

    /**
     * Gestures
     *
     * @class
     * @see $.gestures
     */
    $.extend({

        /** @lends $.prototype */

        /**
         * On Tap End
         *
         * @param {function} callback Callback function
         * @example $("#myDiv").onTapEnd(function() {
         *      console.log("Tap!")
         * }); 
         */
        onTapEnd: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapEnd"
            });
        },
        /**
         * On Tap Start
         *
         * @param {function} callback Callback function
         * @example $("#myDiv").onTapStart(function() {
         *      console.log("Tap start!")
         * }); 
         */
        onTapStart: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapStart"
            });
        },
        /**
         * On Tap Hold (500 ms)
         *
         * @param {function} callback Callback function
         * @example $("#myDiv").onTapHold(function() {
         *      console.log("Tap hold!")
         * }); 
         */
        onTapHold: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapHold"
            });
        },
        /**
         * On Drag Start
         *
         * @param {function} callback Callback function
         * @example $("#myDiv").onDragStart(function() {
         *      console.log("Drag start!")
         * }); 
         */
        onDragStart: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragStart"
            });
        },
        /**
         * On Drag Move
         *
         * @param {function} callback Callback function
         * @example $("#myDiv").onDragMove(function(gesture) {
         *      console.log(gesture.y)
         * }); 
         * @example fn = this;
         * $("#myDiv").onDragMove(fn);
         * fn.handleGesture = function(gesture) {
         *       console.log(gesture.x);
         *       console.log(gesture.y);
         * }
         */
        onDragMove: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragMove"
            });
        },
        /**
         * On Drag End
         *
         * @param {function} callback Callback function
         * @example $("#myDiv").onDragEnd(function() {
         *      console.log("Drag end!")
         * }); 
         */
        onDragEnd: function (callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragEnd"
            });
        },

        // Handler to detect gestures and fire callbacks        
        handleEvent: function (e) {
            var info = {
                    el: this.el,
                    e: e
                },
                gesture = $.gestures.getByElement(this.el),
                date = new Date(),
                clientX,
                clientY;
            
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
            if (e.type === "touchstart") {

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

            if (e.type === "touchmove") {
            
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

            if (e.type === "touchend") {
                        
                if (gesture.event.tapped === false) {
                    this.unbind("touchmove", this);
                    gesture.event.tapped = true;
                    info.time = date.getTime() - gesture.event.time;
                    gesture.event.mousedown = false;
                }

                if (gesture.event.isDraggingY !== 0) {
                    // DragEnd
                    info.type = "dragEnd";
                    gesture.event.isDraggingY = 0;
                    fire(info, gesture.event.onDragEnd);

                } else if (info.time !== undefined) {
                    // TapEnd
                    info.type = "tapEnd";
                    fire(info, gesture.event.onTapEnd);
                }

            }

        }
    });

}($));