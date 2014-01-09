var loadedViews = [];

//Initialize app on document ready
Zepto(function($){ 
	loadViews();
});

function loadViews() {
	for (var v in $.App.views) {
		var viewName = $.App.views[v];
		var viewPathJS = "views/"+viewName+"/"+viewName+".js";
		var viewpath_html = "views/"+viewName+"/"+viewName+".html";
		$.getScript(viewPathJS,handleLoadViewJS,handleLoadViewJSError);
		$("<section id='"+viewName+"' class='panel'></section>").load(viewpath_html,handleLoadViewHTML).appendTo("#main");
	}
}

function handleLoadViewJSError(e) {
	var viewName = getNameFromURL(e.data.url);
	var viewID = "#"+viewName;
	console.error("Unable to load view: ",viewName);

	loadedViews.push(viewName);
	if (loadedViews.length == $.App.views.length) {
		afterViewsLoaded();
	}

}

function handleLoadViewJS(e) {
	var viewName = getNameFromURL(e.data.url);
	var viewID = "#"+viewName;
	console.log("View loaded:",viewName);

	//Initialize panels for this view
	initPanel(viewID);

	loadedViews.push(viewName);
	if (loadedViews.length == $.App.views.length) {
		afterViewsLoaded();
	}
}

//Initialize panels for this view
function initPanel(viewID) {
	//If the panel is already loaded, call .panel with options
	//Else wait 100ms and try again
	if ($(viewID).children().length > 0) {
		$(viewID).panel({transition: "slide"});				
	}
	else {
		setTimeout(function () {
			console.log("Panel for view " + viewID + " not loaded, will try again.");
			initPanel(viewID);	
		}, 100);
	}
}

//Extract the view name from the url for the view's JS file
function getNameFromURL(url) {
	var name = url.split("/")[1];
	return name;

}

function handleLoadViewHTML(e) {
	console.log("handleLoadViewHTML",e);

}

function afterViewsLoaded(e) {
	console.log("afterViewsLoaded",e);
	if ($.App.init) {
		$.App.init();
	}
}

/**
 * Extend $ to have panel functions
 */
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
