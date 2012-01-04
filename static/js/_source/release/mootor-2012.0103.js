/*
 *  Mootor (coded by emi420@gmail.com)
 *
 *  Examples:
 *
 *  // Initialize Mootor
 *  $(document).Nav.Panels([
 *      $("#panel1"),
 *      $("#panel2"),
 *  ]);
 * 
 */

/*
 * TODO: 
 *  + codigo independiente de jQuery
 *  + codigo valido en JSLint
 *  + revision de patrones de diseño
 *  - revision de performance
 *  - implementacion de paneles, etc
 */


// Anonymous function for local scope
(function(window) {

    var Mootor = Mootor || {};

    Mootor.namespace = function(ns_str) {

        var mods = ns_str.split('.'),   // namespace modules string, ex: Mootor.Core
        parent = Mootor,
        i;
        
        if(mods[0] === "Mootor") {
            mods = mods.slice(1);
        }
        
        for( i = 0; i < mods.length; i+=1) {
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
        VERSION = 0.1;       

        /* Private methods */       
        var onReady = function(fn) {
        // On document ready
            var ready = false; 
            
            // Handler to check if the dom is full loaded
            function handler(e) {
                if (ready) {return;}
                if (e.type === "readystatechange" && document.readyState !== "complete") {return;}
                fn.call(document);
                ready = true;                            
            }
            
            // Add listeners for common load events
            if (document.addEventListener) {
                document.addEventListener("DOM-ContentLoaded", handler, false);
                document.addEventListener("readystatechange", handler, false);
                document.addEventListener("load", handler, false);                            
            } // FIXME check: for IE8 adds attachEvent() support
            
            return function onReady(f) {
                if (ready) {
                    f.call(document);
                }
            };
        };
        
        /* One-time init properties */
        console.log("Core one-time init.");        
        Mootor.ready = function(fn) {
            onReady(fn);
        };
        
        /* Public API */
        return {            
            init: function(e) {
                // Instance init
                //console.log("Core instance init.");
                if( typeof e === "string" && e.indexOf("#") >= 0) {
                    return document.getElementById(e.replace("#",""));                    
                } else {
                    return Mootor;
                }
            },
            getById: function(eid) {
                var el = document.getElementById(eid);
                return el;                
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
(function(Mootor, window) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {
        // Dependencies
        // Ex: var ajax = Mootor.utils.init ;
        
        // Private properties
        // ...
        
        // Private methods
        // ... (end var)
        
        // One-time init properties
        // ...
        console.log("Nav one-time init.");
        
        // Public API
        return {            
            Panels: function(panels) {
                console.log("Nav.Panels instance init.");
                var i = 1;
                for(; i < panels.length ; i += 1) {
                    panels[i].style.display = "none";
                }
            }
            // ,...
        };
        
    }());   


}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Form');
    Mootor.Form = (function() {
        // Dependencies
        // Ex: var ajax = Mootor.utils.init ;
        
        // Private properties
        // ...
        
        // Private methods
        // ... (end var)
        
        // One-time init properties
        // ...
        console.log("Form one-time init.");
        
        // Public API
        return {            
            init: function() {
                console.log("Form instance init.");
            }
            // ,...
        };
        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Catalog');
    Mootor.Catalog = (function() {
        // Dependencies
        // Ex: var ajax = Mootor.utils.init ;
        
        // Private properties
        // ...
        
        // Private methods
        // ... (end var)
        
        // One-time init properties
        // ...
        console.log("Catalog one-time init.");
        
        // Public API
        return {            
            init: function() {
                console.log("Catalog instance init.");
            }
            // ,...
        };
        
    }());   

}(Mootor, window));
