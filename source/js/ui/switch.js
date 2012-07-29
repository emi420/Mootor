/**
 * Switch
 * @param {object} options Options
 * @config {object} el Switch container
 * @return {object} Switch Mootor UI Switch object
 */
var Switch = function(options) {
    var self = this;
                
    this.input = options.el;                   
    $(this.input).hide();
    this._makeHTML();
    this._setTouchEvents();

    
    if (options.value) {
        this.input.value = options.value;
    }
    
    this.toggle(this.input.value);       
    
    return this;
};

Switch.prototype = {

    _makeHTML: function() {
        var el;
        el = document.createElement("div");
        el.innerHTML = _templates._switch;            
        this.el = el.firstChild;
        this.input.parentElement.appendChild(this.el);                        
    },
    
    _setTouchEvents: function() {
        var self = this,
            el = $(self.el).find("b")[0],

            // FIXME CHECK: 32? 3?
            limit = self.el.offsetWidth - 32,
            treshold = limit / 3,
            swipe = 0;
        
        self.x = 0;
        self.isDragging = 0;

        // On TapEnd: toggle
        $(this.el).onTapEnd(function(gesture) {
            self.toggle();
        });  
        
        // On Swipe: update _swipe flag
        $(this.el).onSwipeRight(function(gesture) {
            self._swipe = 1;

        });   
        $(this.el).onSwipeLeft(function(gesture) {
            self._swipe = -1;
        });         

        // On DragMove: translate container element
        $(this.el).onDragMove(function(gesture) {
            var newX = self.x + (gesture.x - gesture.lastX);  
            
            self.isDragging = 1;                              
            $(self.el).removeClass("moo-on");
            $(self.el).removeClass("moo-off");

            gesture.e.stopPropagation();
            if ((newX <= limit) && (newX > -4)) {
                self.x = newX;
                $(el).translateFx({x: self.x, y: 0}, {transitionDuration: 0});
            }
                                      
        });

        // On DragEnd: check gesture time
        //             and toggle by swipe
        //             or drag
        $(this.el).onDragEnd(function(gesture) {
            var newX;
                            
            gesture.e.stopPropagation();                
            $(el).cleanFx();
            
            if (self._swipe !== 0 && gesture.time < 400) {
                if (self._swipe === 1) {
                    self.toggle(1);                        
                } else {
                    self.toggle(0);                                                
                }
            } else if (self.isDragging === 1) {
                self.isDragging = 0;    

                if (self.x < (limit / 2)) {
                    self.toggle(0);                            
                } else {
                    self.toggle(1);                            
                }                    
            }                    
                                      
        });
    },

    /**
    * Toggle control
    *
    * @example myCheck.toggle();
    */
    toggle: function (value) {
        var el = $(this.el);

        if (value !== undefined) {
            this.value = +value;
        } else {
            if (this.value === 0) {
                this.value = 1;
            } else {
                this.value = 0;
            }                                
        }
        
        if (this.value === 0) {
            el.removeClass("moo-on");
            el.setClass("moo-off");                
        } else {
            el.removeClass("moo-off");
            el.setClass("moo-on");                
        }

        this.input.value = this.value;
        
        if (typeof this.onChange === "function") {
            this.onChange();
        }
    },
    
    on: function(event, callback) {
        switch (event) {
            case "change":
                this.onChange = callback;
                break;
        }
    }
}
