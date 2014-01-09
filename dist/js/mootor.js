/**
 * @summary Mootor App
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 * @author Martín Szyszlican (martinsz [at] gmail.com)
 */

(function ($) {

    "use strict";
    
// $.app({
// views: [
// "index",
// "view1"
// ]
// });


$.app = function(options) {
	$.app.options = options;

	//Defer init until dom loaded
	Zepto(function($){
		$.app.initViews(options.views);
	}) 
	
}

$.app.loadedViews = [];
$.app.options = [];


$.app.initViews = function (views) {
	for (var v in views) {
		var viewName = views[v];
		var viewPathJS = "views/"+viewName+"/"+viewName+".js";
		var viewPathHTML = "views/"+viewName+"/"+viewName+".html";
		$.app.getScript(viewPathJS,$.app.View.handleLoadViewJS,$.app.View.handleLoadViewJSError);
		var s = $("<section id='"+viewName+"' class='panel'></section>")
			.appendTo("#main")
			.load(viewPathHTML,$.app.View.handleLoadViewHTML);
	   console.log("view processed",viewName,s);
	}
}

$.app.onFinishLoadingViews = function() {
	$.app.options.init();
}

//Helper function to load a remote script
$.app.getScript = function (url, success, error) {
    var script = document.createElement("script"),
        $script = $(script);
    script.src = url;

    $("head").append(script);
    $script.one("load", {url: url}, success);
    $script.one("error", {url: url}, error);
};
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
var View = {}, 
    app =  $.app;

app.View = function(options) {

	//ToDo: MAJOR scope issue here, using this returns App and not View;
	if (options.constructor) {
		options.constructor();
	}
   return this;
}

View.prototype = {
	title: "",
	id: "",
	panel: {},
	setTitle: function (title) {
    	this.title = title;    
    	//app.throw(app.Events.TitleUpdated);
	}
	,
	show: function() {
		this.panel.show();
	}
}



app.View.handleLoadViewJSError = function(e) {
		var viewName = app.View.getNameFromURL(e.data.url);
		var viewID = "#"+viewName;
		console.error("Unable to load view: ",viewName);

		app.loadedViews.push(viewName);
		if (app.loadedViews.length == app.options.views.length) {
			app.onFinishLoadingViews();
		}

	}

app.View.handleLoadViewJS = function(e) {
		var viewName = app.View.getNameFromURL(e.data.url);
		var viewID = "#"+viewName;
		console.log("View loaded:",viewName);

		//Initialize panels for this view
		app.View.initPanel(viewID);

		app.loadedViews.push(viewName);
		if (app.loadedViews.length == app.options.views.length) {
			app.onFinishLoadingViews();
		}
	}

	//Initialize panels for this view
app.View.initPanel = function(viewID) {
		//If the panel is already loaded, call .panel with options
		//Else wait 100ms and try again
		if ($(viewID).children().length > 0) {
			this.panel = $(viewID).panel({transition: "slide"});				
		}
		else if (1==2) {
			setTimeout(function () {
				console.log("Panel for view " + viewID + " not loaded, will try again.");
				app.View.initPanel(viewID);	
			}, 100);
		}
	}

	//Extract the view name from the url for the view's JS file
app.View.getNameFromURL = function(url) {
		var name = url.split("/")[1];
		return name;

	}

app.View.handleLoadViewHTML = function(e) {
		console.log("handleLoadViewHTML",e);
	}
}(window.Zepto));
