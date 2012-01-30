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
			Mootor.ready(callback, this.el);
		}

	};

    // Inheritance by copying properties
    Mootor.extend = function (obj, target) {
        var i;
        if (target === undefined) {
            target = Mootor.prototype;
        }
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
    };

    // Core
    Mootor.extend({

        // Initial styles
        styles: undefined,

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
                if (el !== "undefined" && Mootor.test.addEventListener) {
                    el.addEventListener("DOM-ContentLoaded", handler, false);
                    el.addEventListener("readystatechange", handler, false);
                    el.addEventListener("load", handler, false);
                }
            } else {
                el.onload = fn;
            }

        },

        // Hide document body
        hide: function () {

            var styles = document.createElement("style");
            styles.innerHTML = "body * {display: none}";
            document.head.appendChild(styles);
            Mootor.styles = styles;

        },

        // Show document body
        show: function () {
            document.head.removeChild(Mootor.styles);
        },

        // Test browser compatibility
        test: {
            addEventListener: false
        }

    }, Mootor);

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

        // Element selected
		this.el = (function () {
			return el;
		}());

        // Query passed
		this.query = (function () {
			return query;
		}());

		return this;

	};

	// Prototypal inheritance 
	Mootor.fn.prototype = Mootor.prototype;

    // Init-time branching
    if (window.addEventListener) {
        Mootor.test.addEventListener = true;
    } else {
        Mootor.test.addEventListener = false;
    }

	// On document ready, get viewport sizes and show body
    Mootor.ready(function () {

		// Initial screen size
		var clientW = document.documentElement.clientWidth,
			clientH = document.documentElement.clientHeight;

		Mootor.clientH = (function () {
			return clientH;
		}());
		Mootor.clientW = (function () {
			return clientW;
		}());

        // Show body
		Mootor.show();

	}, document);

    // Hide body
	Mootor.hide();

	return Mootor;

}());

