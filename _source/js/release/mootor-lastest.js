(function(window, document) {
/* 
 *  Mootor Core
 */

var Mootor = (function () {

	"use strict";

	// Return new Mootor instance
	Mootor = function (query) {
		return new Mootor.fn(query);
	};

	Mootor.prototype = {

		// On element ready
		ready: function (callback) {
			Mootor.ready(callback, this.el);
		}

	};

    // Inheritance by copying properties
    Mootor.extend = function (obj, target) {
        var i;
        if (target === undefined) {
            target = Mootor.prototype;
        }
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
    };

    // Core
    Mootor.extend({

        // Initial styles
        styles: undefined,

        // On element ready
        ready: function (fn, el) {

            if (el === document) {
                el = window;
            }

            if (el === window || el === window.document) {
                var ready = false,
                    handler;

                // Handler to check if the dom is full loaded
                handler = function (e) {
                    if (ready) {return; }
                    if (e.type === "readystatechange" && window.document.readyState !== "complete") {return; }
                    fn.call(window.document);
                    ready = true;
                };

                // Add listeners for all common load events
                if (el !== "undefined" && Mootor.test.addEventListener) {
                    el.addEventListener("DOM-ContentLoaded", handler, false);
                    el.addEventListener("readystatechange", handler, false);
                    el.addEventListener("load", handler, false);
                }
            } else {
                el.onload = fn;
            }

        },

        // Hide document body
        hide: function () {

            var styles = document.createElement("style");
            styles.innerHTML = "body * {display: none}";
            document.head.appendChild(styles);
            Mootor.styles = styles;

        },

        // Show document body
        show: function () {
            document.head.removeChild(Mootor.styles);
        },

        // Test browser compatibility
        test: {
            addEventListener: false
        }

    }, Mootor);

	// Main constructor
	Mootor.fn = function (query) {

		var q_type = typeof query,
			el;

		if (q_type === "string" || q_type === "object") {

			// Get element from query

			switch (q_type) {

			case "string":

				if (query.indexOf('#') > -1) {
					query = query.replace("#", "");
					el = document.getElementById(query);
				} else if (query.indexOf(".") > -1) {
					query = query.replace(".", "");
                    // FIXME CHECK: expensive query
					el = document.getElementsByClassName(query);
				}
				break;

			case "object":
				el = query;
				break;
			}
		}

		// Private properties

        // Element selected
		this.el = (function () {
			return el;
		}());

        // Query passed
		this.query = (function () {
			return query;
		}());

		return this;

	};

	// Prototypal inheritance 
	Mootor.fn.prototype = Mootor.prototype;

    // Init-time branching
    if (window.addEventListener) {
        Mootor.test.addEventListener = true;
    } else {
        Mootor.test.addEventListener = false;
    }

	// On document ready, get viewport sizes and show body
    Mootor.ready(function () {

		// Initial screen size
		var clientW = document.documentElement.clientWidth,
			clientH = document.documentElement.clientHeight;

		Mootor.clientH = (function () {
			return clientH;
		}());
		Mootor.clientW = (function () {
			return clientW;
		}());

        // Show body
		Mootor.show();

	}, document);

    // Hide body
	Mootor.hide();

	return Mootor;

}());

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

            var listeners = Mootor.Event.listeners,
                distanceFromOriginX,
                distanceFromOriginY,
                date = new Date();


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

            // Time of last touch (for velocity calc)
            this.drag.time = date.getMilliseconds() - this.drag.time;

            // Velocity
            this.drag.velocity.x = this.drag.distanceX / this.drag.time * 100;
            this.drag.velocity.y = this.drag.distanceY / this.drag.time * 100;

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

/* 
 * Mootor Visual FX
 */

(function (Mootor) {

    "use strict";

    Mootor.Fx = {

        /*
         *       fadeOut in an element
         */
        fadeOut: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }

            element.style.transitionProperty = "webkit-transition";
            element.style.webkitTransitionDuration = "0.1s";
            element.style.webkitTransitionTimingFunction = "ease-out";
            element.style.opacity = 0;
        },


        /*
         *       fadeIn an element
         */
        fadeIn: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }

            element.style.transitionProperty = "webkit-transition";
            element.style.webkitTransitionDuration = "0.1s";
            element.style.webkitTransitionTimingFunction = "ease-out";
            element.style.opacity = 1;
        },

        /*
         *       Show an element
         */
        show: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }
            element.style.webkitTransitionDuration = "0";
            element.style.opacity = 1;
        },

        /*
         *       Hide an element
         */
        hide: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }
            element.style.webkitTransitionDuration = "0";
            element.style.opacity = 0;
        },

        /*
         *       Translate (move) an element on X or Y axis
         */
        translate: function (el, positions, options) {

            var x_pos = positions.x,
                y_pos = positions.y,
                distance,
                tduration;

            tduration = options.transitionDuration;
            el.style.transitionProperty = "webkit-transform";

            // Animation time
            if (tduration !== undefined && tduration > 0) {
                el.style.webkitTransitionDuration = tduration + "s";
                el.style.webkitTransitionTimingFunction = "ease-out";
                el.style.webkitTransitionTransitionDelay = tduration + "s";
            } else {
                el.style.webkitTransitionDuration = "";
                el.style.webkitTransitionTimingFunction = "";
                el.style.webkitTransitionTransitionDelay = "";
            }

            // Use WebKit transform 3D
            distance = x_pos + "px," + y_pos + "px, 0";
            el.style.webkitTransform = "translate3d(" + distance + ")";

            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }

        }

    };

    Mootor.extend(Mootor.Fx);

}(Mootor));

