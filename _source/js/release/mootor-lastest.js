(function(window) {
/* 
 *  Mootor Core
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
            this.el.onclick = function() { return false } ;
            this.el.addEventListener(event, callback, false);
        },
        
        // Unbind event
        unbind: function (event, callback) {
            this.el.removeEventListener(event, callback, false);
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

(function (Moo) {

    Moo.extend({
        gestures: {
            list: []
        }
    }, Moo);
    
    // Add gesture for element
    var addGesture = function(options) {
        var gestureList = Moo.gestures.list,
            type = options.type,
            fn = options.fn,
            callback = options.callback,
            key = createKey(fn.el);
             
        if (gestureList[key] === undefined) {
            gestureList[key] = {
                event: []
            };
        }     

        // Bind listeners only once
        if(gestureList[key] !== undefined){
            fn.bind("mousedown", fn);        
            fn.bind("mouseup", fn);        
            fn.bind("touchstart", fn);        
            fn.bind("touchend", fn);        
        }
        
        if (gestureList[key].event[type] === undefined) {
            gestureList[key].event[type] = [];
        }     
        gestureList[key].event[type].push(callback);
           
    },
    
    // Create key for element
    createKey = function(el) {
        if(el.rel !== undefined) {
            return el.rel;               
        }
        if (typeof el === "object") {
            return el;
        }
    },
    
    // Fire callbacks
    fire = function(info, callbacks) {
        if (callbacks !== undefined) {
            for(i = callbacks.length; i-- ;) {
                if (callbacks[i].handleGesture !== undefined) {
                    callbacks[i].handleGesture(info);
                } else {
                    callbacks[i](info);                               
                }
            }
        }
    }
            
    /*
     *      Public
     */
    Moo.Gesture = {    

        // Gestures
        onTapEnd: function(callback) {
            addGesture({
                fn: this,
                callback: callback,                          
                type: "onTapEnd"
            })
        },
        onTapStart: function(callback) {
            addGesture({
                fn: this,
                callback: callback,                            
                type: "onTapStart"
            })
        },
        onTapHold: function(callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapHold"
            })
        },
        onDragStart: function(callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragStart"
            })
        },
        onDragMove: function(callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragMove"
            })
        },
        onDragEnd: function(callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onDragEnd"
            })
        },

        // Handler to detect gestures and fire callbacks        
        handleEvent: function(e) {
            var i,
                key = createKey(this.el),
                info = {
                    el: this.el                
                },
                gesture =  Moo.gestures.list[key],
                date = new Date(),
                clientX,
                clientY;
                                                
            e.preventDefault()

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
                } catch(e){};
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
                
                window.setTimeout(function() { 
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
                           
            if ((e.type === "mouseup" || e.type === "touchend") && gesture.event.tapped === false) {
                this.unbind("mousemove", this);        
                this.unbind("touchmove", this);        
                info.time = date.getTime() - gesture.event.time;
                gesture.event.mousedown = false;
                if (gesture.event.isDraggingY !== 0) {
                    // DragEnd
                    info.type = "dragEnd";
                    gesture.event.isDraggingY = 0;
                    fire(info, gesture.event.onDragEnd);
                } else {
                    // TapEnd
                    info.type = "tapEnd";
                    //gesture.event.tapped = true;
                    fire(info, gesture.event.onTapEnd);               
                }
            }
 
        }
    }
    
    Moo.extend(Moo.Gesture);

}($));

/* 
 * Mootor Visual FX
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

(function (Moo) {
    // Module dependencies
    var Fx = Moo.Fx,
        Gesture = Moo.Gesture,

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
               
        $(this.el).onDragMove(this);
        $(this.el).onDragEnd(this);
        
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        this.init();

        return this;

    };
    
    Panels.prototype = {
    
        handleGesture: function(gesture) {
            switch(gesture.type) {
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

            anchorCallback = function (gesture) {
                panels.set(gesture.el.rel);
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
                        $(panel.anchors[j]).onTapEnd(anchorCallback);
                    }
                }

            }

            if (this.header) {
                for (i = this.header.anchors.length; i--;) {
                    if (this.header.anchors[i].rel !== "") {
                        $(this.header.anchors[i]).onTapEnd(anchorCallback);
                    }
                }
            }

            if (this.navmain.el !== undefined) {
                this.navmain.anchors = this.navmain.el.getElementsByTagName("a");
                for (i = this.navmain.anchors.length; i--;) {
                    if (this.navmain.anchors[i].rel !== "") {
                       $(this.navmain.anchors[i]).onTapEnd(anchorCallback)
                    }
                }
            }

        },

        /*      
         *      Move
         */
        move: function (gesture) {            
            if (gesture.isDraggingY !== 0) {
                this.y = this.y + (gesture.y - gesture.lastY);
                this.translate({
                    el: this.panels[this.current].el,
                    y: this.y
                })
            }

        },
        
        /*      
         *      Check move
         */
        check: function (gesture) {
            var panel = this.panels[this.current],
                maxdist = panel.height - this.height,
                moveTo = 0;
                
            if (gesture.isDraggingY !== 0) {

                // Bounce back
                if (this.y >= 0 || maxdist < -this.y) {
                    if (this.y > 0) {
                        this.y = 0;
                    } else {
                        this.y = -(panel.height - this.height);                                            
                    }
                    this.translate({
                        y: this.y,
                        el: panel.el,
                        duration: 0.5
                    })
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
         *      Translate panels
         */
        translate: function (options) {
            if (options.duration === undefined) {
                options.duration = 0;
            }
            if (options.callback === undefined) {
                options.callback = function() {};
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
            Fx.translate(
                options.el,
                {y: options.y, x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
        },

        /*      
         *      Load current panel
         */
        load: function () {

            var distance,
                panel,
                cb,
                back,
                i,
                width = this.width, 
                margin = this.margin, 
                navmain = this.navmain,
                translate = this.translate;
                
            panel = this.panels[this.current];
            back = this.panels[this.back];

            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).hide();
            }
            for (i = back.hidden.length; i--;) {
                $(back.hidden[i]).hide();
            }

            cb = function () {
                for (i = panel.hidden.length; i--;) {
                    $(panel.hidden[i]).show();
                }
                if (navmain.el !== undefined) {
                    back.el.style.left =  width * 2 + margin + "px";
                }
                translate({
                    el: back.el,
                });

            };

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
            
            this.translate({
                el: this.el,
                duration: 0.5,
                x: -distance - this.x,
                callback: cb
            })
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
