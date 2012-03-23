/**
 * @summary Mootor Navigation
 */

/** 
 * @class
 * @name $ 
 */
 
(function ($) {
    "use strict";

    var fullWidth,
        Nav,

    fullWidth = function (el) {
        el.style.width = $.view.clientW + "px";
    };
     
     /**
     * Navigation object
     * @class
     * @return {Nav} Nav object
     * @param {object} options  Configuration options
     * @property {element} el Container element
     * @property {integer} height Container height
     * @property {integer} x Current position on X axis
     * @property {integer} y Current position on Y axis
     * @property {integer} current Index of active panel
     * @property {integer} back Index of previous active panel
     * @property {integer} width Nav container width
     * @property {integer} height Nav container height
     * @property {boolean} isMoving True if Nav container is moving
     * @property {integer} direction Direction for Nav movement
     * @property {array} [history] Navigation history
     * @property {integer} count Items count
     */
    Nav = function (options) {

        var i,
            /**
             * Navigation item
             * @ignore
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
        this.navClass = options.nav_class !== undefined ? options.nav_class : "nav";
        this.itemClass = options.item_class !== undefined ? options.item_class : "panel";
        this.headerId = options.header_id !== undefined ? options.header_id : "header";
        this.footerId = options.footer_id !== undefined ? options.footer_id : "footer";
        this.hiddenClass = options.hidden_class !== undefined ? options.hidden_class : "hidden";
        this.margin = options.item_margin !== undefined ? options.item_margin : 5;
        this.width = options.width !== undefined ? options.width : $.view.clientW;
        this.height = options.height !== undefined ? options.height : $.view.clientH;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.back = 0;
        this.items = [];
        this.header = this.header.init(this);
        this.footer = this.footer.init(this);
        this.isMoving = false;
        this.direction = 0;
        this.history = [];

        nav = this.el.getElementsByClassName(this.itemClass);

        this.count = nav.length;

        for (i = nav.length; i--;) {
            this.items[i] = {el: nav[i]};
            item = this.items[i];
            item.x = 0;
            item.y = 0;
            item.anchors = item.el.getElementsByClassName(this.navClass);
            item.hidden = item.el.getElementsByClassName(this.hiddenClass);
        }

        $(this.el).onDragMove(this);
        $(this.el).onDragEnd(this);

        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }

        this.init();

        return this;

    };

    Nav.prototype = {

        /**
         * Gesture handler
         * @private
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
         * @private
         */
        header: {
            init: function (panels) {
                var header = {};
                header.el = document.getElementById(panels.headerId);
                if (header.el) {
                    panels.nav(header);
                    fullWidth(header.el);
                    panels.top = header.el.offsetHeight;
                    panels.height = $.view.clientH - panels.top;
                    panels.el.style.marginTop = panels.top + "px";
                    return header;
                }
            }
        },

        /**
         * Initialize footer
         * @private
         */
        footer: {
            init: function (panels) {
                var footer = {};
                footer.el = document.getElementById(panels.footerId);
                if (footer.el) {
                    panels.nav(footer);
                    fullWidth(footer.el);
                    panels.height = panels.height - footer.el.offsetHeight;
                    //panels.el.style.height = panels.height + "px";
                    return footer;
                }
            }
        },
        
        /**
         * Initialize navigation area
         * @private
         */
        nav: function (obj) {
            obj.anchors = obj.el.getElementsByClassName(this.navClass);
        },

        /**
         * Initialize Nav
         * @private
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

            // FIXME: optimize me, DRY!
            
            // Reset styles and set anchor links
            for (i = this.count; i--;) {

                panel = this.items[i];

                if (this.width === undefined) {
                    fullWidth(panel.el);
                } else {
                    panel.el.style.width = this.width + "px";
                }

                panel.el.style.overflow = 'hidden';

                if (i > 0) {
                    this.translate({el: panel.el, x:  -((this.width + this.margin) * 4) , y:0});
                } else {
                    this.translate({el: panel.el, x:0 });
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
            
            // On window resize
            $(window).bind("resize", function(){
                var panel;
                setTimeout( function() {
                    //Nav.height 
                    for (i = Nav.count; i--;) {
                        panel = Nav.items[i];
                        panel.el.style.width = $.view.clientW + "px";                    
                    }
                    Nav.y = 0;
                    Nav.header.el.style.width = $.view.clientW + "px";
                    Nav.footer.el.style.width = $.view.clientW + "px";
                }, 10);
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
         * @private
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
         * @private
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
                        this.y = -(panel.height - this.height);
                    }
                    for (i = panel.anchors.length; i--;) {
                        $(panel.anchors[i]).removeClass("active");
                    }
                    console.log(panel.x);
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
         * @private
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
            }, 10);
        },

        /**
         * Set current panel
         * @param {string} id Nav id
         * @example nav.set("home");
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
         * @param {string} id Nav id
         * @private
         * @example nav.get("home").height;
         * @return {item} Navigation item
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
         * @param {object} options
         * @private
         * @config {integer} duration Translate duration, in seconds
         * @config {function} callback Function to call on move end
         * @config {integer} x Active panel position on X axis
         * @config {integer} y Active panel position on Y axis
         * @config {integer} y Active panel position on Y axis
         * @example item.translate({x: 100});
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
                        
            $(options.el).translate(
                {y: options.y, x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
        },

        /**
         * Hide hidden content
         * @param {Nav} panel
         * @private
         * @example nav.hide(nav.items[nav.current])
         */
        hide: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).hide();
            }
        },

        /**
         * Show hidden content
         * @private
         * @example nav.show();
         */
        show: function (panel) {
            var i;
            for (i = panel.hidden.length; i--;) {
                $(panel.hidden[i]).show();
            }
        },

        /**
         * Go back on navigation history
         * @example nav.goBack();
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
         * @param {object} options
         * @config {string} panel Nav id
         * @config {boolean} movable Set to false to block panel
         * @example nav.config({
         *      panel: "geo",
         *       movable: false
         * });
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
        /** 
         * @memberOf $.prototype 
         * @name nav
         * @function
         * @param {object} options Configuration options
         * @return {Nav} Nav object
         * @config {string} navClass Navigation class name
         * @config {string} itemClass Nav class name
         * @config {string} hiddenClass Hidden content class name
         * @config {string} headerId Header element id
         * @example var nav = $("#myPanels").nav();
         */
        nav: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Nav(options);
        }
    });

}($));
