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


/*
 *  Instances pattern
 */

/*
// Anonymous function for local scope
(function(window) {
    
   // Main function to call
   function Moot (query) {
       
        // Auto-init function
        var Moo = (function(){
            
            // Temporary object
            return {
                obj: query,
                check: function() {
                    console.log(this)
                }               
            }

        }());
       
        // Return instance
        return Moo;
    }
    
    // Make public!
    window.$$ = window.Moo = Moot;

}(window));
  */  
    

// *** codigo original ***/

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
    
    
    // Sandbox for modules
    function Sandbox() {
 
        var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        i;
        
        // Get modules from parameters
        modules = (args[0] && typeof args[0] === "string") ? args : args[0];
        
        // Called as a constructor       
        if (!(this instanceof Sandbox)) {
            console.log("New instance!");
            return new Sandbox(modules, callback);
        }

        // Add properties to 'this' instance
        /*this.a = 1,
        this.b = 2,
        this.getA = function() {
            return this.a;
        };*/
        
        // Load all modules
        if (!modules || modules === '*') {

            modules = [];

            for (i in Sandbox.modules)
            {
                if (Sandbox.modules.hasOwnProperty(i)) {
                    modules.push(i);
                }
            } 
        }            
        
        // Add modules to 'this' instance
        for( i = 0; i < modules.length; i += 1) {
            Sandbox.modules[modules[i]](this);
        } 
        
        // Returns instance
        callback(this);
        
        // Add properties to prototype
        Sandbox.prototype = {
            name: "Mootor",
            version: "0.1",
            getVersion: function() {
                return this.version;
            }
        };            
        
    }
        
    Sandbox.modules = {};    
    
    Sandbox.modules.core = function(box){
        box.init = function(query) {
            
            var el;

            if( typeof query === "string" && query.indexOf("#") > -1) {
                query = query.replace("#","");
                el = document.getElementById(query);
            } 

            return {
                obj: el,
                ajax: function() {
                    return new Sandbox("ajax",function(){});
                },
                dom: function() {
                    return new Sandbox("dom",function(){});
                },
                event: function() {
                    return new Sandbox("event",function(){});
                }
            };
        }
    };

    Sandbox.modules.dom = function(box){
        box.getElement = function(eid) {
            eid = eid.replace("#","");
            var el = document.getElementById(eid);
            return el;
        };
        box.getDivs = function() {
            console.log(obj);
        };
    };
    
    Sandbox.modules.event = function(box){
        box.bind = function() {
            console.log("bind!");
        }
    };    

    Sandbox.modules.ajax = function(box){
        box.sendRequest = function() {
            console.log("send ajax request!!");
        }
        box.getResponse = function() {
            console.log("get ajax response!");
        }
    }; 
    
    var Moo = Sandbox("core",function(){});            
    window.$ = Moo.init;
    
    /* Main function to call
    function Moot (query) {
       
        // Auto-init function
        var Moo = (function(){
            
            // Temporary object
            console.log(typeof Mootor.Core);
            return {
                obj: query,
                ext: `Mootor,
                getInstance: function() {
                    console.log(this)
                }               
            }

        }());
        
        if( typeof query === "string" && query.indexOf("#") > -1 ) {
            Moo.obj = document.getElementById(query.replace("#",""));
        }
              
        return Moo;
    }
    
    // Let's go!
    window.$ = window.Moo = Moot; 
    */
    
    window.Mootor = Mootor;   


}(window));
/*
 * Mootor Effects (coded by emi420@gmail.com)
 */

