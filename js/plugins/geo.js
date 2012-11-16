/**
 * @summary Geo Mootor plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */
  
(function ($) {

    "use strict";
    
    var Geo = function() {
        return this;
    }
    
    Geo.prototype = {
        getCurrentPosition: function(options) {
            options.timeout = options.timeout ? options.timeout : 2000;
            navigator.geolocation.getCurrentPosition(
                options.onSuccess,
                options.onError,
                {
                    timeout: options.timeout
                }
            );
        }
    }
    
    $.extend({
        geo: function(options) {
            return new Geo();
        }
    }, $)

 
}(Mootor));