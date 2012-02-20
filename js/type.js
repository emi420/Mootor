/* 
 * Dynamic Type Mootor Fx Plugin
 */
 
var $ = window.$ || $;

(function (Moo) {

    "use strict";

    // Max and min font sizes
    var max = 105,
        min = 20;

    Moo.Type = {
        /*
         *       Adjust font size relative to viewport size
         */
        type: 
        {
            autoSize: function () {

                // Update viewport font-size
                var updateSize = function () {

                    var font_size;

                    // FIXME CHECK: This calc can be optimized
                    //                         using media queries
                    if (window.innerWidth < 768) {
                        font_size = window.innerWidth / 10 + (window.innerHeight / 40);
                    } else {
                        font_size = window.innerWidth / 18 + (window.innerHeight / 100);
                    }

                    if (typeof (document.body) !== null) {
                        if (font_size < max && font_size > min) {
                            document.body.style.fontSize = font_size + "%";
                        } else if (font_size >= max) {
                            document.body.style.fontSize = max + "%";
                        } else if (font_size <= min) {
                            document.body.style.fontSize = min + "%";
                        }
                    }

                };

                // Initialize font-size
                updateSize();

            }        
        }
    };

    Moo.extend(Moo.Type);

}($));

