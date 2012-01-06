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
        
        // Get modules from parameters, ex: new Mootor("*",function(){});
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
    
    /*
     *  Core modules
     */    
     
    Mootor.modules = {};    
    
    Mootor.modules.core = function(box){
        
        // Hide/show document body 

        var init_styles = "",

        // Hide document body
        hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);     
        },
        
        // Show document body
        showBody = function() {
            document.head.removeChild(init_styles);                  
        },
    
        // On document ready
        documentInit = function() {
            document.body.style.overflow = "hidden";
            showBody();
        },
        
        // Util function for extend instance object
        extend = function(instance, module) {
            var i;
            for( i in module ) {
                if ( module.hasOwnProperty(i)) {
                    instance[i] = module[i];                      
                }  
            }            
        }

        /*
         *  Public
         */ 
        
        // Main method for create Mootor instances        
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
        
        // On document ready
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
        
        // Initialize page
        box.pageInit = function() {
            hideBody();
            Moo.ready(documentInit);
        }
    };
       
    // Main instance
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
 
        // Module dependences
        var Event = $().Event();
    
        var max_font_size,
        min_font_size;
        
        // Max and Min font sizes
        max_font_size=105;
        min_font_size=20;
        
        // Show an element
        box.show = function(e) {
            e.style.display = "block";
        };
        
        // Hide an element
        box.hide = function(e) {
            e.style.display = "none";
        };
                        
        // Adjust font size relative to viewport size
        box.dynamicType = function() {

            // Update viewport font-size
           var updateSize = function() {               

                // This calc can be optimized
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

            };    

            // Add event listeners to update font size when user 
            // rotate device (or resize window)
            Event.bind(window, "orientationChange", updateSize);
            
            // Initialize font-size
            updateSize();
 
         };           
    };

}(Mootor, window, $));
/*
 * Mootor Events (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {

    Mootor.modules.Event = function(box) {

        /*
         * Module dependencies
         */ 

        var Fx = Mootor.modules.Fx;

        var pointStartX=0,
        pointLastX=0,
        init_client_width;        
    
        // Initial viewport width
        init_client_width=document.documentElement.clientWidth;

        // Handler for drag events
        var dragHandler = function(fn) {
            
            var distance=0,
            pageX,
            eventType;

            eventType = event.type;            

            // If touch start or move, update X position and distance            
            // from previous X point

            if ( eventType === "touchmove" || eventType === "touchstart") {
                pageX = event.touches[0].pageX;
                distance =  pageX - pointLastX;
            }

            switch( eventType ) {

            case "touchstart":

                // Initialize previous and start points

                pointLastX = pointStartX = pageX;    
                break;

            case "touchmove":
            
                // Prevents default handlers took over event
                event.preventDefault();

                // Update previuos X point
                pointLastX = pageX;                

                // Call callback function
                fn(distance);                
                break;
                
            case "touchend":
            
                // Update distance from start to last point
                // and call callback function
                
                distance = pointStartX - pointLastX;
                fn(distance);
                break;

            }
        };
        
        // Handler to capture orientationchange event when is not present
        // (ex: Android 2.2) or resize window on desktop browsers
        var viewportHandler = function(fn) {

            // Viewport width size
            var clientWidth = document.documentElement.clientWidth;                   
 
            if( clientWidth != init_client_width) {

                 // Check if new width is equal to screen size (orientationchange)
                 // or different (window resize) and call callback function

                 if (( clientWidth == screen.width || clientWidth == screen.height ) ||
                     ( clientWidth != screen.width && clientWidth != screen.height)) {
                     fn.call();
                 }
                   
                 // Set new init client width
                 init_client_width = clientWidth;
            }
        };   
                       
        /*
         * Public 
         */ 
         
        box.bind = function(el ,event, callback ) {                
            var fn;
            
            switch( event ) {

            case "drag": 

                fn = function() { dragHandler(callback); };                
                el.addEventListener("touchstart", fn, false);
                el.addEventListener("touchmove", fn, false);                    
                break;

            case "dragEnd": 

                fn = function() { dragHandler(callback); };                
                el.addEventListener("touchend", fn, false);
                break;

            case "orientationChange": 
            
                fn = function() { viewportHandler(callback); };                
                if( typeof el.onorientationchange != "undefined" ) {
                    el.addEventListener("orientationchange", fn, false);
                } else {
                    el.addEventListener("resize", fn, false);                    
                }
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
         * Module dependencies
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
             * TODO: 
             *       - if onDragEnd reach certain limit, load new content 
             *         in blank panel
             */

            var i = 0,
            clientWidth = 0,
            clientHeight = 0,
            panelCount = 0,
            panelsX = 0,
            blankPanel,
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
            
            // Create new panel
            var create = function(options) {

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
                panelCount = panels.length;
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

            // Reset panel height size 
            resetHeight = function(panel) {
                panel.style.height = clientHeight + "px";                    
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
            
            // Reset panel size and position
            resetPanel = function(panel) {

                var width = clientWidth,
                height = resetHeight;

                resetWidth( panel );
                resetHeight( panel );

                if( panel === blankPanel) {
                    panel.style.left = "0px";              
                } else {
                    panel.style.left = (clientWidth + 40) + "px";
                }
            },
            
            // Move screen horizontally 
            moveScreenH = function(distance) {

                 // New horizontal position
                 panelsX = panelsX + distance;  
                                
                 // Apply 3d transform when its available
                 // or use default CSS 'left' property
                 divPanels.style.transitionProperty = "webkit-transform";
                 if( divPanels.style.webkitTransform != "undefined" ) {
                     divPanels.style.webkitTransform = "translate3d(" + panelsX + "px,0, 0)";    
                 } else {
                     divPanels.style.left = panelsX + "px";                                                      
                 }
            },

            // Load panel
            load = function(index) {
                console.log("load " + index);                    
            },              

            // DragEnd event handler
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
            },
            
            // Reset panels sizes and positions
            resetAll = function() {                    
                                    
                // Current viewport
                clientHeight = document.documentElement.clientHeight;
                clientWidth = document.documentElement.clientWidth;
                
                // Reset current and blank panels
                resetPanel(panels[current]);
                resetPanel(blankPanel);                 

                // Reset panels container
                resetContainer();

            };
            
            /*
             *  Initialize panels
             */
                
            // Create a blank panel for load content
            blankPanel = create({
                id: "blank_panel"                    
            });
            
            // Reset and hide all panels
            resetAll();
            hideAll();                
            
            // Custom events listeners
            Event.bind(document.body, "drag", moveScreenH);
            Event.bind(document.body, "dragEnd", eventHandler);
            Event.bind(window, "orientationChange", resetAll);
            
            // Show first panel   
            Fx.show(first);  
               
        };
    };   

}(Mootor, window, $));
