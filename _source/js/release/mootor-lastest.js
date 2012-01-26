(function(window, document) {
/* 
 *  Mootor Core (coded by emi420@gmail.com)
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

	// On element ready
	Mootor.ready = function (fn, el) {
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
            if (el !== "undefined" && el.addEventListener) {
                el.addEventListener("DOM-ContentLoaded", handler, false);
                el.addEventListener("readystatechange", handler, false);
                el.addEventListener("load", handler, false);
            } // IE8 needs attachEvent() support
		} else {
			el.onload = fn;
		}
	};

	// Hide document body
	Mootor.hideBody = function () {
		var init_styles = document.createElement("style");
		init_styles.innerHTML = "body * {display: none}";
		Mootor.init_styles = init_styles;
		document.head.appendChild(init_styles);
	};

	// Show document body
	Mootor.showBody = function () {
		document.head.removeChild(Mootor.init_styles);
	};

	// Main constructor
	Mootor.fn = function (query) {

		var q_type = typeof query,
			el;

		if (q_type === "string" || q_type === "object") {

				// Get object from query

			switch (q_type) {

			case "string":

				//console.log("FIXME CHECK: Query to the Dom *** EXPENSIVE");

				if (query.indexOf('#') > -1) {
					query = query.replace("#", "");
					el = document.getElementById(query);
				} else if (query.indexOf(".") > -1) {
					query = query.replace(".", "");
					el = document.getElementsByClassName(query);
				}
				break;

			case "object":
				el = query;
				break;
			}
		}

		// Private element & query properties

		this.el = (function () {
			return el;
		}());

		this.query = (function () {
			return query;
		}());

		return this;

	};

	// Inheritance by copying properties
	Mootor.extend = function (obj, target) {
		var i;
        if (target === "undefined") {
            target = Mootor.prototype;
        } ;
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				Mootor.prototype[i] = obj[i];
			}
		}
	};

	// Prototypal inheritance    
	Mootor.fn.prototype = Mootor.prototype;

	Mootor.ready(function () {

		// Initial screen size
		var init_client_width = document.documentElement.clientWidth,
			init_client_height = document.documentElement.clientHeight;

		Mootor.init_client_height = (function () {
			return init_client_height;
		}());

		Mootor.init_client_width = (function () {
			return init_client_width;
		}());

		Mootor.showBody();

	}, document);

	Mootor.init_styles = undefined;
	Mootor.hideBody();
    Mootor.eventwrapper = window;

	return Mootor;

}());




/*
 * Mootor Events (coded by emi420@gmail.com)
 */

 /*
  *     FIXME: 
  *
  *     - In-time branching
  *     - Prevent bubbling in delegation pattern
  *     - Optimize me
  */

(function (Mootor) {

    "use strict";

    var Drag,
        Tap;
        
    /*
     *      Tap
     */

    Tap = function (element, callback) {

        element.addEventListener("click", callback, false);
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

        // On move end

        end: function (e) {

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
        },

        // On move

        move: function (e) {

            var listeners = Mootor.Event.listeners;

            this.drag.distanceFromOriginX = this.drag.startX - this.drag.lastX;
            this.drag.distanceFromOriginY = this.drag.startY - this.drag.lastY;

            if (e.clientX || e.clientY) {
                this.drag.distanceX = e.clientX - this.drag.lastX;
                this.drag.distanceY = e.clientY - this.drag.lastY;
                this.drag.lastX = e.clientX;
                this.drag.lastY = e.clientY;
            } else {
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

            // Callback

            if (this.callback.onDragMove !== undefined) {
                this.callback.onDragMove(this.drag);
            }

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

/* 
 * Mootor Visual FX (coded by emi420@gmail.com)
 */

(function (Mootor) {

    "use strict";

    // Max and Min font sizes
    var max_font_size = 105,
        min_font_size = 20;

    Mootor.Fx = {

        // Show an element
        show: function (el) {
            if (typeof el === "object") {
                el.style.display = "block";
            } else {
                this.el.style.display = "block";
            }
        },

        // Hide an element
        hide: function (el) {
            if (typeof el === "object") {
                el.style.display = "none";
            } else {
                this.el.style.display = "none";
            }
        },

        // Translate (move) an element on X or Y axis
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

            // Apply 3d transform when its available
            // or use default CSS 'left' property

            // FIXME CHECK: optimize me

            // Check if move is on X or Y axis
            if (!isNaN(x_pos) && x_pos !== undefined) {
                distance = x_pos + "px,0, 0";
            } else if (!isNaN(y_pos) && y_pos !== undefined) {
                distance = "0," + y_pos + "px, 0";
            }

            if (el.style.webkitTransform !== "undefined") {

                // Use WebKit transform 3D
                el.style.webkitTransform = "translate3d(" + distance + ")";

            } else {
                // Use left & top CSS styles
                if (!isNaN(x_pos) && x_pos !== undefined) {
                    el.style.left = x_pos + "px";
                } else if (!isNaN(y_pos) && y_pos !== undefined) {
                    el.style.top = y_pos + "px";
                }
            }

        },

        // Adjust font size relative to viewport size
        dynamicType: function () {

            // Update viewport font-size
            var updateSize = function () {

                // FIXME CHECK: This calc can be optimized
                var font_size = window.innerWidth / 10 + (window.innerHeight / 40);

                if (typeof (document.body) !== null) {
                    if (font_size < max_font_size && font_size > min_font_size) {
                        document.body.style.fontSize = font_size + "%";
                    } else if (font_size >= max_font_size) {
                        document.body.style.fontSize = max_font_size + "%";
                    } else if (font_size <= min_font_size) {
                        document.body.style.fontSize = min_font_size + "%";
                    }
                }

            };

            // Add event listeners to update font size when user 
            // rotate device or resize window
            //Event.bind(window, "orientationChange", updateSize);
            //Event.bind(window, "resize", updateSize);

            // Initialize font-size
            updateSize();

        }
    };

    Mootor.extend(Mootor.Fx);

}(Mootor));

/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

 /*      FIXME:
  *          - Despues de usar swipe no funciona tap
  *          - Despues de usa swipe en eje X no funciona en eje Y
  *          - Optimize me
  */

(function (Mootor) {

    "use strict";

    /*
     *      Module dependencies
     */

    var Fx = Mootor.Fx,
        Event = Mootor.Event,

    Panels = function (element) {

        this.el = element;
        this.panels = element.getElementsByClassName("panel");
        this.panelsCount = this.panels.length;
        this.clientHeight = Mootor.init_client_height;
        this.clientWidth = Mootor.init_client_width;
        this.panelsX = 0;
        this.panelsY = 0;
        this.current = 0;
        this.thresholdX = this.clientWidth / 2;

        // Prevent default actions
        this.el.onclick = function () { return false; };

        // Set event handlers
        this.onDragStart = this.startMove;
        this.onDragMove = this.move;
        this.onDragEnd = this.checkMove;

        // Event.bind(window, "orientationChange", resetAll);

        // Bind event listeners
        Event.bind(this.el, "onDragStart", this);
        Event.bind(this.el, "onDragEnd", this);
        Event.bind(this.el, "onDragMove", this);

        //  Initialize panels

        // Set document styles    
        document.body.style.overflow = "hidden";

        // Reset and hide all panels
        this.resetAll();

    };

    Panels.prototype = {

        // Reset size, styles and link anchors to panels
        resetAll: function () {

            var pstyle,
                panchors,
                onAnchorTouch,
                j,
                i,
                listeners = Mootor.Event.listeners,
                instance = this;

            // Set anchor links
            onAnchorTouch = function () {

                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    instance.setCurrent(this.rel);
                }
                return false;

            };


            for (i = this.panelsCount; i--;) {

                pstyle = this.panels[i].style;

                // Reset styles

                pstyle.width = this.clientWidth + "px";
                pstyle.left =  i > 0 ? (this.clientWidth * i + (40 * i)) + "px" : (this.clientWidth * i) + "px";
                if (this.clientHeight > this.panels[i].offsetHeight) {
                    pstyle.height = this.clientHeight + "px";
                }
                pstyle.overflow = 'hidden';

                // FIXME CHECK: expensive query (getElementsByTagName)
                panchors = this.panels[i].getElementsByTagName('a');

                for (j = panchors.length; j--;) {
                    if (panchors[j].rel !== "") {
                        Event.bind(panchors[j], "onTap", onAnchorTouch);
                    }
                }

            }
        },

        // Start move
        startMove: function (e) {

            // Do something on start move
            //console.log(e);

        },

        // Move
        move: function (e) {

            var distanceX = e.distanceX,
                distanceY = e.distanceY,
                distanceFromOriginY = e.distanceFromOriginY,
                distanceFromOriginX = e.distanceFromOriginX,
                listeners = Mootor.Event.listeners;

            // New horizontal position                                          
            this.panelsX = this.panelsX + distanceX;
            this.panelsY = this.panelsY + distanceY;


            if (listeners.isDraggingY === false) {

                if (distanceFromOriginX === undefined) {

                    // Large X move
                    if (distanceX > 700 || distanceX < -700) {
                        Fx.translate(this.el, {x: this.panelsX}, {transitionDuration: 0.5});
                    } else {
                        Fx.translate(this.el, {x: this.panelsX}, {transitionDuration: 0.2});
                    }

                } else if (listeners.isDraggingX === true) {

                    // Short X move
                    Fx.translate(this.el, {x: this.panelsX}, {});

                }

            } else if (listeners.isDraggingY === true) {

                // Short Y move                        
                if (distanceFromOriginY === undefined) {
                    Fx.translate(this.el, {y: this.panelsY}, {transitionDuration: 0.5});
                } else {
                    Fx.translate(this.el, {y: this.panelsY}, {});
                }
            }

        },

        // Check move to take actions
        checkMove: function (e) {

            var maxdist = this.thresholdX,
                is_momentum = false,
                listeners = Mootor.Event.listeners;

            // If position reach certain threshold,
            // load new panel. 
            // Else, move panel back.

            if (e.distanceFromOriginX > maxdist && this.current < (this.panelsCount - 1)) {

                // Move to left

                this.current += 1;
                is_momentum = true;

            } else if (e.distanceFromOriginX < (-maxdist) && this.current > 0) {

                // Move to right

                this.current -= 1;
                is_momentum = true;

            }

            if (is_momentum === false) {

                if (listeners.isDraggingX === true) {

                    // Bounce back
                    this.move({
                        distanceX: e.distanceFromOriginX
                    });

                } else if (listeners.isDraggingY === true) {

                    // FIXME: check this bounce
                    if (this.panelsY > 0) {

                        // Bounce back
                        this.move({
                            distanceY: -this.panelsY
                        });

                    } else {

                        // FIXME CHECK: 
                        //  optimize me
                        //  expensive query
                        maxdist = this.el.getElementsByClassName('panel')[this.current].offsetHeight - this.clientHeight;

                        if (this.panelsY < -maxdist) {
                            // Bounce back
                            this.move({
                                distanceY: -this.panelsY - maxdist
                            });
                        }

                    }

                }

            } else {
                // Load current panel
                this.load();

            }

        },

        setCurrent: function (pid) {

            var i;
            for (i = this.panelsCount; i--;) {
                if (this.panels[i].id === pid) {
                    this.current = i;
                    Fx.show(this.panels[i]);
                    this.load();
                }
            }

        },

        load: function () {
            var distance;

            // Move panels
            distance = (this.clientWidth + 40) * this.current;
            distance = distance > 0 ? -distance : distance;

            this.move({
                distanceX: distance - this.panelsX
            });
        }

    }

     /*
      *     Public
      */
    Mootor.Nav = {

        panels: function () {
            return new Panels(this.el);
        }

    };

    Mootor.extend(Mootor.Nav);

}(Mootor));


// Go public!
window.$ = Mootor;

}(window, document));
