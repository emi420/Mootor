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
