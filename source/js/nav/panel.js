
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
        {y: options.y, x: options.x},
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

    if (typeof panel.onLoad === "function") {
        panel.onLoad();
        panel.height = panel.el.offsetHeight
    }
    
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
                i,
                navInstance_config = navInstance._config,
                block;
                                    
            // Current panel
            panel = navInstance.items[navInstance.current];
            // Back panel 
            back = navInstance.items[navInstance_config.back];
            
            // Display panel
            $(panel.el).show();
            
            if (navInstance_config.anchorBack !== undefined) {
                if (navInstance.current !== 0) {                
                    navInstance_config.anchorBack.show();           
                } else {
                    navInstance_config.anchorBack.hide();
                }
            }

            if (navInstance_config.transitionDuration > 0) {
           
                // Initial position for translate
                positionX = navInstance_config.width + navInstance_config.margin;
                                
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

                navInstance_config.y = 0;
                
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
                
            } else {
                _loadCallback(navInstance, panel, back);
            }

        },
    
    /**
     * Initialize CSS Styles
     */
    initStyles: function(self) {
            var i = 0,
                item = {},
                initPanelSizes;
                
            for (i = self._config.count; i--;) {
    
                item = self.items[i];
                
                if (self._config.transitionDuration > 0) {
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
                }

                if (i > 0) {
                    $(item.el).hide();
                }
                
                // Fill screen vertically
                item.height = item.el.offsetHeight;                
                if (self._config.height > item.height) {
                    item.height = self._config.height;
                }
                
            }
            
            initPanelSizes = function() {
                var clientWidthStyle = $.view.clientW + "px";     
                for (i = self._config.count; i--;) {
                    item.el.style.width = clientWidthStyle;                 
                }           
                self.el.style.width = clientWidthStyle;
                document.body.style.width = clientWidthStyle;
            }
            
            initPanelSizes();
            
            $(window).on("resize", initPanelSizes);
        },
    
    /**
     * Check move
     */
    checkMove: function (gesture, self) {
            var panel = self.items[self.current],
                maxdist = panel.height - self._config.height,
                boostdist,
                boostdistDiscrete,
                boostdistAbs,
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
                
                } else {
                    
                    // FIXME NEEDS IMPROVEMENTS
                    
                    if (self._config.boosting !== false) {
                        boostdist = gesture.velocity.y * 1000;
                        boostdistAbs = Math.abs(boostdist);
                    
                        if (boostdistAbs < 25) {
                            boostdistDiscrete = 0;
                        } else if (boostdistAbs < 50) {
                            boostdistDiscrete = 100;
                        } else if (boostdistAbs < 500) {
                            boostdistDiscrete = 500;
                        } else if (boostdistAbs < 1000) {
                            boostdistDiscrete = 1000;
                        } else if (boostdistAbs < 2000) {
                            boostdistDiscrete = 3000;
                        } else {
                            boostdistDiscrete = 5000;                        
                        }
                    
                        boostdist = boostdistDiscrete * (boostdist / boostdistAbs);
                    
                        self._config.y -= boostdist;

                        if (self._config.y >= 0 || maxdist < -self._config.y) {
                            if (self._config.y > 0) {
                                self._config.y = 0;
                            } else {
                                self._config.y = -maxdist;                            
                            }
                        }

                        _translate({
                            y: self._config.y,
                            el: panel.el,
                            duration: 1,
                        }, self);                    
                        
                    }
                       
                }
                
            }

        },
    
    /** 
     * Move panel 
     */
    move: function(self, item, gesture) {
            var isPermitted = false;
            
            item.y = self._config.y = self._config.y + (gesture.y - gesture.lastY);
            
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
            
            // FIXME CHECK
            item.maxdist = maxdist;
            
            if (isPermitted === true) {
                _translate({
                    el: item.el,
                    y: item.y,
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
