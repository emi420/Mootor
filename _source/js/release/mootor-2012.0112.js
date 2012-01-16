(function(window) {

/* 
 *  Mootor Core (coded by emi420@gmail.com)
 */
 

// Main function, re-defines itself
var Mootor = (function(){  

	// Return new Mootor instance
	Mootor = function(query) {
		return new Mootor.fn(query);	
	}
	
	// All reusable functions must be in
	// the prototype
	Mootor.prototype = {
		
		// On element ready
        ready: function(callback) {
            Mootor.ready(callback, this.el);
        },

	}

	// On element ready
	Mootor.ready = function(fn, el) {
        if(el === window || el === window.document ) { 
            var ready = false;
            
            // Handler to check if the dom is full loaded
            handler = function(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && window.document.readyState !== "complete") {return;}
                    fn.call(window.document);
                    ready = true;                        
            };
    
            // Add listeners for all common load events
            if (el.addEventListener) {
                el.addEventListener("DOM-ContentLoaded", handler, false);
                el.addEventListener("readystatechange", handler, false);
                el.addEventListener("load", handler, false);                            
            } // IE8 needs attachEvent() support
        } else {
            el.onload = fn;        
        }	
	}

	// Main constructor
    Mootor.fn = function(query) {
					
	        var q_type = typeof query;                    
	
	        if( q_type === "string" || q_type === "object" ) {
	        
	            var el; 
	            
	            // Get object from query
	                
	            switch(q_type) {
	    
	            case "string":
	
	                //console.log("FIXME CHECK: Query to the Dom *** EXPENSIVE")
	
	                if( query.indexOf('#') > -1 ) {
	                    query = query.replace("#","");
	                    el = document.getElementById(query);                
	                } else if( query.indexOf(".") > -1) {
	                    query = query.replace(".","");
	                    el = document.getElementsByClassName(query);   
	                }
	                break;
	    
	            case "object":
	                el = query;
	                break;
	            }             
	        }

			// Private element & query properties

			this.el = (function() { 
				return el 
			}()) ;

			this.query = (function() { 
				return query 
			}()) ;


			return this;		

		}	
	
	// Inheritance by copying properties
	Mootor.extend = function(obj) {
		for( i in obj ) {
			if( obj.hasOwnProperty(i) ) {
				Mootor.prototype[i] = obj[i];				
			}			
		}
	}
	
	// Prototypal inheritance	
	Mootor.fn.prototype = Mootor.prototype;
		
	return Mootor
	
}());




/*
 * Mootor Events (coded by emi420@gmail.com)
 */

/*
 *  TODO: rehacer siguiendo el disenio de  
 *  http://code.google.com/intl/es-419/mobile/articles/webapp_fixed_ui.html
 */

/*
 *  Private
 */

var pointStartX = 0, pointLastX = 0, init_client_width;

// Initial viewport width
init_client_width = document.documentElement.clientWidth;


// Handler for drag events
var dragHandler = function(fn) {

    var distance = 0, pageX, eventType;
    eventType = event.type;

    // If touch start or move, update X position and distance
    // from previous X point

    if(eventType === "touchmove" || eventType === "touchstart") {
        pageX = event.touches[0].pageX;
        distance = pageX - pointLastX;
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

    if(clientWidth != init_client_width) {

        // Check if new width is equal to screen size (orientationchange)
        // or different (window resize) and call callback function

        if((clientWidth == screen.width || clientWidth == screen.height ) || (clientWidth != screen.width && clientWidth != screen.height)) {
            fn.call();
        }

        // Set new init client width
        init_client_width = clientWidth;
    }
};

/*
 *  Public
 */
    
Mootor.Event = {

    bind: function(el, event, callback) {
        var fn;

        switch( event ) {

            case "drag":
                fn = function() {
                    dragHandler(callback);
                };
                el.addEventListener("touchstart", fn, false);
                el.addEventListener("touchmove", fn, false);
                break;

            case "dragEnd":
                fn = function() {
                    dragHandler(callback);
                };
                el.addEventListener("touchend", fn, false);
                break;

            case "orientationChange":
                fn = function() {
                    viewportHandler(callback);
                };
                if( typeof el.onorientationchange != "undefined") {
                    el.addEventListener("orientationchange", fn, false);
                } else {
                    el.addEventListener("resize", fn, false);
                }
                break;

        }
    }
};
    
Mootor.extend(Mootor.Event);
    /* 
 *  Mootor Visual FX (coded by emi420@gmail.com)
 */
 
// Module dependencies
var Event = Mootor.Event;

// Max and Min font sizes
var max_font_size=105,
min_font_size=20;

Mootor.Fx = {

    // Show an element
    show: function(e) {
        //console.log(this)
        if( typeof e === "object") {
            e.style.display = "block";
        } else {
            this.el.style.display = "block";
        }
    },
    
    // Hide an element
    hide: function(e) {
        //console.log(this)
        if( typeof e === "object") {
            e.style.display = "block";
        } else {
            this.el.style.display = "none";
        }
    },
                    
    // Adjust font size relative to viewport size
    dynamicType: function() {

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
        // rotate device or resize window
        Event.bind(window, "orientationChange", updateSize);
        Event.bind(window, "resize", updateSize);
        
        // Initialize font-size
        updateSize();
 
     }  
}

Mootor.extend(Mootor.Fx);


/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

/*
 *  TODO: despues de actualizar Event tambien hay que
 *  actualizar Nav con el disenio de 
 *  http://code.google.com/intl/es-419/mobile/articles/webapp_fixed_ui.html
 */


/*
 * Module dependencies
 */ 

var Fx = Mootor.Fx,        
Event = Mootor.Event;

Mootor.Nav = {        
   
    panels: function() {

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
        divPanels = this.el;        
        
        //console.log("FIXME CHECK: Query to the Dom *** EXPENSIVE");
                
        panels = divPanels.getElementsByClassName("panel");
        
        // First panel
        first = panels[0];
        current = 0;
        
        // Viewport sizes
        clientHeight = document.documentElement.clientHeight;
        clientWidth = document.documentElement.clientWidth;
        
        document.body.style.overflow = "hidden";

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
           
        // Set document styles    
        document.body.style.overflow = "hidden";

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
           
    }
};   

Mootor.extend(Mootor.Nav);

// Go public!
window.$ = Mootor;

}(window));
