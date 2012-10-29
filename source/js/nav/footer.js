// #include "nav.js"

/**
 * Footer
 * @param {object} self Nav instance
 * @return {object} Footer Footer instance
 */
var Footer = function(self) {

    // Cache element
    this.el = $("footer")[0];
    
    if (this.el !== null) {
        
        var setFooterElementHeight = function(footer) {
            footer.height = Footer.el.offsetHeight;       
            footer.el.style.height = Footer.height + "px";      

            // Set styles when Footer active on navigation items
            _setStylesWhenHeaderOrFooterIsActive(footer.height, self);         
        }

        _callbacksOnDocumentReady.push(function() {
            setFooterElementHeight(self.footer);  
        });
                
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

