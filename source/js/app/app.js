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
