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

/**
* Core
*
* @module core
* @submodule core
*/
/**
* Core
*
* @module core
* @submodule $
*/

/**
* Mootor $
*
* @class $
* @static
*/

var $ = (function () {

   var Moo,
      _scripts,
      _hideContentWhileDocumentNotReady,

   /**
    * Main public constructor  
    */
	$ = function (query) {
		return new Moo(query, document);
	},
	
   /**
    * On element ready
    */
   ready = function (fn, el) {
      if (el === document) {
         el = window;

         var ready = false,
             handler;

         handler = function (e) {
            if (ready) {return; }
            if (e.type === "readystatechange" 
               && document.readyState !== "complete") 
               {return;}
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
         el.addEventListener("load", fn);
      }
   };

   /**
    * Private constructor
    */
	Moo = function (query, context) {
		var qtype = typeof query,
			el,
			i = 1;	

      // Get element from query
      if (qtype === "string") {

         el = context.querySelectorAll(query);            
         
         if (query.indexOf("#") > -1) {

            el = this[0] = el[0];            
            if (this[0] !== null) {
               this.length = 1;               
            }

         } else {         
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
      
   /**
    * Extend function
    * @method extend
    * @param {object} obj Object with properties
    * @param {object} target Target object to be extended
    * @example 
    *       $.extend({id: 1}, target);
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
   

   // Core
   $.extend({
   
       /**
       * Mootor  version
       */
      version:  (function () {
         return "0.12";
      }()),

      /**
       * Context features
       * @property context
       * @type object
       * @example 
       *        if ($.context.addEventListener) { ... }
       *        if ($.context.userAgent === "android") { ... }
       */
      context: {
         addEventListener: false,
         userAgent: ""
      },
      
      /**
       * Viewport
       * @property view
       * @type object
       * @example 
       *        var clientHeight = $.view.clientH 
       *        var clientWidth = $.view.clientW
       *        var hideViewport = function() { $.view.hide(); }
       *        var showViewport = function() { $.view.show(); }
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
       * ajax Ajax request
       * @method ajax
       * @param {AjaxOptions} options Options configuration
       * @example
       *        $.ajax({
       *            url: "http://api.mydomain.com",
       *            method: "POST",
       *            data: "id=1&msg=hello",
       *            callback: function(response) {
       *                alert(response);
       *            }
       *        });
       */

      ajax:  function (options) {
         var xmlhttp = new $.window.XMLHttpRequest(),
            data = null,
            i;
			
			// FIXME CHECK: xmlhttp.status==0 for UIWebView?
         xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState===4 && (xmlhttp.status===200 || xmlhttp.status===0)) {
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
       * @method require
       * @param {string} script Script URL
       * @param {function} callback Function callback
       * @example
       *        $.require("lib/mylib.js",
       *             function() {
       *                 alert("ok");
       *             }
       *        );
       */
       require: function(script, callback, options) {
           if (typeof options === "object" && options.reload === true) {
               _scripts.remove(script);
           }
           if (_scripts.isIncluded(script) === false) {
              _scripts.include(script, callback);
           } else {
             if (typeof callback === "function") {
                callback();
             }
           }
       },

   }, $);

   // Inherits Array prototype
   $.prototype = Moo.prototype = [];

   /**
    * Mootor instance
    * @constructor
    * @param {string|HTMLElement} query
    * @return $.prototype
    * @class $()
    */

   /**
    * Mootor instance
    * @class $.prototype
    */

   $.extend({
      
      /**
       * Element selected
       * @property el
       * @type object
       */
      el: undefined,

      /**
       * Query passed
       * @property query
       * @type string
       */
      query: "",

      /**
       * On element ready
       * @method ready
       * @example 
       *        $(document).ready(function() {
       *            console.log("Im ready (The Document)");
       *        });
       * @param {function} callback Callback function
       */
      ready: function (callback) {
         ready(callback, this.el);
      },

      /**
       * Show element
       * @method show
       * @chainable
       * @example 
       *        $("#myDiv").show(); 
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
       * @chainable
       * @method hide
       * @example 
       *        $("#myDiv").hide(); 
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
       * @method on
       * @chainable
       * @param {string} event Event
       * @param {function} callback Callback function
       * @example 
       *        $("#myDiv").on("click", function() {
       *            console.log("click!")
       *        }); 
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
       * @method unbind
       * @chainable
       * @param {string} event Event
       * @param {function} callback Callback function
       * @example 
       *        $("#myDiv").unbind("touchstart", function() {
       *             console.log("Touch start!")
       *        });
       */
      unbind: function (event, callback) {
         this.el.removeEventListener(event, callback, false);
         return this;
      },

      /**
       * Set class name
       * @method setClass
       * @chainable
       * @param {string} name Class name
       * @example 
       *        $("#myDiv").setClass("featured");
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
       * @method hasClass
       * @chainable
       * @param {string} name Class name
       * @return {boolean}
       * @example 
       *        if ($("#myDiv").hasClass("featured") === true) { 
       *            console.log("this div is featured");
       *        }
       */
      hasClass: function (name) {
         var classes = this.el.className.split(" ");
         return classes.indexOf(name) !== -1;
      },

      /**
       * Remove class name
       * @method removeClass
       * @chainable
       * @param {string} name Class name
       * @example 
       *        $("#myDiv").removeClass("featured");
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
       * @method html
       * @chainable
       * @param {string} html HTML
       * @example 
       *        $("#myDiv").html("<b>I love Spectre.</b>");
       */
      html: function (html) {
         this.el.innerHTML = html;
         return this;
      },
      
      /**
       * Selector useful for query chaining
       * @method find
       * @chainable
       * @param {string} query Query
       * @example 
       *        $("#myList").find(".item")
       */
      find: function(query) {
         return new Moo(query, this.el);
      }      
      
	});


   // Localise globals
   $.window = {
      XMLHttpRequest: window.XMLHttpRequest,
      addEventListener: window.addEventListener
   };

   // Cross-browser compatibility
   if ($.window.addEventListener === undefined) {
      $.window.attachEvent = window.attachEvent;
      $.window.addEventListener = function(event, callback) {
         $.window.attachEvent("on" + event, callback);
      };
   }
   
   // Context features
   
   if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      $.context.userAgent = "android";
   } else if (navigator.userAgent.toLowerCase().indexOf("safari") > -1) {
      $.context.userAgent = "safari";
   } else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
      $.context.userAgent = "msie";
   // TODO: mozilla 
   } else {
      $.context.userAgent = "";   
   }

   // Initialize Mootor on document ready
   ready(function () {
      var clientW,
         clientH,
         documentElement = document.documentElement,

      updateClientSizes = function() {
         clientW = documentElement.clientWidth,
         clientH = documentElement.clientHeight;

         $.view.clientH = (function () {
            return clientH;
         }());
         $.view.clientW = (function () {
            return clientW;
         }());

      };
      
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
         $._documentIsReady = true;
         $.view.show();
    });
   };
   _hideContentWhileDocumentNotReady();

   /**
    * Scripts included
    * @private
    */
   _scripts = {
   
      // Check if script is included
      isIncluded: function(script) {
         var i;
         for (i = _scripts.list.length; i--;) {
            if (_scripts.list[i].path === script) {
               return true;
            }
         }
         return false;
      },
      
      // Include script
      include: function(script, callback) {
         var d = document;
         $.ajax({
              url: script,
              callback: function(response) {
                var scriptEl = d.createElement("script");
                scriptEl.src = script; 
                scriptEl.innerHTML = response;
                d.head.appendChild(scriptEl);
                _scripts.list.push({
                    path: script,
                    el: scriptEl
                });
                if (typeof callback === "function") {
                    callback();
                }
              }
         });           
      },
      
      // Remove script
      remove: function(script) {
         var i,
             d = document,
             scriptItem;
             
         for (i = _scripts.list.length; i--;) {
            scriptItem = _scripts.list[i];
            if (scriptItem.path === script) {
                d.head.removeChild(scriptItem.el)
                _scripts.list.splice(i,1);
            }
         }
      },
      
      // Included scripts list
      list: []
   };

   return $;

}());
 
