/*
 * Mootor Navigation
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

        var i;

        this.el = element;

        // Add blank panel to load content
        this.create({
            id: "blank"
        });

        // FIXME CHECK: expensive query
        this.panels = element.getElementsByClassName("panel");
        

        this.panelsCount = this.panels.length;
        this.blank = this.panels[this.panelsCount-1];
        this.panelsX = 0;
        this.panelsY = 0;
        this.current = 0;
        this.back = 0;

        for (i = this.panelsCount; i--;) {
            // FIXME CHECK: expensive query
            this.panels[i].anchors = this.panels[i].getElementsByTagName('a');
            this.panels[i].panelHeight = this.panels[i].offsetHeight;
        }

        // Client viewport sizes
        this.clientHeight = Mootor.core.init_client_height;
        this.clientWidth = Mootor.core.init_client_width;

        // Threshold for change panels
        this.thresholdX = this.clientWidth / 2;

        // Set document styles    
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        // Reset and hide all panels
        this.resetAll();

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
                onAnchorTouch,
                j,
                i,
                panels = this,
                panel;

            // Callback for anchor links
            onAnchorTouch = function () {
                console.log("anchor touch!");
                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.setCurrent(this.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.panelsCount; i--;) {
            
                panel = this.panels[i];
                
                // Reset styles
                panel.style.width = this.clientWidth + "px";
                panel.style.overflow = 'hidden';
                
                if (panel.id === "blank") {
                    // Positioning blank panel
                    panel.style.left =  this.clientWidth + 40 + "px";
                } else {
                    // Positioning panels and hide all but first
                    panel.style.left =  i > 0 ? (this.clientWidth * i + (40 * i)) + "px" : (this.clientWidth * i) + "px";
                    Fx.hide(panel);
                }
                                
                // Adjust panel height to viewport
                if (this.clientHeight > panel.panelHeight) {
                    panel.style.height = this.clientHeight + "px";
                }

                // Set anchor links
                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        console.log("binding " + panel.anchors[j].rel);
                        Event.bind(panel.anchors[j], "onTap", onAnchorTouch);
                    }
                }

            }
            
            // Show first panel
            Fx.show(this.panels[0]);
            Fx.show(this.blank);

        },
        
        /*
         *      Create new panel
         */
        create: function(options) {
        
            var div;
            
            div = document.createElement("div");
            div.id = options.id;
            div.className = "panel";
            this.el.appendChild(div);
            
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

            e.moveDuration = 0.5;

            if (listeners.isDraggingX === true || e.isLoading === true) {

                // Dragging X
                this.panelsX = this.panelsX + e.distanceX;

            } else if (listeners.isDraggingY === true) {

                 // Dragging Y
                this.panelsY = this.panelsY + e.distanceY;

            }

            if ((listeners.isDraggingX || listeners.isDraggingY) && !e.largeMove) {
                // If dragging, move fast
                e.moveDuration = 0;
            }

            if (e.bounceBack === true) {

                // Bouce back
                this.panelsX = (this.clientWidth + 40) * this.current;
                this.panelsX = this.panelsX > 0 ? -this.panelsX : this.panelsX;

                if (this.panelsY !== 0) {
                    if (e.distanceFromOriginY < 0) {
                        this.panelsY = 0;
                    } else {
                        // FIXME CHECK: expensive query
                        this.panelsY = -(this.panels[this.current].panelHeight - this.clientHeight);
                    }
                }

                e.bounceBack = false;

                // Move slow
                e.moveDuration = 0.5;

            }

            // Move
            if (!e.callback) {
                Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {transitionDuration: e.moveDuration});
            } else {
                Fx.translate(this.el, {x: this.panelsX, y: this.panelsY}, {transitionDuration: e.moveDuration, callback: e.callback});
            }

        },

        /*      
         *      Check move for change panels or bounce back
         */
        checkMove: function (e) {

            var maxdist = this.thresholdX,
                is_momentum = false,
                bouncedist;

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
                    // FIXME CHECK: expensive query
                    bouncedist = this.clientHeight - this.panels[this.current].panelHeight;
                    if (bouncedist > this.panelsY || this.panelsY >= 0) {
                        e.largeMove = true;
                        e.bounceBack = true;
                        this.move(e);
                    }

                }
            }

        },

        /*      
         *      Set current panel
         */
        setCurrent: function (pid) {

            var i;

            // Get panel by id and load it
            for (i = this.panelsCount; i--;) {
                if (this.panels[i].id === pid) {
                    if (this.current > 0) {
                        this.back = this.current;
                    }
                    this.current = i;
                    this.panelsY = 0;
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
            
            if (this.current === 0) {
                // Left 
                distance = 0;
            } else {
                // Right
                console.log(this.back);
                if (this.back) {
                    Fx.hide(this.panels[this.back]);
                }
                distance = this.clientWidth + 40;
                this.panels[this.current].style.left = distance + "px";
                Fx.show(this.panels[this.current]);    
                Fx.hide(this.blank);
            }

           // Move panels
            this.move({
                distanceX: -distance - this.panelsX,
                largeMove: true,
                isLoading: true
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

