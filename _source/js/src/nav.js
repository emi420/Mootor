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

            var i = 0,
                clientWidth = Mootor.init_client_width,
                clientHeight =  Mootor.init_client_height,
                thresholdX =  (clientHeight / 4) * 2.5,
                panelsX = 0,
                blankPanel,
                current = 0,
                divPanels = this.el,
                panels = divPanels.getElementsByClassName("panel"),
                panelCount = panels.length,

                // Create new panel
                create = function (options) {

                    var panel,
                        id = options.id;

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
                hideAll = function () {
                    for (; i < panelCount; i += 1) {
                        Fx.hide(panels[i]);
                    }
                },

                // Hide all panels
                showAll = function () {
                    for (; i < panelCount; i += 1) {
                        Fx.show(panels[i]);
                    }
                },

                // Reset panel width size 
                resetWidth = function (panel) {
                    panel.style.width = clientWidth + "px";
                },

                // Reset panel height size 
                resetHeight = function (panel) {
                    panel.style.height = clientHeight + "px";
                },

                // Reset panel left position 
                resetLeft = function (panel) {
                    panel.style.left = (clientWidth + 40) + "px";
                },

                // Reset panels container size and position
                resetContainer = function () {
                    divPanels.style.width = (clientWidth * 2) + "px";
                    divPanels.style.height = clientHeight + "px";
                },

                // Reset panel size and position
                resetPanel = function (panel) {

                    resetWidth(panel);
                    resetHeight(panel);

                    if (panel === blankPanel) {

                        // right
                        //panel.style.left = 0 + "px";              
                        // left
                        panel.style.left = clientWidth * 2 + 80 + "px";

                    } else {
                        panel.style.left = clientWidth + 40 + "px";
                    }
                },

                // Move screen horizontally 
                moveScreenH = function (e) {

                    var distance = e.distance,
                        distanceFromOrigin = e.distanceFromOrigin;

                     // New horizontal position                                          
                    panelsX = panelsX + distance;

                    if (distanceFromOrigin === undefined) {

                        // Large move
                        Fx.translateX(divPanels, panelsX, {transitionDuration: 0.5});

                    } else {

                        // Short move
                        Fx.translateX(divPanels, panelsX, {});

                    }
                },

                // Load panel
                load = function () {

                    var distance;

                    // Move panels
                    distance = (clientWidth + 40) * current;
                    distance = distance > 0 ? -distance : distance;
                    moveScreenH({
                        distance: distance - panelsX
                    });

                },

                // DragEnd event handler
                checkMove = function (distance) {

                    var maxdist = thresholdX,
                        is_momentum = false;

                    // If position reach certain threshold,
                    // load new panel. 
                    // Else, move panel back.

                    if (distance > maxdist && current < (panelCount - 1)) {

                        // Swipe to left

                        // Hide unreachable panels
                        if (current > 2) {
                            Fx.hide(panels[current - 2]);
                        }
                        if (current < panelCount - 2) {
                            Fx.show(panels[current + 2]);
                        }

                        current += 1;
                        is_momentum = true;

                    } else if (distance < (-maxdist) && current > 0) {

                        // Swipe to right

                        // Hide unreachable panels
                        if (current < panelCount - 2) {
                            Fx.hide(panels[current + 2]);
                        }
                        if (current > 2) {
                            Fx.show(panels[current - 2]);
                        }

                        current -= 1;
                        is_momentum = true;

                    }

                    if (is_momentum === false) {

                        // Bounce back
                        moveScreenH({
                            distance: distance
                        });

                    } else {

                        // Load panel
                        load();

                    }

                },

                // Reset panels
                resetAll = function () {

                    var panelstyle;

                    for (; i < panelCount; i += 1) {

                        panelstyle = panels[i].style;

                        // Reset styles
                        panelstyle.width = clientWidth + "px";
                        panelstyle.left =  i > 0 ? (clientWidth * i + (40 * i)) + "px" : (clientWidth * i) + "px";
                        if (clientHeight > panelstyle.height) {
                            panelstyle.height = clientHeight + "px";
                        }
                        panelstyle.overflow = 'hidden';

                        // Hide all but first two panels
                        if (i > 1) {
                            Fx.hide(panels[i]);
                        }
                    }

                    // Reset panels container
                    resetContainer();

                };

            /*
             *  Initialize panels
             */

            // Set document styles    
            document.body.style.overflow = "hidden";

            // Reset and hide all panels
            resetAll();

            // Custom events listeners
            Event.bind(document.body, "drag", moveScreenH);
            Event.bind(document.body, "dragEnd", checkMove);
            Event.bind(window, "orientationChange", resetAll);

        }
    };

    Mootor.extend(Mootor.Nav);

}(Mootor));
