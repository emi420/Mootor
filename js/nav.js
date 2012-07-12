/**
 * @summary Mootor Navigation
 */

(function ($) {

    "use strict";
    
	/*
	 * Hide all while loading, show when ready
	 */
	$.view.hide();	
	$(document).ready(function() {
		$.view.show();
	});

    var Nav,
     
     /**
     * Navigation
     */
    Nav = function (options) {

        var i,
            j,
            anchors,
            anchor,
            /**
             * Navigation item
             */
            item = {
                anchors: [],
                el: undefined,
                height: 0,
                x: 0,
                y: 0,
                hidden: []
            },
            nav;

        this.el = options.el;
        this.navClass = options.nav_class !== undefined ? options.nav_class : "moo-nav";
        this.itemClass = options.item_class !== undefined ? options.item_class : "moo-panel";
        this.headerId = options.header_id !== undefined ? options.header_id : "header";
        this.footerId = options.footer_id !== undefined ? options.footer_id : "footer";
        this.hiddenClass = options.hidden_class !== undefined ? options.hidden_class : "moo-hidden";
        this.margin = options.item_margin !== undefined ? options.item_margin : 5;
        this.width = options.width !== undefined ? options.width : $.view.clientW;
        this.height = options.height !== undefined ? options.height : $.view.clientH;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.items = [];
        this.isMoving = false;
        this.direction = 0;
        this.history = [];

        nav = this.el.getElementsByClassName(this.itemClass);

        this.count = nav.length;
        
        // Anchor links
        for (i = nav.length; i--;) {
            this.items[i] = {el: nav[i]};
            item = this.items[i];
            item.x = 0;
            item.y = 0;
            
            // External links
            anchors = item.el.getElementsByTagName("a");
            for (j = anchors.length; j--;) {
                anchor = anchors[j];
                if ($(anchor).hasClass(this.navClass) === false) {
                    $(anchor).onTapEnd( function(gesture) {
                        window.location = gesture.el.href;
                    });
                }
            }
            item.anchors = item.el.getElementsByClassName(this.navClass);
            item.hidden = item.el.getElementsByClassName(this.hiddenClass);
        }
        
        $(this.el).onDragMove(this);
        $(this.el).onDragEnd(this);

        this.footer = this.footer.init(this);
        this.header = this.header.init(this);

        this.init();

        return this;

    };

    Nav.prototype = {

        /**
         * Gesture handler
         */
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

        /**
         * Initialize header
         */
        header: {
            init: function (panels) {
                var header = {},
                    i;
                header.el = document.getElementById(panels.headerId);
                header.height = header.el.offsetHeight;
                if (header.el) {
                    panels.nav(header);
                    for (i = panels.count; i--;) {
                        panels.items[i].el.style.paddingTop = header.height + "px";
                    }
                    return header;
                } else {
                    return undefined;
                }
            }
        },

        /**
         * Initialize footer
         */
        footer: {
            init: function (panels) {
                var footer = {};
                footer.el = document.getElementById(panels.footerId);
                if (footer.el) {
                    panels.nav(footer);
                    panels.height = panels.height - footer.el.offsetHeight;
                    //panels.el.style.height = panels.height + "px";
                    return footer;
                }
            }
        },
        
        /**
         * Initialize navigation area
         */
        nav: function (obj) {
            obj.anchors = obj.el.getElementsByClassName(this.navClass);
        },

        /**
         * Initialize Nav
         */
        init: function () {

            var anchorCallback,
                j,
                i,
                Nav = this,
                panel,
                setActive,
                headerAnchor,
                footerAnchor,
                goBack,
                clickcb;

            anchorCallback = function (gesture) {
                Nav.direction = 0;
                $(gesture.el).removeClass("active");
                if (Nav.isMoving === false) {
                    Nav.isMoving = true;
                    Nav.set(gesture.el.rel);
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

                panel = this.items[i];
                
                if (i > 0) {
                    this.translate({el: panel.el, x:  -((this.width + this.margin) * 4) , y:0});
                } else {
                    this.translate({el: panel.el, x:0 });
                }

                panel.height = panel.el.offsetHeight;
                if (this.height > panel.height) {
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
            
            // On window resize
            $(window).bind("resize", function(){
                setTimeout( function() {
                    if (Nav.header !== undefined) {
                        Nav.height = $.view.clientH - Nav.header.height;
                    }
                }, 1);
            });


            if (this.header) {
                goBack = function () {
                    Nav.goBack();
                };
                for (i = this.header.anchors.length; i--;) {
                    headerAnchor =this.header.anchors[i];
                    this.anchorBack = headerAnchor.parentNode;
                    $(this.anchorBack).hide()
                    headerAnchor.onclick = clickcb;
                    if (headerAnchor.rel === "back") {
                        $(headerAnchor).onTapEnd(goBack);
                    } else {
                        $(headerAnchor).onTapEnd(anchorCallback);                        
                    }
                }
            }
            

            if (this.footer) {
                for (i = this.footer.anchors.length; i--;) {
                    footerAnchor = this.footer.anchors[i];
                    if (footerAnchor.rel !== "") {
                        footerAnchor.onclick = clickcb;
                        $(footerAnchor).onTapEnd(anchorCallback);
                    }
                }
            }
            
            return this;

        },

        /**
         * Move panel
         */
        move: function (gesture) {
            var panel =  this.items[this.current];
            if (gesture.isDraggingY !== 0 && panel.movable !== false) {
                this.y = this.y + (gesture.y - gesture.lastY);
                this.translate({
                    el: panel.el,
                    y: this.y,
                    x: panel.x
                });
            }

        },

        /**
         * Check movement
         */
        check: function (gesture) {
            var panel = this.items[this.current],
                maxdist = panel.height - this.height,
                cb,
                i;
                
            if (gesture.isDraggingY !== 0) {

                this.isMoving = false;
                // Bounce back
                if (this.y >= 0 || maxdist < -this.y) {
                    if (this.y > 0) {
                        this.y = 0;
                    } else {
                        if (this.header === undefined) {                        
                            this.y = -(panel.height - this.height);
                        } else {
                            this.y = -(panel.height - (this.height + this.header.height));                            
                            // FIXME CHECK
                            if (this.y === this.header.height) {
                               this.y -= this.header.height; 
                            }
                        }
                    }
                    for (i = panel.anchors.length; i--;) {
                        $(panel.anchors[i]).removeClass("active");
                    }
                   
                    console.log(this.y);
                   
                    this.translate({
                        y: this.y,
                        el: panel.el,
                        duration: 0.25
                    });
                }

            }

        },

        /**
         * Load current panel
         */
        load: function () {

            var panel,
                callback,
                back,
                positionX,
                fn = this;
    
            // Current panel
            panel = this.items[this.current];
            // Back panel
            back = this.items[this.back];
            
            $(panel.el).show();
           
            this.isMoving = true;
            
            callback = function () {
                $(back.el).hide();
                fn.isMoving = false;
                
                panel.x = 0;
                fn.x = 0;
                fn.translate({el: fn.el, x: 0});
                fn.translate({el: panel.el, x: 0});
            };

            // Initial position for translate
            positionX = this.width + this.margin;

            if (this.current !== 0) {

                $(this.anchorBack).show()

                if (this.back === 0) {
                    this.translate({el: panel.el, x: positionX});
                    panel.x = positionX;
                    positionX = -positionX;

                } else {
                                    
                    if (this.direction === 0 ) {

                        this.translate({el: this.el, x: 0});
                        this.translate({el: panel.el, x: positionX});
                        panel.x = positionX;
                        this.translate({el: back.el, x: 0});
                        positionX = -positionX;
                    
                    } else {

                        positionX = 0;
                        panel.x = 0;
    
                    }
                    
                }
            } else if (this.back !== 0) {
           
                this.translate({el: this.el, x: -positionX});
                this.translate({el: panel.el, x: 0});
                panel.x = 0;
                this.translate({el: back.el, x: positionX});
                positionX = 0;                
                $(this.anchorBack).hide();

            }
                        
            window.setTimeout(function () {
                fn.translate({
                    el: fn.el,
                    duration: .25,
                    x: positionX,
                    callback: callback
                });
            }, 1);
        },

        /**
         * Set current panel
         */
        set: function (id) {

            var i;

            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.items[i].el.id === id) {
                    if (this.current != i) {
                        this.back = this.current;
                        if (this.direction === 0) {
                            this.history.push(this.current);
                        }
                        this.current = i;
                        this.load();
                    } else {
                        this.isMoving = false;
                    }
                }
            }

        },

        /**
         * Get panel by id
         */
        get: function (id) {
            var i;
            // Get panel by id and load it
            for (i = this.count; i--;) {
                if (this.items[i].el.id === id) {
                    return this.items[i];
                }
            }
        },

        /**
         * Translate Nav
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
                options.x = this.items[this.current].x;
            }
                        
            $(options.el).translateFx(
                {y: options.y, x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
        },

        /**
         * Hide hidden content
         */
        hide: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).hide();
            }
        },

        /**
         * Show hidden content
         */
        show: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).show();
            }
        },

        /**
         * Go back on navigation history
         */
        goBack: function () {
            if (this.history.length > 0) {
                this.direction = -1;
                this.back = this.history.pop();
                this.set(this.items[this.back].el.id);
	    }
        },

        /**
         * Nav configuration
         */
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


    /**
     * Navigation
     */
    $.extend({
        nav: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Nav(options);
        }
    });

}($));