/*
 * Mootor Navigation
 */

(function (Mootor) {

    "use strict";

    /*
     *      Module dependencies
     */
    var Fx = Mootor.Fx,
        Event = Mootor.Event,
        listeners = Event.listeners,

        Panels;

    /*
     *      Panels
     */
    Panels = function (element) {

        var i,
            panel;

        this.el = element;

        // FIXME CHECK: expensive query
        this.panels = element.getElementsByClassName("panel");

        this.count = this.panels.length;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;

        for (i = this.count; i--;) {
            // FIXME CHECK: expensive query
            panel = this.panels[i];
            panel.anchors = panel.getElementsByTagName('a');
            panel.height = panel.offsetHeight;
        }
        
        // Client viewport sizes
        this.clientH = Mootor.clientH;
        this.clientW = Mootor.clientW;

        // Threshold for change panels
        this.thresholdX = this.clientW / 2;

        // Set document styles    
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
        
        // Header
        // FIXME CHECK
        this.header = document.getElementById("header");
        if (this.header !== "undefined") {
            this.header.anchors = this.header.getElementsByTagName('a');
            this.header.style.width = Mootor.clientW + "px";
            this.top = this.header.offsetHeight;
            this.clientH = Mootor.clientH - this.top;
            this.el.style.marginTop = this.top + "px";
        }

        // Reset and hide all panels
        this.reset();

        // Set event handlers
        this.onDragStart = this.startMove;
        this.onDragMove = this.move;
        this.onDragEnd = this.check;

        // Bind events
        Event.bind(this.el, "onDrag", this);

    };

    Panels.prototype = {

        /*      
         *      Reset all panels
         */
        reset: function () {

            var onTouch,
                j,
                i,
                panels = this,
                panel;

            // Callback for anchor links
            onTouch = function (e) {

                // Prevent defaults on certain elements
                // FIXME CHECK: this is a temporary patch
                if (e.target.type !== "text" && e.target.type !== "input") {
                    // Prevent default listeners
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                }

                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.set(this.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.count; i--;) {

                panel = this.panels[i];

                // Reset styles
                panel.style.width = this.clientW + "px";
                panel.style.overflow = 'hidden';

                // Positioning panels to hide all but first
                if (i > 0) {
                    panel.style.left = -((this.clientW + 40) * 4) + "px";
                } else {
                    panel.style.left = "0px";
                }

                // Adjust panel height to viewport
                if (this.clientH > panel.height) {
                    panel.style.height = this.clientH + "px";
                }

                // Set anchor links
                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        Event.bind(panel.anchors[j], "onTap", onTouch);
                    }
                }

            }
            
            // Header links
            for (i = this.header.anchors.length; i--;) {
                if (this.header.anchors[i].rel !== "") {
                    Event.bind(this.header.anchors[i], "onTap", onTouch);
                }
            }


        },

        /*      
         *      Start move
         */
        startMove: function (e) {

            // Do something on start move

        },

        /*      
         *      Move
         */
        move: function (e) {

            var current = {},
                tDuration = 0.5;
                
            tDuration = 0.5;

            if (listeners.isDraggingX === true || e.isLoading === true) {

                // Dragging X
                if (this.y === 0) {
                    this.x = this.x + e.distanceX;
                }

            } else if (listeners.isDraggingY === true) {

                 // Dragging Y
                this.y = this.y + e.distanceY;

            }

            if ((listeners.isDraggingX || listeners.isDraggingY) && !e.largeMove) {
                // If dragging, move fast
                tDuration = 0;
            }

            if (e.bounceBack === true) {

                // Bouce back
                if (this.current > 0) {
                    this.x = (this.clientW + 40);
                    this.x = this.x > 0 ? -this.x : this.x;
                } else {
                    this.x = 0;
                }

                if (this.y !== 0) {

                    if (e.distanceFromOriginY < 0) {

                        this.y = 0;

                    } else {

                        current = {
                            // FIXME CHECK: expensive query
                            height: this.panels[this.current].offsetHeight
                        };

                        if (current.height >= this.clientH) {
                            this.y = -(current.height - this.clientH);
                        }

                    }

                }

                e.bounceBack = false;

                // Move slow
                tDuration = 0.5;

            }
            
            // Move
            if (!e.callback) {
                Fx.translate(this.el, {x: this.x, y: this.y}, {transitionDuration: tDuration});
            } else {
                Fx.translate(this.el, {x: this.x, y: this.y}, {transitionDuration: tDuration, callback: e.callback});
            }

        },

        /*      
         *      Check move for change panels or bounce back
         */
        check: function (e) {

            var maxdist = this.thresholdX,
                is_momentum = false,
                bouncedist,
                tmpback,
                boostdist;

            // If position reach certain threshold, load new panel,
            // else, move panel back.

            // Check isDragging flags
            if ((listeners.isDraggingX && this.y === 0) || listeners.isDraggingY) {

                // Velocity boost movement
                if (e.velocity.y !== 0) {
                    boostdist = e.velocity.y;
                    e.velocity.y = 0;
                    this.move({
                        distanceY: boostdist * 10,
                        largeMove: true,
                        isLoading: false,
                        callback: this.check(e)
                    });
                }

                if (e.distanceFromOriginX > maxdist && this.current < (this.count - 1)) {

                    // Move to left
                    if (this.current === 0) {
                        tmpback = this.back;
                        this.back = this.current;
                        this.current = tmpback;
                        is_momentum = true;
                    }

                } else if (e.distanceFromOriginX < (-maxdist) && this.current > 0) {

                    // Move to right
                    this.back = this.current;
                    this.current = 0;
                    is_momentum = true;

                }

                if (is_momentum === true) {

                    // Load current panel
                    this.load();

                } else {

                    // Bounce back
                    // FIXME CHECK: expensive query
                    bouncedist = this.clientH - this.panels[this.current].height;

                    if (this.y >= 0 || this.panels[this.current].offsetHeight -  this.clientH < -this.y) {
                        e.largeMove = true;
                        e.bounceBack = true;
                        this.move(e);
                    }

                }
            }

        },

        /*      
         *      Set current panel
         */
        set: function (pid) {

            var i;

            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.panels[i].id === pid) {
                    if (this.current > 0) {
                        this.back = this.current;
                    }
                    this.current = i;
                    this.y = 0;
                    this.load();
                }
            }

        },

        /*      
         *      Load current panel
         */
        load: function () {

            var distance,
                panel,
                cb,
                back;

            panel = this.panels[this.current];
            back = this.panels[this.back];
            
            // Move panels
            this.move({
                distanceY: -this.y,
                largeMove: false,
                fastMove: true
            });

            
            // Calc movement

            if (this.current === 0) {

                // Left 
                distance = 0;
                if (this.back) {
                    back.style.left =  this.clientW + 40 + "px";
                }

            } else {

                // Right
                distance = this.clientW + 40;
                panel.style.left = distance + "px";
                if (this.back && this.back !== this.current) {
                    back.style.left =  distance * 4 + "px";
                }

            }

            // Move panels
            this.move({
                distanceX: -distance - this.x,
                largeMove: true,
                isLoading: true,
                callback: cb
            });


        }

    };

     /*
      *     Public
      */
    Mootor.Nav = {

        /*          
         *      Panels navigation
         *      Usage: $("#panels").panels();
         */
        panels: function () {
            return new Panels(this.el);
        }

    };

    Mootor.extend(Mootor.Nav);

}(Mootor));


// Go public!
window.$ = Mootor;

}(window, document));
