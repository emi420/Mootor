/**
 * Mootor, a HTML5 JavaScript library for application development.
 * 
 * Mootor is licensed under the terms of the GNU General Public License.
 * 
 * (c) 2012 Emilio Mariscal
 * 
 */

(function () {

/** 
 * Mootor Core
 */

var document = window.document;

var $ = (function () {
	"use strict";
    
    var ready;

    /**
     * Main constructor 
     *
     * @constructor
     * @param {string} query Query selector
     * @return {$} Mootor object
     */
	$ = function (query) {
		return new Moo(query);
	};
    /**
     * @ignore
     */
	var Moo = function (query) {
		var qtype = typeof query,
			el;

        // Get element from query
        if (qtype === "string") {

            if (query.indexOf("#") > -1) {
                query = query.replace("#", "");
                el = document.getElementById(query);

            } else if (query.indexOf(".") > -1) {
                query = query.replace(".", "");
                el = document.getElementsByClassName(query);

            }
        } else if (qtype === "object") {
        el = query;
        }

        // Instance properties
        this.el = (function () {
            return el;
        }());
        this.query = (function () {
            return query;
        }());

		return this;
	};

     $.prototype = Moo.prototype = {
     
        /** @lends $.prototype */
        
        /**
         * Element selected
         */
        el: undefined,

        /**
         * Query passed
         */
        query: "",

        /**
         * On element ready
         * @example $(document).ready(function() {
         *      console.log("Im ready (The Document)"); 
         *  });
         * @param {function} callback Callback function
         */
        ready: function (callback) {
            ready(callback, this.el);
        },

        /**
         * Show element
         * @example $("#myDiv").show(); 
         */
        show: function (el) {
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                element.style.display = "block";
            }
        },

        /**
         * Hide element
         * @example $("#myDiv").hide(); 
         */
        hide: function (el) {
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                element.style.display = "none";
            }
        },

        /**
         * Bind event listener
         * @param {string} event Event
         * @param {function} callback Callback function
         * @example $("#myDiv").bind("touchstart", function() {
         *      console.log("Touch start!")
         * }); 
         */
        bind: function (event, callback) {
            this.el.addEventListener(event, callback, false);
        },

        /**
         * Unbind event listener
         * @param {string} event Event
         * @param {function} callback Callback function
         * @example $("#myDiv").unbind("touchstart", function() {
         *      console.log("Touch start!")
         * }); 
         */
        unbind: function (event, callback) {
            this.el.removeEventListener(event, callback, false);
        },

        /**
         * Set class name
         * @param {string} name Class name
         * @example $("#myDiv").setClass("featured");
         */
        setClass: function (name) {
            this.el.className += " " + name;
        },

        /**
         * Check if has class name
         * @param {string} name Class name
         * @return {boolean}
         * @example if ($("#myDiv").hasClass("featured") === true) { 
         *      console.log("this div is featured");
         * }
         */
        hasClass: function (name) {
            return (this.el.className.indexOf(name) !== 0);
        },

        /**
         * Remove class name
         * @param {string} name Class name
         * @example $("#myDiv").removeClass("featured");
         */
        removeClass:  function (name) {
            this.el.className = this.el.className.replace(" " + name, "");
        }


	};

    /**
     * Extend function
     * @ignore
     * @param {object} obj Object with properties
     * @param {object} target Target object to be extended
     * @example $.extend(target, {id: 1});
     */
    $.extend = function (obj, target) {
        var i;
        if (target === undefined) {
            target = $.prototype;
        }
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
    };

    // Core
    $.extend({

        /**
         * @lends $
         */
         
         /**
         * Extend
         */
         extend: $.extend,

         /**
         * Mootor  version
         */
        version:  (function () {
            return "0.1";
        }()),

        /**
         * Context features
         * @example $.context.addEventListener
         */
        context: {
            addEventListener: false
        },

        /**
         * Viewport configuration
         * @example $.context.clientH - Client height
         * $.context.clientW - Client width
         * $.context.hide() - Hide viewport
         * $.context.show() - Show viewport
         */
        view: {

            clientH: 0,
            clientW: 0,

            hide: function () {
                var styles = document.createElement("style");
                styles.innerHTML = "body * {display: none}";
                document.head.appendChild(styles);
                $.view.styles = styles;
            },

            show: function () {
                document.head.removeChild($.view.styles);
            }
        }

    }, $);
    
    /**
     * On element ready
     * @ignore
     */
    ready = function (fn, el) {
        if (el === document) {
            el = window;
        }
        if (el === window) {
            var ready = false,
                handler;

            handler = function (e) {
                if (ready) {return; }
                if (e.type === "readystatechange" && window.document.readyState !== "complete") {return; }
                fn.call(window.document);
                ready = true;
            };
            if (el !== undefined && $.context.addEventListener) {
                el.addEventListener("DOM-ContentLoaded", handler, false);
                el.addEventListener("readystatechange", handler, false);
                el.addEventListener("load", handler, false);
            }
        } else {
            el.onload = Moo;
        }
    }

    // Init-time branching
    if (window.addEventListener) {
        $.context.addEventListener = true;
    } else {
        $.context.addEventListener = false;
    }

    // Initialize Mootor on document ready
    ready(function () {
		var clientW = document.documentElement.clientWidth,
			clientH = document.documentElement.clientHeight;

		$.view.clientH = (function () {
			return clientH;
		}());
		$.view.clientW = (function () {
			return clientW;
		}());
		$.view.show();

	}, document);

	$.view.hide();

	return $;

}());

