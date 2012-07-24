/** 
 * Mootor Core
 */

var document = window.document;

var $ = (function () {

	"use strict";
    
    var ready;

    /**
     * Main constructor 
     *
     * @constructor
     * @param {string} query Query selector
     * @return {object} $ Mootor object
     */
	$ = function (query) {
		return new Moo(query, document);
	};
	
    /**
     * Private constructor
     *
     * @private
     * @param {string} query Query selector
     * @param {object} context Context element
     * @return {object} $ Mootor object
     */
	var Moo = function (query, context) {
		var qtype = typeof query,
			el,
			i;
			
        // Get element from query
        if (qtype === "string") {

            if (query.indexOf("#") > -1) {
                query = query.replace("#", "");
                el = context.getElementById(query);

            } else if (query.indexOf(".") > -1) {
                query = query.replace(".", "");
                el = context.getElementsByClassName(query);
            } else {
                el = context.getElementsByTagName(query);
            }
            
        } else if (qtype === "object") {
            el = query;
        }               
        
        
        if ($.isArrayLike(el) === true) {
            for(i = 0; i < el.length; i++) {
                this[i] = el[i];
            }
            this.length = i;
        } else {
            this.length = 0;
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

    $.prototype = Moo.prototype = {
     
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
            var element = typeof el === "object" ? el : this.el;
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
            var element = typeof el === "object" ? el : this.el;
            if (element !== undefined) {
                element.style.display = "none";
            }
            return this;
        },

        /**
         * Bind event listener
         * @param {string} event Event
         * @param {function} callback Callback function
         * @example $("#myDiv").bind("touchstart", function() {
         *      console.log("Touch start!")
         * }); 
         */
        bind: function (event, callback) {
            this.el.addEventListener(event, callback, false);
            return this;
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
            var classes = this.el.className.split(" "),
                classesN = [name],
                i = 0;
            
            for(i = 0; i < classes.length; i++) {
                if(classes[i] !== name) {
                    classesN.push(classes[i]);
                }
            }
            
            this.el.className = classesN.join(" ");
            
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
            return (this.el.className.indexOf(name) > -1);
        },

        /**
         * Remove class name
         * @param {string} name Class name
         * @example $("#myDiv").removeClass("featured");
         */
        removeClass: function (name) {
            var classes = this.el.className.split(" "),
                classesN = [],
                i = 0;
            
            for(i = 0; i < classes.length; i++) {
                if(classes[i] !== name) {
                    classesN.push(classes[i]);
                }
            }
            
            this.el.className = classesN.join(" ");
            
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
	};

    /**
     * Extend function
     * @param {object} obj Object with properties
     * @param {object} target Target object to be extended
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
         * Viewport configuration
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
         */
        ajax:  function (options) {
            var xmlhttp = new $.window.XMLHttpRequest(),
                handler,
                data = null,
                i;
			
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
         * isArrayLike Check if an object is an array-like object
         */
        isArrayLike: function(obj) {                        
            if (obj &&
                typeof obj === "object" || typeof obj === "function" &&
                isFinite(obj.length) &&
                obj.length >= 0 &&
                obj.length === Math.floor(obj.length) &&
                obj.length < 4294967296)
            {
                return true            
            } else {
                return false;
            }
        },
        
        /**
         * require Include scripts
         */
        require: function(script, callback) {
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
        }


    }, $);

    /**
     * On element ready
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
                if (e.type === "readystatechange" && window.document.readyState !== "complete") {return; }
                fn.call(window.document);
                ready = true;
            };
            if ($.window.addEventListener) {
                el.addEventListener = $.window.addEventListener;
                el.addEventListener("DOM-ContentLoaded", handler, false);
                el.addEventListener("readystatechange", handler, false);
                el.addEventListener("load", handler, false);
            }
        } else {
            el.onload = Moo;
        }
    }

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

	return $;

}());

// Go public!
if (!window.$ || typeof ($) !== "function") {
    window.$ = $;
}

