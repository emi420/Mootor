/**
 * Mootor - HTML5 library for application development
 * 
 * You may use any Mootor project under the terms of either the MIT License
 * or the GNU General Public License (GPL) Version 3.
 * 
 * (c) 2012 Emilio Mariscal (emi420 [at] gmail.com)
 *
 */

(function (document) {

"use strict";

var $ = (function () {

    var Moo,
        _scripts,
        _hideContentWhileDocumentNotReady,

    /**
     * Main public constructor 
     *
     * @constructor
     * @param {string} query Query selector
     * @return {object} $ Mootor object
     */
	$ = function (query) {
		return new Moo(query, document);
	},
	
    /**
     * On element ready
     * @private
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
                if (e.type === "readystatechange" 
                    && document.readyState !== "complete") 
                    {return; }
                fn.call(document);
                ready = true;
            };
            if ($.window.addEventListener) {
                el.addEventListener = $.window.addEventListener;
                ["DOM-ContentLoaded",
                 "readystatechange",
                 "load"].map(
                    function(x){
                        el.addEventListener(x, handler, false);
                    }
                );
            }
        } else {
            el.onload = Moo;
        }
    };
        	
    /**
     * Private constructor
     *
     * @private
     * @param {string} query Query selector
     * @param {object} context Context element
     * @return {object} $ Mootor object
     */
	Moo = function (query, context) {
		var qtype = typeof query,
			el,
			i = 1;
			
        // Get element from query
        if (qtype === "string") {

            if (query.indexOf("#") > -1) {
                el = this[0] = context.getElementById(
                    query.replace("#", "")
                );
                if (this[0] !== null) {
                    this.length = 1;                    
                }

            } else {            
                if (query.indexOf(".") > -1) {
                    el = context.getElementsByClassName(
                        query.replace(".", "")
                    );
                } else {
                    // TODO: filter valid tags
                    el = context.getElementsByTagName(query);
                }
                for(i = 0; i < el.length; i++) {
                    this[i] = el[i];
                }
                this.length = i;
            }
            
        } else if (qtype === "object") {
            el = this[0] = query;
            this.length = 1;
        }                    
        
        // Direct access to query result
        this.el = (function () {
            return el;
        }());

        // Query string passed
        this.query = (function () {
            return query;
        }());     
                       
        return this;
	};

	// Inherits Array prototype
    $.prototype = Moo.prototype = [];
        
    /**
     * Extend function
     * @param {object} obj Object with properties
     * @param {object} target Target object to be extended
     * @example $.extend(target, {id: 1});
     */
    $.extend = function (obj, target) {
        var i;
        target = target === undefined ?
                 $.prototype : target;
        for (i in obj) {
            if (obj.hasOwnProperty(i) && !target.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
    };
    
    $.extend({
     
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
            var element = typeof el === "object" ? 
                          el : this.el;
            if (element !== undefined) {
                element.style.display = "block";
            }
            return this;
        },

        /**
         * Hide element
         * @example $("#myDiv").hide(); 
         */
        hide: function (el) {
            var element = typeof el === "object" ?
                          el : this.el;
            if (element !== undefined) {
                element.style.display = "none";
            }
            return this;
        },

        /**
         * Bind event listener
         * @param {string} event Event
         * @param {function} callback Callback function
         * @example $("#myDiv").on("click", function() {
         *      console.log("click!")
         * }); 
         */
        on: function(event, callback) {
            this.el.addEventListener(event, callback, false);
            return this;
        },
        // Deprecated method
        bind: function (event, callback) {
            this.on(event,callback);
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
            return this;
        },

        /**
         * Set class name
         * @param {string} name Class name
         * @example $("#myDiv").setClass("featured");
         */
        setClass: function (name) {
            var classes = this.el.className.split(" ");
            if (classes.indexOf(name) === -1) {
                classes.push(name);
                this.el.className = classes.join(" ");
            }
            return this;
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
            var classes = this.el.className.split(" ")
            return classes.indexOf(name) !== -1;
        },

        /**
         * Remove class name
         * @param {string} name Class name
         * @example $("#myDiv").removeClass("featured");
         */
        removeClass: function (name) {
            this.el.className = Array.prototype.filter.call(
                this.el.className.split(" "), 
                function(x) { 
                    return x !== name; 
                }
            ).join(" ");
            return this;
        },

        /**
         * Load HTML content into an element
         * @param {string} html HTML
         * @example $("#myDiv").html("<b>I love Spectre.</b>");
         */
        html: function (html) {
            this.el.innerHTML = html;
            return this;
        },
        
        /**
         * Selector useful for query chaining
         * @param {string} query Query
         * @example $("#myList").find(".item")
         */
        find: function(query) {
            return new Moo(query, this.el);
        }        
        
	});

    // Core
    $.extend({
    
         /**
         * @lends $
         */

         /**
         * Mootor  version
         */
        version:  (function () {
            return "0.11";
        }()),

        /**
         * Context features
         * @example $.context.addEventListener
         */
        context: {
            addEventListener: false,
            userAgent: "",
        },

        /**
         * Viewport
         * @example $.view.clientH - Client height
         * $.view.clientW - Client width
         * $.view.hide() - Hide viewport
         * $.view.show() - Show viewport
         */
        view: {

            clientH: 0,
            clientW: 0,

            hide: function () {
                var styles = document.createElement("style");
                styles.innerHTML = "body {display: none}";
                document.head.appendChild(styles);
                $.view.styles = styles;
            },

            show: function () {
                document.head.removeChild($.view.styles);
            }
        },
        
        /**
         * Ajax request
         * @param {object} options Options configuration
         * @config {string} url URL to open
         * @config {string} method Request method
         * @config {string} headers Request headers
         * @config {function} callback Function callback
         */
        ajax:  function (options) {
            var xmlhttp = new $.window.XMLHttpRequest(),
                handler,
                data = null,
                i;
			
			// FIXME CHECK: xmlhttp.status==0 for WebView Ajax
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState==4 && (xmlhttp.status==200 || xmlhttp.status==0)) {
                    options.callback(xmlhttp.responseText);
                }
            };
            
            if (options.method === undefined || options.method === "GET")
            {
	            xmlhttp.open("GET", options.url, true);
            } else if (options.method === "POST") {
            	xmlhttp.open("POST", options.url, true);
            	data = options.data;
            }
            
            if (options.headers === undefined) {
                xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            } else {
                for (i in options.headers) {
                    xmlhttp.setRequestHeader(i, options.headers[i]);                
                }
            }
            xmlhttp.send(data);
        },
        
        /**
         * require Include scripts
         * @param {string} script Script URL
         * @param {function} callback Function callback
         */
         require: function(script, callback) {
              if (_scripts.isIncluded(script) === false) {
                  _scripts.include(script, callback);
              } else {
                 if (typeof callback === "function") {
                     callback();
                 }
              }
        }

    }, $);

    // Localise globals
    $.window = {
        XMLHttpRequest: window.XMLHttpRequest,
        addEventListener: window.addEventListener
    }

    // Cross-browser compatibility
    if ($.window.addEventListener === undefined) {
        $.window.attachEvent = window.attachEvent;
        $.window.addEventListener = function(event, callback) {
            $.window.attachEvent("on" + event, callback);
        }
    }
    
    // Context features
    
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        $.context.userAgent = "android";
    } else if (navigator.userAgent.toLowerCase().indexOf("safari") > -1) {
        $.context.userAgent = "safari";
    } else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
        $.context.userAgent = "msie";
    } else {
        $.context.userAgent = "";    
    }

    // Initialize Mootor on document ready
    ready(function () {
        var clientW,
            clientH,

        updateClientSizes = function() {
            clientW = document.documentElement.clientWidth,
            clientH = document.documentElement.clientHeight;

            $.view.clientH = (function () {
                return clientH;
            }());
            $.view.clientW = (function () {
                return clientW;
            }());

        }
        
        updateClientSizes();
    
        $(window).bind("resize", function(){
            updateClientSizes();
        });       

	}, document);
	
	
    /**
     * Hide all content while document is not ready
     * @private
     */
    _hideContentWhileDocumentNotReady = function() {
    	$.view.hide();
    	$(document).ready(function() {
    		$.view.show();
    	});
    };
    _hideContentWhileDocumentNotReady();

    /**
     * Scripts included
     * @private
     */
    _scripts = {
        isIncluded: function(script) {
            var i;
            for (i = _scripts.list.length; i--;) {
                if (_scripts.list[i] === script) {
                    return true;
                }
            }
            return false;
        },
        
        include: function(script, callback) {
            _scripts.list.push(script);
            $.ajax({
                  url: script,
                  callback: function(response) {
                     var script = document.createElement("script");
                     script.innerHTML = response;
                     document.head.appendChild(script);
                     if (typeof callback === "function") {
                          callback();
                     }
                  }
            });              
        },
        
        list: []
    }

	return $;

}());

