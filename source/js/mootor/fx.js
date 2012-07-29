(function () {

    $.extend({         
    
        /** @lends $.prototype */
        
        /**
         * Translate element, using GPU acceleration when available
         * @param {object} positions Axis positions
         * @param {object} options Options
         * @config {number} transitionDuration Duration of transition (in seconds)
         * @config {number} positions.x X position
         * @config {number} positions.y Y position
         */
        translateFx: function (positions, options) {
    
            var x_pos = positions.x,
                y_pos = positions.y,
                tduration;
               
            tduration = options.transitionDuration;
            this.el.style.transitionProperty = "webkit-transform";
    
            if (tduration !== undefined && tduration > 0) {
                this.el.style.webkitTransitionDuration = tduration + "s";
                this.el.style.webkitTransitionTimingFunction = "ease-out";
            } else {
                if (this.el.style.webkitTransitionDuration !== "") {
                    this.cleanFx();
                }
            }
    
            this.el.style.webkitTransform = "translate3d(" + x_pos + "px," + y_pos + "px, 0)";
    
            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }
    
        },
    
        /**
         * Clean element transform styles
         */
        cleanFx: function () {
            this.el.style.webkitTransform = "";
            this.el.style.webkitTransitionDuration = "";
            this.el.style.webkitTransitionTimingFunction = "";
        }
    
    });
    
} ());
