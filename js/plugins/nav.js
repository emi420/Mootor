/**
 * @summary Mootor Navigation plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */

(function ($) {

    "use strict";
    
	/*
	 * Hide all while loading, show when ready
	 * TODO: "Loading..." overlay
	 */
	$.view.hide();	
	$(document).ready(function() {
		$.view.show();
	});
	
	// Prevents native scrolling
	$(document).ready(function() {
    	$(document.body).bind("touchmove", function(gesture) {
            gesture.preventDefault();
            gesture.stopPropagation();
    	});	
	});

	// Constructors
	
    /**
     * Nav
     */  
    var Nav = function (options) {

        // Initialize instance & panels
        Nav.init(options, this);

        // Initialize header & footer
        this.header = new Header(this);
        this.footer = new Footer(this);

        return this;

    },    
    /**
     * Header
     */  
    Header = function(self) {
        var i,
            elementId,
            anchorBack;
            
        elementId = self._config.header_id !== undefined ?
                    self._config.header_id : "header";
            
        this.el = $(elementId)[0];
        
        if (this.el !== null) {
            this.height = this.el.offsetHeight;

            anchorBack = self._config.anchorBack = $($(this.el).find(".moo-nav-back")[0]);
            anchorBack.hide();
            anchorBack.el.style.opacity = 0;
            anchorBack.show();
            
            self._config.anchorBack.onTapEnd(function(gesture) {
                self.goBack();
            });
            
            $(this.el).onDragMove(function(gesture) {
                gesture.e.preventDefault();
            });
            
            for (i = self._config.count; i--;) {
                self.panels[i].el.style.paddingTop = this.height + "px";
            }
            return this;
        } else {
            return undefined;
        }
        
    },    
    /**
     * Footer
     */  
    Footer = function(self) {        
        var i,
            elementId;
            
        elementId = self._config.footer_id !== undefined ?
                    self._config.footer_id : "footer";
            
        this.el = document.getElementById(elementId);
        
        if (this.el !== null) {
            this.height = this.el.offsetHeight;
    
            self._nav(footer);
            for (i = self.count; i--;) {
                self.panels[i].el.style.paddingBottom = footer.height + "px";
            }
            return this;
            
        } else {
            return undefined;
        }
    },    
    /**
     * Panel
     */  
    Panel = function(options) {
    
        // Element
        this.el = options.el;
        
        // Id
        this.id = this.el.id;

        // Panel index
        this.index = options.index;
        
        // Panel height (in pixels)
        this.height = options.height;

        // Panel 2D position
        this.x = options.x;
        this.y = options.y;
        
        return this;  
    };
          
    // Public instance prototypes
    
    /**
     * Nav
     */  
    Nav.prototype = {
    
        /**
         * Set current panel
         */
        set: function (id) {

            var panel = this.get(id);
            
            if (this.current !== panel.index) {
                this._config.back = this.current;
                if (this._config.direction === 0) {
                    this.history.push(this.current);
                }
                this.current = panel.index;
                if (this._config.isMoving === false) {
                    this._config.isMoving = true;
                    Nav.load(this);                    
                }
            } else {
                this._config.isMoving = false;
            }

        },

        /**
         * Get panel by id
         */
        get: function (id) {
            var i;
            // Get panel by id and load it
            for (i = this._config.count; i--;) {
                if (this.panels[i].el.id === id) {
                    return this.panels[i];
                }
            }
        },

        /**
         * Go back on navigation history
         */
        goBack: function () {
            if (this.history.length > 0) {
                if(this._config.isMoving === false) {
                    this._config.direction = -1;
                    this._config.back = this.history.pop();
                    this.set(this.panels[this._config.back].el.id);
                }
            }
	    },

        /**
         * Gesture handler
         */
        handleGesture: function (gesture) {
            Nav.handleGesture(gesture, this);
        },        

    };
    
    
    // Private static methods

    /**
     * Panel
     */     
    $.extend({
        initializeAnchorLinks: function(panel, self) {
        
            var anchors,
            anchor,
            anchorCallback,
            clickcb,
            setActive,
            i,j;

            // External links    
            anchors = panel.el.getElementsByTagName("a");
            for (j = anchors.length; j--;) {
                anchor = anchors[j];
                if ($(anchor).hasClass(self._config.navClass) === false) {
                    $(anchor).onTapEnd( function(gesture) {
                        window.location = gesture.el.href;
                    });
                }
            }
            
            panel._anchors = panel.el.getElementsByClassName(self._config.navClass);
            
            anchorCallback = function (gesture) {
                self._config.direction = 0;
                $(gesture.el).removeClass("active");
                if (self._config.isMoving === false) {
                    if (gesture.el.rel !== undefined) {
                        self.set(gesture.el.rel);
                    }
                }
                return false;
            };
            
            clickcb = function () {
                return false;
            };
    
            setActive = function (gesture) {
                $(gesture.el).setClass("active");
            };

            for (j = panel._anchors.length; j--;) {
                if (panel._anchors[j].rel !== "") {
                    $(panel._anchors[j]).onTapStart(setActive);
                    panel._anchors[j].onclick = clickcb;
                    $(panel._anchors[j]).onTapEnd(anchorCallback);
                }
            }
            
        }    
    }, Panel);


    /**
     * Nav
     */    
    $.extend({
    
        /** Initialize Nav **/
        init: function(options, self) {

            self.el = options.el;            
            self._options = options;
            
            // Initialize instance properties
            Nav.initializeProperties(self, options);                                                    
            
            // Initialize panels navigation
            Nav.panelsInit(self);
                        
            // Map touch events to event handler
            $(self.el).onDragMove(self);
            $(self.el).onDragEnd(self);
            
            // Update sizes window resize
            Nav.updateSizesOnWindowResize(self);
            
            return self;
        },
        
        /**
         * Translate Nav
         */
        translate: function (options, self) {
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
                options.x = self.panels[self.current].x;
            }
                        
            $(options.el).translateFx(
                {y: options.y,x: options.x},
                {transitionDuration: options.duration, callback: options.callback}
            );
            
        },
        
        /**
         * Gesture handler
         */
        handleGesture: function (gesture, self) {
            gesture.e.preventDefault();
            switch (gesture.type) {
                case "dragMove":
                    Nav.move(gesture, self);
                    break;
                case "dragEnd":
                    Nav.checkMove(gesture, self);
                    break;
                }
        },
        
        /**
         * Initialize navigation area
         */
        nav: function (navElement, self) {
            navElement._anchors = self.el.getElementsByClassName(self._options.navClass);
        },

        /**
         * Move panel
         */
        move: function (gesture, self) {
            var panel =  self.panels[self.current];
            if (gesture.isDraggingY !== 0 && panel.movable !== false) {
                self._config.y = self._config.y + (gesture.y - gesture.lastY);
                Nav.translate({
                    el: panel.el,
                    y: self._config.y,
                    x: panel.x
                }, self);
            }

        },

        /**
         * Check move
         */
        checkMove: function (gesture, self) {
            var panel = self.panels[self.current],
                maxdist = panel.height - self._config.height,
                cb,
                i;
                
            if (gesture.type === "dragEnd") {

                // Bounce back
                if (self._config.y >= 0 || maxdist < -self._config.y) {
                    if (self._config.y > 0) {
                        self._config.y = 0;
                    } else {
                        if (self.header === undefined) {                        
                            self._config.y = -(panel.height - self._config.height);
                        } else {
                            self._config.y = -(panel.height - (self._config.height + self.header.height));                            
                            // FIXME CHECK
                            if (self._config.y === self.header.height) {
                               self._config.y -= self.header.height; 
                            }
                        }
                    }
                    for (i = panel._anchors.length; i--;) {
                        $(panel._anchors[i]).removeClass("active");
                    }
                                      
                    Nav.translate({
                        y: self._config.y,
                        el: panel.el,
                        duration: 0.25
                    }, self);
                }

            }

        },

        /**
         * Load current panel
         */
        load: function (self) {

            var panel,
                callback,
                back,
                positionX;
    
            // Current panel
            panel = self.panels[self.current];
            // Back panel
            back = self.panels[self._config.back];
            
            $(panel.el).show();
           
            callback = function () {
                $(back.el).hide();
                self._config.isMoving = false;
                
                panel.x = 0;
                self._config.x = 0;
                Nav.translate({el: self.el, x: 0}, self);
                Nav.translate({el: panel.el, x: 0}, self);
            };

            // Initial position for translate
            positionX = self._config.width + self._config.margin;

            if (self.current !== 0) {

                self._config.anchorBack.el.style.opacity = "1";

                if (self._config.back === 0) {
                    Nav.translate({el: panel.el, x: positionX}, self);
                    panel.x = positionX;
                    positionX = -positionX;

                } else {
                                    
                    if (self._config.direction === 0 ) {

                        Nav.translate({el: self.el, x: 0}, self);
                        Nav.translate({el: panel.el, x: positionX}, self);
                        panel.x = positionX;
                        Nav.translate({el: back.el, x: 0}, self);
                        positionX = -positionX;
                    
                    } else {

                        positionX = 0;
                        panel.x = 0;
    
                    }
                    
                }
            } else if (self._config.back !== 0) {
           
                Nav.translate({el: self.el, x: -positionX}, self);
                Nav.translate({el: panel.el, x: 0});
                panel.x = 0;
                Nav.translate({el: back.el, x: positionX}, self);
                positionX = 0;                
                self._config.anchorBack.el.style.opacity = "0";
            }
            
            window.setTimeout(function () {
                Nav.translate({
                    el: self.el,
                    duration: .25,
                    x: positionX,
                    callback: callback
                }, self);
            }, 1);
            
            
            if (typeof panel.onLoad === "function") {
                panel.onLoad();
                panel.onLoadCallback = function() {
                    Panel.initializeAnchorLinks(panel, self);

                    panel.height = panel.el.offsetHeight;
                    
                    if (self._config.height > panel.height) {
                        panel.height = self._config.height;
                    }

                }
            }
            
        },
        
        updateSizesOnWindowResize: function(self) {
            $(window).bind("resize", function(){
                setTimeout( function() {
                    if (self.header !== undefined) {
                        self._config.height = $.view.clientH - self.header.height;
                    } else {
                        self._config.height = $.view.clientH;                        
                    }
                }, 1);
            });
        },

        panelsInit: function(self) {
            var item,
                i,j,
                anchors,
                anchor,
                item,
                anchorCallback,
                clickcb,
                setActive,
                panel,
                nav = self.el.getElementsByClassName(self._config.itemClass);  
                
            self._config.count = nav.length;
            self.panels = [];
            
            // Initialize panels
            for (i = 0; i < nav.length; i++) {
    
                panel = new Panel({
                    el: nav[i],
                    index: i,
                    x: 0,
                    y: 0,
                });
    
                Panel.initializeAnchorLinks(panel, self);
                self.panels.push(panel);
            }
                        
            Nav.initializePanelsStyles(self);
            
        },

        initializeProperties: function(self, options) {
        
            self._config = {
                x: 0,
                y: 0,
                back: 0,
                isMoving: false,
                direction: 0,
                margin: 5,
                width: $.view.clientW,
                height: $.view.clientH,
                navClass: "moo-nav",
                itemClass: "moo-panel",
                hidden_class: "moo-hidden"            
            }
    
            self.panels = [];
            self.current = 0;
            self.history = [];
            
            if (options.item_margin !== undefined) { 
                self._config.item_margin = options.item_margin ;
            }
            
            if (options.nav_class !== undefined) {
                self._config.nav_class = options.nav_class;
            }
                                     
            if (options.item_class !== undefined) {
                self._config.item_class = options.item_class;
            }
                              
            if (options.hidden_class !== undefined) {
                self._config.hidden_class = options.hidden_class;
            }
                                        
      
        },    

        initializePanelsStyles: function(self) {
            var i,
                panel;
                
            // Reset styles
            for (i = self._config.count; i--;) {
    
                panel = self.panels[i];
                
                if (i > 0) {
                    Nav.translate({
                        el: panel.el, 
                        x:  -((self._config.width + self._config.margin) * 4),
                        y:0
                    }, self);
                } else {
                    Nav.translate({
                        el: panel.el,
                        x:0
                    }, self);
                }
    
                panel.height = panel.el.offsetHeight;
                
                if (self._config.height > panel.height) {
                    panel.height = self._config.height;
                }
    
            }
        }
            
    }, Nav);

    
    // Public constructors

    $.extend({
        nav: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            
            switch (options.type) {
                default:
                    return new Nav(options);                
            }
        }
    });

}($));
