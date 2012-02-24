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

    /**
     * Main constructor
     *
     * @module Core
     * @constructor
     * @name $
     * @param {string} query Query selector
     * @return {$.fn} Mootor object
     */
	$ = function (query) {
		return new $.fn(query);
	};
    /**
     * @private
     */
	$.fn = function (query) {
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
        /**
         * Element selected
         * @name el
         * @property
         * @memberOf $.fn
         */
        this.el = (function () {
            return el;
        }());
        /**
         * Query passed
         * @name query
         * @property
         * @memberOf $.fn
         */
        this.query = (function () {
            return query;
        }());

		return this;
	};

     /**
     * Mootor object
     * @class
     * @name $.fn
     */
    $.fn.prototype = $.prototype = {

        /**
         * On element ready
         * @name ready
         * @function
         * @memberOf $.fn
         * @example $(document).ready(function() {
         *      console.log("Im ready (The Document)"); 
         *  });
         * @param {function} callback Callback function
         */
        ready: function (callback) {
            $.ready(callback, this.el);
        },

        /**
         * Show element
         * @name show
         * @function
         * @memberOf $.fn
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
         * @name hide
         * @function
         * @memberOf $.fn
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
         * @function
         * @name bind
         * @param {string} event Event
         * @param {function} callback Callback function
         * @memberOf $.fn
         * @example $("#myDiv").bind("touchstart", function() {
         *      console.log("Touch start!")
         * }); 
         */
        bind: function (event, callback) {
            this.el.addEventListener(event, callback, false);
        },

        /**
         * Unbind event listener
         * @function
         * @name unbind
         * @param {string} event Event
         * @param {function} callback Callback function
         * @memberOf $.fn
         * @example $("#myDiv").unbind("touchstart", function() {
         *      console.log("Touch start!")
         * }); 
         */
        unbind: function (event, callback) {
            this.el.removeEventListener(event, callback, false);
        },

        /**
         * Set class name
         * @function
         * @name setClass
         * @param {string} name Class name
         * @memberOf $.fn
         * @example $("#myDiv").setClass("featured");
         */
        setClass: function (name) {
            this.el.className += " " + name;
        },

        /**
         * Check if has class name
         * @function
         * @name hasClass
         * @param {string} name Class name
         * @memberOf $.fn
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
         * @function
         * @name removeClass
         * @param {string} name Class name
         * @memberOf $.fn
         * @example $("#myDiv").removeClass("featured");
         */
        removeClass:  function (name) {
            this.el.className = this.el.className.replace(" " + name, "");
        }


	};

    /**
     * Extend function
     * @function
     * @name extend
     * @param {object} obj Object with properties
     * @param {object} target Target object to be extended
     * @memberOf $
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
         * Mootor  version
         * @name version
         * @property
         * @memberOf $
         */
        version:  (function () {
            return "0.1";
        }()),

        /**
         * On element ready
         * @name ready
         * @function
         * @memberOf $
         * @example $.ready(document, function() {
         *      console.log("Im ready (The Document)"); 
         *  });
         * @param {element} element Element
         * @param {function} callback Callback function
         */
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
                if (el !== undefined && $.context.addEventListener) {
                    el.addEventListener("DOM-ContentLoaded", handler, false);
                    el.addEventListener("readystatechange", handler, false);
                    el.addEventListener("load", handler, false);
                }
            } else {
                el.onload = fn;
            }

        },

        /**
         * Context features
         * @example $.context.addEventListener
         * @name context
         * @property
         * @memberOf $
         */
        context: {
            addEventListener: false
        },

        /**
         * Viewport configuration
         * @name viewport
         * @property
         * @memberOf $
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

    // Init-time branching
    if (window.addEventListener) {
        $.context.addEventListener = true;
    } else {
        $.context.addEventListener = false;
    }

    // Initialize Mootor on document ready
    $.ready(function () {
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

     $.extend({
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
     * @name Gesture
     * @memberOf $.fn
     * @see $.gestures
     */
    $.Gesture = {

        /**
         * On Tap End
         *
         * @function
         * @name onTapEnd
         * @memberOf $.fn.Gesture
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
         * @function
         * @name onTapStart
         * @memberOf $.fn.Gesture
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
         * @function
         * @name onTapHold
         * @memberOf $.fn.Gesture
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
         * @function
         * @name onDragStart
         * @memberOf $.fn.Gesture
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
         * @function
         * @name onDragMove
         * @memberOf $.fn.Gesture
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
         * @function
         * @name onDragEnd
         * @memberOf $.fn.Gesture
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
    };

    $.extend($.Gesture);

}($));

/* 
 * Mootor Visual FX
 */

(function ($) {
    "use strict";
    /**
     * @class
     * @name Fx
     * @memberOf $
     */
    $.Fx = {

        /**
         * Translate element, using GPU acceleration when available
         * @memberOf $.Fx
         * @param {element} el Element
         * @param {object} positions Axis positions
         * @param {object} options Options
         * @config {integer} transitionDuration Duration of transition (in seconds)
         * @example $.Fx.translate($("#myDiv", {10,20}, {tansitionDuration: .5}));
         */
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

        /**
         * Clean element transform styles
         * @memberOf $.Fx
         * @param {element} el Element
         * @example $.Fx.clean($("#myDiv");
         */
        clean: function (el) {
            el.style.webkitTransitionDuration = "";
            el.style.webkitTransitionTimingFunction = "";
        }

    };

    $.extend($.Fx);

}($));

/*
 * Mootor Navigation
 */

(function ($) {
    "use strict";

    var fullWidth,
        Panels;

    fullWidth = function (el) {
        el.style.width = $.view.clientW + "px";
    };

    /**
     * Panels
     *
     * @class
     * @name Panels
     * @property {element} el Element
     * @property {integer} x Position on X axis
     * @property {integer} y Position on Y axis
     * @property {integer} current Index of active panel
     * @property {integer} back Index of previous active panel
     * @property {string} navClass Navigation class name
     * @property {string} panelClass Panels class name
     * @property {string} hiddenClass Hidden content class name
     * @property {string} headerId Header element id
     * @property {integer} width Panels container width
     * @property {integer} height Panels container height
     * @property {boolean} isMoving Returns true if panels container is moving
     * @property {integer} direction Direction for panels movement
     * @property {array} [history] History of panels navigation
     * @property {integer} count Panels count
     */

    Panels = function (options) {

        var i,
            panel,
            panels;

        this.el = options.el;
        this.navClass = options.nav_class !== undefined ? options.nav_class : "nav";
        this.panelClass = options.panel_class !== undefined ? options.panel_class : "panel";
        this.headerId = options.header_id !== undefined ? options.header_id : "header";
        this.hiddenClass = options.hidden_class !== undefined ? options.hidden_class : "hidden";
        this.margin = options.panel_margin !== undefined ? options.panel_margin : 5;
        this.width = options.width !== undefined ? options.width : $.view.clientW;
        this.height = options.height !== undefined ? options.height : $.view.clientH;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.panels = [];
        this.header = this.header.init(this);
        this.isMoving = false;
        this.direction = 0;
        this.history = [];

        panels = this.el.getElementsByClassName(this.panelClass);

        this.count = panels.length;

        for (i = panels.length; i--;) {
            this.panels[i] = {el: panels[i]};
            panel =  this.panels[i];
            panel.anchors = panel.el.getElementsByClassName(this.navClass);
            panel.hidden = panel.el.getElementsByClassName(this.hiddenClass);
        }

        $(this.el).onDragMove(this);
        $(this.el).onDragEnd(this);

        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        this.init();

        return this;

    };

    Panels.prototype = {

        handleGesture: function (gesture) {
            switch (gesture.type) {
            case "dragMove":
                this.move(gesture);
                break;
            case "dragEnd":
                this.check(gesture);
                break;
            }
        },

        header: {
            init: function (panel) {
                var header = {};
                header.el = document.getElementById(panel.headerId);
                if (header.el) {
                    panel.nav(header);
                    fullWidth(header.el);
                    panel.top = header.el.offsetHeight;
                    panel.height = $.view.clientH - panel.top;
                    panel.el.style.marginTop = panel.top + "px";
                    return header;
                }
            }
        },

        nav: function (obj) {
            obj.anchors = obj.el.getElementsByClassName(this.navClass);
        },

        init: function () {

            var anchorCallback,
                j,
                i,
                panels = this,
                panel,
                setActive,
                headerAnchor,
                goBack,
                clickcb;

            anchorCallback = function (gesture) {
                panels.direction = 0;
                $(gesture.el).removeClass("active");
                if (panels.isMoving === false) {
                    panels.set(gesture.el.rel);
                }
                return false;
            };

            clickcb = function () {
                return false;
            };

            setActive = function (gesture) {
                $(gesture.el).setClass("active");
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
                        $(panel.anchors[j]).onTapStart(setActive);
                        panel.anchors[j].onclick = clickcb;
                        $(panel.anchors[j]).onTapEnd(anchorCallback);
                    }
                }
            }

            if (this.header) {
                goBack = function () {
                    panels.goBack();
                };
                for (i = this.header.anchors.length; i--;) {
                    headerAnchor =  this.header.anchors[i];
                    if (headerAnchor.rel === "back") {
                        $(headerAnchor).onTapEnd(goBack);
                        headerAnchor.onclick = clickcb;
                    }
                }
            }

            return this;

        },

        /*      
         *      Move
         */
        move: function (gesture) {
            var panel =  this.panels[this.current];
            if (gesture.isDraggingY !== 0 && panel.movable !== false) {
                this.isMoving = true;
                this.y = this.y + (gesture.y - gesture.lastY);
                this.translate({
                    el: panel.el,
                    y: this.y
                });
            }

        },

        /*      
         *      Check move
         */
        check: function (gesture) {
            var panel = this.panels[this.current],
                maxdist = panel.height - this.height,
                cb,
                i;

            /**
             * @ignore
             */            
            cb = function () {
                $.Fx.clean(panel.el);
            };
            if (gesture.isDraggingY !== 0) {

                this.isMoving = false;
                // Bounce back
                if (this.y >= 0 || maxdist < -this.y) {
                    if (this.y > 0) {
                        this.y = 0;
                    } else {
                        this.y = -(panel.height - this.height);
                    }
                    for (i = panel.anchors.length; i--;) {
                        $(panel.anchors[i]).removeClass("active");
                    }
                    this.translate({
                        y: this.y,
                        el: panel.el,
                        duration: 0.5,
                        callback: cb
                    });
                }

            }

        },

        /*      
         *      Set current panel
         */
        set: function (panelid) {

            var i;

            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.panels[i].el.id === panelid) {
                    this.back = this.current;
                    if (this.direction === 0) {
                        this.get(panelid);
                        this.history.push(this.current);
                    }
                    this.current = i;
                    this.load();
                }
            }

        },

        /*
         *      Get by id
         */
        get: function (id) {
            var i;
            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.panels[i].el.id === id) {
                    return this.panels[i];
                }
            }
        },

        /*      
         *      Translate panels
         */
        translate: function (options) {
            if (options.duration === undefined) {
                options.duration = 0;
            }
            if (options.callback === undefined) {
                options.callback = function () {};
            }
            if (options.y === undefined) {
                options.y = 0;
            }
            if (options.x === undefined) {
                options.x = 0;
            }
            if (options.duration === undefined) {
                options.duration = 0;
            }
            $.Fx.translate(
                options.el,
                {y: options.y, x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
        },

        hide: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).hide();
            }
        },

        show: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).show();
            }
        },
        /*      
         *      Load current panel
         */
        load: function () {

            var panel,
                cb,
                back,
                show = this.show,
                translate = this.translate,
                positionX,
                container = this.el;

            panel = this.panels[this.current];
            back = this.panels[this.back];

            this.hide(panel);
            this.hide(back);
            $(panel.el).show();

            cb = function () {
                show(panel);
                $(back.el).hide();
            };

            positionX = this.width + this.margin;

            if (this.current !== 0) {
                if (this.back === 0) {
                    panel.el.style.left = positionX + "px";
                } else {
                    translate({el: container});
                    back.el.style.left = "0px";
                    if (this.direction !== 0) {
                        positionX = -positionX;
                    }
                    panel.el.style.left = positionX + "px";
                }
            } else if (this.back !== 0) {
                translate({el: container, x: -positionX});
                back.el.style.left = positionX + "px";
                panel.el.style.left = "0px";
                positionX = 0;
            }

            if (this.side === 1) {
                this.side = 0;
            } else {
                this.side = 1;
            }

            window.setTimeout(function () {
                translate({
                    el: container,
                    duration: 0.5,
                    x: -positionX,
                    callback: cb
                });
            }, 10);
        },


        /**
         * Go back on navigation history
         * @memberOf $.fn.Nav
         * @name goBack
         * @example nav.goBack();
         */
        goBack: function () {
            if (this.history.length > 0) {
                this.direction = -1;
                this.back = this.history.pop();
                this.set(this.panels[this.back].el.id);
            }
        },

        /**
         * Panels configuration
         * @memberOf $.fn.Nav
         * @name config
         * @param {object} options Configuration options
         * @example nav.config({
         *      panel: "geo",
         *       movable: false
         * });
         */
        config: function (options) {
            var panel;
            if (options.panel !== undefined) {
                panel = this.get(options.panel);
                if (options.movable !== undefined) {
                    panel.movable = options.movable;
                }
            }
        }

    };


    /**
     * Navigation
     *
     * @class
     * @name Nav
     * @memberOf $.fn
     * @param {object} options Configuration options
     * @return {Panels} Panels object
     * @config {string} navClass Navigation class name
     * @config {string} panelClass Panels class name
     * @config {string} hiddenClass Hidden content class name
     * @config {string} headerId Header element id
     * @example var nav = $("#panels").nav();
     */
     $.Nav = {
        nav: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Panels(options);
        }
    };

    $.extend($.Nav);

}($));

}(window));
