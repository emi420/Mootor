(function() {

    "use strict";

    var app = m.app({
        views: [
            "index"
        ]
    });

    app.route("^$", app.view("index"));
    app.route("^#welcome/(.*)", app.view("testview"));
    app.route("^#help", app.view("help"));
    app.route("^#about", app.view("about"));
    app.route("^#form", app.view("form"));
    app.route("^#buttons", app.view("buttons"));
    app.route("^#icons", app.view("icons"));
    app.route("^#uinavbar", app.view("uinavbar"));
    app.route("^#test", app.view("test"));
    app.route("^#colors", app.view("colors"));
    app.route("^#text", app.view("text"));
    app.route("^#draw", app.view("draw"));
    
    app.init();
    
}());