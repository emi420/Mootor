/*
 * Mootor Navigation
 */

(function ($) {
    "use strict";

    var fullWidth,
        Panels;

    fullWidth = function (el) {
        el.style.width = $.view.clientW + "px";
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
        this.margin = options.panel_margin !== undefined ? options.panel_margin : 5;
        this.width = options.width !== undefined ? options.width : $.view.clientW;
        this.height = options.height !== undefined ? options.height : $.view.clientH;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.panels = [];
        this.header = this.header.init(this);
        this.isMoving = false;
        this.direction = 0;
        this.history = [];

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
                    panel.height = $.view.clientH - panel.top;
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
                headerAnchor,
                goBack,
                clickcb;

            anchorCallback = function (gesture) {
                panels.direction = 0;
                $(gesture.el).removeClass("active");
                if (panels.isMoving === false) {
                    panels.set(gesture.el.rel);
                }
                return false;
            };

            clickcb = function () {
                return false;
            };

            setActive = function (gesture) {
                $(gesture.el).setClass("active");
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
                        panel.anchors[j].onclick = clickcb;
                        $(panel.anchors[j]).onTapEnd(anchorCallback);
                    }
                }
            }

            if (this.header) {
                goBack = function () {
                    panels.goBack();
                };
                for (i = this.header.anchors.length; i--;) {
                    headerAnchor =  this.header.anchors[i];
                    if (headerAnchor.rel === "back") {
                        $(headerAnchor).onTapEnd(goBack);
                        headerAnchor.onclick = clickcb;
                    }
                }
            }

            return this;

        },

        /*      
         *      Move
         */
        move: function (gesture) {
            var panel =  this.panels[this.current];
            if (gesture.isDraggingY !== 0 && panel.movable !== false) {
                this.isMoving = true;
                this.y = this.y + (gesture.y - gesture.lastY);
                this.translate({
                    el: panel.el,
                    y: this.y
                });
            }

        },

        /*      
         *      Check move
         */
        check: function (gesture) {
            var panel = this.panels[this.current],
                maxdist = panel.height - this.height,
                cb,
                i;

            cb = function () {
                $.Fx.clean(panel.el);
            };
            if (gesture.isDraggingY !== 0) {

                this.isMoving = false;
                // Bounce back
                if (this.y >= 0 || maxdist < -this.y) {
                    if (this.y > 0) {
                        this.y = 0;
                    } else {
                        this.y = -(panel.height - this.height);
                    }
                    for (i = panel.anchors.length; i--;) {
                        $(panel.anchors[i]).removeClass("active");
                    }
                    this.translate({
                        y: this.y,
                        el: panel.el,
                        duration: 0.5,
                        callback: cb
                    });
                }

            }

        },

        /*      
         *      Set current panel
         */
        set: function (panelid) {

            var i;

            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.panels[i].el.id === panelid) {
                    this.back = this.current;
                    if (this.direction === 0) {
                        this.get(panelid);
                        this.history.push(this.current);
                    }
                    this.current = i;
                    this.load();
                }
            }

        },

        /*
         *      Get by id
         */
        get: function (id) {
            var i;
            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.panels[i].el.id === id) {
                    return this.panels[i];
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
            $.Fx.translate(
                options.el,
                {y: options.y, x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
        },

        hide: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).hide();
            }
        },

        show: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).show();
            }
        },
        /*      
         *      Load current panel
         */
        load: function () {

            var panel,
                cb,
                back,
                show = this.show,
                translate = this.translate,
                positionX,
                container = this.el;

            panel = this.panels[this.current];
            back = this.panels[this.back];

            this.hide(panel);
            this.hide(back);
            $(panel.el).show();

            cb = function () {
                show(panel);
                $(back.el).hide();
            };

            positionX = this.width + this.margin;

            if (this.current !== 0) {
                if (this.back === 0) {
                    panel.el.style.left = positionX + "px";
                } else {
                    translate({el: container});
                    back.el.style.left = "0px";
                    if (this.direction !== 0) {
                        positionX = -positionX;
                    }
                    panel.el.style.left = positionX + "px";
                }
            } else if (this.back !== 0) {
                translate({el: container, x: -positionX});
                back.el.style.left = positionX + "px";
                panel.el.style.left = "0px";
                positionX = 0;
            }

            if (this.side === 1) {
                this.side = 0;
            } else {
                this.side = 1;
            }

            window.setTimeout(function () {
                translate({
                    el: container,
                    duration: 0.5,
                    x: -positionX,
                    callback: cb
                });
            }, 10);
        },

        goBack: function () {
            if (this.history.length > 0) {
                this.direction = -1;
                this.back = this.history.pop();
                this.set(this.panels[this.back].el.id);
            }
        },

        config: function (options) {
            var panel;
            if (options.panel !== undefined) {
                panel = this.get(options.panel);
                if (options.movable !== undefined) {
                    panel.movable = options.movable;
                }
            }
        }

    };


     /*
      *     Public
      */
    $.Nav = {
        nav: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Panels(options);
        }
    };

    $.extend($.Nav);

}($));
