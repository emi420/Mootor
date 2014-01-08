/**
 * @summary Troomo is a the new Mootor encarnation started in January 2014
 * @author Emilio Mariscal (emi420 [at] gmail.com) 
 * @author Martín Szyszlican (martinsz [at] gmail.com)
 */

/**
 * Extend $ to have panel functions
 * a
 */

;(function($){
  $.extend($.fn, {
  	//Initialize panel
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
})(Zepto);

//Initialize app on document ready
Zepto(function($){ 
	loadViews();

	if (window.App) {
		App();
	}
});

function loadViews() {
	//Initialize panels
	$(".panel").panel({transition: "slide"});	
}