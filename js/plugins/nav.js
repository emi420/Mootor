/**
 * @summary Mootor Navigation plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */

(function ($) {

    "use strict";

	// Constructors
	
    /**
     * Nav
     * @param {object} options Options
     * @config {number} panelsMargin Margin between panels
     * @config {string} navLinksClassName Navigation links class
     * @config {string} panelsItemsClassName Panels items class
     * @config {string} hiddenContentClassName Hidden content 
                        (when transitioning) class
     * @return {object} Nav Mootor Nav object
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
            
            self._config.anchorBack.el.onclick = function() {
                return false;
            }

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
    },
    
    /**
     * Loading Show "loading" screen
     * @return {object} Loading Mootor UI Loading object
     */
    Loading = function(self) {
        this.el = document.createElement("div");
        $(this.el).setClass("moo-ui-loading");
        self.el.appendChild(this.el);
        
        Loading.init(this);

        return this;
    };
    
        
	/*
	 * Hide all while loading, show when ready
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

          
    // Public instance prototypes
    
    
    /**
     * Loading
     */  
    Loading.prototype = {
        show: function() {
            $(this.el).show();
        },
        hide: function() {
            $(this.el).hide();
        }
    };
    
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
     * Loading
     */ 
    $.extend({
        init: function(self) {
            var i;
            self.el.innerHTML = '<div class="moo-ui-loading-block"></div>';
            for (i = 1; i < 9; i++) {
                self.el.innerHTML += '<div class="moo-loading-0' + i + '"></div>';
            }
        }
    }, Loading);

    /**
     * Panel
     */     
    $.extend({
        initNavigationItems: function(panel, self) {
        
            var navigationItems,
            navigationItem,
            loadNavigationItem,
            setActiveItem,
            i,j;


            loadNavigationItem = function (gesture) {

                $(gesture.el).removeClass("active");

                self._config.direction = 0;
                if (self._config.isMoving === false) {
                    if (gesture.el.rel !== undefined) {
                        self.set(gesture.el.rel);
                    }
                }
            };
                
            setActiveItem = function (gesture) {
                $(gesture.el).setClass("active");
            };            
            
            navigationItems = panel.el.getElementsByTagName("a");
            for (j = navigationItems.length; j--;) {
                navigationItem = navigationItems[j];

                // External links    
                if ($(navigationItem).hasClass(self._config.navClass) === false) {
                    $(navigationItem).onTapEnd( function(gesture) {
                        window.location = gesture.el.href;
                    });

                // Internal navigation links    
                } else {
                    if (navigationItems[j].rel !== "") {
                        $(navigationItems[j]).onTapStart(setActiveItem);
                        $(navigationItems[j]).onTapEnd(loadNavigationItem);
                    }                    
                }
            }
            
            // Initialize navigation area
            Nav.nav(panel, self);
                        
        }    
    }, Panel);


    /**
     * Nav
     */    
    $.extend({
    
        /** Initialize Nav **/
        init: function(options, self) {

            // Container element
            self.el = options.el;

            // Cache options for later use
            self._options = options;
            
            // Initialize instance properties
            Nav.initProperties(self, options);                                                    
            
            // Initialize panels
            Nav.initPanels(self);
                        
            // Map touch events to event handler
            $(self.el).onDragMove(self);
            $(self.el).onDragEnd(self);
            
            // Initialize events on window resize
            Nav.initResizeEvents(self);
            
            return self;
        },
        
        initProperties: function(self, options) {
        
            // Private properties

            self._config = {
            
                // Panel 2D positions
                x: 0,
                y: 0,
                
                // Index of previous panel in navigation history
                back: 0,
                
                // Flag for panels transitions
                isMoving: false,
                
                // Direction of moving for panels transitions
                direction: 0,
                
                // Sizes of panels container
                width: $.view.clientW,
                height: $.view.clientH,

                // Container class name
                navClass: options.navLinksClassName ? 
                          options.navLinksClassName : "moo-nav",

                // Navigation item class name
                itemClass: options.panelsItemsClassName ?
                           options.panelsItemsClassName : "moo-panel",

                // Hidden content when isMoving class name
                hidden_class: options.panelsHiddenClassName ?
                              options.panelsHiddenClassName : "moo-hidden",

                // Margin between panels
                margin: options.panelsMargin ?
                              options.panelsMargin : 5,
                        
            }
                
            // Public properties
            
            // Array of navigation panels
            self.panels = [];
            
            // Current panel index
            self.current = 0;
            
            // Navigation index (array of panels indexes)
            self.history = [];                       
      
        },    
        
        /**
         * Translate Nav
         */
        translate: function (options, self) {
            
            options.duration = options.duration ? 
                              options.duration : 0;
                              
            options.callback = options.callback ? 
                               options.callback : function () {};
                               
            options.y = options.y ?
                        options.y : 0;
            
            options.x = options.x ?
                        options.x : self.panels[self.current].x;
            
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
                    Panel.initNavigationItems(panel, self);
                    panel.height = panel.el.offsetHeight;                    
                    if (self._config.height > panel.height) {
                        panel.height = self._config.height;
                    }
                }
            }
            
        },
        
        initResizeEvents: function(self) {

            // Update cached window sizes on window resize
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

        initPanels: function(self) {
            var i,
                panel,
                nav = self.el.getElementsByClassName(self._config.itemClass);  
                
            
            // Initialize panels 
            self.panels = [];
            for (i = 0; i < nav.length; i++) {
    
                panel = new Panel({
                    el: nav[i],
                    index: i,
                    x: 0,
                    y: 0,
                });
    
                // Initialize navigation items
                Panel.initNavigationItems(panel, self);
                
                self.panels.push(panel);
            }
            
            // Panels count
            self._config.count = i;
            
            // Initialize panels CSS styles
            Nav.initPanelsStyles(self);
            
        },

        initPanelsStyles: function(self) {
            var i,
                panel;
                
            for (i = self._config.count; i--;) {
    
                panel = self.panels[i];
                
                // Translate all but first panel off of the screen
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
                
                // Fill screen vertically
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
        },
        loading: function() {
            return new Loading(this);
        }
    });
    
}($));
