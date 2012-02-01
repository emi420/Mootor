/*
 * Mootor Navigation
 */

(function (Moo) {
    /*
     *      Module dependencies
     */
    var Fx = Moo.Fx,
        Event = Moo.Event,
        listeners = Event.listeners,

        Panels;

    /*
     *      Panels
     */
    Panels = function (options) {

        var i,
            panel;

        this.el = options.el;
        this.panelClass = options.panel_class;
        this.navClass = options.nav_class;
        this.panels = this.el.getElementsByClassName(this.panelClass);
        this.count = this.panels.length;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;

        for (i = this.count; i--;) {
            // FIXME CHECK: expensive query
            panel = this.panels[i];
            panel.anchors = panel.getElementsByClassName(this.navClass);
            panel.height = panel.offsetHeight;
        }

        // Client viewport sizes
        this.height = Moo.view.clientH;
        this.width = Moo.view.clientW;

        // Threshold for change panels
        this.thresholdX = this.width / 2;

        // Set document styles    
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        // Header
        this.header = document.getElementById(options.header_id);
        if (this.header !== undefined) {
            this.init(this.header);
            this.top = this.header.offsetHeight;
            this.height = Moo.view.clientH - this.top;
            this.el.style.marginTop = this.top + "px";
        }

        // Reset and hide all panels
        this.reset();

        // Set event handlers
        this.onDragStart = this.startMove;
        this.onDragMove = this.move;
        this.onDragEnd = this.check;

        // Bind events
        Event.bind(this.el, "onDrag", this);

    };

    Panels.prototype = {
    
        init: function(el) {
            el.style.width = Moo.view.clientW + "px";
            el.anchors = el.getElementsByClassName(this.navClass);
        },
        
        /*      
         *      Reset all panels
         */
        reset: function () {

            var onTouch,
                j,
                i,
                panels = this,
                panel;

            // Callback for anchor links
            onTouch = function (e) {

                // Prevent defaults on certain elements
                // FIXME CHECK: this is a temporary patch
                if (e.target.type !== "text" && e.target.type !== "input") {
                    // Prevent default listeners
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                }

                if (listeners.isDraggingX === false && listeners.isDraggingY === false) {
                    panels.set(this.rel);
                }
                return false;
            };

            // Reset styles and set anchor links
            for (i = this.count; i--;) {

                panel = this.panels[i];

                // Reset styles
                panel.style.width = this.width + "px";
                panel.style.overflow = 'hidden';

                // Positioning panels to hide all but first
                if (i > 0) {
                    panel.style.left = ((this.width + 40) * 4) + "px";
                    panel.style.top = "0px";
                } else {
                    panel.style.left = "0px";
                }

                // Adjust panel height to viewport
                if (this.height > panel.height) {
                    panel.style.height = this.height + "px";
                }

                // Set anchor links
                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        Event.bind(panel.anchors[j], "onTap", onTouch);
                    }
                }

            }

            // Header links
            if (this.header) {
                for (i = this.header.anchors.length; i--;) {
                    if (this.header.anchors[i].rel !== "") {
                        Event.bind(this.header.anchors[i], "onTap", onTouch);
                    }
                }
            }
            
            console.log(this);

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

            // FIXME CHECK: optimize me

            var current = {},
                tDuration = 0.5,
                element = this.el,
                panel =  this.panels[this.current],
                positions = {};

            if ((listeners.isDraggingX === true  && e.largeMove) || e.isLoading === true) {

                // Dragging X
                this.x = this.x + e.distanceX;

            } else if (listeners.isDraggingY === true) {

                 // Dragging Y
                this.y = this.y + e.distanceY;

                // Move current panel, not container
                element = panel;

            }

            if ((listeners.isDraggingX || listeners.isDraggingY) && !e.largeMove) {
                // If dragging, move fast
                tDuration = 0;
            }

            if (e.bounceBack === true) {

                // Bouce back
                if (this.current > 0) {
                    this.x = (this.width + 40);
                    this.x = this.x > 0 ? -this.x : this.x;
                } else {
                    this.x = 0;
                }

                if (this.y !== 0) {

                    // Move current panel, not container
                    element = panel;

                    if (e.distanceOriginY < 0) {

                        this.y = 0;

                    } else {

                        current = {
                            // FIXME CHECK: expensive query
                            height: panel.offsetHeight
                        };

                        if (current.height >= this.height) {
                            this.y = -(current.height - this.height);
                        }

                    }

                }

                e.bounceBack = false;

                // Move slow
                tDuration = 0.5;

            }

            if (element === panel) {
                // If moving current panel, move on Y axis only
                positions.x = 0;
                positions.y = this.y;
            } else {
                // If moving panels container panel, move on X axis only
                positions.x = this.x;
                positions.y = 0;
            }

            // Move
            if (!e.callback) {
                Fx.translate(element, positions, {transitionDuration: tDuration});
            } else {
                Fx.translate(element, positions, {transitionDuration: tDuration, callback: e.callback});
            }

        },

        /*      
         *      Check move for change panels or bounce back
         */
        check: function (e) {

            var maxdist = this.thresholdX,
                is_momentum = false,
                bouncedist,
                tmpback,
                boostdist;

            // If position reach certain threshold, load new panel,
            // else, move panel back.

            // Check isDragging flags
            if ((listeners.isDraggingX && this.y === 0) || listeners.isDraggingY) {

                // Velocity boost movement
                if (e.velocity.y !== 0) {
                    boostdist = e.velocity.y;
                    e.velocity.y = 0;
                    this.move({
                        distanceY: boostdist * 10,
                        largeMove: true,
                        isLoading: false,
                        callback: this.check(e)
                    });
                }

                if (e.distanceOriginX > maxdist && this.current < (this.count - 1)) {

                    // Move to left
                    if (this.current === 0) {
                        tmpback = this.back;
                        this.back = this.current;
                        this.current = tmpback;
                        is_momentum = true;
                    }

                } else if (e.distanceOriginX < (-maxdist) && this.current > 0) {

                    // Move to right
                    this.back = this.current;
                    this.current = 0;
                    is_momentum = true;

                }

                if (is_momentum === true) {

                    // Load current panel
                    this.load();

                } else {

                    // Bounce back
                    // FIXME CHECK: expensive query
                    bouncedist = this.height - this.panels[this.current].height;

                    if (this.y >= 0 || this.panels[this.current].offsetHeight -  this.height < -this.y) {
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
        set: function (pid) {

            var i;

            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.panels[i].id === pid) {
                    if (this.current > 0) {
                        this.back = this.current;
                    }
                    this.current = i;
                    this.y = 0;
                    this.load();
                }
            }

        },

        /*      
         *      Load current panel
         */
        load: function () {

            var distance,
                panel,
                cb,
                back,
                hidden_tmp,
                hidden = [],
                i,
                clearTransform;

            // FIXME CHECK: temporary code to clean transitions
            clearTransform = function (el) {
                el.style.webkitTransitionDuration = "";
                el.style.webkitTransitionTimingFunction = "";
                el.style.webkitTransitionTransitionDelay = "";
            };

            panel = this.panels[this.current];
            back = this.panels[this.back];

            clearTransform(panel);
            clearTransform(back);

            // Hide sensible elements while move
            // FIXME CHECK: expensive query
            hidden_tmp = panel.getElementsByClassName("hidden");
            hidden.push(Array.prototype.slice.call(hidden_tmp, 0)[0]);

            hidden_tmp = back.getElementsByClassName("hidden");
            hidden.push(Array.prototype.slice.call(hidden_tmp, 0)[0]);

            for (i = hidden.length; i--;) {
                if (hidden[i]) {
                    Fx.hide(hidden[i]);
                }
            }

            cb = function () {
                for (i = hidden.length; i--;) {
                    Fx.show(hidden[i]);
                }
            };

            // Calc movement

            if (this.current === 0) {

                // Left 
                distance = 0;
                if (this.back) {
                    back.style.left =  this.width + 40 + "px";
                }

            } else {

                // Right
                distance = this.width + 40;
                panel.style.left = distance + "px";

                if (this.back && this.back !== this.current) {
                    back.style.left = distance * 4 + "px";
                }

            }

            // Move panels
            this.move({
                distanceX: -distance - this.x,
                largeMove: true,
                isLoading: true,
                callback: cb
            });


        }

    };

     /*
      *     Public
      */
    Moo.Nav = {

        /*          
         *      Panels navigation
         *      Usage: $("#panels").panels();
         */
        panels: function (options) {
            if (typeof options !== "object") {
                options = {
                    header_id: "header",
                    panel_class: "panel",
                    nav_class: "nav"                    
                };
            }
            options.el = this.el;
            return new Panels(options);
        }

    };

    Moo.extend(Moo.Nav);

}($));
