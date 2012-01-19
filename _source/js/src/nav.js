/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

(function (Mootor) {

    "use strict";

    /*
     * Module dependencies
     */

    var Fx = Mootor.Fx,
        Event = Mootor.Event;

    Mootor.Nav = {

        panels: function () {

            /*
             * Navigation panels
             * 
             */

            var clientWidth = Mootor.init_client_width,
                clientHeight =  Mootor.init_client_height,
                thresholdX =  clientWidth / 2,
                panelsX = 0,
                panelsY = 0,
                current = 0,
                divPanels = this.el,
                panels = divPanels.getElementsByClassName("panel"),
                panelCount = panels.length,

                // Move screen horizontally 
                moveScreen = function (e) {

                    var distanceX = e.distanceX,
                        distanceY = e.distanceY,
                        distanceFromOriginY = e.distanceFromOriginY,
                        distanceFromOriginX = e.distanceFromOriginX;

                    // FIXME CHECK: optimize me
                    if (isNaN(panelsY)) {
                        panelsY = 0;
                    }
                    
                    if (isNaN(panelsX)) {
                        panelsX = 0;
                    }

                    // New positions                                          

                    panelsX = panelsX + distanceX;
                    panelsY = panelsY + distanceY;                    
                    
                    // Dragging X
                    
                    if (Mootor.listeners.isDraggingY === false ) {

                        if (distanceFromOriginX === undefined) {

                            // Large X move
                            if (distanceX > 700 || distanceX < -700) {

                                // Very large (change panel)
                                Fx.translate(divPanels, {y: 0, x: panelsX}, {transitionDuration: 0.5});

                            } else {

                                // Large (bounce back)
                                Fx.translate(divPanels, {y: 0, x: panelsX}, {transitionDuration: 0.2});

                            }

                        } else if (Mootor.listeners.isDraggingX === true) {
                            // Short X move (dragging)
                            Fx.translate(divPanels, {y: 0, x: panelsX}, {});

                        }

                    // Dragging Y
                                        
                    }  else if (Mootor.listeners.isDraggingY === true) {

                        if (distanceFromOriginY === undefined) {

                            // Large Y move (bounce back)
                            Fx.translate(divPanels, {y: panelsY, x: panelsX}, {transitionDuration: 0.5});

                        } else {

                            // Short Y move (dragging)
                            Fx.translate(divPanels, {y: panelsY, x: 0}, {});                        

                        }
                    }

                },

                // Load panel
                load = function () {

                    var distance;

                    // Move panels
                    distance = (clientWidth + 40) * current;
                    distance = distance > 0 ? -distance : distance;

                    moveScreen({
                        distanceX: distance - panelsX
                    });

                },

                // DragEnd event handler
                checkMove = function (touch) {

                    var maxdist = thresholdX,
                        is_momentum = false,
                        distanceX = touch.distanceX,
                        distanceY = touch.distanceY;

                    // If position reach certain threshold,
                    // load new panel. 
                    // Else, move panel back.

                    if (distanceX > maxdist && current < (panelCount - 1)) {

                        // Swipe to left

                        current += 1;
                        is_momentum = true;

                    } else if (distanceX < (-maxdist) && current > 0) {

                        // Swipe to right

                        current -= 1;
                        is_momentum = true;

                    }
                    

                    if (is_momentum === false) {
                        
                        if (Mootor.listeners.isDraggingX === true) {
                            // Bounce back
                            moveScreen({
                                distanceX: distanceX
                            });
                            
                        } else if (Mootor.listeners.isDraggingY === true) {

                            // FIXME CHECK: 
                            //       aveces se traban otros listeners
                            //       ej: despues de hacer drag hacia abajo y bounce back
                            //       dejan de funcionar otros listeners hasta hacer drag izq
                        
                            if (panelsY > 0) {
                            
                                // Bounce back from top
                                moveScreen({
                                    distanceY: -panelsY
                                });                            

                            } else {

                                // FIXME CHECK: optimize me 
                                var maxdist = divPanels.getElementsByClassName('panel')[current].offsetHeight - clientHeight;
                                if (panelsY < -maxdist) {
                                    // Bounce from bottom
                                    moveScreen({
                                        distanceY: -panelsY -maxdist
                                    });                                                            
                                }
                                
                            }

                        }

                    } else {

                        // Load panel
                        load();

                    }

                },

                setCurrent = function (pid) {
                    var i;
                    for (i = panelCount; i--;) {
                        if (panels[i].id === pid) {
                            current = i;
                            Fx.show(panels[i]);
                            load();
                        }
                    }
                },

                // Reset panels
                resetAll = function () {

                    var pstyle,
                        panchors,
                        pid,
                        onAnchorClick,
                        i,
                        j;

                    // Set anchor links
                    onAnchorClick = function () {
                        return function (pid) {
                            if (Mootor.listeners.isDraggingX === false && Mootor.listeners.isDraggingY === false) {
                                setCurrent(pid);
                            }
                            return false;
                        };
                    };

                    for (i = panelCount; i--;) {

                        pstyle = panels[i].style;

                        // Reset styles

                        pstyle.width = clientWidth + "px";
                        pstyle.left =  i > 0 ? (clientWidth * i + (40 * i)) + "px" : (clientWidth * i) + "px";
                        if (clientHeight > panels[i].offsetHeight) {
                            pstyle.height = clientHeight + "px";
                        }
                        pstyle.overflow = 'hidden';

                        // Set anchor links

                        // FIXME CHECK: expensive query (getElementsByTagName)
                        panchors = panels[i].getElementsByTagName('a');

                        for (j = panchors.length; j--;) {
                            if (panchors[j].rel !== "") {
                                pid = panchors[j].rel;
                                Event.bind(panchors[j], "touchEnd", onAnchorClick(pid));
                            }
                        }

                    }

                };




            /*
             *  Initialize panels
             */

            // Set document styles    
            document.body.style.overflow = "hidden";

            // Reset and hide all panels
            resetAll();

            // Custom events listeners
            Event.bind(document.body, "dragMove", moveScreen);
            Event.bind(document.body, "dragEnd", checkMove);
            Event.bind(window, "orientationChange", resetAll);

        }
    };

    Mootor.extend(Mootor.Nav);

}(Mootor));
