/*
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, document) {

    "use strict";

    var Panel,
        App = $.__App,
        clientWidth = document.documentElement.clientWidth;
    

    // Private constructors

    Panel = function(options) {
        Panel.init(options, this);
    };
    
    // Private static methods and properties
        
    $.extend(Panel, {
        
    	//Initialize panel

    	/**
    	* Turn the given element into a panel: add moo-panel class, set options, transitoin and hide the panel.
    	*
    	* @method init
    	* @param {Object} options The options for the current panel
    	* * transition - A string that specifies the type of transition used to show this panel (none, slide-left, slide-right)
    	* @param {Object} self Panel instance
    	* @return {Object} Returns the same object it's applied to, to allow chaining.
    	*/
    	init: function(options, self) {
            
            var $el = $("#" + options.id);
            self.$el = $el;

    		if (options.transition !== undefined) {
                self.transition = options.transition;
    		} else {
    		    self.transition = "slide-right";
    		}
        
    		$el.hide();
    		$el.addClass("moo-panel");

    		self.addTransitionClass();
    	}

    });
    
    $.extend(Panel.prototype, {
        
    	addTransitionClass: function() {

            var self = this,
                $el = self.$el;
            
    		switch (self.transition) {
    			case "slide-left":
    			case "slide-right":
    				$el.addClass("moo-transition-slide");
    				break;
    			default:
    				$el.addClass("moo-transition-" + self.transition)
    		}		
    	},
    	
    	removeTransitionClass: function() {
            var self = this;
    		self.$el.removeClass("moo-transition-slide moo-transition-none moo-transition-slide-left moo-transition-slide-right");
    	},
    	
    	/**
    	* Shows a panel using the specified transition
    	*
    	* @method show
    	* @return {Object} Returns the same object it's applied to, to allow chaining.
    	*/
    	show: function(){
            var self = this,
                $el = self.$el;
                
    		switch (self.transition) {
    			case "slide-left":
    				self.reposition("left");
    				self.slideIn();
    				break;

    		    case "slide-right":
    				self.reposition("right");
    				self.slideIn();
    		    	break;

    	    	default:
    	    		$el.show();
    		    	break;
    	    }
    	},
    	
    	reposition: function(side) {

    		var self = this,
                $el = self.$el,
                newPosition,
    			evalPosition;

    		if (side == "left") {
    			evalPosition = ($el.left < clientWidth)
    			newPosition = clientWidth;
    		}
    		else if (side == "right") {
    			evalPosition = ($el.left > -1);
    			newPosition = -clientWidth;
    		}

    		//Reposition the panel outside the right edge
    		if  (evalPosition) {

    			//Temporarily remove the transition
    			self.removeTransitionClass()
    			self.addTransitionClass("none");

    			//Move panel outside stage
    	      	$el.css({
    				left: newPosition
    			});
    		}
    	},
    	
    	slideIn: function() {
    		//A timeout is needed for the browser to process the possible repositioning
    		var self = this,
                $el = self.$el;
                
    		setTimeout(function() {

    			//Add back the transition (it's useless in the case it was not removed)
    			self.removeTransitionClass();
    			self.addTransitionClass(self.transition);

    			//Move panel to stage
    	      	$el.show().css({
    				left: 0
    			});

    		}, 1)		
    	},
    	
    	/**
    	* Hides a panel using the specified transition
    	*
    	* @method hide
    	* @return {Object} Returns the same object it's applied to, to allow chaining.
    	*/
    	hide: function(){
            var self = this,
                $el = self.$el;

    		switch (self.transition) {
    			case "slide":
    			case "slide-left":
    		      	$el.css({
    					left: clientWidth
    				});
    				break;
    			case "slide-right":
    		      	$el.css({
    					left: clientWidth
    				});
    				break;
    			default:
    		    	$el.hide();
    	    }
    	}
    });
°    
    // Private constructor
    
    $.__App.panel = function(options) {
        return new Panel(options);
    }


}(window.$, window.document));