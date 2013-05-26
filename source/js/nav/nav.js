
/**
 * Nav
 * @class Nav
 * @constructor
 * @param {NavOptions} options Options
 */ 
var Nav = function (options) {

        // Initialize instance & navigation items
        Nav.init(options, this);

        // Initialize header & footer
        this.header = new Header(this);
        this.footer = new Footer(this);

        return this;

    },
    Item;

// Public instance prototypes

/**
 * Nav
 */  
Nav.prototype = {

        /**
         * Original DOM lement
         * @property el
         * @type HTMLElement
         */
        el: undefined,
        
        /**
         * Set current navigation item
         * @extends Nav
         * @method set
         * @param {string} id Navigation item id
         * @return {object} Item Navigation item instance
         */
        set: function (id) {
            var item = this.get(id);
                        
            if (item !== null) {
                
                // If no transition is happening..
                if (this._config.isMoving === false) {
    
                    this._config.isMoving = true;
                    
                    if (this.current !== item.index) {
        
                        // Save current index
                        this._config.back = this.current;
        
                        // Add item to navigation history
                        if (this._config.direction === 0) {
                            this.history.push(this.current);
                        }
        
                        // Update current index
                        this.current = item.index;
    
                        // Load this Item
                        Nav.load(this);                    
        
                    }
    
                }
            
            }
            
            return item;

        },

        /**
         * Get Item object by id
         * @method get
         * @param {string} id Navigation item id
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
         * Go back on navigation history
         * @method goBack
         * @param {string} id Navigation item id
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
        }
        
    };


/**
 * Item
 * @param {object} options Options
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
    };
    
// Private static methods

/**
 * Item
 */     
$.extend({
    
        getLinks: function(self, navInstance) {
            var links,
                i,
                navigationItems = [];
                
            links = $(self.el).find("." + navInstance._config.navClass);
            for (i = 0; i < links.length; i++) {
                if (links[i].getAttribute("href").replace("#","") !== "") {
                    navigationItems.push(links[i]);
                }
            }
            
            return navigationItems;
        },
        
        loadNavigationItem: function (gesture, self, navInstance) {
            var i = 0,
                href = "";
                
            // Clear navigation items styles
            for (i = self.navigationItemsCount; i--;) {
                $(self.navigationItems[i]).removeClass("active");
            }
            
            // Default load transition direction
            navInstance._config.direction = 0;
            
            // If not doing a transition 
            if (navInstance._config.isMoving === false) {                
                // Set & load navigation Item
                href = gesture.el.getAttribute("href");
                if (href && href !== "") {
                    gesture.e.stopPropagation();
                    gesture.e.preventDefault();
                    navInstance.set(href.replace("#",""));
                }
            }
        },
        
        initNavigationItems: function(self, navInstance) {
        
            var navigationItem,
                i;
                
            // Get navigation links
            self.navigationItems = Item.getLinks(self, navInstance);            
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
                    if (navigationItem.getAttribute("href").replace("#","") !== "") {

                        $(navigationItem).onTapStart(
                            function(gesture) {
                                $(gesture.el).setClass("active");
                            }
                        );                        

                        $(navigationItem).onTapEnd(
                            function(gesture) {                                
                                Item.loadNavigationItem(gesture, self, navInstance);
                            }
                        );

                    }                    
                }
            }
            
            // FIXME CHECK
            self.initNavigation = function() {
                Item.initNavigationItems(self, navInstance);
            }    
            
            return self;                        
        }    
        
    }, Item);



// Public constructors

/** 
 * @class $.prototype.nav
 * @param {NavOptions} options Navigation configuration options
 * @constructor
 * @return {Nav} Nav instance
 */
$.extend({
    nav: function (options) {
            var nav;
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            options._query = this.query;
            
            nav = Nav.get(this.query);
            
            if(nav === undefined) {
                return new Nav(options);
            } else {
                return nav;
            }
            
    }
});

