/**
Extend $ to have panel functions

@class panel
**/
$.extend($.fn, {
	//Initialize panel

	/**
	* Turn the given element into a panel: add moo-panel class, set options, transitoin and hide the panel.
	*
	* @method panel
	* @param {Object} options The options for the current panel
	* * transition - A string that specifies the type of transition used to show this panel (none, slide-left, slide-right)
	* @return {Object} Returns the same object it's applied to, to allow chaining.
	*/
	panel: function(options){
		// `this` refers to the current Zepto collection.
		// When possible, return the Zepto collection to allow chaining.
		if (!options) options = { transition: "none"};
		
		this.addClass("moo-panel")
		this.hidePanel();

		this.data("transition",options.transition);
		this.addTransitionClass(this.data("transition"))

		return this;
	}
	,
	addTransitionClass: function(transitionType) {
		switch (transitionType) {
			case "slide-left":
			case "slide-right":
				this.addClass("moo-transition-slide");
				break;
			default:
				this.addClass("moo-transition-"+transitionType)
		}		
	}
	,
	removeTransitionClass: function() {
		this.removeClass("moo-transition-slide moo-transition-none moo-transition-slide-left moo-transition-slide-right");
	}
	,
	/**
	* Shows a panel using the specified transition
	*
	* @method showPanel
	* @return {Object} Returns the same object it's applied to, to allow chaining.
	*/
	showPanel: function(){
		switch (this.data("transition")) {
			case "slide-left":

				this.reposition("left");

				this.slideIn();
				break;


		    case "slide-right":
				this.reposition("right");
				this.slideIn();
		    	break;

	    	default:
	    		this.show();
		    	break;
	    }
		return this;
	}
	,
	reposition: function(side) {

		var newPosition,
			evalPosition;

		if (side == "left") {
			evalPosition = (this.position().left < document.documentElement.clientWidth)
			newPosition = document.documentElement.clientWidth;
		}
		else if (side == "right") {
			evalPosition = (this.position().left > -1);
			newPosition = -document.documentElement.clientWidth;
			//debugger;

		}

		//Reposition the panel outside the right edge
		if  (evalPosition) {

			//Temporarily remove the transition
			this.removeTransitionClass()
			this.addTransitionClass("none");

			//Move panel outside stage
	      	this.css({
				left: newPosition
			});
		}
	}
	,
	slideIn: function() {
		//A timeout is needed for the browser to process the possible repositioning
		var _self = this;
		setTimeout(function() {

			//Add back the transition (it's useless in the case it was not removed)
			_self.removeTransitionClass();
			_self.addTransitionClass(_self.data("transition"));

			//Move panel to stage
	      	_self.show().css({
				left: 0
			});

		}, 1)		
	}
	,
	/**
	* Hides a panel using the specified transition
	*
	* @method hidePanel
	* @return {Object} Returns the same object it's applied to, to allow chaining.
	*/
	hidePanel: function(){
		switch (this.data("transition")) {
			case "slide":
			case "slide-left":
		      	this.css({
					left: -document.documentElement.clientWidth
				});
				break;
			case "slide-right":
		      	this.css({
					left: document.documentElement.clientWidth
				});
				break;
			default:
		    	this.hide();
	    }
		return this;
	}
})
