/*
 * Mootor Navigation (coded by emi420@gmail.com)
 */

 /*      FIXME:
  *          - After onDrag, onTap stop working
  *          - After onDragMove X, onDragMove Y stop working and vice-versa
  *          - Optimize me & micro-optimize
  */

(function (Mootor) {

    "use strict";

    /*
     *      Module dependencies
     */

    var Fx = Mootor.Fx,
        Event = Mootor.Event,

    Panels = function (element) {

        this.el = element;
        this.panels = element.getElementsByClassName("panel");
        this.panelsCount = this.panels.length;
        this.clientHeight = Mootor.init_client_height;
        this.clientWidth = Mootor.init_client_width;
        this.panelsX = 0;
        this.panelsY = 0;
        this.current = 0;
        this.thresholdX = this.clientWidth / 2;

        //  Initialize panels

        // Set document styles    
        document.body.style.overflow = "hidden";

        // Reset and hide all panels
        this.resetAll();

        // Prevent default actions
        this.el.onclick = function () { return false; };

        // Set event handlers
        this.onDragStart = this.startMove;
        this.onDragMove = this.move;
        this.onDragEnd = this.checkMove;

        // Event.bind(window, "orientationChange", resetAll);

        // Bind event listeners
        Event.bind(this.el, "onDragStart", this);
        Event.bind(this.el, "onDragEnd", this);
        Event.bind(this.el, "onDragMove", this);

    };

    Panels.prototype = {

        // Reset size, styles and link anchors to panels
        resetAll: function () {

            var pstyle,
                panchors,
                onAnchorTouch,
                j,
                i,
                listeners = Mootor.Event.listeners,
                instance = this;

            // Set anchor links
            onAnchorTouch = function () {
                
                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    instance.setCurrent(this.rel);
                }
                return false;

            };


            for (i = this.panelsCount; i--;) {

                pstyle = this.panels[i].style;

                // Reset styles

                pstyle.width = this.clientWidth + "px";
                pstyle.left =  i > 0 ? (this.clientWidth * i + (40 * i)) + "px" : (this.clientWidth * i) + "px";
                if (this.clientHeight > this.panels[i].offsetHeight) {
                    pstyle.height = this.clientHeight + "px";
                }
                pstyle.overflow = 'hidden';

                // FIXME CHECK: expensive query (getElementsByTagName)
                panchors = this.panels[i].getElementsByTagName('a');

                for (j = panchors.length; j--;) {
                    if (panchors[j].rel !== "") {
                        Event.bind(panchors[j], "onTap", onAnchorTouch);
                    }
                }

            }
        },

        // Start move
        startMove: function (e) {

            // Do something on start move
            //console.log(e);

        },

        // Move
        move: function (e) {

            var distanceX = e.distanceX,
                distanceY = e.distanceY,
                distanceFromOriginY = e.distanceFromOriginY,
                distanceFromOriginX = e.distanceFromOriginX,
                listeners = Mootor.Event.listeners;
                
            // New horizontal position                         
            if (distanceX) {
                this.panelsX = this.panelsX + distanceX;
            }
            if (distanceY) {
                this.panelsY = this.panelsY + distanceY;
            }

            if (listeners.isDraggingY === false) {

                if (distanceFromOriginX === undefined) {

                    // Large X move
                    if (distanceX > 700 || distanceX < -700) {
                        Fx.translate(this.el, {x: this.panelsX}, {transitionDuration: 0.5});
                    } else {
                        Fx.translate(this.el, {x: this.panelsX}, {transitionDuration: 0.2});
                    }

                } else if (listeners.isDraggingX === true) {

                    // Short X move
                    Fx.translate(this.el, {x: this.panelsX}, {});

                }

            } else if (listeners.isDraggingY === true) {
            
                // Short Y move                        
                if (distanceFromOriginY === undefined) {
                    Fx.translate(this.el, {y: this.panelsY}, {transitionDuration: 0.5});
                } else {
                    Fx.translate(this.el, {y: this.panelsY}, {});
                }
            }

        },

        // Check move to take actions
        checkMove: function (e) {
       
            var maxdist = this.thresholdX,
                is_momentum = false,
                listeners = Mootor.Event.listeners;
                
            // If position reach certain threshold,
            // load new panel. 
            // Else, move panel back.
            
            if (e.distanceFromOriginX > maxdist && this.current < (this.panelsCount - 1)) {

                // Move to left

                this.current += 1;
                is_momentum = true;

            } else if (e.distanceFromOriginX < (-maxdist) && this.current > 0) {

                // Move to right

                this.current -= 1;
                is_momentum = true;

            }
            
            console.log(listeners.isDraggingY);

            if (is_momentum === false) {

                if (listeners.isDraggingX === true) {

                    // Bounce back
                    this.move({
                        distanceX: e.distanceFromOriginX
                    });

                } else if (listeners.isDraggingY === true) {
                    
                    // FIXME: check this bounce
                    if (this.panelsY > 0) {

                        // Bounce back
                        this.move({
                            distanceY: -this.panelsY
                        });

                    } else {

                        // FIXME CHECK: 
                        //  optimize me
                        //  expensive query
                        maxdist = this.el.getElementsByClassName('panel')[this.current].offsetHeight - this.clientHeight;

                        if (this.panelsY < -maxdist) {
                            // Bounce back
                            this.move({
                                distanceY: -this.panelsY - maxdist
                            });
                        }

                    }

                }

            } else {
            
                // Load current panel
                this.load();

            }

        },

        setCurrent: function (pid) {

            var i;
            
            for (i = this.panelsCount; i--;) {
                if (this.panels[i].id === pid) {
                    this.current = i;
                    Fx.show(this.panels[i]);
                    this.load();
                }
            }

        },

        load: function () {

            var distance;
            
            // Move panels
            distance = (this.clientWidth + 40) * this.current;
            distance = distance > 0 ? -distance : distance;

            this.move({
                distanceX: distance - this.panelsX
            });

        }

    }

     /*
      *     Public
      */
    Mootor.Nav = {

        panels: function () {
            return new Panels(this.el);
        }

    };

    Mootor.extend(Mootor.Nav);

}(Mootor));

