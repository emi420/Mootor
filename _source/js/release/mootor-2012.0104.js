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
        var hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);     
        },
        showBody = function() {
            document.head.removeChild(init_styles);                  
        },
        onReady = function(fn) {
        /*
         * Checks if document is full loaded and call a function
         */
            var ready = false;

            // One-time functions on document init
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
                    //console.log("update size!");
                    if( typeof(document.body) !== null) {
                        if(font_size < max_font_size && font_size > min_font_size) {
                          document.body.style.fontSize=font_size + "%";                  
                        } else if(font_size >= max_font_size) {
                          document.body.style.fontSize=max_font_size + "%";                  
                        } else if(font_size <= min_font_size) {
                          document.body.style.fontSize=min_font_size + "%";                  
                        }
                    }
                    if( panels = $("#panels")) {
                        //console.log("update panels width to " + document.documentElement.clientWidth + "px");
                        panels.style.width = document.documentElement.clientWidth + "px";
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
            },
            moveScreenH: function(distance) {
                /*
                 *  Move screen horizontally
                 */                                  
                 var panels,
                 currentX;
                 
                 panels = $("#panels");
                 currentX = Number(panels.style.left.replace("px","")); 
                 console.log("currentX:" + currentX);
                 distance = Number(distance)/2;
                                  
                 panels.style.webkitTransform = "translate3d(" + (currentX + distance) + "px,0, 0)";                 
                 panels.style.left = (currentX + distance) + "px";
                 
            }               
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Event');
    Mootor.Event = (function() {
        var Fx = Mootor.Fx;

        var pointStartX=0,
        pointLastX=0, 
        fn,
        distance=0;

        var swipeHandler = function() {
            switch( event.type ) {
            case "touchstart":
                pointLastX = pointStartX = event.touches[0].pageX;    
                break;
            case "touchmove":
                distance = event.touches[0].pageX - pointLastX;
                pointLastX = event.touches[0].pageX;

                event.preventDefault();
                
                // Swaping
                // Desplazar paneles (3D transform, etc)
                Fx.moveScreenH(distance);
                break;
            case "touchend":
                //distance = pointStartX + pointLastX;
                fn.call(this);
                pointStartX = 0;
                break;
            }
            //fn.call();
        };
        
        return {            
            addEventListener: function(el ,event, callback ) {
                if( event === "swipe") {
                    fn = callback;
                    el.addEventListener("touchstart", swipeHandler, false);
                    el.addEventListener("touchmove", swipeHandler, false);
                    el.addEventListener("touchend", swipeHandler, false);
                }
            }
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {
        // Dependencies
        var Fx = Mootor.Fx,
        Event = Mootor.Event;

        return {            
            Panels: function(panels) {
                /*
                 * Navigation panels
                 * 
                 * TODO: - resize things onorientationchange
                 *       - limit and bounce back panels move with swipe
                 *       - if swipe reach certain limit, load new content 
                 *         in blank panel
                 *       - check panels initial position on swipe
                 */
                var i = 0,
                clientHeight,
                blankPanel,
                panelCount=0,
                clientWidth=0;
                
                clientHeight = document.documentElement.clientHeight,
                clientWidth = document.documentElement.clientWidth,
                
                // Handler for events (swipe, tap, etc)
                eventHandler = function() {
                    console.log("Change panel!");
                };                
                Event.addEventListener(document.body, "swipe", eventHandler);
    
                // Append a blank panel for load content
                blankPanel = document.createElement('div');
                blankPanel.id = "blank_panel";
                blankPanel.style.width = document.documentElement.clientWidth + "px";
                blankPanel.style.height = document.documentElement.clientHeight + "px";               
                panels.push(blankPanel);
                $("#panels").appendChild(blankPanel);
                
                // Resize and move first panel
                panels[0].style.left = (clientWidth + 40) + "px";
                panels[0].style.width = clientWidth + "px";

                // Resize and move panels container
                $("#panels").style.width = (clientWidth * 2) + "px"; 
                $("#panels").style.left = (clientWidth * (-1) - 40) + "px";
                $("#panels").style.height = clientHeight + "px";
                
                // Hide all panels
                panelCount = panels.length - 1 ;
                for(; i < panelCount ; i += 1) {
                    Fx.hide(panels[i]);
                    if(clientHeight > panels[i].style.height) {
                        panels[i].style.height = clientHeight + "px";
                    }
                }
                
                // Show active panel
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
