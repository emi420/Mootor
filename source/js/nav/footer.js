// #include "nav.js"

/**
 * Footer
 * @param {object} self Nav instance
 * @return {object} Footer Footer instance
 */
var Footer = function(self) {

    // Cache element
    this.el = $("Footer")[0];
    
    if (this.el !== null) {
        
        var setFooterElementHeight = function(Footer) {
            Footer.height = Footer.el.offsetHeight;       
            Footer.el.style.height = Footer.height + "px";      

            // Set styles when Footer active on navigation items
            self._config.navItem.setStylesWhenHeaderOrFooterIsActive(Footer.height, self);         
        }

        if ($._documentIsReady === true) {
            setFooterElementHeight(this);
        } else {
            $(document).ready(function() {
                setFooterElementHeight(self.Footer);            
            });
        }
                
        $(this.el).setClass(self._config.FooterClassName);

        // Initialize back button
        Footer.initAnchorBack(this, self);           
        
        // Initialize nav links
        Footer.initNavigationLinks(this, self); 
        
        // Prevent native scrolling
        Footer.preventNativeScrolling(this)
        
        return this;
    } else {
        return undefined;
    }
    
};

Footer.prototype = {
    setTitle: function(title) {
        $(this.el).find("h1")[0].innerText = title;
    }
}

/**
 * Footer
 */
$.extend({

    initAnchorBack: function(self, navInstance) {
        
        var $anchorBack =
            navInstance._config.anchorBack =
            $($(self.el).find(".moo-nav-back")[0]);
            
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
            i;
        
        for (i = navigationItems.length; i--;) {
            $(navigationItems[i]).onTapEnd(function(gesture) {
                Item.loadNavigationItem(gesture, self, navInstance);                    
            })
        }
    }

}, Footer);

