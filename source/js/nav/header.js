// #include "nav.js"

/**
 * Header
 * @param {object} self Nav instance
 * @return {object} Header Header instance
 */
var Header = function(self) {

    // Cache element
    this.el = $("header")[0];
    
    if (this.el !== null) {
        
        // Cache element height
        this.height = this.el.offsetHeight;            
        $(this.el).setClass(self._config.headerClassName);

        // Initialize back button
        Header.initAnchorBack(this, self);           
        
        // Initialize nav links
        Header.initNavigationLinks(this, self); 
        
        // Prevent native scrolling
        Header.preventNativeScrolling(this)
        
        // Set styles when header active on navigation items
        self._config.navItem.setStylesWhenHeaderActive(this.height, self);
        
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
        
        $anchorBack.hide();
        
        $anchorBack.el.onclick = function() {
            return false;
        };

        $anchorBack.onTapEnd(function(gesture) {
            navInstance.goBack();
        });
    },
    
    preventNativeScrolling: function(self) {
        $(self.el).on("touchmove", function(event) {
            event.preventDefault();
        });
    },
    
    initNavigationLinks: function(self, navInstance) {
        var navigationItems = $(self.el).find(".moo-nav"),
            i;
        
        for (i = navigationItems.length; i--;) {
            $(navigationItems[i]).onTapEnd(function(gesture) {
                Item.loadNavigationItem(gesture, self, navInstance);                    
            })
        }
    }

}, Header);

