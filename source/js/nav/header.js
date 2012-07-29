/**
 * Header
 * @param {object} self Nav instance
 * @return {object} Header Header instance
 */
var Header = function(self) {

    // Cache element
    this.el = $("#moo-header").el;
    
    if (this.el !== null) {
        
        // Cache element height
        this.height = this.el.offsetHeight;            
        $(this.el).setClass(self._config.headerClassName);

        // Initialize back button
        Header.initAnchorBack(this, self);            
        
        // Prevent native scrolling
        Header.preventNativeScrolling(this)
        
        // Set styles when header active on navigation items
        self._config.navItem.setStylesWhenHeaderActive(this.height, self);
        
        return this;
    } else {
        return undefined;
    }
    
};

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
        $(self.el).onDragMove(function(gesture) {
            gesture.e.preventDefault();
        });
    }

}, Header);
