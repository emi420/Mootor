/* 
 * Mootor Visual FX
 */

(function ($) {
    "use strict";
    /**
     * @class
     * @name Fx
     * @memberOf $
     */
    $.Fx = {

        /**
         * Translate element, using GPU acceleration when available
         * @memberOf $.Fx
         * @param {element} el Element
         * @param {object} positions Axis positions
         * @param {object} options Options
         * @config {integer} transitionDuration Duration of transition (in seconds)
         * @example $.Fx.translate($("#myDiv", {10,20}, {tansitionDuration: .5}));
         */
        translate: function (el, positions, options) {

            var x_pos = positions.x,
                y_pos = positions.y,
                tduration;

            tduration = options.transitionDuration;
            el.style.transitionProperty = "webkit-transform";

            if (tduration !== undefined && tduration > 0) {
                el.style.webkitTransitionDuration = tduration + "s";
                el.style.webkitTransitionTimingFunction = "ease-out";
            } else {
                this.clean(el);
            }

            el.style.webkitTransform = "translate3d(" + x_pos + "px," + y_pos + "px, 0)";

            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }

        },

        /**
         * Clean element transform styles
         * @memberOf $.Fx
         * @param {element} el Element
         * @example $.Fx.clean($("#myDiv");
         */
        clean: function (el) {
            el.style.webkitTransitionDuration = "";
            el.style.webkitTransitionTimingFunction = "";
        }

    };

    $.extend($.Fx);

}($));

