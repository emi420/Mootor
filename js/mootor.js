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
	Mootor.extend = function (obj) {
		var i;
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

	return Mootor;

}());




/*
 * Mootor Events (coded by emi420@gmail.com)
 */

(function (Mootor) {

    "use strict";

    var Drag,
        Orientation;

    // Drag 
    Drag = function (element, callback) {
        this.element = this;
        this.startTouchX = 0;
        this.endTouchX = 0;
        this.lastTouchX = 0;
        this.callback = callback;
        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchmove', this, false);
        element.addEventListener('touchend', this, false);
    };

    // Handler
    Drag.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'touchstart':
            this.onTouchStart(e);
            break;
        case 'touchmove':
            this.onTouchMove(e);
            break;
        case 'touchend':
            this.onTouchEnd(e);
            break;
        }
    };

    // Start
    Drag.prototype.onTouchStart = function (e) {
        this.lastTouchX = this.startTouchX = e.touches[0].clientX;
    };

    // Move
    Drag.prototype.onTouchMove = function (e) {
        var distance = e.touches[0].clientX - this.lastTouchX,
            distanceFromOrigin = this.startTouchX - this.lastTouchX;

        this.lastTouchX = e.touches[0].clientX;
        this.callback({
            distance: distance,
            distanceFromOrigin: distanceFromOrigin
        });
    };

    // End
    Drag.prototype.onTouchEnd = function () {
        var distance = this.startTouchX - this.lastTouchX;
        if (this.onDragEnd !== 'undefined') {
            this.onDragEnd(distance);
        }
    };

    // Orientation
    Orientation = function (element, callback) {
        this.callback = callback;
        this.element = this;
        element.addEventListener("orientationchange", this, false);
    };

    // Handler
    Orientation.prototype.handleEvent = function (e) {
        if (e.type === 'orientationchange') {
            this.onOrientationChange(e);
        }
    };

    // Change
    Orientation.prototype.onOrientationChange = function () {
        this.callback();
    };

    Mootor.Event = {
        bind: function (el, eventtype, callback) {
            switch (eventtype) {

            case 'drag':
                el.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                Mootor.listeners[el] = new Drag(el, callback);
                break;

            case 'dragEnd':
                Mootor.listeners[el].onDragEnd = callback;
                break;

            case "orientationChange":
                Mootor.listeners.orientationchange = new Orientation(el, callback);
                break;

            }
        }
    };

    Mootor.extend(Mootor.Event);

    /*
     * Private
     */

    Mootor.listeners = [];

}(Mootor));/* 
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

        // Translate (move) an element on X axis
        translateX: function (el, x_pos, options) {

            var tduration = options.transitionDuration;
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
                el.style.webkitTransform = "translate3d(" + x_pos + "px,0, 0)";
            } else {
                el.style.left = x_pos + "px";
            }
        },

        // Adjust font size relative to viewport size
        dynamicType: function () {

            // Update viewport font-size
            var updateSize = function () {

                // This calc can be optimized
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

(function (Mootor) {

    "use strict";

    /*
     * Module dependencies
     */

    var Fx = Mootor.Fx,
        Event = Mootor.Event;

    Mootor.Nav = {

        panels: function () {

            /*
             * Navigation panels
             * 
             */

            var clientWidth = Mootor.init_client_width,
                clientHeight =  Mootor.init_client_height,
                thresholdX =  clientWidth / 2,
                panelsX = 0,
                current = 0,
                divPanels = this.el,
                panels = divPanels.getElementsByClassName("panel"),
                panelCount = panels.length,

                // Reset panels container size and position
                resetContainer = function () {
                    divPanels.style.width = (clientWidth * 2) + "px";
                    divPanels.style.height = clientHeight + "px";
                },

                // Move screen horizontally 
                moveScreenH = function (e) {

                    var distance = e.distance,
                        distanceFromOrigin = e.distanceFromOrigin;

                     // New horizontal position                                          
                    panelsX = panelsX + distance;

                    if (distanceFromOrigin === undefined) {

                        // Large move
                        if (distance > 700 || distance < -700) {
                            Fx.translateX(divPanels, panelsX, {transitionDuration: 0.5});
                        } else {
                            Fx.translateX(divPanels, panelsX, {transitionDuration: 0.2});
                        }

                    } else {

                        // Short move
                        Fx.translateX(divPanels, panelsX, {});

                    }
                },

                // Load panel
                load = function () {

                    var distance;

                    // Move panels
                    distance = (clientWidth + 40) * current;
                    distance = distance > 0 ? -distance : distance;

                    moveScreenH({
                        distance: distance - panelsX
                    });

                },

                // DragEnd event handler
                checkMove = function (distance) {

                    var maxdist = thresholdX,
                        is_momentum = false;

                    // If position reach certain threshold,
                    // load new panel. 
                    // Else, move panel back.

                    if (distance > maxdist && current < (panelCount - 1)) {

                        // Swipe to left

                        // Hide unreachable panels
                        /*if (current > 2) {
                            Fx.hide(panels[current - 2]);
                        }
                        if (current < panelCount - 2) {
                            Fx.show(panels[current + 2]);
                        }*/

                        current += 1;
                        is_momentum = true;

                    } else if (distance < (-maxdist) && current > 0) {

                        // Swipe to right

                        // Hide unreachable panels
                        /*if (current < panelCount - 2) {
                            Fx.hide(panels[current + 2]);
                        }
                        if (current > 2) {
                            Fx.show(panels[current - 2]);
                        }*/

                        current -= 1;
                        is_momentum = true;

                    }

                    if (is_momentum === false) {

                        // Bounce back
                        moveScreenH({
                            distance: distance
                        });

                    } else {

                        // Load panel
                        load();

                    }

                },

                setCurrent = function (pid) {
                    var i;
                    for (i = panelCount; i--;) {
                        if (panels[i].id === pid) {
                            current = i;
                            Fx.show(panels[i]);
                            load();
                        }
                    }
                },

                // Reset panels
                resetAll = function () {

                    var pstyle,
                        panchors,
                        pid,
                        onAnchorClick,
                        i,
                        j;

                    onAnchorClick = function (pid) {
                        return function () {
                            setCurrent(pid);
                            return false;
                        };
                    };

                    for (i = panelCount; i--;) {

                        pstyle = panels[i].style;

                        // Reset styles
                        pstyle.width = clientWidth + "px";
                        pstyle.left =  i > 0 ? (clientWidth * i + (40 * i)) + "px" : (clientWidth * i) + "px";
                        if (clientHeight > pstyle.height) {
                            pstyle.height = clientHeight + "px";
                        }
                        pstyle.overflow = 'hidden';

                        // FIXME CHECK: expensive query (getElementsByTagName)
                        panchors = panels[i].getElementsByTagName('a');

                        for (j = panchors.length; j--;) {
                            if (panchors[j].rel !== "") {
                                pid = panchors[j].rel;
                                panchors[j].ontouchstart = onAnchorClick(pid);
                                panchors[j].onclick = onAnchorClick(pid);
                            }
                        }

                        // Hide all but first two panels
                        /*if (i > 1) {
                            Fx.hide(panels[i]);
                        }*/

                    }

                    // Reset panels container
                    resetContainer();

                };

            /*
             *  Initialize panels
             */

            // Set document styles    
            document.body.style.overflow = "hidden";

            // Reset and hide all panels
            resetAll();

            // Custom events listeners
            Event.bind(document.body, "drag", moveScreenH);
            Event.bind(document.body, "dragEnd", checkMove);
            Event.bind(window, "orientationChange", resetAll);

        }
    };

    Mootor.extend(Mootor.Nav);

}(Mootor));

// Go public!
window.$ = Mootor;

}(window, document));
