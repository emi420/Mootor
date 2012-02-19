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

