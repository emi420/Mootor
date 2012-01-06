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