(function(Mootor, window) {

    Mootor.namespace('Mootor.Fx');
    Mootor.Fx = (function() {

        var max_font_size,
        min_font_size,
        init_client_width,
        divPanels;
        
        max_font_size=105;
        min_font_size=20;
        init_client_width=document.documentElement.clientWidth;
        divPanels = Mootor.Core.getCurrentObj();
                
        /*
         * Public
         */ 
         
        return {            

            // Show element
            show: function(e) {
                e.style.display = "block";
            },
            
            // Hide element
            hide: function(e) {
                e.style.display = "none";
            },
            
            // Adjust font size relative to viewport size
            dynamicType: function() {

                // Update viewport font-size
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

                    divPanels.style.width = document.documentElement.clientWidth + "px";
                },                

                // Handler to capture orientationchange event when is not present
                // or resize on desktop browsers

                eventHandler = function(fn) {

                   /*
                    *  FIXME: - use callback function (fn)
                    */
                   
                   // Viewport width size
                   var clientWidth = document.documentElement.clientWidth;                   
 
                   if( clientWidth != init_client_width) {

                      // Check if new width is equal to screen size (orientationchange)
                      // or different (window resize)

                      if (( clientWidth == screen.width || clientWidth == screen.height ) ||
                          ( clientWidth != screen.width && clientWidth != screen.height)) {
                          updateSize();
                      }
                       
                       // Set new init client width
                       init_client_width = clientWidth;
                   }
                };

                // Add event listeners to update font size when user 
                // rotate a device or resize a window
                if( window.onorientationchange ) {
                    window.addEventListener( "onorientationchange", updateSize, false);
                } else {
                    window.addEventListener( "resize", eventHandler, false);                    
                }
                
                // Update current font-size
                updateSize();
 
            }            
        };        
    }());   

}(Mootor, window));
(function(Mootor, window) {

    Mootor.namespace('Mootor.Event');
    Mootor.Event = (function() {
        var Fx = Mootor.Fx;

        var pointStartX=0,
        pointLastX=0;

        var dragHandler = function(fn) {
            
            var distance=0,
            pageX,
            eventType;

            eventType = event.type;
            
            if ( eventType === "touchmove" || eventType === "touchstart") {
                pageX = event.touches[0].pageX;
                distance =  pageX - pointLastX;
            }

            switch( eventType ) {

            case "touchstart":

                // Initialize previus and start points
                pointLastX = pointStartX = pageX;    
                break;

            case "touchmove":
            
                // Prevents default handlers took over event
                event.preventDefault();
                // Previuos X point
                pointLastX = pageX;                
                // Callback function
                fn(distance);                
                break;
                
            case "touchend":
            
                // Distance from start to last points
                distance = pointStartX - pointLastX;
                fn(distance);
                break;

            }
        };
        
        return {            
            bind: function(el ,event, callback ) {                
                var fn = function() { dragHandler(callback) };
                // Drag
                switch( event ) {
                case "drag": 
                    el.addEventListener("touchstart", fn, false);
                    el.addEventListener("touchmove", fn, false);                    
                    //el.addEventListener("touchend", fn, false);
                    break;
                case "dragEnd": 
                    el.addEventListener("touchend", fn, false);
                    break;
                }
            }
        };        
    }());   

}(Mootor, window));
/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {

        /*
         * Dependencies
         */ 

        var Fx = Mootor.Fx,
        Event = Mootor.Event;

        /*
         * Public 
         */ 

        return {            
            Panels: function() {

                /*
                 * Navigation panels
                 * 
                 * TODO: - resize things onorientationchange
                 *       - limit and bounce back panels move with swipe
                 *       - if swipe reach certain limit, load new content 
                 *         in blank panel
                 */

                var i = 0,
                panelCount = 0,
                clientWidth = 0,
                panelsX = 0,
                clientHeight,
                blankPanel,
                panels_container,
                first,
                current,
                panels,
                divPanels;
                
                // All panels
                divPanels = Mootor.Core.getCurrentObj();                
                panels = divPanels.getElementsByClassName("panel");
                
                // First panel
                first = panels[0];
                current = 0;
                
                // Viewport sizes
                clientHeight = document.documentElement.clientHeight;
                clientWidth = document.documentElement.clientWidth;
                
                // Handler for gestures (swipe, tap, etc)
                var eventHandler = function() {
                    //console.log("Change panel!");
                    console.log(event);
                },

                // Create new panel
                create = function(options) {

                    var panel;                    
                    var id = options.id;
                                        
                    // Create a div
                    panel = document.createElement('div');
                    panel.id = id;
                    
                    // Add viewport size to div
                    panel.style.width = clientWidth + "px";
                    panel.style.height = clientHeight + "px";               
                    
                    // Add panel to panels div
                    divPanels.appendChild(panel);
                    return panel;                    
                },
                
                // Hide all panels
                hideAll = function() {
                    panelCount = panels.length - 1 ;
                    for(; i < panelCount ; i += 1) {
                        Fx.hide(panels[i]);
                        if(clientHeight > panels[i].style.height) {
                            panels[i].style.height = clientHeight + "px";
                        }
                    }
                },
                
                // Reset panel width size 
                resetWidth = function(panel) {
                    panel.style.width = clientWidth + "px";                    
                },

                // Reset panel left position 
                resetLeft = function(panel) {
                    panel.style.left = (clientWidth + 40) + "px";
                },

                // Reset panels container size and position
                resetContainer = function() {
                    divPanels.style.width = (clientWidth * 2) + "px"; 
                    divPanels.style.height = clientHeight + "px";
                    divPanels.style.left = (clientWidth * (-1) - 40) + "px";                    
                },
                
                // Move screen horizontally 
                moveScreenH = function(distance) {
    
                     // New horizontal position
                     panelsX = panelsX + distance;  
                                    
                     // Apply 3d transform when its available
                     // or use default CSS 
                     divPanels.style.transitionProperty = "webkit-transform";
                     if( divPanels.style.webkitTransform != "undefined" ) {
                         divPanels.style.webkitTransform = "translate3d(" + panelsX + "px,0, 0)";    
                     } else {
                         divPanels.style.left = panelsX + "px";                                                      
                     }
                },

                // Load
                load = function(index) {
                    console.log("load " + index);                    
                },              

                // Drag end event handler
                eventHandler = function(distance) {
                    var maxdist = ( clientHeight / 4 ) * 3;
                    if( distance > maxdist ) {
                        load(current + 1 );
                    } else if (distance < -maxdist ) {
                        if( current > 0 ) {
                            load( current - 1 );                        
                        }
                    }
                    moveScreenH(distance);                                            
                };
                
                /*
                 *  Initialize panels
                 */
                
                // Drag and drag-end custom events listener
                Event.bind(document.body, "drag", moveScreenH);
                Event.bind(document.body, "dragEnd", eventHandler);
    
                // Create a blank panel for load content
                blankPanel = create({
                    id: "blank_panel"                    
                });
                
                // Resize and move first panel
                resetLeft( first );
                resetWidth( first );

                // Resize and move panels container
                resetContainer();
                
                // Hide all panels
                hideAll();                

                // Show first panel
                Fx.show(panels[0]);                
            }
        };
    }());   

}(Mootor, window, $));
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
