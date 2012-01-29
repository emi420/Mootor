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
			Mootor.core.ready(callback, this.el);
		}

	};

    // Test browser compatibility
    Mootor.test = {

        addEventListener: false

    };

    // Init-time branching
    if (window.addEventListener) {
        Mootor.test.addEventListener = true;
    } else {
        Mootor.test.addEventListener = false;
    }

    // Core
    Mootor.core = {

        // Initial styles
        init_styles: undefined,

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
        hideBody: function () {

            var init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);
            Mootor.core.init_styles = init_styles;

        },

        // Show document body
        showBody: function () {

            document.head.removeChild(Mootor.core.init_styles);

        }
    };

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

	// Inheritance by copying properties
	Mootor.extend = function (obj, target) {
		var i;
        if (target === "undefined") {
            target = Mootor.prototype;
        }
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				Mootor.prototype[i] = obj[i];
			}
		}
	};

	// Prototypal inheritance 
	Mootor.fn.prototype = Mootor.prototype;

	// On document ready, get viewport sizes and show body
    Mootor.core.ready(function () {

		// Initial screen size
		var init_client_width = document.documentElement.clientWidth,
			init_client_height = document.documentElement.clientHeight;

		Mootor.core.init_client_height = (function () {
			return init_client_height;
		}());
		Mootor.core.init_client_width = (function () {
			return init_client_width;
		}());

        // Show body
		Mootor.core.showBody();

	}, document);

    // Hide body
	Mootor.core.hideBody();

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

/* 
 * Mootor Visual FX
 */

