/* 
 *  Mootor Core (coded by emi420@gmail.com)
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

	// On element ready
	Mootor.ready = function (fn, el) {
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
            } // IE8 needs attachEvent() support
		} else {
			el.onload = fn;
		}
	};

	// Hide document body
	Mootor.hideBody = function () {
		var init_styles = document.createElement("style");
		init_styles.innerHTML = "body * {display: none}";
		Mootor.init_styles = init_styles;
		document.head.appendChild(init_styles);
	};

	// Show document body
	Mootor.showBody = function () {
		document.head.removeChild(Mootor.init_styles);
	};

	// Main constructor
	Mootor.fn = function (query) {

		var q_type = typeof query,
			el;

		if (q_type === "string" || q_type === "object") {

				// Get object from query

			switch (q_type) {

			case "string":

				//console.log("FIXME CHECK: Query to the Dom *** EXPENSIVE");

				if (query.indexOf('#') > -1) {
					query = query.replace("#", "");
					el = document.getElementById(query);
				} else if (query.indexOf(".") > -1) {
					query = query.replace(".", "");
					el = document.getElementsByClassName(query);
				}
				break;

			case "object":
				el = query;
				break;
			}
		}

		// Private element & query properties

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

	Mootor.ready(function () {

		// Initial screen size
		var init_client_width = document.documentElement.clientWidth,
			init_client_height = document.documentElement.clientHeight;

		Mootor.init_client_height = (function () {
			return init_client_height;
		}());

		Mootor.init_client_width = (function () {
			return init_client_width;
		}());

		Mootor.showBody();

	}, document);

	Mootor.init_styles = undefined;
	Mootor.hideBody();

	return Mootor;

}());




