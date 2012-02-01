(function(window) {
/* 
 *  Mootor Core
 */

var document = window.document;

var Moo = (function () {
	"use strict";

	Moo = function (query) {
		return new Moo.fn(query);
	};

	Moo.fn = function (query) {
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

		// Private
		this.el = (function () {
			return el;
		}());
		this.query = (function () {
			return query;
		}());

		return this;
	};

    Moo.fn.prototype = Moo.prototype = {
		ready: function (callback) {
			Moo.ready(callback, this.el);
		}
	};

    Moo.extend = function (obj, target) {
        var i;
        if (target === undefined) {
            target = Moo.prototype;
        }
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
    };

    Moo.extend({

        ready: function (fn, el) {
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
                if (el !== undefined && Moo.test.addEventListener) {
                    el.addEventListener("DOM-ContentLoaded", handler, false);
                    el.addEventListener("readystatechange", handler, false);
                    el.addEventListener("load", handler, false);
                }
            } else {
                el.onload = fn;
            }

        },

        test: {
            addEventListener: false
        },

        view: {

            clientH: 0,
            clientW: 0,

            hide: function () {
                var styles = document.createElement("style");
                styles.innerHTML = "body * {display: none}";
                document.head.appendChild(styles);
                Moo.view.styles = styles;
            },

            show: function () {
                document.head.removeChild(Moo.view.styles);
            }
        }

    }, Moo);

    if (window.addEventListener) {
        Moo.test.addEventListener = true;
    } else {
        Moo.test.addEventListener = false;
    }

    Moo.ready(function () {
		var clientW = document.documentElement.clientWidth,
			clientH = document.documentElement.clientHeight;

		Moo.view.clientH = (function () {
			return clientH;
		}());
		Moo.view.clientW = (function () {
			return clientW;
		}());
		Moo.view.show();

	}, document);

	Moo.view.hide();
	return Moo;

}());

// Go public!
window.$ = Moo;


/*
 * Mootor Events
 */

 /*
  *     TODO: 
  *
  *     - Init-time branching
  *     - Event delegation
  */

(function (Moo) {
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

            this.drag.distanceOriginX = this.drag.startX - this.drag.lastX;
            this.drag.distanceOriginY = this.drag.startY - this.drag.lastY;

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
            distanceOriginX = Math.abs(this.drag.distanceOriginX);
            distanceOriginY = Math.abs(this.drag.distanceOriginY);

            // Time of last touch (for velocity calc)
            this.drag.time = date.getMilliseconds() - this.drag.time;

            // Velocity
            this.drag.velocity.x = this.drag.distanceX / this.drag.time * 100;
            this.drag.velocity.y = this.drag.distanceY / this.drag.time * 100;

            // Detect draggingY
            if (distanceOriginY > 0 && distanceOriginY > distanceOriginX && listeners.isDraggingX === false) {

                listeners.isDraggingY = true;

            // Detect draggingX
            } else if (distanceOriginX > 0 && listeners.isDraggingY === false) {

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
    Moo.Event = {

        /*
         *      bind
         */
        bind: function (el, eventtype, callback) {

            var listeners = Moo.Event.listeners,
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

/* 
 * Mootor Visual FX
 */

(function (Moo) {
    Moo.Fx = {
        show: function (el) {
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                console.log("show!");
                element.style.display = "block";
            }
        },

        hide: function (el) {
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                console.log("hide!");
                element.style.display = "none";
            }
        },

        translate: function (el, positions, options) {

            var x_pos = positions.x,
                y_pos = positions.y,
                tduration;

            tduration = options.transitionDuration;
            el.style.transitionProperty = "webkit-transform";

            if (tduration !== undefined && tduration > 0) {
                el.style.webkitTransitionDuration = tduration + "s";
                el.style.webkitTransitionTimingFunction = "ease-out";
            } else {
                this.clean(el);
            }
                        
            el.style.webkitTransform = "translate3d(" + x_pos + "px," + y_pos + "px, 0)";

            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }

        },
        
        clean: function (el) {
            el.style.webkitTransitionDuration = "";
            el.style.webkitTransitionTimingFunction = "";        
        }

    };

    Moo.extend(Moo.Fx);

}($));

/*
 * Mootor Navigation
 */

(function (Moo) {
    // Module dependencies
    var Fx = Moo.Fx,
        Event = Moo.Event,
        listeners = Event.listeners,

        Panels;

    Panels = function (options) {

        var i,
            panel,
            panels;

        this.el = options.el;
        this.panelClass = options.panel_class;
        this.navClass = options.nav_class;
        this.hiddenClass = options.hidden_class;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.height = Moo.view.clientH;
        this.width = Moo.view.clientW;
        this.thresholdX = this.width / 2;
        this.header = {el: document.getElementById(options.header_id)};
        this.panels = [];

        panels = this.el.getElementsByClassName(this.panelClass);
        this.count = panels.length;

        for (i = panels.length; i--;) {
            this.panels[i] = {el: panels[i]};
            panel =  this.panels[i];
            panel.anchors = panel.el.getElementsByClassName(this.navClass);
            panel.height = panel.el.offsetHeight;
            panel.hidden = panel.el.getElementsByClassName(this.hiddenClass);
        }

        if (this.header !== undefined) {
            this.nav(this.header);
            this.top = this.header.el.offsetHeight;
            this.height = Moo.view.clientH - this.top;
            this.el.style.marginTop = this.top + "px";
        }

        this.onDragMove = this.move;
        this.onDragEnd = this.check;
        Event.bind(this.el, "onDrag", this);

        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
        this.init();

    };

    Panels.prototype = {

        nav: function (obj) {
            obj.el.style.width = Moo.view.clientW + "px";
            obj.anchors = obj.el.getElementsByClassName(this.navClass);
        },

        init: function () {

            var onTouch,
                j,
                i,
                panels = this,
                panel;

            onTouch = function (e) {
                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.set(this.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.count; i--;) {

                panel = this.panels[i];
                panel.el.style.width = this.width + "px";
                panel.el.style.overflow = 'hidden';

                if (i > 0) {
                    panel.el.style.left = ((this.width + 40) * 4) + "px";
                    panel.el.style.top = "0px";
                } else {
                    panel.el.style.left = "0px";
                }

                if (this.height > panel.height) {
                    panel.el.style.height = this.height + "px";
                    panel.height = this.height;
                }

                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        Event.bind(panel.anchors[j], "onTap", onTouch);
                    }
                }

            }

            if (this.header) {
                for (i = this.header.anchors.length; i--;) {
                    if (this.header.anchors[i].rel !== "") {
                        Event.bind(this.header.anchors[i], "onTap", onTouch);
                    }
                }
            }

        },

        /*      
         *      Move
         */
        move: function (e) {
            var duration = 0.5,
                element = this.el,
                panel =  this.panels[this.current],
                positions = {};

            // Update position
            if ((listeners.isDraggingX === true  && e.largeMove) || e.isLoading === true) {
                this.x = this.x + e.distanceX;
            } else if (listeners.isDraggingY === true) {
                this.y = this.y + e.distanceY;
                element = panel.el;
            }

            // Fast move
            if ((listeners.isDraggingX || listeners.isDraggingY) && !e.largeMove) {
                duration = 0;
            }

            // Bounce back
            if (e.bounceBack === true) {

                if (this.current > 0) {
                    this.x = (this.width + 40);
                    this.x = this.x > 0 ? -this.x : this.x;
                } else {
                    this.x = 0;
                }

                if (this.y !== 0) {
                    element = panel.el;
                    if (e.distanceOriginY < 0) {
                        this.y = 0;
                    } else {
                        if (panel.height >= this.height) {
                            this.y = -(panel.height - this.height);
                        }
                    }
                }

                e.bounceBack = false;
                duration = 0.5;

            }

            if (element === panel.el) {
                positions.x = 0;
                positions.y = this.y;
            } else {
                positions.x = this.x;
                positions.y = 0;
            }

            if (!e.callback) {
                Fx.translate(element, positions, {transitionDuration: duration});
            } else {
                Fx.translate(element, positions, {transitionDuration: duration, callback: e.callback});
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

                if (e.distanceOriginX > maxdist && this.current < (this.count - 1)) {

                    // Move to left
                    if (this.current === 0) {
                        tmpback = this.back;
                        this.back = this.current;
                        this.current = tmpback;
                        is_momentum = true;
                    }

                } else if (e.distanceOriginX < (-maxdist) && this.current > 0) {

                    // Move to right
                    this.back = this.current;
                    this.current = 0;
                    is_momentum = true;

                }

                if (is_momentum === true) {
                    this.load();

                } else {
                    // Bounce back
                    bouncedist = this.height - this.panels[this.current].height;
                    if (this.y >= 0 || this.panels[this.current].height -  this.height < -this.y) {
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
                if (this.panels[i].el.id === pid) {
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
                back,
                i;

            panel = this.panels[this.current];
            back = this.panels[this.back];

            for (i = panel.hidden.length; i--;) {
                Fx.hide(panel.hidden[i]);
            }
            for (i = back.hidden.length; i--;) {
                Fx.hide(back.hidden[i]);
            }

            Fx.clean(panel.el);
            Fx.clean(back.el);

            cb = function () {
                for (i = panel.hidden.length; i--;) {
                    Fx.show(panel.hidden[i]);
                }
            };


            if (this.current === 0) {
                // Left 
                distance = 0;
                if (this.back) {
                    back.el.style.left =  this.width + 40 + "px";
                }

            } else {
                // Right
                distance = this.width + 40;
                panel.el.style.left = distance + "px";

                if (this.back && this.back !== this.current) {
                    back.el.style.left = distance * 4 + "px";
                }

            }

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
    Moo.Nav = {

        panels: function (options) {
            if (typeof options !== "object") {
                options = {
                    header_id: "header",
                    panel_class: "panel",
                    nav_class: "nav"
                };
            }
            options.el = this.el;
            return new Panels(options);
        }

    };

    Moo.extend(Moo.Nav);

}($));

}(window));
