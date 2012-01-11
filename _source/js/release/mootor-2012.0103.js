/*
 * Mootor (coded by emi420@gmail.com)
 * 
 * Usage:
 * 
 *     // Dynamic font size
 *     $(document).Fx.dynamicType();
 */

// Anonymous function, local scope
(function(window) {

    var Mootor = Mootor || {};

    Mootor.namespace = function(ns_str) {

        var mods = ns_str.split('.'),   // namespace modules string, ex: Mootor.Core
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
        Mootor.ready = function(fn) {
            onReady(fn);
        };
        
        /* Public API */
        return {            
            init: function(e) {
                // Instance init

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

    Mootor.namespace('Mootor.Fx');
    Mootor.Fx = (function() {
        return {            
            show: function() {
                console.log("show!");
            },
            hide: function(e) {
                e.style.display = "none";
            },
            dynamicType: function() {
                /*
                 *  FIXME check: optimize calc 
                 */
                var updateSize = function() {
                    var font_size = window.innerWidth / 10 + (window.innerHeight / 40);
                    if( typeof(document.body) !== null) {
                        if(font_size < 105 && font_size > 20) {
                          document.body.style.fontSize=font_size + "%";                  
                        } else if(font_size >= 105) {
                          document.body.style.fontSize=105 + "%";                  
                        } else if(font_size <= 20) {
                          document.body.style.fontSize=20 + "%";                  
                        }
                    }
                };
                window.addEventListener( "resize", updateSize, false);
                updateSize();
            }       
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {
        // Dependencies
        var Fx = Mootor.Fx ;
        
        return {            
            Panels: function(panels) {
                var i = 1;
                //debugger; 
                for(; i < panels.length ; i += 1) {
                    Fx.hide(panels[i]);
                }
            }
        };
        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Form');
    Mootor.Form = (function() {        
        return {            
            init: function() {
            }
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Catalog');
    Mootor.Catalog = (function() {
        return {            
            init: function() {
            }
        };        
    }());   

}(Mootor, window));