/**
 * Nav
 */    
$.extend({
    
        _collection: [],

        /**
         * Initialize Nav instance
         * @method init
         */
        init: function(options, self) {

            // Container element
            self.el = options.el;

            // Cache options for later use
            self._options = options;
            
            // Initialize instance properties
            Nav.initProperties(self, options);     
            
            // Set class name for main container
            $(self.el).setClass(self._config.containerClassName);                                               
            
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
        
            var navObject;
        
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

                // Enable or disable transitions
                transitions: options.transitions,

                // Header container class name
                headerClassName: options.headerClassName ? 
                          options.headerClassName : "moo-header",

                // Footer container class name
                footerClassName: options.footerClassName ? 
                          options.footerClassName : "moo-footer",

                // Navigation links container class name
                navClass: options.navLinksClassName ? 
                          options.navLinksClassName : "moo-nav",

                // Hidden content when isMoving class name
                hiddenClassName: options.hiddenClassName ?
                              options.hiddenClassName : "moo-hidden",
                              
                // Margin between items
                margin: options.margin ?
                              options.margin : 5,


                // Main container class name
                containerClassName: options.containerClassName ? 
                          options.containerClassName : "moo-panels",

                // Navigation item class name
                itemClass: options.itemsClassName ?
                           options.itemsClassName : "moo-panel",

                // Navigation type
                type: options.type ?
                              options.type : "Panels"                                                

            };

            // Enable or disable transitions
            if (self._config.transitions === undefined) {
                self._config.transitionDuration = .25
            } else {
                self._config.transitionDuration = 0                
            }
            
            // Access to navigation object by type, ex: self.Panel
            if (self._config.type === "Panels") {
                navObject = Panel;
            }
            self._config.navItem = navObject;

            
            // Public properties
            
            // Array of navigation items
            self.items = [];
            
            // Current item index
            self.current = 0;
            
            // Navigation index (array of items indexes)
            self.history = [];           
            
            Nav._collection.push(self);
            self.id = options.id ? options.id : options._query;
      
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
                    self._config.navItem.checkMove(gesture, self);
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
         * Move item
         */
        move: function (gesture, self) {
            var item =  self.items[self.current];
            
            if (gesture.isDraggingY !== 0 && item.movable !== false) {                
                self._config.navItem.move(self, item, gesture);
            }

        },

        /**
         * Load item
         */
        load: function (self) {        
            self._config.navItem.load(self);            
        },
        
        /**
         * Setup events onResize
         */
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

        /**
         * Initialize navigation items
         */
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
                    y: 0
                });
    
                // Initialize navigation items
                Item.initNavigationItems(item, self);
                
                self.items.push(item);
            }
            
            // Items count
            self._config.count = i;
            
            // Initialize navigation items CSS styles
            Nav.initNavItemStyles(self);
            
        },

        /**
         * Initialize navigation items CSS Styles
         */
        initNavItemStyles: function(self) {
            self._config.navItem.initStyles(self);
        },
                
        /**
         * Prevent native browser scrolling 
         */
        preventNativeScrolling: function() {
            $(document).ready(function() {
                $(document.body).bind("touchmove", function(event) {
                    event.preventDefault();
                    event.stopPropagation();                        
                });    
            });
        },
        
        get: function(id) {
            return Nav._collection.map(function(x) {
                if (x.id === id) { return x; }
            })[0];
        },
        
        _scrollBar: function(options) {
            // TODO
        } 
            
}, Nav);

/*
 * Prevent native scrolling
 */
Nav.preventNativeScrolling();

/**
 * Navigation link
 */
var NavLink = function(el) {
    this.$el = $(el);
    this.id = el.id;
    return this;
}

NavLink.prototype = {
    hide: function() {
        this.$el.removeClass("moo-visible");
    },
    show: function() {
        this.$el.setClass("moo-visible");;
    }
}

// When ready...
window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(1, 0);
	}, 300);
});