(function (Mootor) {

    "use strict";

    // Max and Min font sizes
    var max_font_size = 105,
        min_font_size = 20;

    Mootor.Fx = {

        /*
         *       Show an element
         */
        show: function (el) {
            if (typeof el === "object") {
                el.style.display = "block";
            } else {
                this.el.style.display = "block";
            }
        },

        /*
         *       Hide an element
         */
        hide: function (el) {
            if (typeof el === "object") {
                el.style.display = "none";
            } else {
                this.el.style.display = "none";
            }
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

            // Apply 3d transform when its available
            // or use default CSS 'left' property

            if (el.style.webkitTransform !== "undefined") {

                // Use WebKit transform 3D
                distance = x_pos + "px," + y_pos + "px, 0";
                el.style.webkitTransform = "translate3d(" + distance + ")";

            } else {
                // Use left & top CSS styles
                el.style.left = x_pos + "px";
                el.style.top = y_pos + "px";
            }
            
            if (options.callback) {
                setTimeout(options.callback, tduration * 1000);
            }

        },

        /*
         *       Adjust font size relative to viewport size
         */
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

        var i;

        this.el = element;

        // Add blank panel to load content
        this.create({
            id: "blank"
        });

        // FIXME CHECK: expensive query
        this.panels = element.getElementsByClassName("panel");


        this.panelsCount = this.panels.length;
        this.blank = this.panels[this.panelsCount - 1];
        this.panelsX = 0;
        this.panelsY = 0;
        this.current = 0;
        this.back = 0;

        for (i = this.panelsCount; i--;) {
            // FIXME CHECK: expensive query
            this.panels[i].anchors = this.panels[i].getElementsByTagName('a');
            this.panels[i].panelHeight = this.panels[i].offsetHeight;
        }

        // Client viewport sizes
        this.clientHeight = Mootor.core.init_client_height;
        this.clientWidth = Mootor.core.init_client_width;

        // Threshold for change panels
        this.thresholdX = this.clientWidth / 2;

        // Set document styles    
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        // Reset and hide all panels
        this.resetAll();

        // Set event handlers
        this.onDragStart = this.startMove;
        this.onDragMove = this.move;
        this.onDragEnd = this.checkMove;

        // Bind events
        Event.bind(this.el, "onDrag", this);

    };

    Panels.prototype = {

        /*      
         *      Reset all panels
         */
        resetAll: function () {

            var onAnchorTouch,
                j,
                i,
                panels = this,
                panel;

            // Callback for anchor links
            onAnchorTouch = function () {
                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.setCurrent(this.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.panelsCount; i--;) {

                panel = this.panels[i];

                // Reset styles
                panel.style.width = this.clientWidth + "px";
                panel.style.overflow = 'hidden';

                if (panel.id === "blank") {
                    // Positioning blank panel
                    panel.style.left =  this.clientWidth + 40 + "px";
                } else {
                    // Positioning panels and hide all but first
                    panel.style.left =  i > 0 ? (this.clientWidth * i + (40 * i)) + "px" : (this.clientWidth * i) + "px";
                    Fx.hide(panel);
                }

                // Adjust panel height to viewport
                if (this.clientHeight > panel.panelHeight) {
                    panel.style.height = this.clientHeight + "px";
                }

                // Set anchor links
                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        Event.bind(panel.anchors[j], "onTap", onAnchorTouch);
                    }
                }

            }

            // Show first panel
            Fx.show(this.panels[0]);
            Fx.show(this.blank);

        },

        /*
         *      Create new panel
         */
        create: function (options) {

            var div;

            div = document.createElement("div");
            div.id = options.id;
            div.className = "panel";
            this.el.appendChild(div);

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
        
            var current = {};
            
            e.moveDuration = 0.5;

            if (listeners.isDraggingX === true || e.isLoading === true) {

                // Dragging X
                this.panelsX = this.panelsX + e.distanceX;

            } else if (listeners.isDraggingY === true) {

                 // Dragging Y
                this.panelsY = this.panelsY + e.distanceY;

            }

            if ((listeners.isDraggingX || listeners.isDraggingY) && !e.largeMove) {
                // If dragging, move fast
                e.moveDuration = 0;
            }

            if (e.bounceBack === true) {
            
                // Bouce back
                if (this.current > 0) {
                    this.panelsX = (this.clientWidth + 40);
                    this.panelsX = this.panelsX > 0 ? -this.panelsX : this.panelsX;
                } else {
                    this.panelsX = 0;
                }
                
                if (this.panelsY !== 0) {
                
                    if (e.distanceFromOriginY < 0) {
                    
                        this.panelsY = 0;
                        
                    } else {
                    
                        current = {
                            // FIXME CHECK: expensive query
                            height: this.panels[this.current].offsetHeight
                        }

                        if (current.height >= this.clientHeight) {
                            this.panelsY = -(current.height - this.clientHeight);
                        }
                        
                    }
                    
                }

                e.bounceBack = false;

                // Move slow
                e.moveDuration = 0.5;

            }

            // Move
            if (!e.callback) {
                Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {transitionDuration: e.moveDuration});
            } else {
                Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {transitionDuration: e.moveDuration, callback: e.callback});
            }

        },

        /*      
         *      Check move for change panels or bounce back
         */
        checkMove: function (e) {

            var maxdist = this.thresholdX,
                is_momentum = false,
                bouncedist;
                
            // If position reach certain threshold, load new panel,
            // else, move panel back.
                       
            // Check isDragging flags
            if (listeners.isDraggingX || listeners.isDraggingY) {

                if (e.distanceFromOriginX > maxdist && this.current < (this.panelsCount - 1)) {

                    // Move to left
                    //this.current += 1;
                    //is_momentum = true;

                } else if (e.distanceFromOriginX < (-maxdist) && this.current > 0) {

                    // Move to right
                    //this.current -= 1;
                    //is_momentum = true;

                }

                if (is_momentum === true) {

                    // Load current panel
                    this.load();

                } else {
                
                    // Bounce back
                    // FIXME CHECK: expensive query
                    bouncedist = this.clientHeight - this.panels[this.current].panelHeight;

                    console.log("bounce back, current: " + this.current);
                    /*console.log("bouncedist :" + bouncedist);
                    console.log("panelsY :" + this.panelsY);*/
                    console.log("panelsX :" + this.panelsX);

                    if (this.panelsY >= 0 || this.panels[this.current].offsetHeight -  this.clientHeight < -this.panelsY) {
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
        setCurrent: function (pid) {

            var i;

            // Get panel by id and load it
            for (i = this.panelsCount; i--;) {
                if (this.panels[i].id === pid) {
                    if (this.current > 0) {
                        this.back = this.current;
                    }
                    this.current = i;
                    this.panelsY = 0;
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
                hidden_elements,
                back;
                
            panel = this.panels[this.current];
            back = this.panels[this.back];
            
            // Calc movement
            
            if (this.current === 0) {
                // Left 
                distance = 0;
                hidden_elements =  back.getElementsByClassName("iframe")[0];
                if (hidden_elements) {
                    Fx.hide(hidden_elements);
                }
            } else {
                // Right
                if (this.back) {
                    Fx.hide(back);
                }
                distance = this.clientWidth + 40;
                panel.style.left = distance + "px";
                Fx.show(panel);
                Fx.hide(this.blank);
                hidden_elements =  panel.getElementsByClassName("iframe")[0];
                if (hidden_elements) {
                    cb = function() {
                        Fx.show(hidden_elements);
                    }
                }
            }           

            // Move panels
            this.move({
                distanceX: -distance - this.panelsX,
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
