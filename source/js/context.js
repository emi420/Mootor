/**
* Information about the context of the application (ej: device's viewport)
* @class Context
* @return object
* @static
*/

(function ($, Mootor) {

    "use strict";

    var Context;

    Context = Mootor.Context = function() {
        return ({

            /**
            * Browser info
            * @property browser
            * @type string
            */            
            browser: navigator.userAgent.toLowerCase(),

            /**
            * Viewport info
            * @property viewport
            * @type object
            */            
            viewport: {},

            /**
            * Device info
            * @property device 
            * @type object
            */            
            device: {
                /**
                * Vendor info
                * @property vendor
                * @type string
                */            
                vendor: navigator.vendor.toLowerCase(),
                
            },
            
            cordova: (window.Cordova !== undefined),
            phonegap: (window.PhoneGap !== undefined),

        });
    };

    // Static global objects
    
    $.extend(m, { 
        
        /**
        * @property context
        * @for window.m
        * @type Context
        */
        context: new Context()
    });

}(window.$, window.Mootor));