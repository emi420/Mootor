/* 
 * Mootor Visual FX
 */

(function (Moo) {
    Moo.Fx = {
        show: function (el) {
            var element,
                i;
                
            if (Array.isArray(el)) {
                for (i = el.length; i--;) {
                    this.show(el[i]);
                }
            } else if (element !== undefined) {
                element = typeof el === "object" ? el : this.el;
                element.style.display = "none";
            }
        },

        hide: function (el) {
            var element,
                i;
                
            if (Array.isArray(el)) {
                for (i = el.length; i--;) {
                    this.hide(el[i]);
                }
            } else if (element !== undefined) {
                element = typeof el === "object" ? el : this.el;
                element.style.display = "none";
            }
        },

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
        
        clean: function (el) {
            el.style.webkitTransitionDuration = "";
            el.style.webkitTransitionTimingFunction = "";        
        }

    };

    Moo.extend(Moo.Fx);

}($));

