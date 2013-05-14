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
        
        this.height = this.el.offsetHeight;       

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
            $navigationItem,
            i;
        
        for (i = navigationItems.length; i--;) {
            $navigationItem = $(navigationItems[i]);
            $navigationItem.onTapEnd(function(gesture) {
                var item = navInstance.get(gesture.el.getAttribute("href").replace("#",""));
                if (item.index != navInstance.current) {
                    Item.loadNavigationItem(gesture, self, navInstance);
                }               
            });
            $navigationItem.onTapStart(function(gesture){
                $(gesture.el).setClass("moo-hover");
            });
            $navigationItem.onTapEnd(function(gesture){
                $(gesture.el).removeClass("moo-hover");                
            });            
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