// Go public!
if (!window.$ || typeof ($) !== "function") {
   window.Mootor = window.$ = $;
} else {
   window.Mootor = $;   
}





/**
 * Fx
 * @module core
 * @submodule fx
 */ 

(function () {

    var tmpDivStyle = document.createElement("div").style,
        vendor,
        transition,
        transformFnStr;
    
    if (tmpDivStyle.webkitTransitionDuration !== undefined) {
        vendor = "webkit";        
        transformFnStr = "translate3d";
    } else if (tmpDivStyle.MozTransitionDuration !== undefined) {
        vendor = "Moz";            
        transformFnStr = "translate";
    }
    
    transition = {
        transform: vendor + "Transform",
        duration: vendor + "TransitionDuration",
        timingFunction: vendor + "TransitionTimingFunction"
    };
    
    $.extend({         
        
        /**
         * Legacy translateFx Mootor Fx function
         * @private
         */
        translateFx: function (positions, options) {
    
            var x_pos = positions.x,
                y_pos = positions.y,
                tduration,
                elStyle = {},
                key,
                el = this.el;
               
            tduration = options.transitionDuration;
    
            if (tduration !== undefined && tduration > 0) {
                elStyle[transition.duration] = tduration + "s";
                elStyle[transition.timingFunction] = "ease-out";

            } else {
                if (elStyle[transition.duration] !== "") {
                    this.cleanFx();
                }
            }
    
            elStyle[transition.transform] = transformFnStr + "(" + x_pos + "px," + y_pos + "px, 0)";            
            
            for (key in elStyle) {
                el.style[key] = elStyle[key]; 
            }
            
            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }
    
        },

        /**
         * Translate element, using GPU acceleration when available
         * @method translate
         * @param {TranslateOptions} options Options
         */
        translate: function (options) {
            this.translateFx({x: options.x, y: options.y},options);
        },
    
        /**
         * Clean element transform styles
         * @method cleanFx
         */
        cleanFx: function () {
            var elStyle = {},
                key,
                el = this.el;
            
            elStyle[transition.transform] = "";
            elStyle[transition.duration] = "";
            elStyle[transition.timingDuration] = "";

            for (key in elStyle) {
                el.style[key] = elStyle[key];
            }
        }
    
    });
    
} ());

