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
(function(Mootor, window) {

    Mootor.namespace('Mootor.Event');
    Mootor.Event = (function() {
        var pointStartX,
        pointLastX, 
        fn,
        distance;
        swipeHandler = function() {
            switch( event.type ) {
            case "touchstart":
                pointStartX = event.touches[0].pageX;                
                break;
            case "touchmove":
                pointLastX = event.touches[0].pageX;
                distance = event.touches[0].pageX - pointStartX;
                
                if( distance > 10 || distance < 10) {
                    // Swaping
                    // Desplazar paneles (3D transform, etc)
                }
                break;
                case "touchend":
                    console.log("swipe! " + distance);
                    fn.call();
                    pointStartX = 0;
                break;
            }
            //fn.call();
        };
        
        return {            
            addEventListener: function(el ,event, callback ) {
                if( event === "swipe") {
                    /*
                     * TODO: swipe event
                     */
                    fn = callback;
                    el.addEventListener("touchstart", swipeHandler, false);
                    el.addEventListener("touchmove", swipeHandler, false);
                    el.addEventListener("touchend", swipeHandler, false);
                    el.addEventListener("click", swipeHandler, false);
                }
            }
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Fx');
    Mootor.Fx = (function() {
        var max_font_size=105,
        min_font_size=20,
        init_client_width=document.documentElement.clientWidth;
        
        return {            
            show: function(e) {
                e.style.display = "block";
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
                        if(font_size < max_font_size && font_size > min_font_size) {
                          document.body.style.fontSize=font_size + "%";                  
                        } else if(font_size >= max_font_size) {
                          document.body.style.fontSize=max_font_size + "%";                  
                        } else if(font_size <= min_font_size) {
                          document.body.style.fontSize=min_font_size + "%";                  
                        }
                    }
                },                
                eventHandler = function(fn) {
                   /*
                    *  Check resize events looking for orientationchange
                    *  event (Android not support this event)
                    * 
                    *  FIXME: - use callback function (fn)
                    */
                   var clientWidth = document.documentElement.clientWidth; 
                   if( clientWidth != init_client_width) {
                       if( clientWidth == screen.width || clientWidth == screen.height ) {
                       // on orientationchange
                           updateSize();
                       } else if( clientWidth != screen.width && clientWidth != screen.height){
                       // on resize
                           updateSize();
                       }
                       init_client_width = clientWidth;
                   }
                };

                if( window.onorientationchange ) {
                    window.addEventListener( "onorientationchange", updateSize, false);
                } else {
                    window.addEventListener( "resize", eventHandler, false);                    
                }
                updateSize();
            }       
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {
        // Dependencies
        var Fx = Mootor.Fx;

        return {            
            Panels: function(panels) {
                var Event = Mootor.Event,
                i = 0,
                clientHeight = document.documentElement.clientHeight,
                eventHandler = function() {
                    console.log("Next panel!");
                };
                
                Event.addEventListener(document.body, "swipe", eventHandler);

                for(; i < panels.length ; i += 1) {
                    Fx.hide(panels[i]);
                    if(clientHeight > panels[i].style.height) {
                        panels[i].style.height = clientHeight + "px";
                    }
                }
                Fx.show(panels[0]);                
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
