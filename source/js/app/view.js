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