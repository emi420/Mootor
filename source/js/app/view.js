/**
 * Extend $ to have panel functions
 */

var loadedViews = [];

//Initialize app on document ready
Zepto(function($){ 
	loadViews();
});

function loadViews() {
	for (v in views) {
		var viewname = views[v];
		viewpath_js = "views/"+viewname+"/"+viewname+".js";
		viewpath_html = "views/"+viewname+"/"+viewname+".html";
		$.getScript(viewpath_js,handleLoadViewJS);
		$("<section id='"+viewname+"' class='panel'></section>").load(viewpath_html,handleLoadViewHTML).appendTo("#main");
	}
}

function handleLoadViewJS(e) {
	console.log("handleLoadViewJS",e);
	viewname = e.data.url;
	//Initialize panels
	$(".panel").panel({transition: "slide"});	

	loadedViews.push(viewname);
	if (loadedViews.length == views.length) {
		afterViewsLoaded();
	}
}

function handleLoadViewHTML(e) {
	console.log("handleLoadViewHTML",e);

}

function afterViewsLoaded(e) {
	console.log("afterViewsLoaded",e);
	if (window.App) {
		App();
	}
}

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

	//Extensions to the $. functions

	//Load a remote script
    $.getScript = function (url, success, error) {
        var script = document.createElement("script"),
            $script = $(script);
        script.src = url;

        $("head").append(script);
        $script.one("load", {url: url}, success);
        $script.one("error", {url: url}, error);
    };

