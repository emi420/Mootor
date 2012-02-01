/* 
 * Mootor Visual FX
 */

Moo.Fx = {
    show: function (el) {
        var element;

        typeof el === "object" ? element = el : element = this.el;        
        element.style.display = "block";
    },

    hide: function (el) {
        var element;

        typeof el === "object" ? element = el : element = this.el;        
        element.style.display = "none";
    },

    translate: function (el, positions, options) {

        var x_pos = positions.x,
            y_pos = positions.y,
            distance,
            tduration;

        tduration = options.transitionDuration;
        el.style.transitionProperty = "webkit-transform";

        if (tduration !== undefined && tduration > 0) {
            el.style.webkitTransitionDuration = tduration + "s";
            el.style.webkitTransitionTimingFunction = "ease-out";
        } else {
            el.style.webkitTransitionDuration = "";
            el.style.webkitTransitionTimingFunction = "";
        }
        el.style.webkitTransform = "translate3d(" + x_pos + "px," + y_pos + "px, 0)";

        if (options.callback) {
            window.setTimeout(options.callback, tduration * 1000);
        }

    }

};

Moo.extend(Moo.Fx);


