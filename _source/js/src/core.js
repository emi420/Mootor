/* 
 *  Mootor Core
 */

var Mootor = (function () {

	"use strict";

	// Return new Mootor instance
	Mootor = function (query) {
		return new Mootor.fn(query);
	};

	Mootor.prototype = {

		// On element ready
		ready: function (callback) {
			Mootor.core.ready(callback, this.el);
		}

	};

    // Core
    Mootor.core = {

        // Initial styles
        init_styles: undefined,

        // On element ready
        ready: function (fn, el) {
            if (el === document) {
                el = window;
            }

            if (el === window || el === window.document) {
                var ready = false,
                    handler;

                // Handler to check if the dom is full loaded
                handler = function (e) {
                    if (ready) {return; }
                    if (e.type === "readystatechange" && window.document.readyState !== "complete") {return; }
                    fn.call(window.document);
                    ready = true;
                };

                // Add listeners for all common load events
                if (el !== "undefined" && el.addEventListener) {
                    el.addEventListener("DOM-ContentLoaded", handler, false);
                    el.addEventListener("readystatechange", handler, false);
                    el.addEventListener("load", handler, false);
                } 
            } else {
                el.onload = fn;
            }
        },

        // Hide document body
        hideBody: function () {
            var init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);
            Mootor.core.init_styles = init_styles;
        },

        // Show document body
        showBody: function () {
            document.head.removeChild(Mootor.core.init_styles);
        }
    }

	// Main constructor
	Mootor.fn = function (query) {

		var q_type = typeof query,
			el;

		if (q_type === "string" || q_type === "object") {

			// Get element from query

			switch (q_type) {

			case "string":

				if (query.indexOf('#') > -1) {
					query = query.replace("#", "");
					el = document.getElementById(query);
				} else if (query.indexOf(".") > -1) {
					query = query.replace(".", "");
                    // FIXME CHECK: expensive query
					el = document.getElementsByClassName(query);
				}
				break;

			case "object":
				el = query;
				break;
			}
		}

		// Private properties

		this.el = (function () {
			return el;
		}());

		this.query = (function () {
			return query;
		}());

		return this;

	};

	// Inheritance by copying properties
	Mootor.extend = function (obj, target) {
		var i;
        if (target === "undefined") {
            target = Mootor.prototype;
        }
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				Mootor.prototype[i] = obj[i];
			}
		}
	};

	// Prototypal inheritance 
	Mootor.fn.prototype = Mootor.prototype;

	// On document ready, get viewport sizes and show body
    Mootor.core.ready(function () {

		// Initial screen size
		var init_client_width = document.documentElement.clientWidth,
			init_client_height = document.documentElement.clientHeight;

		Mootor.core.init_client_height = (function () {
			return init_client_height;
		}());

		Mootor.core.init_client_width = (function () {
			return init_client_width;
		}());

		Mootor.core.showBody();

	}, document);

	Mootor.core.hideBody();

	return Mootor;

}());




