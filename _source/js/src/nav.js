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
                current = 0,
                divPanels = this.el,
                panels = divPanels.getElementsByClassName("panel"),
                panelCount = panels.length,

                // Reset panels container size and position
                resetContainer = function () {
                    divPanels.style.width = (clientWidth * 2) + "px";
                    divPanels.style.height = clientHeight + "px";
                },

                // Move screen horizontally 
                moveScreenH = function (e) {

                    var distance = e.distance,
                        distanceFromOrigin = e.distanceFromOrigin;

                     // New horizontal position                                          
                    panelsX = panelsX + distance;

                    if (distanceFromOrigin === undefined) {

                        // Large move
                        if (distance > 700 || distance < -700) {
                            Fx.translateX(divPanels, panelsX, {transitionDuration: 0.5});
                        } else {
                            Fx.translateX(divPanels, panelsX, {transitionDuration: 0.2});
                        }

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
                        /*if (current > 2) {
                            Fx.hide(panels[current - 2]);
                        }
                        if (current < panelCount - 2) {
                            Fx.show(panels[current + 2]);
                        }*/

                        current += 1;
                        is_momentum = true;

                    } else if (distance < (-maxdist) && current > 0) {

                        // Swipe to right

                        // Hide unreachable panels
                        /*if (current < panelCount - 2) {
                            Fx.hide(panels[current + 2]);
                        }
                        if (current > 2) {
                            Fx.show(panels[current - 2]);
                        }*/

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

                    onAnchorClick = function (pid) {
                        return function () {
                            setCurrent(pid);
                            return false;
                        };
                    };

                    for (i = panelCount; i--;) {

                        pstyle = panels[i].style;

                        // Reset styles
                        pstyle.width = clientWidth + "px";
                        pstyle.left =  i > 0 ? (clientWidth * i + (40 * i)) + "px" : (clientWidth * i) + "px";
                        if (clientHeight > pstyle.height) {
                            pstyle.height = clientHeight + "px";
                        }
                        pstyle.overflow = 'hidden';

                        // FIXME CHECK: expensive query (getElementsByTagName)
                        panchors = panels[i].getElementsByTagName('a');

                        for (j = panchors.length; j--;) {
                            if (panchors[j].rel !== "") {
                                pid = panchors[j].rel;
                                panchors[j].ontouchstart = onAnchorClick(pid);
                                panchors[j].onclick = onAnchorClick(pid);
                            }
                        }

                        // Hide all but first two panels
                        /*if (i > 1) {
                            Fx.hide(panels[i]);
                        }*/

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
