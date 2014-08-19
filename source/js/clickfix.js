(function($) {

    // Allow to use "click" or tap and 
    // not worry about device capabilities
    
    if ( 'ontouchstart' in window ) {
        $.fn._on = $.fn.on;
        $.fn.on = function(event, selector, data, callback, one) {
            if (event.indexOf("click") > -1 && event.indexOf("tap") > -1) {
                event = event.replace("click","");
            }
            return $.fn._on.call(this, event, selector, data, callback, one);
        };
    }

}(window.$));
