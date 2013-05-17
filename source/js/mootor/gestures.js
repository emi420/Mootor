/**
 * Gestures
 * @module core
 * @submodule gestures
 */ 

(function () {

    var _addGesture,
        _fire,
        _isListed,
        Gestures;
        
    Gestures = function() {
        this.list = [];
    };
    
    Gestures.prototype = {
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
    };
    
    $.gestures = new Gestures();
    
    _addGesture = function (options) {
        var gestureList = $.gestures.list,
            type = options.type,
            self = options.fn,
            callback = options.callback,
            gesture;
    
        if ((gesture = $.gestures.getByElement(self.el)) === null) {
            gesture = {
                el: self.el,
                event: {}
            };
            gestureList.push(gesture);

            // Bind listeners only once
            self.bind("touchstart", self);
            self.bind("click", self);

        }
        
        if (gesture.event[type] === undefined) {
            gesture.event[type] = [];
        }
        
        gesture.event[type].push(callback);
    
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
    
    // _fire callbacks
    _fire = function (info, callbacks) {
        var i;
    
        if (callbacks !== undefined) {
            info.e.preventDefault();
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
     */
    $.extend({
            
        /**
         * On Tap End
         *
         * @method onTapEnd
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onTapEnd(function() {
         *          console.log("Tap!")
         *      });
         */
        onTapEnd: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onTapEnd"
            });
        },
        /**
         * On Tap Start
         *
         * @method onTapStart
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onTapStart(function() {
         *          console.log("Tap start!")
         *      }); 
        */
        onTapStart: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onTapStart"
            });
        },
        /**
         * On Tap Hold (500 ms)
         *
         * @method onTapHold
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onTapHold(function() {
         *          console.log("Tap hold!")
         *      }); 
         */
        onTapHold: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onTapHold"
            });
        },
        /**
         * On Drag Start
         *
         * @method onDragStart
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onDragStart(function() {
         *          console.log("Drag start!")
         *      }); 
         */
        onDragStart: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onDragStart"
            });
        },
        /**
         * On Drag Move
         *
         * @method onDragMove
         * @param {function} callback Callback function
         * @example $("#myDiv").onDragMove(function(gesture) {
         *      console.log(gesture.y)
         * }); 
         * @example 
         *      fn = this;
         *      $("#myDiv").onDragMove(fn);
         *      fn.handleGesture = function(gesture) {
         *          console.log(gesture.x);
         *          console.log(gesture.y);
         *      }
         */
        onDragMove: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onDragMove"
            });
        },
        /**
         * On Drag End
         *
         * @method onDragEnd
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onDragEnd(function() {
         *          console.log("Drag end!")
         *      }); 
         */
        onDragEnd: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onDragEnd"
            });
        },
        
        /**
         * On Swipe Left
         *
         * @method onSwipeLeft
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeLeft(function() {
         *           console.log("Swipe left!")
         *      }); 
         */
        onSwipeLeft: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeLeft"
            });
        },
        /**
         * On Swipe Right
         *
         * @method onSwipeRight
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeRight(function() {
         *           console.log("Swipe right!")
         *      }); 
         */
        onSwipeRight: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeRight"
            });
        },
        /**
         * On Swipe Up
         *
         * @method onSwipeUp
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeUp(function() {
         *           console.log("Swipe up!")
         *      }); 
         */
        onSwipeUp: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeUp"
            });
        },
        /**
         * On Swipe Down
         *
         * @method onSwipeDown
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeDown(function() {
         *           console.log("Swipe down!")
         *      }); 
         */
        onSwipeDown: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeDown"
            });
        },
                
        // Handler to detect gestures and _fire callbacks        
        handleEvent: function (event) {
            this._handleEvent(event);
        },
        _handleEvent: function (e) {
            var info = {
                    el: this.el,
                    e: e
                },
                gesture = $.gestures.getByElement(this.el),
                gestureEvent = gesture.event,
                date = new Date(),
                clientX,
                clientY,
                time;
                
            // Touch
            try {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } catch (error) {};
    
            if (e.type === "touchstart") {
            
                this.bind("touchmove", this);
                this.bind("touchend", this);
    
                gestureEvent.time = date.getTime();
                gestureEvent.lastTime = date.getMilliseconds();
                gestureEvent.isDraggingY = 0;
                gestureEvent.isDraggingX = 0;
                gestureEvent.mousedown = true;
                gestureEvent.tapped = false;
                gestureEvent.startX = clientX;
                gestureEvent.startY = clientY;
                gestureEvent.swipe = 0;
    
                window.setTimeout(function () {
                    // TapHold
                    if (gestureEvent.mousedown === true &&
                        gestureEvent.isDraggingY === 0 &&
                        gestureEvent.isDraggingX === 0) {
                        
                        info.type = "tapHold";
                        _fire(info, gestureEvent.onTapHold);
                    }
                }, 500);
    
                if (gestureEvent.onTapStart !== undefined) {
                    // TapStart
                    info.type = "tapStart";
                    _fire(info, gestureEvent.onTapStart);
                }
            }
    
            if (e.type === "touchmove") {
            
                time = date.getMilliseconds() - gestureEvent.lastTime;
                time = (time + gestureEvent.lastTime) / 2;
                
                info.velocity = {};
                if (time > 0) {
                    info.velocity.x = (gestureEvent.lastX - gestureEvent.x) / time;
                    info.velocity.y = (gestureEvent.lastY - gestureEvent.y) / time;
                } else {
                    info.velocity.x = 0;
                    info.velocity.y = 0;
                }

                gestureEvent.velocity = info.velocity;
                
                gestureEvent.lastTime = date.getMilliseconds();
                gestureEvent.lastY = info.lastY = gestureEvent.y;
                gestureEvent.lastX = info.lastX = gestureEvent.x;
                gestureEvent.y = info.y = clientY;
                gestureEvent.x = info.x = clientX;
                info.distanceFromOriginY = clientY - gestureEvent.startY;
                info.distanceFromOriginX = clientX - gestureEvent.startX;

    
                gestureEvent.isDraggingY = gestureEvent.isDraggingY ?
                                            gestureEvent.isDraggingY : 0;
                                            
                gestureEvent.isDraggingX = gestureEvent.isDraggingX ?
                                            gestureEvent.isDraggingX : 0;
    
                if (gesture.event.isDraggingY === 0 
                    && gesture.event.isDraggingX === 0) 
                {
                
                    if (info.distanceFromOriginX > 10) {
                        gestureEvent.isDraggingX = 1;
                        info.type = "dragStart";
                    }
                    if (info.distanceFromOriginX < -10) {
                        info.type = "dragStart";
                        gestureEvent.isDraggingX = -1;
                    }
    
                    if (info.distanceFromOriginY > 10) {
                        gestureEvent.isDraggingY = 1;
                        info.type = "dragStart";
                    }
                    if (info.distanceFromOriginY < -10) {
                        info.type = "dragStart";
                        gestureEvent.isDraggingY = -1;
                    }
    
                    // DragStart   
                    if (info.type === "dragStart") {                 
                        _fire(info, gestureEvent.onDragStart);
                    }
                                        
                } else {
                    // DragMove
                    info.type = "dragMove";
                    _fire(info, gestureEvent.onDragMove);
                }
            }
            
            if (e.type === "touchend") {
               
                info.velocity = {};
                        
                if (gestureEvent.tapped === false) {
                    this.unbind("touchmove", this);
                    this.unbind("touchend", this);
                    gestureEvent.tapped = true;
                    info.time = date.getTime() - gestureEvent.time;
                    gestureEvent.mousedown = false;
                }
    
                if ((gestureEvent.isDraggingY !== 0 || 
                    gestureEvent.isDraggingX !== 0)) {
    
                    // Swipe
                    if (gestureEvent.swipe === 0) {
                        if (gestureEvent.isDraggingX === 1) {
                            gestureEvent.swipe = gestureEvent.isDraggingX;
                            _fire(info, gesture.event.onSwipeRight);
                        }
                        if (gestureEvent.isDraggingX === -1) {
                            gestureEvent.swipe = gestureEvent.isDraggingX;
                            _fire(info, gesture.event.onSwipeLeft);
                        }
                        if (gestureEvent.isDraggingY === 1) {
                            gestureEvent.swipe = gestureEvent.isDraggingY;
                            _fire(info, gestureEvent.onSwipeDown);
                        }
                        if (gestureEvent.isDraggingY === -1) {
                            gestureEvent.swipe = gestureEvent.isDraggingY;
                            _fire(info, gestureEvent.onSwipeUp);
                        }
                    }
                    
                    // DragEnd
                    info.type = "dragEnd";
                    
                    if ($.debug === true) {
                        console.log("dragEnd");
                    }
                                        
                    info.velocity = gestureEvent.velocity;
                    info.isDraggingY = gestureEvent.isDraggingY = 0;
                    info.isDraggingX = gestureEvent.isDraggingX = 0;
                    _fire(info, gestureEvent.onDragEnd);

                } else if (info.time !== undefined) {

                    if ($.debug === true) {
                        console.log("tapEnd");
                    }

                    // TapEnd
                    info.type = "tapEnd";
                    _fire(info, gestureEvent.onTapEnd);
                }
    
            } else if (e.type === "click") {
                _fire(info, gestureEvent.onTapEnd);
            }
    
        }
    });

} ());