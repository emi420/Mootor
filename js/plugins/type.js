/**
 * Dynamic Type Mootor Fx Plugin
 */
 
 /** 
 * @class
 * @name $ 
 */

var $ = window.$ || $;

(function ($) {

    "use strict";

    // Max and min font sizes
    var max = 105,
        min = 20;

    $.extend({

        /** @lends $.prototype */

        /**
         * Adjust font size relative to viewport size
         * @example $(document).autoType();
         */
        autoType: function () {

            var width = window.innerWidth,
                body = document.body;
                
            // TODO: common resolutions list, testing
                
            if (width < 769) {
                $(body).setClass("width-768");
            } else if (width > 769 && width < 1025) {
                $(body).setClass("width-1024");                    
            }

        }
    });

}($));

