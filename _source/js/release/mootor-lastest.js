(function(window) {
/* 
 *  Mootor Core
 */
 
 /*
    # Instance
    
        + el
        + query

    # Prototype
    
        + ready

    # Static
    
        + context
        + extend
        + ready
        + view
        + show
        + hide
        + bind
        + addClass
        + removeClass
        + hasClass
        - unbind
        - ajax
        - html
 
*/

var document = window.document;

var Moo = (function () {
	"use strict";

    // Return new instance
	Moo = function (query) {
		return new Moo.fn(query);
	};

    //  Selector
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

        // Instance properties
        this.el = (function () {
            return el;
        }());
        this.query = (function () {
            return query;
        }());

		return this;
	};

    // Instance prototype
    Moo.fn.prototype = Moo.prototype = {

        // On element ready
        ready: function (callback) {
            Moo.ready(callback, this.el);
        },

        // Show element
        show: function (el) {
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                element.style.display = "block";
            }
        },

        // Hide element
        hide: function (el) {
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                element.style.display = "none";
            }
        },

        // Bind event
        bind: function (event, callback) {
            this.el.addEventListener(event, callback, false);
        },
        
        // Set class name
        setClass: function(name) {
            this.el.className += " " + name; 
        },
        
        // Has class name
        hasClass: function(name) {
            return (this.el.className.indexOf(name) !== 0);
        },
        
        // Remove class name
        removeClass:  function(name) {
            this.el.className = this.el.className.replace(" " + name, "");
        }


	};

    // Extend function
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

    // Core
    Moo.extend({

        // On element ready
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
                if (el !== undefined && Moo.context.addEventListener) {
                    el.addEventListener("DOM-ContentLoaded", handler, false);
                    el.addEventListener("readystatechange", handler, false);
                    el.addEventListener("load", handler, false);
                }
            } else {
                el.onload = fn;
            }

        },

        // Context features
        context: {
            addEventListener: false
        },

        // Viewport
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
        },
        

    }, Moo);
    
    // Init-time branching
    if (window.addEventListener) {
        Moo.context.addEventListener = true;
    } else {
        Moo.context.addEventListener = false;
    }

    // Initialize Mootor on document ready
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
if (!window.$ || typeof ($) !== "function") {
    window.$ = Moo;
}

/*
 * Mootor Gestures
 */
 
/*    
    - dragStart
    - dragEnd
    - dragMove
    - tapStart
    - tapEnd
    - tapHold
    - doubleTap
    - swipe        
    - pinch

*/


