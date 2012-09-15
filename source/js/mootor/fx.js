(function () {

    var tmpDivStyle = document.createElement("div").style,
        vendor,
        transition,
        transformFnStr;
    
    if (tmpDivStyle.webkitTransitionDuration !== undefined) {
        vendor = "webkit";        
        transformFnStr = "translate3d";
    } else if (tmpDivStyle.MozTransitionDuration !== undefined) {
        vendor = "Moz";            
        transformFnStr = "translate";
    }
    
    transition = {
        transform: vendor + "Transform",
        duration: vendor + "TransitionDuration",
        timingFunction: vendor + "TransitionTimingFunction"
    };

    $.extend({         
    
        /** @lends $.prototype */
        
        /**
         * Legacy translateFx Mootor Fx function
         */
        translateFx: function (positions, options) {
    
            var x_pos = positions.x,
                y_pos = positions.y,
                tduration,
                elStyle = {},
                key,
                el = this.el;
               
            tduration = options.transitionDuration;
    
            if (tduration !== undefined && tduration > 0) {
                elStyle[transition.duration] = tduration + "s";
                elStyle[transition.timingFunction] = "ease-out";

            } else {
                if (elStyle[transition.duration] !== "") {
                    this.cleanFx();
                }
            }
    
            elStyle[transition.transform] = transformFnStr + "(" + x_pos + "px," + y_pos + "px, 0)";            
            
            for (key in elStyle) {
                el.style[key] = elStyle[key]; 
            }
            
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
            this.translateFx({x: options.x, y: options.y},options);
        },
    
        /**
         * Clean element transform styles
         */
        cleanFx: function () {
            var elStyle = {},
                key,
                el = this.el;
            
            elStyle[transition.transform] = "";
            elStyle[transition.duration] = "";
            elStyle[transition.timingDuration] = "";

            for (key in elStyle) {
                el.style[key] = elStyle[key];
            }
        }
    
    });
    
} ());
