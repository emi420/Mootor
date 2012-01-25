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

 /*
  *     TODO: 
  *
  *     - Event Delegation 
  *     - Remove Mootor.listeners array
  *     - In-time branching
  */
 
(function (Mootor) {

    "use strict";

    var Drag,
        Touch,
        Orientation,
        preventDefault,
        ClickDrag;

    // Utils

    preventDefault = function (element) {

        // Prevents default callback
        element.addEventListener('click', function (e) { e.preventDefault(); }, false);
        element.onclick = function () {return false; };

        // Disable selection, copy, etc
        element.style.webkitTouchCallout = "none";
        element.style.webkitUserSelect = "none";
        element.style.webkitUserDrag = "none";
        element.style.webkitUserModify = "none";
        element.style.webkitHighlight = "none";

    };

    // Touch

    Touch = function (element) {

        this.element = this;
        this.el = element;

        // Prevent default listeners and styles
        preventDefault(element);

        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchend', this, false);

    };

    // Touch Handler
    Touch.prototype.handleEvent = function (e) {

        switch (e.type) {
        case 'touchstart':
            this.onTouchStart(e);
            break;
        case 'touchend':
            this.onTouchEnd(e);
            break;
        }

    };

    // Touch Start
    Touch.prototype.onTouchStart = function () {

        if (this.onTouchStart.callback !== undefined) {
            this.onTouchStart.callback.call();
        }

    };

    // Touch End
    Touch.prototype.onTouchEnd = function () {

        if (this.onTouchEnd.callback !== undefined) {
            this.onTouchEnd.callback(this.el.rel);
        }

    };

    // Drag 
    Drag = function (element) {

        this.el = element;
        this.touch = {
            startX: 0,
            endX: 0,
            lastX: 0,
            startY: 0,
            endY: 0,
            lastY: 0
        };

        // Prevent default listeners and styles
        preventDefault(element);

        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchmove', this, false);
        element.addEventListener('touchend', this, false);

    };

    // Dreag Handler
    Drag.prototype.handleEvent = function (e) {

        switch (e.type) {
        case 'touchstart':
            this.onDragStart(e);
            break;
        case 'touchmove':
            this.onDragMove(e);
            break;
        case 'touchend':
            this.onDragEnd(e);
            break;
        }

    };

    // Drag Start
    Drag.prototype.onDragStart = function (e) {

        var e_touch = e.touches[0];
        this.touch.lastX = this.touch.startX = e_touch.clientX;
        this.touch.lastY = this.touch.startY = e_touch.clientY;

    };

    // Drag Move
    Drag.prototype.onDragMove = function (e) {

        var e_touch = e.touches[0],
            distanceX = e_touch.clientX - this.touch.lastX,
            distanceY = e_touch.clientY - this.touch.lastY,
            threshold = 15,
            distanceFromOriginX,
            distanceFromOriginY;
        this.touch.lastX = e_touch.clientX;
        this.touch.lastY = e_touch.clientY;
        distanceFromOriginX = this.touch.startX - this.touch.lastX;
        distanceFromOriginY = this.touch.startY - this.touch.lastY;

        // Set isDragging flags

        if (Math.abs(distanceFromOriginX) > threshold && Mootor.listeners.isDraggingY === false) {
            Mootor.listeners.isDraggingX = true;
        }
        if (Math.abs(distanceFromOriginY) > threshold && Mootor.listeners.isDraggingX === false) {
            Mootor.listeners.isDraggingY = true;
        }

        // Callback

        if (this.onDragMove.callback !== undefined) {
            this.onDragMove.callback({
                distanceX: distanceX,
                distanceFromOriginX: distanceFromOriginX,
                distanceY: distanceY,
                distanceFromOriginY: distanceFromOriginY
            });
        }

    };

    // Drag End
    Drag.prototype.onDragEnd = function () {

        var distanceX = this.touch.startX - this.touch.lastX,
            distanceY = this.touch.startY - this.touch.lastY;

        if (this.onDragEnd.callback !== 'undefined') {
            this.onDragEnd.callback({
                distanceX: distanceX,
                distanceY: distanceY
            });
        }

        Mootor.listeners.isDraggingX = false;
        Mootor.listeners.isDraggingY = false;

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
    
    // *** EXPERIMENTAL BEGIN ***
    
    /* TODO:
     *
     *  - En Click esta armado un modelo a seguir para implementar
     *    los eventos Touch y crear el evento personalizado Swipe
     *
     */
    
    // ClickDrag instance constructor
    
    ClickDrag = function (element, callback) {
    
        console.log("creating new instance...");

        this.el = element;
        this.callback = callback;

        console.log("binding all events...");

        this.el.addEventListener('mousedown', this, false);


    };
    
    // Click Drag event handler
    
    ClickDrag.prototype.handleEvent = function (e) {

        switch (e.type) {
        case 'mousedown':
            console.log("mouse down! calling onMouseDown");
            this.onMouseDown(e);
            break;
        case 'mouseup':
            console.log("mouse down! calling onMouseUp");
            this.onMouseUp(e);
            break;
        case 'mousemove':
            console.log("mouse down! calling onMouseMove");
            this.onMouseMove(e);
            break;
        }
        
    };    
    
    // On mouse down
    ClickDrag.prototype.onMouseDown = function (e) {
        var result;
        this.initX = 0;
        this.lastX = e.clientX;
        result = {
            distance: 0
        };
        this.el.addEventListener('mousemove', this, false);
        this.el.addEventListener('mouseup', this, false);
        this.callback.onDragStart(result);
    };    

    // On mouse up
    ClickDrag.prototype.onMouseUp = function (e) {
        var distance = this.initX - e.clientX,
            result;
        this.lastX = e.clientX;      
        result = {
            distance: distance
        };
        this.el.removeEventListener('mousemove', this, false);
        this.el.removeEventListener('mouseup', this, false);
        this.callback.onDragEnd(result);
    };   

    // On mouse move
    ClickDrag.prototype.onMouseMove = function (e) {
        var result,
            distance = this.lastX - e.clientX;
        
        this.lastX = e.clientX;
        result = {
            distance: distance
        };
        this.callback.onDragMove(result);

    };    
    
    Mootor.Event = {

        bind: function (el, eventtype, callback) {
                
            var listeners = Mootor.Event.listeners,            
                listenerId = listeners.count,
                listener,
                i,
                listenerCount = 1;
            
            console.log("we have " + listenerId + " listeners");
            console.log("creating listener... (" + eventtype + ")");

            for (i = 0; i <  listeners.count; i++) {
                if (listeners[i].el === el) {
                    console.log("this element has a listener (" + i + ")");
                    listenerId = i;
                    listenerCount = 0;
                }
            }
            
            switch (eventtype) {
            case "onDragStart":
            case "onDragEnd":
            case "onDragMove":
                listener = new ClickDrag(el, callback);
                break;
            }

            if (!listeners[listenerId]) {
                listeners[listenerId] = listener;
                listeners.count += 1;
            }
 
            listener[eventtype] = callback;            
            listener.id = listenerId;

        }
        // *** EXPERIMENTAL END***

    };

    Mootor.extend(Mootor.Event);

    /*
     * Private
     */

    Mootor.Event.listeners = {
        count: 0,
        isDraggingX: false,
        isDraggingY: false
    };

}(Mootor));

window.Mootor = Mootor;





/*            case 'dragMove':
                el.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                listener = Mootor.listeners[listenerId] = new Drag(el);
                listener.onDragMove.callback = callback;
                listener.id = listenerId;

                Mootor.listeners.count += 1;
                break;

            case 'dragEnd':

                for (i = 0; i < Mootor.listeners.count; i++) {
                    if (Mootor.listeners[i].el === el) {
                        listenerId = i;
                        listenerCount = 0;
                    }
                }
                if (listenerCount > 0) {
                    Mootor.listeners[listenerId] = new Drag(el);
                    Mootor.listeners.count += listenerCount;
                }
                listener = Mootor.listeners[listenerId];
                listener.onDragEnd.callback = callback;
                listener.id = listenerId;
                break;

            case 'touchStart':
                console.log("touch start");
                break;
                
            case 'touchEnd':
                listener = Mootor.listeners[listenerId] = new Touch(el);
                listener.onTouchEnd.callback = callback;
                listener.id = listenerId;
                Mootor.listeners.count += 1;
                break;

            // FIXME CHECK: orientation event support on Android 
            // and other devices that lack of this event 
            case "orientationChange":
                listener = Mootor.listeners[listenerId] = new Orientation(el, callback);
                listener.id = listenerId;
                Mootor.listeners.count += 1;
                break;

            }*//* 
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
            y_pos = positions.y;
                        
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
            
            // FIXME CHECK: optimize me
            
            if (!isNaN(x_pos) && x_pos !== undefined) {                
                distance = x_pos + "px,0, 0";            
            } else if (!isNaN(y_pos) && y_pos !== undefined) {
                distance = "0," + y_pos + "px, 0";            
            }

            if (el.style.webkitTransform !== "undefined") {
                el.style.webkitTransform = "translate3d(" + distance + ")";
            } else {
                if (!isNaN(x_pos) && x_pos !== undefined) {                
                    el.style.left = x_pos + "px";
                }  else if (!isNaN(y_pos) && y_pos !== undefined) {
                    el.style.top = y_pos + "px";    
                }
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

 /* TODO:
  *  
  *  - event delegation 
  */ 

  (function (Mootor) {

    "use strict";

    /*
     * Module dependencies
     */

    var Fx = Mootor.Fx,
        Event = Mootor.Event,
        Panels;
     
    Panels = function(element) {

        this.el = element;
        this.msg = "hola!";
        
        this.onDragStart = this.startMove;
        this.onDragEnd = this.checkMove;
        this.onDragMove = this.move;
        
        this.el.onclick = function() { return false };

        Event.bind(this.el, "onDragStart", this);
        Event.bind(this.el, "onDragEnd", this);
        Event.bind(this.el, "onDragMove", this);

    }


    Panels.prototype.startMove = function(e) {       
        console.log("start move!");
        console.log(e.distance);
    }

    Panels.prototype.move = function(e) {       
        console.log("move!");
        console.log(e.distance);
    }

    Panels.prototype.checkMove = function(e) {       
        console.log("check move!");
        console.log(e.distance);
        console.log(this.el.id);
    }

    Mootor.Nav = {

        panels: function() {
            var home,
                carousel
                
            home = document.getElementById("home");
            carousel = document.getElementById("carousel");
            
            var a = new Panels(home);
            var b = new Panels(carousel);
            
            //return new Panels(this.el);
        }

    };

    Mootor.extend(Mootor.Nav);

}(Mootor));


/*
        panels: function () {

            // Navigation panels

            var clientWidth = Mootor.init_client_width,
                clientHeight =  Mootor.init_client_height,
                thresholdX =  clientWidth / 2,
                panelsX = 0,
                panelsY = 0,
                current = 0,
                divPanels = this.el,
                panels = divPanels.getElementsByClassName("panel"),
                panelCount = panels.length,

                // Move screen horizontally 
                moveScreen = function (e) {

                    var distanceX = e.distanceX,
                        distanceY = e.distanceY,
                        distanceFromOriginY = e.distanceFromOriginY,
                        distanceFromOriginX = e.distanceFromOriginX;

                    // FIXME CHECK: optimize me
                    if (isNaN(panelsY)) {
                        panelsY = 0;
                    }

                    // New horizontal position                                          
                    panelsX = panelsX + distanceX;
                    panelsY = panelsY + distanceY;                    

                    if (Mootor.listeners.isDraggingY === false ) {

                        if (distanceFromOriginX === undefined) {

                            // Large X move
                            if (distanceX > 700 || distanceX < -700) {
                                Fx.translate(divPanels, {x: panelsX}, {transitionDuration: 0.5});
                            } else {
                                Fx.translate(divPanels, {x: panelsX}, {transitionDuration: 0.2});
                            }

                        } else if (Mootor.listeners.isDraggingX === true) {

                            // Short X move
                            Fx.translate(divPanels, {x: panelsX}, {});

                        }

                    }  else if (Mootor.listeners.isDraggingY === true) {

                        // Short Y move                        
                        if (distanceFromOriginY === undefined) {
                            Fx.translate(divPanels, {y: panelsY}, {transitionDuration: 0.5});
                        } else {
                            Fx.translate(divPanels, {y: panelsY}, {});                        
                        }
                    }

                },

                // Load panel
                load = function () {

                    var distance;

                    // Move panels
                    distance = (clientWidth + 40) * current;
                    distance = distance > 0 ? -distance : distance;

                    moveScreen({
                        distanceX: distance - panelsX
                    });

                },

                // DragEnd event handler
                checkMove = function (touch) {

                    var maxdist = thresholdX,
                        is_momentum = false,
                        distanceX = touch.distanceX,
                        distanceY = touch.distanceY;

                    // If position reach certain threshold,
                    // load new panel. 
                    // Else, move panel back.

                    if (distanceX > maxdist && current < (panelCount - 1)) {

                        // Swipe to left

                        current += 1;
                        is_momentum = true;

                    } else if (distanceX < (-maxdist) && current > 0) {

                        // Swipe to right

                        current -= 1;
                        is_momentum = true;

                    }
                    

                    if (is_momentum === false) {
                        
                        if (Mootor.listeners.isDraggingX === true) {
                            // Bounce back
                            moveScreen({
                                distanceX: distanceX
                            });
                            
                        } else if (Mootor.listeners.isDraggingY === true) {

                            // FIXME: check this bounce
                            if (panelsY > 0) {
                            
                                // Bounce back
                                moveScreen({
                                    distanceY: -panelsY
                                });                            

                            } else {

                                maxdist = divPanels.getElementsByClassName('panel')[current].offsetHeight - clientHeight;
                                if (panelsY < -maxdist) {
                                    // Bounce back
                                    moveScreen({
                                        distanceY: -panelsY -maxdist
                                    });                                                            
                                }
                                
                            }

                        }

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

                    // Set anchor links
                    onAnchorClick = function () {
                        return function (pid) {
                            if (Mootor.listeners.isDraggingX === false && Mootor.listeners.isDraggingY === false) {
                                setCurrent(pid);
                            }
                            return false;
                        };
                    };

                    for (i = panelCount; i--;) {

                        pstyle = panels[i].style;

                        // Reset styles

                        pstyle.width = clientWidth + "px";
                        pstyle.left =  i > 0 ? (clientWidth * i + (40 * i)) + "px" : (clientWidth * i) + "px";
                        if (clientHeight > panels[i].offsetHeight) {
                            pstyle.height = clientHeight + "px";
                        }
                        pstyle.overflow = 'hidden';

                        // Set anchor links

                        // FIXME CHECK: expensive query (getElementsByTagName)
                        panchors = panels[i].getElementsByTagName('a');

                        for (j = panchors.length; j--;) {
                            if (panchors[j].rel !== "") {
                                pid = panchors[j].rel;
                                Event.bind(panchors[j], "touchEnd", onAnchorClick(pid));
                            }
                        }

                    }

                };




            //  Initialize panels

            // Set document styles    
            document.body.style.overflow = "hidden";

            // Reset and hide all panels
            resetAll();

            // Custom events listeners
            Event.bind(document.body, "dragMove", moveScreen);
            Event.bind(document.body, "dragEnd", checkMove);
            Event.bind(window, "orientationChange", resetAll);            
 */
// Go public!
window.$ = Mootor;

}(window, document));
