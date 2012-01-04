/*
 * Mootor (coded by emi420@gmail.com)
 *
 * "Another responsive web framework"
 * 
 * Compatibility:
 * 
 * - Desktop: Chrome, Firefox, Safari
 * - Mobile: iOS 3+, Android 2.2+
 *  
 * Usage:
 * 
 *     // Dynamic font size
 *     $(document).Fx.dynamicType();
 */

// Anonymous function, local scope
(function(window) {

    var Mootor = Mootor || {};

    // Namespacing
    Mootor.namespace = function(ns_str) {

        var mods = ns_str.split('.'),  
        parent = Mootor,
        i=0;
        
        if(mods[0] === "Mootor") {
            mods = mods.slice(1);
        }
        
        for(; i < mods.length; i += 1) {
          if(typeof parent[mods[i]] === "undefined") {
              parent[mods[i]] = {};
          } 
          parent = parent[mods[i]];
        }          

        return parent;
    };
        
    Mootor.namespace('Mootor.Core');
    Mootor.Core = (function() {

        // Dependencies
        // Ex: var ajax = Mootor.utils.init ;
        
        /* Private properties */
        var API_HOST = "http://192.168.1.12:9000",
        API_CORE_URI = "/api/core/rpc/",
        API_CATALOG_URI = "/api/catalog/rpc/",
        MEDIA_UPLOAD_URL = "http://192.168.1.12:9000/uploads/",
        VERSION = 0.1,
        init_styles;

        /* Private methods */       
        var onReady = function(fn) {
        /*
         * Checks if document is full loaded and call a function
         */
            var ready = false;
            
            // Handler to check if the dom is full loaded
            function handler(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && document.readyState !== "complete") {return;}
                    fn.call(document);
                    showBody();
                    ready = true;                            
            }
            
            // Add listeners for common load events
            if (window.addEventListener) {
                window.addEventListener("DOM-ContentLoaded", handler, false);
                window.addEventListener("readystatechange", handler, false);
                window.addEventListener("load", handler, false);                            
            } // FIXME check: for IE8 adds attachEvent() support
                        
            return function onReady(f) {
                if (ready) {
                    f.call(document);
                }
            };
        },
        hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);     
        },
        showBody = function() {
            document.head.removeChild(init_styles);                  
        };
        
        /* One-time init properties */

        // Hide document body while loading
        hideBody();         

        // On document ready
        Mootor.ready = function(fn) {
            onReady(fn);
        };
               
        /* Public API */
        return {            
            init: function(e) {
                // Instance init
                if( typeof e === "string" && e.indexOf("#") >= 0) {
                    // $("#id_element") returns an element
                    return document.getElementById(e.replace("#",""));                    
                } else {
                    return Mootor;
                }
            },
            getApiHost: function() {
                return API_HOST;
            },
            getApiUri: function(mod) {
                switch( mod ) {
                case "core":
                    return API_CORE_URI;
                case "catalog":
                    return API_CATALOG_URI;
                default:
                    return undefined;
                }
            },
            version: function() {
                return VERSION;
            }
        };
        
    }());   
            
    window.Mootor = Mootor;
    window.$ = Mootor.Core.init;
    

}(window));
// Inmediate Object Initialization
