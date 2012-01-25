/* 
 * Mootor Visual FX (coded by emi420@gmail.com)
 */

(function (Mootor) {

    "use strict";

    // Max and Min font sizes
    var max_font_size = 105,
        min_font_size = 20;

    Mootor.Fx = {

        // Show an element
        show: function (el) {
            if (typeof el === "object") {
                el.style.display = "block";
            } else {
                this.el.style.display = "block";
            }
        },

        // Hide an element
        hide: function (el) {
            if (typeof el === "object") {
                el.style.display = "none";
            } else {
                this.el.style.display = "none";
            }
        },

        // Translate (move) an element on X or Y axis
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

            // Apply 3d transform when its available
            // or use default CSS 'left' property

            // FIXME CHECK: optimize me

            // Check if move is on X or Y axis
            if (!isNaN(x_pos) && x_pos !== undefined) {
                distance = x_pos + "px,0, 0";
            } else if (!isNaN(y_pos) && y_pos !== undefined) {
                distance = "0," + y_pos + "px, 0";
            }

            if (el.style.webkitTransform !== "undefined") {

                // Use WebKit transform 3D
                el.style.webkitTransform = "translate3d(" + distance + ")";

            } else {
                // Use left & top CSS styles
                if (!isNaN(x_pos) && x_pos !== undefined) {
                    el.style.left = x_pos + "px";
                } else if (!isNaN(y_pos) && y_pos !== undefined) {
                    el.style.top = y_pos + "px";
                }
            }

        },

        // Adjust font size relative to viewport size
        dynamicType: function () {

            // Update viewport font-size
            var updateSize = function () {

                // FIXME CHECK: This calc can be optimized
                var font_size = window.innerWidth / 10 + (window.innerHeight / 40);

                if (typeof (document.body) !== null) {
                    if (font_size < max_font_size && font_size > min_font_size) {
                        document.body.style.fontSize = font_size + "%";
                    } else if (font_size >= max_font_size) {
                        document.body.style.fontSize = max_font_size + "%";
                    } else if (font_size <= min_font_size) {
                        document.body.style.fontSize = min_font_size + "%";
                    }
                }

            };

            // Add event listeners to update font size when user 
            // rotate device or resize window
            //Event.bind(window, "orientationChange", updateSize);
            //Event.bind(window, "resize", updateSize);

            // Initialize font-size
            updateSize();

        }
    };

    Mootor.extend(Mootor.Fx);

}(Mootor));

