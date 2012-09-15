(function () {

    $.extend({         
    
        /** @lends $.prototype */
        
        /**
         * Legacy translateFx Mootor Fx function
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

                this.el.style.MozTransitionDuration = tduration + "s";
                this.el.style.MozTransitionTimingFunction = "ease-out";

            } else {
                if (this.el.style.webkitTransitionDuration !== ""
                    || this.el.style.MozTransitionDuration !== "") {
                    this.cleanFx();
                }
            }
    
            this.el.style.webkitTransform = "translate3d(" + x_pos + "px," + y_pos + "px, 0)";            
            this.el.style.MozTransform = "translate(" + x_pos + "px," + y_pos + "px)";
    
            if (options.callback) {
                window.setTimeout(options.callback, tduration * 1000);
            }
    
        },

        /**
         * Translate element, using GPU acceleration when available
         * @param {object} options Options
         * @config {number} transitionDuration Duration of transition (in seconds)
         * @config {number} x X position
         * @config {number} y Y position
         */
        translate: function (options) {
            this.translateFx({x: options.x, y: options.y},options)
        },
    
        /**
         * Clean element transform styles
         */
        cleanFx: function () {
            this.el.style.webkitTransform = "";
            this.el.style.webkitTransitionDuration = "";
            this.el.style.webkitTransitionTimingFunction = "";

            this.el.style.MozTransform = "";
            this.el.style.MozTransitionDuration = "";
            this.el.style.MozTransitionTimingFunction = "";
        }
    
    });
    
} ());
