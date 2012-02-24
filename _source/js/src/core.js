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
         * @name view
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

