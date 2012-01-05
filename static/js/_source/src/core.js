/*
 * Mootor (coded by emi420@gmail.com)
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

(function(window) {

    var Mootor = Mootor || {};

    /*
     * Namespacing function
     */ 

    Mootor.namespace = function(ns_str) {

        var mods = ns_str.split('.'),  
        parent = Mootor,
        i=0;
        
        // Ommit parent module
        if(mods[0] === "Mootor") {
            mods = mods.slice(1);
        }
        
        // Add modules to parent object
        for(; i < mods.length; i += 1) {
          if(typeof parent[mods[i]] === "undefined") {
              parent[mods[i]] = {};
          } 
          parent = parent[mods[i]];
        }          

        return parent;
    };
        
    /*
     * Core
     */
    Mootor.namespace('Mootor.Core');
    Mootor.Core = (function() {
        
        /*
         * Private properties
         */

        var API_HOST = "http://192.168.1.12:9000",
        API_CORE_URI = "/api/core/rpc/",
        API_CATALOG_URI = "/api/catalog/rpc/",
        MEDIA_UPLOAD_URL = "http://192.168.1.12:9000/uploads/",
        VERSION = 0.1,
        init_styles,
        obj;

        /*
         * Initializing document
         */       
         
        // Hide/show document body 
        var hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);     
        },
        showBody = function() {
            document.head.removeChild(init_styles);                  
        },
        
        // When document ready
        onReady = function(fn) {
            var ready = false;

            // One-time functions
            var documentInit = function() {
                document.body.style.overflow = "hidden";
                showBody();
            },
            
            // Handler to check if the dom is full loaded
            handler = function(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && document.readyState !== "complete") {return;}
                    fn.call(document);
                    documentInit();
                    ready = true;                            
            };
            
            // Add listeners for all common load events
            if (window.addEventListener) {
                window.addEventListener("DOM-ContentLoaded", handler, false);
                window.addEventListener("readystatechange", handler, false);
                window.addEventListener("load", handler, false);                            
            } // IE8 needs attachEvent() support
                        
            // Return listener function
            return function onReady(f) {
                if (ready) {
                    f.call(document);
                }
            };
        };
        
        /* 
         * Warm up 
         */

        // Hide document body while loading
        hideBody();         

        // On document ready
        Mootor.ready = function(fn) {
            onReady(fn);
        };
               
        /* 
         * Public 
        */
       
        return {            
            
            // Instance init
            // FIXME: no arma bien las instancias
            init: function(e) {
                if( typeof e === "string" && e.indexOf("#") >= 0) {
                    obj = document.getElementById(e.replace("#",""));                    
                    return Mootor;
                } else {
                    // Instance init, usage: $().Core.getApiHost()
                    return Mootor;
                }
            },
            
            // Returns Mootor API hostname
            getApiHost: function() {
                return API_HOST;
            },

            // Returns current object
            getCurrentObj: function() {
                return obj;
            },
            
            // Returns Mootor API Uri, by module (Core, Catalog, etc)
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

            // Returns Mootor current version
            version: function() {
                return VERSION;
            }
        };
        
    }());   
    
    // Mootor go public        
    window.Mootor = Mootor;    
    
    // Alias for convenience
    window.$ = Mootor.Core.init;
    

}(window));
