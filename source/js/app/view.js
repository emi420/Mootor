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