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
         * @config {string} data Data that is sent to the server via POST
         * @config {function} callback Function callback
         */
        ajax:  function (options) {
            var xmlhttp = new $.window.XMLHttpRequest(),
                handler,
                data = null,
                i;
			
			// FIXME CHECK: xmlhttp.status==0 for UIWebView?
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