(function (Moo) {
    var Drag,
        Tap;

    /*
     *      Tap
     */
    Tap = function (element, callback) {
        this.callback = callback;
        this.el = element;
        element.onclick = function () { return false; };
        $(element).bind("mouseup", this);
        $(element).bind("touchend", this);

    };

    Tap.prototype = {
        handleEvent: function (e) {
            e.preventDefault();
            this.callback();
        }
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
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            time: 0,
            velocity: {x: 0, y: 0}
        };

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

                if (e.preventDefault) {
                    e.preventDefault();
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

            if (e.clientX || e.clientY) {
                // Click
                this.drag.startX = e.clientX;
                this.drag.startY = e.clientY;
            } else {
                // Touch
                this.drag.startX = e.touches[0].clientX;
                this.drag.startY = e.touches[0].clientY;
            }
            this.drag.x = this.drag.startX;
            this.drag.y = this.drag.startY;

            this.drag.time = date.getMilliseconds();

            this.el.addEventListener('mousemove', this, false);
            this.el.addEventListener('mouseup', this, false);
            this.el.addEventListener('touchmove', this, false);
            this.el.addEventListener('touchend', this, false);

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

            this.drag.distanceOriginX = this.drag.startX - this.drag.x;
            this.drag.distanceOriginY = this.drag.startY - this.drag.y;

            if (e.clientX || e.clientY) {

                // Mouse
                this.drag.distanceX = e.clientX - this.drag.x;
                this.drag.distanceY = e.clientY - this.drag.y;
                this.drag.x = e.clientX;
                this.drag.y = e.clientY;

            } else {

                // Touch
                this.drag.distanceX = e.touches[0].clientX - this.drag.x;
                this.drag.distanceY = e.touches[0].clientY - this.drag.y;
                this.drag.x = e.touches[0].clientX;
                this.drag.y = e.touches[0].clientY;

            }

            this.drag.time = date.getMilliseconds() - this.drag.time;

            if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                distanceOriginX = Math.abs(this.drag.distanceOriginX);
                distanceOriginY = Math.abs(this.drag.distanceOriginY);

                if (distanceOriginY > 0 && distanceOriginY > distanceOriginX && listeners.isDraggingX === false) {
                    listeners.isDraggingY = true;

                } else if (distanceOriginX > 0 && listeners.isDraggingY === false) {
                    listeners.isDraggingX = true;

                }
            }

            this.drag.largeMove = false;

            if (this.callback.onDragMove !== undefined) {
                this.callback.onDragMove(this.drag);
            }

        },

        /*
         *     On move end
         */
        end: function () {

            this.drag.velocity.x = this.drag.distanceX / this.drag.time * 100;
            this.drag.velocity.y = this.drag.distanceY / this.drag.time * 100;

            this.el.removeEventListener('mousemove', this, false);
            this.el.removeEventListener('mouseup', this, false);
            this.el.removeEventListener('touchmove', this, false);
            this.el.removeEventListener('touchend', this, false);

            if (this.callback.onDragEnd !== undefined) {
                this.callback.onDragEnd(this.drag);
            }
            
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
        on: function (el, eventtype, callback) {

            var listenerId = listeners.count,
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
                listener = listeners[listenerId];
            }

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
 
  
/*    
    - translate
    - clean
    
*/

(function (Moo) {
    Moo.Fx = {
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
 
/*    
    - init
    - back
    - create
    - remove
    - load
    - header
    - loading
    - anchors
    - footer  
    
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
        this.navClass = options.nav_class !== undefined ? options.nav_class : "nav";
        this.navmain = {el: options.navmain};
        this.panelClass = options.panel_class !== undefined ? options.panel_class : "panel";
        this.headerId = options.header_id !== undefined ? options.header_id : "header";
        this.hiddenClass = options.hidden_class !== undefined ? options.hidden_class : "hidden";
        this.margin = options.panel_margin !== undefined ? options.panel_margin : 40;
        this.width = options.width !== undefined ? options.width : Moo.view.clientW;
        this.height = options.height !== undefined ? options.height : Moo.view.clientH;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.panels = [];
        this.header = this.header.init(this);

        panels = this.el.getElementsByClassName(this.panelClass);

        this.count = panels.length;

        for (i = panels.length; i--;) {
            this.panels[i] = {el: panels[i]};
            panel =  this.panels[i];
            panel.anchors = panel.el.getElementsByClassName(this.navClass);
            panel.hidden = panel.el.getElementsByClassName(this.hiddenClass);
        }

        // FIXME CHECK
        this.onDragStart = this.start;
        this.onDragMove = this.move;
        this.onDragEnd = this.check;
        Event.on(this.el, "onDrag", this);

        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        this.init();

        return this;

    };

    Panels.prototype = {

        header: {
            init: function (panel) {
                var header = {};
                header.el = document.getElementById(panel.headerId);
                if (header.el) {
                    panel.nav(header);
                    fullWidth(header.el);
                    panel.top = header.el.offsetHeight;
                    panel.height = Moo.view.clientH - panel.top;
                    panel.el.style.marginTop = panel.top + "px";
                    return header;
                }
            }
        },

        nav: function (obj) {
            obj.anchors = obj.el.getElementsByClassName(this.navClass);
        },
        
        init: function () {

            var onTouch,
                j,
                i,
                panels = this,
                panel;

            onTouch = function () {
                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.set(this.el.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.count; i--;) {

                panel = this.panels[i];

                if (this.width === undefined) {
                    fullWidth(panel.el);
                } else {
                    panel.el.style.width = this.width + "px";
                }

                panel.el.style.overflow = 'hidden';

                if (i > 0) {
                    panel.el.style.left = -((this.width + this.margin) * 4) + "px";
                    panel.el.style.top = "0px";
                } else {
                    panel.el.style.left = "0px";
                }

                panel.height = panel.el.offsetHeight;
                if (this.height > panel.height) {
                    panel.el.style.height = this.height + "px";
                    panel.height = this.height;
                }

                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        Event.on(panel.anchors[j], "onTap", onTouch);
                    }
                }

            }

            if (this.header) {
                for (i = this.header.anchors.length; i--;) {
                    if (this.header.anchors[i].rel !== "") {
                        Event.on(this.header.anchors[i], "onTap", onTouch);
                    }
                }
            }

            if (this.navmain.el !== undefined) {
                this.navmain.anchors = this.navmain.el.getElementsByTagName("a");
                for (i = this.navmain.anchors.length; i--;) {
                    if (this.navmain.anchors[i].rel !== "") {
                        Event.on(this.navmain.anchors[i], "onTap", onTouch);
                    }
                }
            }

        },

        start: function (e) {
            var target = event.target;
            window.setTimeout(function () {
                $(target).setClass("active");
            }, 50);
        },

        /*      
         *      Move
         */
        move: function (e) {
            var duration = 0.5,
                element = this.el,
                panel =  this.panels[this.current],
                positions = {};

            // Compare with 0 is faster, the string is " active"
            if ($(event.target).hasClass("active")) {
                $(event.target).removeClass("active");
            }

            if (e.bounceBack === true) {

                if (this.y !== 0) {
                    element = panel.el;
                    if (e.distanceOriginY < 0) {
                        this.y = 0;
                    } else if (panel.height >= this.height) {
                        this.y = -(panel.height - this.height);
                    }
                }
                e.bounceBack = false;

            } else {

                if (e.isLoading === true) {
                    this.x = this.x + e.distanceX;
                } else if (listeners.isDraggingY === true) {
                    this.y = this.y + e.distanceY;
                    element = panel.el;
                }

                if ((listeners.isDraggingX || listeners.isDraggingY) && !e.largeMove) {
                    duration = 0;
                }
            }

            if (element === panel.el) {
                positions.x = 0;
                positions.y = this.y;
            } else {
                positions.x = this.x;
                positions.y = 0;
            }

            Fx.translate(element, positions, {transitionDuration: duration, callback: e.callback});

        },

        /*      
         *      Check move for change panels or bounce back
         */
        check: function (e) {

            var current,
                maxdist;

            event.target.className = event.target.className.replace(" active", "");

            if (listeners.isDraggingY) {

                current = this.panels[this.current];
                maxdist = current.height - this.height;

                // Bounce back
                if (this.y >= 0 || maxdist < -this.y) {
                    e.largeMove = true;
                    e.bounceBack = true;
                    this.move(e);
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
                $(panel.hidden[i]).hide();
            }
            for (i = back.hidden.length; i--;) {
                $(back.hidden[i]).hide();
            }

            Fx.clean(panel.el);
            Fx.clean(back.el);

            cb = (function (width, margin,  navmain) {
                for (i = panel.hidden.length; i--;) {
                    $(panel.hidden[i]).show();
                }
                if (navmain.el !== undefined) {
                    back.el.style.left =  width * 2 + margin + "px";
                }
            }(this.width, this.margin, this.navmain));

            if (this.current === 0 && this.navmain.el === undefined) {
                // Left 
                distance = 0;
                if (this.back) {
                    back.el.style.left =  this.width + this.margin + "px";
                }

            } else {
                // Right
                distance = this.width + this.margin;
                panel.el.style.left = distance + "px";

                if (this.back && this.back !== this.current) {
                    back.el.style.left = -distance * 4 + "px";
                }

            }

            this.move({
                distanceX: -distance - this.x,
                isLoading: true,
                callback: cb
            });


        }

    };
    
    var fullWidth = function(el) {
        el.style.width = Moo.view.clientW + "px";
    };

     /*
      *     Public
      */
    Moo.Nav = {

        panels: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Panels(options);
        }

    };

    Moo.extend(Moo.Nav);

}($));

}(window));
