/**
 * @summary Mootor App
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 * @author Martín Szyszlican (martinsz [at] gmail.com)
 */

(function ($) {

    "use strict";
    
/**
* The App class defines the main object of the applications
* It handles creating the views.
*
* $.app({
* 	views: [
* 		"index",
* 		"view1"
* 	]
* });

* @class $.app
* @constructor
* @param {Object} options An object defining options for the application.
* * views - An array with a list of view names. Views have to be present in the /views folder
*/
$.app = function(options) {
	$.app.options = options;

	//Defer init until dom loaded
	Zepto(function($){
		$.app.initViews(options.views);
	}) 
	
}

/**
* A list of the views that is already loaded
* 
* @property loadedViews
* @type {Array}
* @default []
*/	
$.app.loadedViews = [];

/**
* This aplications options
* 
* @property options
* @type {Array}
* @default []
*/	
$.app.options = [];


/**
* Init views, load remote files and call the View class to handle it.
*
* @method initViews
* @param {Array} views A list of view names to be initialized
*/
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

/**
* Method executed once all views have been loaded. Calls the application's "init" method.
*
* @method onFinishLoadingViews
*/
$.app.onFinishLoadingViews = function() {
	$.app.options.init();
}

/**
* Helper function to load a remote script via a <script> element in the <head>.
*
* @method getScript
* @param {String} url The URL to load
* @param {Function} success A function to be called if the request is successful
* @param {Function} error  A function to be called if the request fails
*/
$.app.getScript = function (url, success, error) {
    var script = document.createElement("script"),
        $script = $(script);
    script.src = url;

    $("head").append(script);
    $script.one("load", {url: url}, success);
    $script.one("error", {url: url}, error);
};
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
//Make a local reference to the app
var app =  $.app;


/**
* The View class handles each screen of the application. 
* A list of views is specified in the applications options
* and the files are loaded from the views/ folder.
* Each view has a viewName.js and a viewName.html file.
* The viewName.js file defines options for the view.
*
* @class app.View
* @constructor
* @param {Object} options An object defining options for the current view.
* * constructor - A function that will be run after the view has loaded (optional).
* * animation - a string defining the type of animation used to show this view (one of: "slide-left", "slide-right", "none").
*/
app.View = function(options) {

	//ToDo: MAJOR scope issue here, using this returns App and not View;
	if (options.constructor) {
		options.constructor();
	}
   return this;
}

app.View.prototype = {

	/**
	* Title contains the friendly name for the current view.
	* 
	* @property title
	* @type {string}
	* @default ""
	*/	
	title: "",
	options: {},


	/**
	* ID contains the internal name for the current view, which applies to file names and internal references such as the views definition in the application's options.
	* 
	* @property id
	* @type {string}
	* @default ""
	*/	
	id: "",

	/**
	* A reference to the panel representing this view
	* 
	* @property panel
	* @type {object}
	* @default {}
	*/	
	panel: {},


	/**
	* Sets the title of the view and raises an event.
	*
	* @method setTitle
	* @param {String} title The new title
	* @return {Boolean} Returns true on success
	*/
	setTitle: function (title) {
    	this.title = title;    
    	//app.throw(app.Events.TitleUpdated);
    	return true;
	}
	,
	/**
	* Displays the panel for this view using the animation defined in options.animation
	*
	* @method show
	*/
	show: function() {
		this.panel.show();
	}
}


/**
* Callback for an request error when loadin a view. Static method for the View class.
* Logs error to console, checks if this is the last view and runs callback.
*
* @method handleLoadViewJSError
* @param {Event} e The error event.
*/
app.View.handleLoadViewJSError = function(e) {
	var viewName = app.View.getNameFromURL(e.data.url);
	var viewID = "#"+viewName;
	console.error("Unable to load view: ",viewName);

	app.loadedViews.push(viewName);
	if (app.loadedViews.length == app.options.views.length) {
		app.onFinishLoadingViews();
	}

}

/**
* Callback for success loading a view. Static method for the View class.
* Calls panel initialization for the view, checks if this is the last view and runs callback.
*
* @method handleLoadViewJS
* @param {Event} e The error event.
*/
app.View.handleLoadViewJS = function(e) {
	var viewName = app.View.getNameFromURL(e.data.url);
	var viewID = "#"+viewName;
	console.log("View loaded:",viewName);

	//ToDo: Hardcoded. This transition should come from the view's options.
	this.options = {};
	this.options.transition = "slide-right";

	//Initialize panels for this view
	app.View.initPanel(viewID,this.options.transition);

	app.loadedViews.push(viewName);
	if (app.loadedViews.length == app.options.views.length) {
		app.onFinishLoadingViews();
	}
}

/**
* Initialize panels for this view.
* If panel is not present (i.e: HTML has not loaded yet) then the function is called again in 100ms
*
* @method initPanel
* @param {String} viewID The ID of the panel to initialize 
*/
app.View.initPanel = function(viewID,transition) {
	//If the panel is already loaded, call .panel with options
	//Else wait 100ms and try again
	if ($(viewID).children().length > 0) {
		this.panel = $(viewID).panel({transition: transition});				
	}
	else {
		setTimeout(function () {
			console.log("Panel for view " + viewID + " not loaded, will try again.");
			app.View.initPanel(viewID);	
		}, 100);
	}
}

/**
* Helper method to extract the view name from the url for the view's JS file.
*
* @method getNameFromURL
* @param {String} url The view's file url.
* @return {String} The view's name
*/
app.View.getNameFromURL = function(url) {
	var name = url.split("/")[1];
	return name;
}

/**
* Callback for request when loading a view's html. Static method for the View class.
* It currently does nothing.
*
* @method handleLoadViewHTML
* @param {Event} e The event.
*/
app.View.handleLoadViewHTML = function(e) {
	console.log("handleLoadViewHTML",e);
}
}(window.Zepto));