// Go public!
if (!window.$ || typeof ($) !== "function") {
    window.Mootor = window.$ = $;
} else {
    window.Mootor = $;    
}

(function () {

    $.extend({         
    
        /** @lends $.prototype */
        
        /**
         * Legacy translateFx Mootor Fx function
         */
        translateFx: function (positions, options) {
    
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
         * Translate element, using GPU acceleration when available
         * @param {object} options Options
         * @config {number} transitionDuration Duration of transition (in seconds)
         * @config {number} x X position
         * @config {number} y Y position
         */
        translate: function (options) {
            this.translateFx({x: options.x, y: options.y},options)
        },
    
        /**
         * Clean element transform styles
         */
        cleanFx: function () {
            this.el.style.webkitTransform = "";
            this.el.style.webkitTransitionDuration = "";
            this.el.style.webkitTransitionTimingFunction = "";
        }
    
    });
    
} ());
(function () {

    var _addGesture,
        _fire,
        _isListed,
        gestures,
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
    }
    
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
            }
            gestureList.push(gesture);
        }
        
        if (gesture.event[type] === undefined) {
            gesture.event[type] = [];
        }
        
        gesture.event[type].push(callback);
    
        // Bind listeners only once
        self.bind("touchstart", self);
        self.bind("touchend", self);
    
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
    
        info.e.preventDefault();
        
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
            _addGesture({
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
            _addGesture({
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
            _addGesture({
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
            _addGesture({
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
            _addGesture({
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
            _addGesture({
                fn: this,
                callback: callback,
                type: "onDragEnd"
            });
        },
        
        /*
         *  Swipe
         */
        onSwipeLeft: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeLeft"
            });
        },
        onSwipeRight: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeRight"
            });
        },
        onSwipeUp: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeUp"
            });
        },
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
                date = new Date(),
                clientX,
                clientY,
                time;
        
            // Touch
            try {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } catch (error) {}
    
            if (e.type === "touchstart") {
    
                this.bind("touchmove", this);
    
                gesture.event.time = date.getTime();
                gesture.event.lastTime = date.getMilliseconds();
                gesture.event.isDraggingY = 0;
                gesture.event.isDraggingX = 0;
                gesture.event.mousedown = true;
                gesture.event.tapped = false;
                gesture.event.startX = clientX;
                gesture.event.startY = clientY;
                gesture.event.swipe = 0;
    
                window.setTimeout(function () {
                    // TapHold
                    if (gesture.event.mousedown === true) {
                        info.type = "tapHold";
                        _fire(info, gesture.event.onTapHold);
                    }
                }, 500);
    
                if (gesture.event.onTapStart !== undefined) {
                    // TapStart
                    info.type = "tapStart";
                    _fire(info, gesture.event.onTapStart);
                }
            }
    
            if (e.type === "touchmove") {
            
                time = date.getMilliseconds() - gesture.event.lastTime;
                time = (time + gesture.event.lastTime) / 2;
                
                info.velocity = {};
                if (time > 0) {
                    info.velocity.x = (gesture.event.lastX - gesture.event.x) / time;
                    info.velocity.y = (gesture.event.lastY - gesture.event.y) / time;
                } else {
                    info.velocity.x = 0;
                    info.velocity.y = 0;
                }

                gesture.event.velocity = info.velocity;
                
                gesture.event.lastTime = date.getMilliseconds();
                gesture.event.lastY = info.lastY = gesture.event.y;
                gesture.event.lastX = info.lastX = gesture.event.x;
                gesture.event.y = info.y = clientY;
                gesture.event.x = info.x = clientX;
                info.distanceFromOriginY = clientY - gesture.event.startY;
                info.distanceFromOriginX = clientX - gesture.event.startX;

    
                gesture.event.isDraggingY = gesture.event.isDraggingY ?
                                            gesture.event.isDraggingY : 0;
                                            
                gesture.event.isDraggingX = gesture.event.isDraggingX ?
                                            gesture.event.isDraggingX : 0;
    
                if (gesture.event.isDraggingY === 0 
                    && gesture.event.isDraggingX === 0) 
                {
                
                    if (info.distanceFromOriginX > 10) {
                        gesture.event.isDraggingX = 1;
                        info.type = "dragStart";
                    }
                    if (info.distanceFromOriginX < -10) {
                        info.type = "dragStart";
                        gesture.event.isDraggingX = -1;
                    }
    
                    if (info.distanceFromOriginY > 10) {
                        gesture.event.isDraggingY = 1;
                        info.type = "dragStart";
                    }
                    if (info.distanceFromOriginY < -10) {
                        info.type = "dragStart";
                        gesture.event.isDraggingY = -1;
                    }
    
                    // DragStart   
                    if (info.type === "dragStart") {                 
                        _fire(info, gesture.event.onDragStart);
                    }
                                        
                } else {
                    // DragMove
                    info.type = "dragMove";
                    _fire(info, gesture.event.onDragMove);
                }
            }
    
            if (e.type === "touchend") {
               
                info.velocity = {};
                        
                if (gesture.event.tapped === false) {
                    this.unbind("touchmove", this);
                    gesture.event.tapped = true;
                    info.time = date.getTime() - gesture.event.time;
                    gesture.event.mousedown = false;
                }
    
                if ((gesture.event.isDraggingY !== 0 || 
                    gesture.event.isDraggingX !== 0)) {
    
                    // Swipe
                    if (gesture.event.swipe === 0) {
                        if (gesture.event.isDraggingX === 1) {
                            gesture.event.swipe = gesture.event.isDraggingX;
                            _fire(info, gesture.event.onSwipeRight);
                        }
                        if (gesture.event.isDraggingX === -1) {
                            gesture.event.swipe = gesture.event.isDraggingX;
                            _fire(info, gesture.event.onSwipeLeft);
                        }
                        if (gesture.event.isDraggingY === 1) {
                            gesture.event.swipe = gesture.event.isDraggingY;
                            _fire(info, gesture.event.onSwipeDown);
                        }
                        if (gesture.event.isDraggingY === -1) {
                            gesture.event.swipe = gesture.event.isDraggingY;
                            _fire(info, gesture.event.onSwipeUp);
                        }
                    }
                    
                    // DragEnd
                    info.type = "dragEnd";
                                        
                    info.velocity = gesture.event.velocity;
                    info.isDraggingY = gesture.event.isDraggingY = 0;
                    info.isDraggingX = gesture.event.isDraggingX = 0;
                    _fire(info, gesture.event.onDragEnd);
                
                } else if (info.time !== undefined) {
    
                    // TapEnd
                    info.type = "tapEnd";
                    info.e.stopPropagation();
                    _fire(info, gesture.event.onTapEnd);
                }
    
            }
    
        }
    });

} ());
}(window.document));
