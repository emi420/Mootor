/* 
 * Mootor Visual FX
 */

(function (Mootor) {

    "use strict";

    Mootor.Fx = {

        /*
         *       fadeOut in an element
         */
        fadeOut: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }

            element.style.transitionProperty = "webkit-transition";
            element.style.webkitTransitionDuration = "0.1s";
            element.style.webkitTransitionTimingFunction = "ease-out";
            element.style.opacity = 0;
        },


        /*
         *       fadeIn an element
         */
        fadeIn: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }

            element.style.transitionProperty = "webkit-transition";
            element.style.webkitTransitionDuration = "0.1s";
            element.style.webkitTransitionTimingFunction = "ease-out";
            element.style.opacity = 1;
        },

        /*
         *       Show an element
         */
        show: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }
            element.style.webkitTransitionDuration = "0";
            element.style.opacity = 1;
        },

        /*
         *       Hide an element
         */
        hide: function (el) {
            var element;

            if (typeof el === "object") {
                element = el;
            } else {
                element = this.el;
            }
            element.style.webkitTransitionDuration = "0";
            element.style.opacity = 0;
        },

        /*
         *       Translate (move) an element on X or Y axis
         */
        translate: function (el, positions, options) {

            var x_pos = positions.x,
                y_pos = positions.y,
                distance,
                tduration;

            tduration = options.transitionDuration;
            el.style.transitionProperty = "webkit-transform";

            // Animation time
            if (tduration !== undefined && tduration > 0) {
                el.style.webkitTransitionDuration = tduration + "s";
                el.style.webkitTransitionTimingFunction = "ease-out";
                el.style.webkitTransitionTransitionDelay = tduration + "s";
            } else {
                el.style.webkitTransitionDuration = "";
                el.style.webkitTransitionTimingFunction = "";
                el.style.webkitTransitionTransitionDelay = "";
            }

            // Use WebKit transform 3D
            distance = x_pos + "px," + y_pos + "px, 0";
            el.style.webkitTransform = "translate3d(" + distance + ")";

            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }

        }

    };

    Mootor.extend(Mootor.Fx);

}(Mootor));

