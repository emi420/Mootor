// #include "nav.js"

/**
 * Header
 * @param {object} self Nav instance
 * @return {object} Header Header instance
 */
var Header = function(self) {

    // Cache element
    this.el = $("header")[0];
    
    if (this.el !== undefined) {
        
        this.height = this.el.offsetHeight;       
        //this.el.style.height = this.height + "px";      

        // Set styles when header active on navigation items
        _setStylesWhenHeaderIsActive(this.height, self);         

        $(this.el).setClass(self._config.headerClassName);

        // Initialize back button
        Header.initAnchorBack(this, self);           
        
        // Initialize nav links
        Header.initNavigationLinks(this, self); 
        
        // Prevent native scrolling
        Header.preventNativeScrolling(this)
        
        return this;
    } else {
        return undefined;
    }
    
};

Header.prototype = {
    setTitle: function(title) {
        $(this.el).find("h1")[0].innerText = title;
    }
}

/**
 * Header
 */
$.extend({

    initAnchorBack: function(self, navInstance) {
        
        var $anchorBack =
            navInstance._config.anchorBack =
            $($(self.el).find(".moo-nav-back")[0]);
            
        navInstance._config.anchorBack.show = function() {
            this.setClass("moo-visible");
        }

        navInstance._config.anchorBack.hide = function() {
            this.removeClass("moo-visible");
        }
        
        $anchorBack.onTapStart(function() {
            $anchorBack.setClass("moo-hover");
        });
        $anchorBack.onTapEnd(function() {
            $anchorBack.removeClass("moo-hover");
        });
            
        if ($anchorBack.el !== undefined) {
            $anchorBack.hide();
            
            $anchorBack.el.onclick = function() {
                return false;
            };
    
            $anchorBack.onTapEnd(function(gesture) {
                navInstance.goBack();
            });        
        }
        
    },
    
    preventNativeScrolling: function(self) {
        $(self.el).on("touchmove", function(event) {
            event.preventDefault();
        });
    },
    
    initNavigationLinks: function(self, navInstance) {
        var navigationItems = $(self.el).find(".moo-nav"),
            $navigationItem,
            i,
            navLink;
            
        self.navLinks = {};
        
        for (i = navigationItems.length; i--;) {
            $navigationItem = $(navigationItems[i]);
            $navigationItem.onTapEnd(function(gesture) {
                Item.loadNavigationItem(gesture, self, navInstance);                    
            });
            navLink = new NavLink(navigationItems[i]);
            self.navLinks[navLink.id] = navLink;
            $navigationItem.onTapStart(function(gesture){
                $(gesture.el).setClass("moo-hover");
            });
            $navigationItem.onTapEnd(function(gesture){
                $(gesture.el).removeClass("moo-hover");                
            });            
        }
    }

}, Header);


/*
 * Styles when Header is active
 */
var _setStylesWhenHeaderIsActive = function(height, navInstance) {
    var i;
    for (i = navInstance._config.count; i--;) {
        navInstance.items[i].el.style.paddingTop = height + "px";
    }
}
