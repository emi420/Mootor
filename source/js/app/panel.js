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
		this.addClass("moo-transition-"+this.data("transition"))

		return this;
	}
	,
	/**
	* Shows a panel using the specified transition
	*
	* @method showPanel
	* @return {Object} Returns the same object it's applied to, to allow chaining.
	*/
	showPanel: function(){
		if (this.data("transition") == "slide") {

			//Reposition the panel outside the right edge
			if (this.position().left < document.documentElement.clientWidth) {

				//Temporarily remove the transition
				this.removeClass("moo-transition-"+this.data("transition"))
					.addClass("moo-transition-none");

				//Move panel outside stage
		      	this.css({
					left: document.documentElement.clientWidth
				});
			}

			//A timeout is needed for the browser to process the possible repositioning
			var _self = this;
			setTimeout(function() {

				//Add back the transition (it's useless in the case it was not removed)
				_self.addClass("moo-transition-"+_self.data("transition"))
					.removeClass("moo-transition-none");

				//Move panel to stage
		      	_self.show().css({
					left: 0
				});

			}, 1)
	    }
	    else {
	    	this.show();
	    }
		return this;
	}
	,
	/**
	* Hides a panel using the specified transition
	*
	* @method hidePanel
	* @return {Object} Returns the same object it's applied to, to allow chaining.
	*/
	hidePanel: function(){
		if (this.data("transition") == "slide") {
	      	this.css({
				left: -document.documentElement.clientWidth
			});
	    }
	    else {
	    	this.hide();
	    }
		return this;
	}
})
