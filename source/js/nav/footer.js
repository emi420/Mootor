// #include "nav.js"

/**
 * Footer
 * @param {object} self Nav instance
 * @return {object} Footer Footer instance
 */
var Footer = function(self) {

    // Cache element
    this.el = $("footer")[0];
    
    if (this.el !== undefined) {
        
        // FIXME
        var footer = this;
        window.setTimeout(function() {
            footer.height = footer.el.offsetHeight;       
            footer.el.style.height = footer.height + "px";     
        }, 10)

        // Set styles when Footer active on navigation items
        _setStylesWhenFooterIsActive(this, self);         
            
        $(this.el).setClass(self._config.footerClassName);

        // Initialize nav links
        Footer.initNavigationLinks(this, self); 
        
        // Prevent native scrolling
        Footer.preventNativeScrolling(this)
        
        return this;
    } else {
        return undefined;
    }
    
};

/**
 * Footer
 */
$.extend({
    
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

}, Footer);

/*
 * Styles when Footer is active
 */
var _setStylesWhenFooterIsActive = function(footer, navInstance) {
    var i;
    for (i = navInstance._config.count; i--;) {
        navInstance.items[i].el.style.paddingBottom = footer.height + "px";
    }
}
