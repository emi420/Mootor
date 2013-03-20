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
       */
      view: {
         clientH: 0,
         clientW: 0,
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
            i,
            arg,
            async;
			
         
         
         if (options.async === undefined)
         {
             async = true;
         } else {
             async = options.async
         }
         if (options.arg === undefined)
         {
             arg = null;
         } else {
             arg = options.arg;
         }
         
			// FIXME CHECK: xmlhttp.status==0 for UIWebView?
         xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState===4 && (xmlhttp.status===200 || xmlhttp.status===0) && xmlhttp.callbackcalled === undefined) {
               options.callback(xmlhttp.responseText,arg);
               xmlhttp.callbackcalled = true;
            }
         };


         if (options.method === undefined || options.method === "GET")
         {
            xmlhttp.open("GET", options.url, async);
         } else if (options.method === "POST") {
            xmlhttp.open("POST", options.url, async);
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
         
         return xmlhttp;
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
         var scriptEl = d.createElement("script");
         scriptEl.src = script; 
         d.querySelector("head").appendChild(scriptEl);
         _scripts.list.push({
             path: script,
             el: scriptEl
         });
         if (typeof callback === "function") {
             callback();
         }             
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





