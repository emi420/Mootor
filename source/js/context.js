/**
* Information about the context of the application (ej: device's viewport)
* @class Context
* @return object
* @static
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var Context;

    Context = Mootor.Context = function() {
        return ({


            /**
            * System info
            * @property os
            * @type function
            * @example
            *     if (m.context.os === "android") {
            *          console.log("Your device use Android.");
            *     }
            */            
            os: $.os,

            /**
            * Browser info
            * @property browser
            * @type string
            * @example
            *     if (m.context.browser === "firefox") {
            *          console.log("Your browser is Firefox.");
            *     }
            */            
            browser: $.browser,

            /**
            * Viewport info
            * @property viewport
            * @type object
            * @example
            *     img.width = m.context.viewport.width
            *     img.height = m.context.viewport.height
            */            
            viewport: {
                width: window.screen.width,
                height: window.screen.height
            },
            
            cordova: function() {
                return window.Cordova !== undefined
            },
            phonegap:function() {
                return window.PhoneGap !== undefined
            },
            _androidversion: function() {
                var ua = navigator.userAgent;
                if( ua.indexOf("Android") >= 0 ) {
                  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                }
                return androidversion;
            }

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

}(window.$, window.Mootor, window.m));