// Go public!
if (!window.$ || typeof ($) !== "function") {
    window.$ = $;
}

/*
 * Mootor Gestures
 */

(function ($) {
    "use strict";

    var createKey,
        addGesture,
        fire;

     $.extend({
        /**
         * Gestures
         *
         * @class
         * @name gestures
         * @memberOf $
         * @property {integer} x Position on X axis
         * @property {integer} y Position on Y axis
         * @property {integer} startX Position on X axis at the start of the gesture
         * @property {integer} endX Position on X axis at the end of the gesture
         * @property {integer} startY Position on Y axis at the start of the gesture
         * @property {integer} endY Position on Y axis at the end of the gesture
         * @property {boolean} isDraggingY Return true when is dragging on Y axis
         * @property {boolean} mousedown Return true when mouse or touch is down
         * @property {boolean} tapped Return true when a onTap was fired
         * @property {integer} time Time between last 2 touchs
         * @property {element} el Element binded to gesture
         */
        gestures: {
            list: []
        }
    }, $);

    // Create key for element
    createKey = function (el) {

        if (el.id !== "") {
            return el.id;
        } else if (el.rel !== undefined) {
            return el.rel;
        } else if (typeof el === "object") {
            return el;
        }
    };

    addGesture = function (options) {
        var gestureList = $.gestures.list,
            type = options.type,
            fn = options.fn,
            callback = options.callback,
            key = createKey(fn.el);

        if (gestureList[key] === undefined) {
            gestureList[key] = {
                event: []
            };
            // Bind listeners only once
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
            var key = createKey(this.el),
                info = {
                    el: this.el
                },
                gesture = $.gestures.list[key],
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

            if (e.type === "mouseup" || e.type === "touchend") {

                if (gesture.event.tapped === false) {
                    this.unbind("mousemove", this);
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

                } else {
                    // TapEnd
                    info.type = "tapEnd";
                    fire(info, gesture.event.onTapEnd);
                }
            }

        }
    });

}($));

/* 
 * Mootor Visual FX
 */

(function ($) {
    "use strict";

    $.extend({         
    
        /** @lends $.prototype */
        
        /**
         * Translate element, using GPU acceleration when available
         * @param {object} positions Axis positions
         * @param {object} options Options
         * @config {integer} transitionDuration Duration of transition (in seconds)
         * @example $.Fx.translate($("#myDiv", {10,20}, {tansitionDuration: .5}));
         */
        translate: function (positions, options) {

            var x_pos = positions.x,
                y_pos = positions.y,
                tduration;
               
            tduration = options.transitionDuration;
            this.el.style.transitionProperty = "webkit-transform";

            if (tduration !== undefined && tduration > 0) {
                this.el.style.webkitTransitionDuration = tduration + "s";
                this.el.style.webkitTransitionTimingFunction = "ease-out";
            } else {
                if (this.el.style.webkitTransitionDuration !== "") {
                    this.cleanFx();
                }
            }

            this.el.style.webkitTransform = "translate3d(" + x_pos + "px," + y_pos + "px, 0)";

            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }

        },

        /**
         * Clean element transform styles
         * @param {element} el Element
         * @example $.Fx.clean($("#myDiv");
         */
        cleanFx: function () {
            this.el.style.webkitTransitionDuration = "";
            this.el.style.webkitTransitionTimingFunction = "";
        }

    });

}($));


}(window));
