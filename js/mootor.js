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
        + unbind
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

    Moo.extend({
        gestures: {
            list: []
        }
    }, Moo);
    
    var addGesture = function(options) {
        var gestureList = Moo.gestures.list,
            type = options.type,
            fn = options.fn,
            callback = options.callback,
            key = createKey(fn.el);

        if (gestureList[key] === undefined) {
            gestureList[key] = [];
            if (type === "onTapStart") {
                fn.bind("mousedown", fn);        
            } else if (type === "onTapEnd") {
                fn.bind("mouseup", fn);        
            }
        }     
        
        if (gestureList[key][type] === undefined) {
            gestureList[key][type] = [];
        }     
        gestureList[key][type].push(callback);
           
    },
    
    createKey = function(el) {
        if(el.rel !== undefined) {
            return el.rel;               
        }
        if (typeof el === "object") {
            return el;
        }
    },
    
    fire = function(listeners, gesture) {
        for(i = listeners.length; i-- ;) {
            listeners[i](gesture);               
        }
    }
        
    /*
     *      Public
     */
    Moo.Gesture = {    

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

        handleEvent: function(e) {
            var i,
                key = createKey(this.el),
                gesture = {
                    el: this.el                
                }
                                
            if( e.type === "mousedown") {
                fire(Moo.gestures.list[key].onTapStart, gesture);
            }
            if( e.type === "mouseup") {
                fire(Moo.gestures.list[key].onTapEnd, gesture);
            }
        }
    }
    
    Moo.extend(Moo.Gesture);
    

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
        
        
        // 1. Set gestures on element
        
        /*$(this.el).onTapEnd(function() {
            console.log("tap end!! callback in nav.js");
        });

        $(this.el).onTapStart(function() {
            console.log("tap start!! callback in nav.js");
        });

        $(this.el).onTapHold(function() {
            console.log("tap hold!! callback in nav.js");
        });
        
        $(this.el).onTapHold(function() {
            console.log("tap hold 2 !! callback in nav.js");
        });*/

        //$(this.el).onDragStart(this.start);
        //$(this.el).onDragMove(this.move)
        //$(this.el).onDragEnd(this.check)
        
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

            anchorCallback = function (gesture) {
                console.log(gesture.el.rel);
                /*panels.set(this.rel);
                return false;*/
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
                        if(j === 0) {
                            $(panel.anchors[j]).onTapEnd(function(gesture) {
                                console.log("doble callback!");
                            });                        
                        }
                    }
                }

            }

            if (this.header) {
                for (i = this.header.anchors.length; i--;) {
                    if (this.header.anchors[i].rel !== "") {
                        //$(this.header.anchors[i]).onTapEnd(anchorCallback);
                    }
                }
            }

            if (this.navmain.el !== undefined) {
                this.navmain.anchors = this.navmain.el.getElementsByTagName("a");
                for (i = this.navmain.anchors.length; i--;) {
                    if (this.navmain.anchors[i].rel !== "") {
                        //$(this.navmain.anchors[i]).onTapEnd(anchorCallback)
                    }
                }
            }

        },

        start: function (e) {
            console.log("start!");
            
            var target = Gesture.target;
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
            if ($(Gesture.target).hasClass("active")) {
                $(Gesture.target).removeClass("active");
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

            Gesture.target.className = Gesture.target.className.replace(" active", "");

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
