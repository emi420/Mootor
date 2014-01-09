/**
 * @summary Mootor App
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 * @author Martín Szyszlican (martinsz [at] gmail.com)
 */

(function ($) {

    "use strict";
    
	var loadedViews = [];

	//Initialize app on document ready
	Zepto(function($){ 
		loadViews();
	});

	function loadViews() {
		for (var v in $.App.views) {
			var viewname = $.App.views[v];
			var viewpath_js = "views/"+viewname+"/"+viewname+".js";
			var viewpath_html = "views/"+viewname+"/"+viewname+".html";
			$.getScript(viewpath_js,handleLoadViewJS,handleLoadViewJSError);
			$("<section id='"+viewname+"' class='panel'></section>").load(viewpath_html,handleLoadViewHTML).appendTo("#main");
		}
	}

	function handleLoadViewJSError(e) {
		var viewname = getNameFromURL(e.data.url);
		var viewid = "#"+viewname;
		console.error("Unable to load view: ",viewname);

		loadedViews.push(viewname);
		if (loadedViews.length == $.App.views.length) {
			afterViewsLoaded();
		}

	}

	function handleLoadViewJS(e) {
		var viewname = getNameFromURL(e.data.url);
		var viewid = "#"+viewname;
		console.log("View loaded:",viewname);

		//Initialize panels for this view
		initPanel(viewid);

		loadedViews.push(viewname);
		if (loadedViews.length == $.App.views.length) {
			afterViewsLoaded();
		}
	}

	//Initialize panels for this view
	function initPanel(viewid) {
		//If the panel is already loaded, call .panel with options
		//Else wait 100ms and try again
		if ($(viewid).children().length > 0) {
			$(viewid).panel({transition: "slide"});				
		}
		else {
			setTimeout(function () {
				console.log("Panel for view " + viewid + " not loaded, will try again.");
				initPanel(viewid);	
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


}(window.Zepto));
