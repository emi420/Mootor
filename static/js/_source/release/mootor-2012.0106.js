/*
 * Mootor (coded by emi420@gmail.com)
 *
 * Compatibility:
 * 
 * - Desktop: Chrome, Firefox, Safari
 * - Mobile: iOS 3+, Android 2.2+
 *  
 */

(function(window) {
    
    // Mootor sandbox
    function Mootor() {
 
        var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        i;
        
        // Get modules from parameters
        modules = (args[0] && typeof args[0] === "string") ? args : args[0];
        
        // Called as a constructor       
        if (!(this instanceof Mootor)) {
            return new Mootor(modules, callback);
        }

        /*
        // Add properties to 'this' instance
        this.a = 1,
        this.b = 2,
        this.getA = function() {
            return this.a;
        };
        */
        
        // Load all modules
        if (!modules || modules === '*') {

            modules = [];

            for (i in Mootor.modules)
            {
                if (Mootor.modules.hasOwnProperty(i)) {
                    modules.push(i);
                }
            } 
        }            
        
        // Add modules to 'this' instance
        for( i = 0; i < modules.length; i += 1) {
            Mootor.modules[modules[i]](this);
        } 
        
        // Returns instance
        callback(this);
        
        // Add properties to prototype
        Mootor.prototype = {
            version: "0.1",
            getVersion: function() {
                return this.version;
            }
        };            
        
    }
        
    Mootor.modules = {};    
    
    Mootor.modules.core = function(box){
        
        // Hide/show document body 

        var init_styles = "",

        hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            // Hiding styles...
            document.head.appendChild(init_styles);     
        },
        showBody = function() {
            // Showing styles...
            document.head.removeChild(init_styles);                  
        },
    
        documentInit = function() {
            document.body.style.overflow = "hidden";
            // document ready! show body
            showBody();
        },
        
        extend = function(instance, module) {
            var i;
            for( i in module ) {
                if ( module.hasOwnProperty(i)) {
                    instance[i] = module[i];                      
                }  
            }            
        }

        box.init = function(query) {
            
            var el;

            if( typeof query === "string" && query.indexOf("#") > -1) {
                query = query.replace("#","");
                el = document.getElementById(query);
            } 
            
            return {

                obj: el,
                ready: function(fn) {
                    Moo.ready(fn);
                },
                dom: function() {
                    this.dom = new Mootor("dom",function(){});
                    return this;
                },
                event: function() {
                    this.event = new Mootor("event",function(){});
                    return this;
                },
                pageInit: function() {
                    Moo.pageInit();
                },

                Fx: function() {
                    Fx = new Mootor("Fx",function(){});
                    extend(this, Fx);                    
                    return this; 
                },
                Nav: function() {
                    Nav = new Mootor("Nav",function(){});
                    extend(this, Nav);                    
                    return this;
                },
                Event: function() {
                    Event = new Mootor("Event",function(){});
                    extend(this, Event);                    
                    return this;
                }

            };
        },
        box.ready = function(fn) {
            var ready = false;
            
            // Handler to check if the dom is full loaded
            handler = function(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && document.readyState !== "complete") {return;}
                    fn.call(document);
                    ready = true;                        
            };

            // Add listeners for all common load events
            if (window.addEventListener) {
                window.addEventListener("DOM-ContentLoaded", handler, false);
                window.addEventListener("readystatechange", handler, false);
                window.addEventListener("load", handler, false);                            
            } // IE8 needs attachEvent() support
        },
        box.pageInit = function() {
            hideBody();
            Moo.ready(documentInit);
        }
    };

    Mootor.modules.dom = function(box){
        box.getElement = function(eid) {
            eid = eid.replace("#","");
            var el = document.getElementById(eid);
            return el;
        },
        box.getDivs = function() {
            console.log(obj);
        }
    };
    
    Mootor.modules.event = function(box){
        box.bind = function() {
            console.log("bind!");
        }
    };    
       
    // An instance of Mootor core
    var Moo = Mootor("core",function(){});            

    // Let's go public!
    window.$ = Moo.init;
    window.Mootor = Mootor;
        
}(window));
/*
 * Mootor Effects (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {

    Mootor.modules.Fx = function(box){
    
        var max_font_size,
        min_font_size, 
        init_client_width,
        divPanels;
        
        max_font_size=105;
        min_font_size=20;
        init_client_width=document.documentElement.clientWidth;
        
        // Show element
        box.show = function(e) {
            e.style.display = "block";
        };
        
        // Hide element
        box.hide = function(e) {
            e.style.display = "none";
        };
                        
        // Adjust font size relative to viewport size
        box.dynamicType = function() {
           var divPanels = this.obj;
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
            };    

            // Handler to capture orientationchange event when is not present
            // or resize on desktop browsers

            var eventHandler = function(fn) {

               /*
                *  FIXME: - use callback function (fn)
                *           updateSize() is hardoded function
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
 
            };           
    };

}(Mootor, window, $));
(function(Mootor, window, $) {

    Mootor.modules.Event = function(box) {

        var Fx = Mootor.modules.Fx;

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
        
        box.bind = function(el ,event, callback ) {                
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
        };
    };   

}(Mootor, window, $));
/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {

    Mootor.modules.Nav = function(box) {
        
        /*
         * Dependencies
         */ 

        var Fx = $().Fx(),        
        Event = $().Event();
       
        /*
         * Public 
         */ 

        box.Panels = function() {

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
                divPanels = this.obj;                
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
                
                
        };
    };   

}(Mootor, window, $));
