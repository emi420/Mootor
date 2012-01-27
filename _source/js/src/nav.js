/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

 /*      FIXME:
  *          - Optimize me & micro-optimize
  *          - Dont bounce back when are panel height > client height
  *          - Bounce back is buggy
  */

(function (Mootor) {

    "use strict";

    /*
     *      Module dependencies
     */
    var Fx = Mootor.Fx,
        Event = Mootor.Event,
        listeners = Event.listeners,
        Panels;

    /*
     *      Panels
     */
    Panels = function (element) {

        // Panels instance properties
        this.el = element;
        this.panels = element.getElementsByClassName("panel");
        this.panelsCount = this.panels.length;
        this.panelsX = 0;
        this.panelsY = 0;
        this.current = 0;

        // Client viewport sizes
        this.clientHeight = Mootor.init_client_height;
        this.clientWidth = Mootor.init_client_width;

        // Threshold for change panels
        this.thresholdX = this.clientWidth / 2;

        // Set document styles    
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        // Reset and hide all panels
        this.resetAll();

        // Prevent default actions
        this.el.onclick = function () { return false; };

        // Set event handlers
        this.onDragStart = this.startMove;
        this.onDragMove = this.move;
        this.onDragEnd = this.checkMove;

        // Bind events
        Event.bind(this.el, "onDrag", this);

    };

    Panels.prototype = {

        /*      
         *      Reset all panels
         */
        resetAll: function () {

            var styles,
                anchors,
                onAnchorTouch,
                j,
                i,
                panels = this;

            // Callback for anchor links
            onAnchorTouch = function () {
                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.setCurrent(this.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.panelsCount; i--;) {

                // Reset styles
                styles = this.panels[i].style;
                styles.width = this.clientWidth + "px";
                styles.left =  i > 0 ? (this.clientWidth * i + (40 * i)) + "px" : (this.clientWidth * i) + "px";
                styles.overflow = 'hidden';

                // Adjust panel height to viewport
                if (this.clientHeight > this.panels[i].offsetHeight) {
                    styles.height = this.clientHeight + "px";
                }

                // Set anchor links

                // FIXME CHECK: expensive query
                anchors = this.panels[i].getElementsByTagName('a');

                for (j = anchors.length; j--;) {
                    if (anchors[j].rel !== "") {
                        Event.bind(anchors[j], "onTap", onAnchorTouch);
                    }
                }

            }
        },

        /*      
         *      Start move
         */
        startMove: function (e) {

            // Do something on start move

        },

        /*      
         *      Move
         */
        move: function (e) {

            var distanceX = e.distanceX,
                distanceY = e.distanceY;

            // If dragging X, changing panels, move or bouncing back
            if (listeners.isDraggingX === true || (!e.distanceY && e.largeMove === true)) {

                if (distanceX && !e.bounceBack) {

                    // Dragging, move or changing panels
                    this.panelsX = this.panelsX + distanceX;

                } else if (e.bounceBack === true) {

                    // Boucing back
                    this.panelsX = (this.clientWidth + 40) * this.current;
                    this.panelsX = this.panelsX > 0 ? -this.panelsX : this.panelsX;
                    e.bounceBack = false;

                }

                // If large move, move slow, else move fast
                if (e.largeMove === true) {

                    // Large X moves
                    if (distanceX > this.thresholdX || distanceX < -this.thresholdX) {
                        // Move slow
                        Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {transitionDuration: 0.2});
                    } else {
                        // Move slowest
                        Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {transitionDuration: 0.5});
                    }

                } else if (listeners.isDraggingX === true) {

                    // Short X move, move fast
                    Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {});

                }

            // If dragging Y, move or bouncing back
            } else if (listeners.isDraggingY === true) {

                if (distanceY && !e.bounceBack && !e.largeMove) {

                    // Move
                    this.panelsY = this.panelsY + distanceY;

                } else if (e.bounceBack === true || e.largeMove === true) {

                    // Bounce back
                    this.panelsY += e.distanceFromOriginY - (e.distanceFromOriginY + this.panelsY);
                    e.bounceBack = false;

                }

                if (e.largeMove === true) {

                    // Large Y move, move slow
                    Fx.translate(this.el, {y: this.panelsY, x: this.panelsX}, {transitionDuration: 0.5});

                } else {

                    // Short Y move, move fast
                    Fx.translate(this.el, {y: this.panelsY, x: this.panelsX}, {});

                }
            }

        },

        /*      
         *      Check move for change panels or bounce back
         */
        checkMove: function (e) {

            var maxdist = this.thresholdX,
                is_momentum = false;

            // If position reach certain threshold, load new panel,
            // else, move panel back.

            // Check isDragging flags
            if (listeners.isDraggingX || listeners.isDraggingY) {

                if (e.distanceFromOriginX > maxdist && this.current < (this.panelsCount - 1)) {

                    // Move to left
                    this.current += 1;
                    is_momentum = true;

                } else if (e.distanceFromOriginX < (-maxdist) && this.current > 0) {

                    // Move to right
                    this.current -= 1;
                    is_momentum = true;

                }

                if (is_momentum === true) {

                    // Load current panel
                    this.load();

                } else {

                    // Bounce back
                    e.distanceX =  e.startX;
                    e.largeMove = true;
                    e.bounceBack = true;
                    this.move(e);

                }
            }

        },

        /*      
         *      Set current panel
         */
        setCurrent: function (pid) {

            var i;

            // Get panel by pid and load it
            for (i = this.panelsCount; i--;) {
                if (this.panels[i].id === pid) {

                    this.current = i;
                    this.load();

                }
            }

        },

        /*      
         *      Load current panel
         */
        load: function () {

            var distance;

            // Calc movement
            distance = (this.clientWidth + 40) * this.current;
            distance = distance > 0 ? -distance : distance;

            // Move panels
            this.move({
                distanceX: distance - this.panelsX,
                largeMove: true
            });

        }

    };

     /*
      *     Public
      */
    Mootor.Nav = {

        /*          
         *      Panels navigation
         *      Usage: $("#panels").panels();
         */
        panels: function () {
            return new Panels(this.el);
        }

    };

    Mootor.extend(Mootor.Nav);

}(Mootor));

