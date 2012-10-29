
var Panel = function(){},

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

var _loadCallback = function (self, panel, back) {
    var self_config = self._config;
    
    $(back.el).hide();
    
    self_config.isMoving = false;                 
    
    panel.x = 0;
    self_config.x = 0;
    _translate({el: self.el, x: 0}, self);
    _translate({el: panel.el, x: 0}, self);
    
};

$.extend({
    
    /**
     * Load panel
     */
    load: function(navInstance) {
        
            var panel,
                callback,
                back,
                positionX,
                hiddenContent,
                i,
                navInstance_config = navInstance._config,
                block;
                                    
            // Current panel
            panel = navInstance.items[navInstance.current];
            // Back panel 
            back = navInstance.items[navInstance_config.back];
            
            // Display panel
            $(panel.el).show();
           
            // Initial position for translate
            positionX = navInstance_config.width + navInstance_config.margin;

            if (navInstance.current !== 0) {
                navInstance_config.anchorBack.show();           
            } else {
                navInstance_config.anchorBack.hide();
            }
                                
            if (navInstance_config.direction === 0 || navInstance_config.back === 0) {
            
                // Right

                _translate({el: panel.el, x: positionX}, navInstance);
                panel.x = positionX;
                positionX = -positionX;
            
            } else {
            
                // Left
            
                _translate({el: panel.el, x: -positionX}, navInstance);
                panel.x = -positionX;
                positionX = positionX;

            }

            window.setTimeout(function () {
                _translate({
                    el: navInstance.el,
                    duration: navInstance_config.transitionDuration,
                    x: positionX,
                    callback: function() {
                        _loadCallback(navInstance, panel, back);
                    }
                }, navInstance);
            }, 1);
            
            if (typeof panel.onLoad === "function") {
                panel.onLoad();
            }

        },
    
    /**
     * Initialize CSS Styles
     */
    initStyles: function(self) {
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
                    $(item.el).hide();
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
    
    /**
     * Check move
     */
    checkMove: function (gesture, self) {
            var panel = self.items[self.current],
                maxdist = panel.height - self._config.height,
                i;

            if (self.header !== undefined) {
                maxdist += self.header.height;
            }
                
            if (gesture.type === "dragEnd") {

                // Bounce back
                if (self._config.y >= 0 || maxdist < -self._config.y) {
             
                    if (self._config.y > 0) {
                        self._config.y = 0;
                    } else {
                        self._config.y = -maxdist;                            
                    }
                    
                    // FIXME CHECK
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
     * Move panel 
     */
    move: function(self, item, gesture) {
            var isPermitted = false;
    
            self._config.y = self._config.y + (gesture.y - gesture.lastY);
            
            // FIXME CHECK
            var panel = self.items[self.current],
                maxdist = panel.height - self._config.height,
                i;
            if (self.header !== undefined) {
                maxdist += self.header.height;
            }
            
            if (self._config.transitions === false) {
                if (self._config.y < 0 && maxdist > -self._config.y) {
                    isPermitted = true;
                }
            } else {
                isPermitted = true
            }
            
            if (isPermitted === true) {
                _translate({
                    el: item.el,
                    y: self._config.y,
                    x: item.x
                }, self);
            }
        },

    /**
     * Set styles when Header or Footer is active
     */
    setStylesWhenHeaderOrFooterIsActive: function(height, navInstance) {
        var i;
        for (i = navInstance._config.count; i--;) {
            navInstance.items[i].el.style.paddingTop = height + "px";
        }
    }

}, Panel);
