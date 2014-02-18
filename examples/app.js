(function ($) {
    
    "use strict";

	var app = window.m.app([
		{"index", "/"},
		{"index", "/(.*).html"},
	]);

	/*var app = window.m.app();
    app.route([
        {"/prdocut", app.view("product")},
        {"/prdocut", app.view("product")},
        {"/prdocut", app.view("product")},
        {"/prdocut", app.view("product")}
    )];*/
    
    app.init()
    

}(window.$));