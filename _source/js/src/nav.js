/*
 * Mootor Navigation
 */

(function (Moo, $) {
    "use strict";
    // Module dependencies
    var Fx = Moo.Fx,

        fullWidth,
        Panels;

    fullWidth = function (el) {
        el.style.width = Moo.view.clientW + "px";
    };

    Panels = function (options) {

        var i,
            panel,
            panels;

        this.el = options.el;
        this.navClass = options.nav_class !== undefined ? options.nav_class : "nav";
        this.panelClass = options.panel_class !== undefined ? options.panel_class : "panel";
        this.headerId = options.header_id !== undefined ? options.header_id : "header";
        this.hiddenClass = options.hidden_class !== undefined ? options.hidden_class : "hidden";
        this.margin = options.panel_margin !== undefined ? options.panel_margin : 40;
        this.width = options.width !== undefined ? options.width : Moo.view.clientW;
        this.height = options.height !== undefined ? options.height : Moo.view.clientH;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.panels = [];
        this.header = this.header.init(this);
        this.isMoving = false;

        panels = this.el.getElementsByClassName(this.panelClass);

        this.count = panels.length;

        for (i = panels.length; i--;) {
            this.panels[i] = {el: panels[i]};
            panel =  this.panels[i];
            panel.anchors = panel.el.getElementsByClassName(this.navClass);
            panel.hidden = panel.el.getElementsByClassName(this.hiddenClass);
        }

        $(this.el).onDragMove(this);
        $(this.el).onDragEnd(this);

        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        this.init();

        return this;

    };

    Panels.prototype = {

        handleGesture: function (gesture) {
            switch (gesture.type) {
            case "dragMove":
                this.move(gesture);
                break;
            case "dragEnd":
                this.check(gesture);
                break;
            }
        },

        header: {
            init: function (panel) {
                var header = {};
                header.el = document.getElementById(panel.headerId);
                if (header.el) {
                    panel.nav(header);
                    fullWidth(header.el);
                    panel.top = header.el.offsetHeight;
                    panel.height = Moo.view.clientH - panel.top;
                    panel.el.style.marginTop = panel.top + "px";
                    return header;
                }
            }
        },

        nav: function (obj) {
            obj.anchors = obj.el.getElementsByClassName(this.navClass);
        },

        init: function () {

            var anchorCallback,
                j,
                i,
                panels = this,
                panel,
                setActive,
                unsetActive;

            anchorCallback = function (gesture) {
                if (panels.isMoving === false) {
                    panels.set(gesture.el.rel);
                } else {
                    $(gesture.el).removeClass("active");
                }
                return false;
            };

            setActive = function (gesture) {
                $(gesture.el).setClass("active");
            };
            unsetActive = function (gesture) {
                $(gesture.el).removeClass("active");
            };

            // Reset styles and set anchor links
            for (i = this.count; i--;) {

                panel = this.panels[i];

                if (this.width === undefined) {
                    fullWidth(panel.el);
                } else {
                    panel.el.style.width = this.width + "px";
                }

                panel.el.style.overflow = 'hidden';

                if (i > 0) {
                    panel.el.style.left = -((this.width + this.margin) * 4) + "px";
                    panel.el.style.top = "0px";
                } else {
                    panel.el.style.left = "0px";
                }

                panel.height = panel.el.offsetHeight;
                if (this.height > panel.height) {
                    panel.el.style.height = this.height + "px";
                    panel.height = this.height;
                }

                for (j = panel.anchors.length; j--;) {
                    if (panel.anchors[j].rel !== "") {
                        $(panel.anchors[j]).onTapStart(setActive);
                        $(panel.anchors[j]).onTapEnd(unsetActive);
                        $(panel.anchors[j]).onTapEnd(anchorCallback);
                    }
                }
            }

            if (this.header) {
                for (i = this.header.anchors.length; i--;) {
                    if (this.header.anchors[i].rel !== "") {
                        $(this.header.anchors[i]).onTapEnd(anchorCallback);
                    }
                }
            }

        },

        /*      
         *      Move
         */
        move: function (gesture) {
            if (gesture.isDraggingY !== 0) {
                this.isMoving = true;
                this.y = this.y + (gesture.y - gesture.lastY);
                this.translate({
                    el: this.panels[this.current].el,
                    y: this.y
                });
            }

        },

        /*      
         *      Check move
         */
        check: function (gesture) {
            var panel = this.panels[this.current],
                maxdist = panel.height - this.height;

            if (gesture.isDraggingY !== 0) {

                this.isMoving = false;
                // Bounce back
                if (this.y >= 0 || maxdist < -this.y) {
                    if (this.y > 0) {
                        this.y = 0;
                    } else {
                        this.y = -(panel.height - this.height);
                    }
                    this.translate({
                        y: this.y,
                        el: panel.el,
                        duration: 0.5
                    });
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
                if (this.panels[i].el.id === pid) {
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
         *      Translate panels
         */
        translate: function (options) {
            if (options.duration === undefined) {
                options.duration = 0;
            }
            if (options.callback === undefined) {
                options.callback = function () {};
            }
            if (options.y === undefined) {
                options.y = 0;
            }
            if (options.x === undefined) {
                options.x = 0;
            }
            if (options.duration === undefined) {
                options.duration = 0;
            }
            Fx.translate(
                options.el,
                {y: options.y, x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
        },

        /*      
         *      Load current panel
         */
        load: function () {

            var distance,
                panel,
                cb,
                back,
                i,
                translate = this.translate;

            panel = this.panels[this.current];
            back = this.panels[this.back];

            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).hide();
            }
            for (i = back.hidden.length; i--;) {
                $(back.hidden[i]).hide();
            }

            cb = function () {
                for (i = panel.hidden.length; i--;) {
                    $(panel.hidden[i]).show();
                }
                translate({
                    el: back.el
                });

            };

            if (this.current === 0) {
                // Left 
                distance = 0;
                if (this.back) {
                    back.el.style.left =  this.width + this.margin + "px";
                }

            } else {
                // Right
                distance = this.width + this.margin;
                panel.el.style.left = distance + "px";

                if (this.back && this.back !== this.current) {
                    back.el.style.left = -distance * 4 + "px";
                }

            }

            this.translate({
                el: this.el,
                duration: 0.5,
                x: -distance - this.x,
                callback: cb
            });
        }

    };


     /*
      *     Public
      */
    Moo.Nav = {

        panels: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Panels(options);
        }

    };

    Moo.extend(Moo.Nav);

}(Moo, $));
