/**
 * @summary Mootor Navigation plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */

(function ($) {

    "use strict";
    
    var _translate,

	// Private constructors
	
    /**
     * Nav
     * @param {object} options Options
     * @config {number} panelsMargin Margin between panels
     * @config {string} navLinksClassName Navigation links class
     * @config {string} panelsItemsClassName Panels items class
     * @config {string} hiddenContentClassName Hidden content 
                        (when transitioning) class
     * @return {object} Nav Mootor Nav instance
     */
    Nav = function (options) {

        // Initialize instance & navigation items (ex: panels)
        Nav.init(options, this);

        // Initialize header & footer
        this.header = new Header(this);
        this.footer = new Footer(this);

        return this;

    },    
    
    /**
     * Header
     * @param {object} self Nav instance
     * @return {object} Header Header instance
     */
    Header = function(self) {

        // Cache element
        this.el = $("#moo-header").el;
        
        if (this.el !== null) {
            
            // Cache element height
            this.height = this.el.offsetHeight;

            // Initialize back button
            Header.initAnchorBack(this, self);            
            
            // Prevent native scrolling
            Header.preventNativeScrolling(this)
            
            // Set paddingTop on navigation items
            Nav.setPaddingTop(this.height, self);
            
            return this;
        } else {
            return undefined;
        }
        
    },   
     
    /**
     * Footer
     * @param {object} self Nav instance
     * @return {object} Footer Footer instance
     */
    Footer = function(self) {        
        // TODO: create an object like Header
        //       ex: using a NavBar constructor
    },    
    
    /**
     * Item
     * @param {object} options Options
     * @config {object} el Element
     * @return {object} Item Navigation Item instance
     */
    Item = function(options) {
    
        // Cache element
        this.el = options.el;        
        
        // Initialize properties
        this.id = this.el.id;
        this.index = options.index;
        this.height = options.height;

        // Item 2D position
        this.x = options.x;
        this.y = options.y;
        
        return this;  
    },
    
    Panel = function(){};
    	
    // Public instance prototypes
    
    /**
     * Nav
     */  
    Nav.prototype = {
    
        /**
         * set Set current navigation item
         * @param {string} id Navigation item id
         * @return {object} Item Navigation item instance
         */
        set: function (id) {
            var item = this.get(id);
                        
            if (this.current !== item.index) {

                // Save current index
                this._config.back = this.current;

                // Add item to navigation history
                if (this._config.direction === 0) {
                    this.history.push(this.current);
                }

                // Update current index
                this.current = item.index;

                // If no transition is happening..
                if (this._config.isMoving === false) {
                    this._config.isMoving = true;

                    // Load this Item
                    Nav.load(this);                    

                }

            } else {
                this._config.isMoving = false;
            }
            
            return item;

        },

        /**
         * get Get Item object by id
         * @param {string} id Navigation item (ex: panel) id
         * @return {object} Item Navigation Item instance
         */
        get: function (id) {
            var i;
            for (i = this._config.count; i--;) {
                if (this.items[i].el.id === id) {
                    return this.items[i];
                }
            }
            return null;
        },

        /**
         * goBack Go back on navigation history
         * @param {string} id Navigation item (ex: panel) id
         * @return {integer} index Current navigation item index
         */
        goBack: function () {
        
            // If not in the begin of navigation history
            // and not doing transitions
            if (this.history.length > 0) {
                if(this._config.isMoving === false) {

                    // Set direction for transitions
                    this._config.direction = -1;

                    // Update history
                    this._config.back = this.history.pop();
                    
                    // Load Item
                    this.set(this.items[this._config.back].el.id);
                }
            }
            return this.items[this.current].index;
	    },

        /**
         * Gesture handler
         * @private
         * TODO: move this property off of prototype
         */
        handleGesture: function (gesture) {
            Nav.handleGesture(gesture, this);
        },        

    };
    
    // Private static methods
    
    /**
     * Item
     */     
    $.extend({
    
        getLinks: function(self) {
            var links,
                i,
                navigationItems = [];
                       
            links = $(self.el).find("a");
            for (i = 0; i < links.length; i++) {
                if (links[i].rel !== "") {
                    navigationItems.push(links[i])
                }
            }
            
            navigationItems.length = i;
            return navigationItems;
        },
        
        loadNavigationItem: function (gesture, self, navInstance) {
            var i;

            // Clear navigation items styles
            for (i = self.navigationItemsCount; i--;) {
                $(self.navigationItems[i]).removeClass("active");
            }
            
            // Default load transition direction
            navInstance._config.direction = 0;
            
            // If not doing a transition 
            if (navInstance._config.isMoving === false) {                
                // Set & load navigation Item
                navInstance.set(gesture.el.rel);
            }
        },
        
        initNavigationItems: function(self, navInstance) {
        
            var navigationItem,
                i;
                                                
            // Get navigation links
            self.navigationItems = Item.getLinks(self);
            self.navigationItemsCount = self.navigationItems.length;
            
            // Setup navigation links            
            for (i = self.navigationItemsCount; i--;) {
                navigationItem = self.navigationItems[i];

                // External links    
                if ($(navigationItem).hasClass(navInstance._config.navClass) === false) {
                    $(navigationItem).onTapEnd( function(gesture) {
                        window.location = gesture.el.href;
                    });

                // Internal navigation links    
                } else {
                    if (navigationItem.rel !== "") {

                        $(navigationItem).onTapStart(
                            function(gesture) {
                                $(gesture.el).setClass("active");
                        });                        

                        $(navigationItem).onTapEnd(
                            function(gesture) {                                
                                Item.loadNavigationItem(gesture, self, navInstance);
                        });

                    }                    
                }
            }
            
            return self;                        
        }    
        
    }, Item);
    
    /**
     * Header
     */
    $.extend({
    
        initAnchorBack: function(self, navInstance) {
            var $anchorBack =
                navInstance._config.anchorBack =
                $($(self.el).find(".moo-nav-back")[0]);
            
            $anchorBack.hide();
            
            $anchorBack.on("click", function() {
                return false;
            });

            $anchorBack.onTapEnd(function(gesture) {
                navInstance.goBack();
            });
        },
        
        preventNativeScrolling: function(self) {
            $(self.el).onDragMove(function(gesture) {
                gesture.e.preventDefault();
            });
        }

    }, Header);

    /**
     * Nav
     */    
    $.extend({
    
        /**
         * Initialize Nav instance
         */
        init: function(options, self) {

            // Container element
            self.el = options.el;

            // Cache options for later use
            self._options = options;
            
            // Initialize instance properties
            Nav.initProperties(self, options);                                                    
            
            // Initialize items
            Nav.initItems(self);
                        
            // Map touch events to event handler
            $(self.el).onDragMove(self);
            $(self.el).onDragEnd(self);
            
            // Initialize events on window resize
            Nav.initResizeEvents(self);
            
            return self;
        },
        
        /**
         * Translate Nav instance properties
         */
        initProperties: function(self, options) {
        
            // Private properties

            self._config = {
            
                // Item 2D positions
                x: 0,
                y: 0,
                
                // Index of previous item in navigation history
                back: 0,
                
                // Flag for items transitions
                isMoving: false,
                
                // Direction of moving for items transitions
                direction: 0,
                
                // Sizes of items container
                width: $.view.clientW,
                height: $.view.clientH,

                // Container class name
                navClass: options.navLinksClassName ? 
                          options.navLinksClassName : "moo-nav",

                // Hidden content when isMoving class name
                hidden_class: options.panelsHiddenClassName ?
                              options.panelsHiddenClassName : "moo-hidden",
                              
                // Margin between items
                margin: options.margin ?
                              options.margin : 5,

                // Navigation item class name
                itemClass: options.itemsClassName ?
                           options.itemsClassName : "moo-panel",

                // Navigation type
                type: options.type ?
                              options.type : "Panels"
                        
            }
                
            // Public properties
            
            // Array of navigation items
            self.items = [];
            
            // Current item index
            self.current = 0;
            
            // Navigation index (array of items indexes)
            self.history = [];                       
      
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
            var panel =  self.items[self.current];
            if (gesture.isDraggingY !== 0 && panel.movable !== false) {
                
                self._config.y = self._config.y + (gesture.y - gesture.lastY);
                _translate({
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
            var panel = self.items[self.current],
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
                    for (i = panel.navigationItems.length; i--;) {
                        $(panel.navigationItems[i]).removeClass("active");
                    }
                                                          
                    _translate({
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
        
            switch (self._config.type) {
                case "Panels":
                    Panel.load(self);
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

        // Initialize Nav items
        initItems: function(self) {
            var i,
                item,
                elements = self.el.getElementsByClassName(self._config.itemClass);                  
            
            // Initialize items 
            self.items = [];
            for (i = 0; i < elements.length; i++) {
    
                item = new Item({
                    el: elements[i],
                    index: i,
                    x: 0,
                    y: 0,
                });
    
                // Initialize navigation items
                Item.initNavigationItems(item, self);
                
                self.items.push(item);
            }
            
            // Items count
            self._config.count = i;
            
            // Initialize panels CSS styles
            Nav.initPanelsStyles(self);
            
        },

        initPanelsStyles: function(self) {
            var i = 0,
                item = {};
                
            for (i = self._config.count; i--;) {
    
                item = self.items[i];
                
                // Translate all but first panel off of the screen
                if (i > 0) {
                    _translate({
                        el: item.el, 
                        x:  -((self._config.width + self._config.margin) * 4),
                        y:0
                    }, self);
                } else {
                    _translate({
                        el: item.el,
                        x:0
                    }, self);
                }
                
                // Fill screen vertically
                item.height = item.el.offsetHeight;                
                if (self._config.height > item.height) {
                    item.height = self._config.height;
                }
    
            }
        },
        
        hideContentWhileDocumentNotReady: function() {
        	$.view.hide();
        	$(document).ready(function() {
        		$.view.show();
        	});
        },
        
        preventNativeScrolling: function() {
        	$(document).ready(function() {
            	$(document.body).bind("touchmove", function(gesture) {
                    gesture.preventDefault();
                    gesture.stopPropagation();
            	});	
        	});
        },
        
        setPaddingTop: function(height, navInstance) {
            var i;
            for (i = navInstance._config.count; i--;) {
                navInstance.items[i].el.style.paddingTop = height + "px";
            }
        }
            
    }, Nav);
    
    $.extend({
    
        load: function(navInstance) {
        
            var panel,
                callback,
                back,
                positionX;
    
            // Current panel
            panel = navInstance.items[navInstance.current];
            // Back panel
            back = navInstance.items[navInstance._config.back];
            
            $(panel.el).show();
           
            callback = function () {
                $(back.el).hide();
                navInstance._config.isMoving = false;
                
                panel.x = 0;
                navInstance._config.x = 0;
                _translate({el: navInstance.el, x: 0}, navInstance);
                _translate({el: panel.el, x: 0}, navInstance);
            };

            // Initial position for translate
            positionX = navInstance._config.width + navInstance._config.margin;

            if (navInstance.current !== 0) {

                navInstance._config.anchorBack.show()

                if (navInstance._config.back === 0) {
                    _translate({el: panel.el, x: positionX}, navInstance);
                    panel.x = positionX;
                    positionX = -positionX;

                } else {
                                    
                    if (navInstance._config.direction === 0 ) {

                        _translate({el: navInstance.el, x: 0}, navInstance);
                        _translate({el: panel.el, x: positionX}, navInstance);
                        panel.x = positionX;
                        _translate({el: back.el, x: 0}, navInstance);
                        positionX = -positionX;
                    
                    } else {

                        positionX = 0;
                        panel.x = 0;
    
                    }
                    
                }
            } else if (navInstance._config.back !== 0) {
           
                _translate({el: navInstance.el, x: -positionX}, navInstance);
                _translate({el: panel.el, x: 0});
                panel.x = 0;
                _translate({el: back.el, x: positionX}, navInstance);
                positionX = 0;                
                navInstance._config.anchorBack.hide();
            }
            
            window.setTimeout(function () {
                _translate({
                    el: navInstance.el,
                    duration: .25,
                    x: positionX,
                    callback: callback
                }, navInstance);
            }, 1);
            
            
            if (typeof panel.onLoad === "function") {
                panel.onLoad();
                panel.onLoadCallback = function() {
                    Item.initNavigationItems(panel, navInstance);
                    panel.height = panel.el.offsetHeight;                    
                    if (navInstance._config.height > panel.height) {
                        panel.height = navInstance._config.height;
                    }
                }
            }

        }


    }, Panel);
    
    
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
    });
    
	/*
	 * Hide content while loading, show when ready
	 */
	Nav.hideContentWhileDocumentNotReady()   

	/*
	 * Prevent native scrolling
	 */
    Nav.preventNativeScrolling();

    // Private utilities
    
    /**
     * Translate element
     */
    _translate = function (options) {
        
        options.duration = options.duration ? 
                          options.duration : 0;
                          
        options.callback = options.callback ? 
                           options.callback : function () {};
                           
        options.y = options.y ?
                    options.y : 0;
        
        options.x = options.x ?
                    options.x : 0;
        
        $(options.el).translateFx(
            {y: options.y,x: options.x},
            {transitionDuration: options.duration, callback: options.callback}
        );
        
    };
    
}($));