/**
 * Gestures
 * @module core
 * @submodule gestures
 */ 

(function () {

    var _addGesture,
        _fire,
        _isListed,
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
    };
    
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
            };
            gestureList.push(gesture);

            // Bind listeners only once
            self.bind("touchstart", self);

        }
        
        if (gesture.event[type] === undefined) {
            gesture.event[type] = [];
        }
        
        gesture.event[type].push(callback);
    
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
    
        if (callbacks !== undefined) {
            info.e.preventDefault();
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
     */
    $.extend({
            
        /**
         * On Tap End
         *
         * @method onTapEnd
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onTapEnd(function() {
         *          console.log("Tap!")
         *      });
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
         * @method onTapStart
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onTapStart(function() {
         *          console.log("Tap start!")
         *      }); 
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
         * @method onTapHold
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onTapHold(function() {
         *          console.log("Tap hold!")
         *      }); 
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
         * @method onDragStart
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onDragStart(function() {
         *          console.log("Drag start!")
         *      }); 
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
         * @method onDragMove
         * @param {function} callback Callback function
         * @example $("#myDiv").onDragMove(function(gesture) {
         *      console.log(gesture.y)
         * }); 
         * @example 
         *      fn = this;
         *      $("#myDiv").onDragMove(fn);
         *      fn.handleGesture = function(gesture) {
         *          console.log(gesture.x);
         *          console.log(gesture.y);
         *      }
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
         * @method onDragEnd
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onDragEnd(function() {
         *          console.log("Drag end!")
         *      }); 
         */
        onDragEnd: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onDragEnd"
            });
        },
        
        /**
         * On Swipe Left
         *
         * @method onSwipeLeft
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeLeft(function() {
         *           console.log("Swipe left!")
         *      }); 
         */
        onSwipeLeft: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeLeft"
            });
        },
        /**
         * On Swipe Right
         *
         * @method onSwipeRight
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeRight(function() {
         *           console.log("Swipe right!")
         *      }); 
         */
        onSwipeRight: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeRight"
            });
        },
        /**
         * On Swipe Up
         *
         * @method onSwipeUp
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeUp(function() {
         *           console.log("Swipe up!")
         *      }); 
         */
        onSwipeUp: function (callback) {
            _addGesture({
                fn: this,
                callback: callback,
                type: "onSwipeUp"
            });
        },
        /**
         * On Swipe Down
         *
         * @method onSwipeDown
         * @param {function} callback Callback function
         * @example 
         *      $("#myDiv").onSwipeDown(function() {
         *           console.log("Swipe down!")
         *      }); 
         */
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
                gestureEvent = gesture.event,
                date = new Date(),
                clientX,
                clientY,
                time;
                
            // Touch
            try {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } catch (error) {};
    
            if (e.type === "touchstart") {
            
                this.bind("touchmove", this);
                this.bind("touchend", this);
    
                gestureEvent.time = date.getTime();
                gestureEvent.lastTime = date.getMilliseconds();
                gestureEvent.isDraggingY = 0;
                gestureEvent.isDraggingX = 0;
                gestureEvent.mousedown = true;
                gestureEvent.tapped = false;
                gestureEvent.startX = clientX;
                gestureEvent.startY = clientY;
                gestureEvent.swipe = 0;
    
                window.setTimeout(function () {
                    // TapHold
                    if (gestureEvent.mousedown === true &&
                        gestureEvent.isDraggingY === 0 &&
                        gestureEvent.isDraggingX === 0) {
                        
                        info.type = "tapHold";
                        _fire(info, gestureEvent.onTapHold);
                    }
                }, 500);
    
                if (gestureEvent.onTapStart !== undefined) {
                    // TapStart
                    info.type = "tapStart";
                    _fire(info, gestureEvent.onTapStart);
                }
            }
    
            if (e.type === "touchmove") {
            
                time = date.getMilliseconds() - gestureEvent.lastTime;
                time = (time + gestureEvent.lastTime) / 2;
                
                info.velocity = {};
                if (time > 0) {
                    info.velocity.x = (gestureEvent.lastX - gestureEvent.x) / time;
                    info.velocity.y = (gestureEvent.lastY - gestureEvent.y) / time;
                } else {
                    info.velocity.x = 0;
                    info.velocity.y = 0;
                }

                gestureEvent.velocity = info.velocity;
                
                gestureEvent.lastTime = date.getMilliseconds();
                gestureEvent.lastY = info.lastY = gestureEvent.y;
                gestureEvent.lastX = info.lastX = gestureEvent.x;
                gestureEvent.y = info.y = clientY;
                gestureEvent.x = info.x = clientX;
                info.distanceFromOriginY = clientY - gestureEvent.startY;
                info.distanceFromOriginX = clientX - gestureEvent.startX;

    
                gestureEvent.isDraggingY = gestureEvent.isDraggingY ?
                                            gestureEvent.isDraggingY : 0;
                                            
                gestureEvent.isDraggingX = gestureEvent.isDraggingX ?
                                            gestureEvent.isDraggingX : 0;
    
                if (gesture.event.isDraggingY === 0 
                    && gesture.event.isDraggingX === 0) 
                {
                
                    if (info.distanceFromOriginX > 10) {
                        gestureEvent.isDraggingX = 1;
                        info.type = "dragStart";
                    }
                    if (info.distanceFromOriginX < -10) {
                        info.type = "dragStart";
                        gestureEvent.isDraggingX = -1;
                    }
    
                    if (info.distanceFromOriginY > 10) {
                        gestureEvent.isDraggingY = 1;
                        info.type = "dragStart";
                    }
                    if (info.distanceFromOriginY < -10) {
                        info.type = "dragStart";
                        gestureEvent.isDraggingY = -1;
                    }
    
                    // DragStart   
                    if (info.type === "dragStart") {                 
                        _fire(info, gestureEvent.onDragStart);
                    }
                                        
                } else {
                    // DragMove
                    info.type = "dragMove";
                    _fire(info, gestureEvent.onDragMove);
                }
            }
    
            if (e.type === "touchend") {
               
                info.velocity = {};
                        
                if (gestureEvent.tapped === false) {
                    this.unbind("touchmove", this);
                    this.unbind("touchend", this);
                    gestureEvent.tapped = true;
                    info.time = date.getTime() - gestureEvent.time;
                    gestureEvent.mousedown = false;
                }
    
                if ((gestureEvent.isDraggingY !== 0 || 
                    gestureEvent.isDraggingX !== 0)) {
    
                    // Swipe
                    if (gestureEvent.swipe === 0) {
                        if (gestureEvent.isDraggingX === 1) {
                            gestureEvent.swipe = gestureEvent.isDraggingX;
                            _fire(info, gesture.event.onSwipeRight);
                        }
                        if (gestureEvent.isDraggingX === -1) {
                            gestureEvent.swipe = gestureEvent.isDraggingX;
                            _fire(info, gesture.event.onSwipeLeft);
                        }
                        if (gestureEvent.isDraggingY === 1) {
                            gestureEvent.swipe = gestureEvent.isDraggingY;
                            _fire(info, gestureEvent.onSwipeDown);
                        }
                        if (gestureEvent.isDraggingY === -1) {
                            gestureEvent.swipe = gestureEvent.isDraggingY;
                            _fire(info, gestureEvent.onSwipeUp);
                        }
                    }
                    
                    // DragEnd
                    info.type = "dragEnd";
                    
                    if ($.debug === true) {
                        console.log("dragEnd");
                    }
                                        
                    info.velocity = gestureEvent.velocity;
                    info.isDraggingY = gestureEvent.isDraggingY = 0;
                    info.isDraggingX = gestureEvent.isDraggingX = 0;
                    _fire(info, gestureEvent.onDragEnd);
                
                } else if (info.time !== undefined) {

                    if ($.debug === true) {
                        console.log("tapEnd");
                    }

                    // TapEnd
                    info.type = "tapEnd";
                    _fire(info, gestureEvent.onTapEnd);
                }
    
            }
    
        }
    });

} ());
}(window.document));

