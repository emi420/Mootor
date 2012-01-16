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
            
             //console.log(distance);

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
        checkMove = function(distance) {
            
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
        Event.bind(document.body, "dragEnd", checkMove);
        Event.bind(window, "orientationChange", resetAll);
        
        // Show first panel   
        Fx.show(first);  
           
    }
};   

Mootor.extend(Mootor.Nav);
