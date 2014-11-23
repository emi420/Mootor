# Mootor JS

## m.context()

Provides information about the context in which the application is running.

http://emi420.github.io/Mootor/classes/Context.html


    if (m.context.os === "android") {
         console.log("Your device use Android.");
    }

## m.app(views)

Creates a new app with the defined options.

http://emi420.github.io/Mootor/classes/window.m.html#method_app

    var myApp = m.app({
      views: [
         "index",
         "view1"
      ]
    });

### .route(url, view)

Defines a route using regular expresion and a view instance.

    // Set route
    m.app.route("^#home$", m.app.view("index"));

    // Get route
    route = m.app.route("#home");

You can add parameters too:

    // Set route
    m.app.route("^#product/(.*)", app.view("product"))

    // Get parameters on view load event
    m.app.view("product").on("load", function(self) {
       console.log("Product Id: " + self.params[0];
    });

http://emi420.github.io/Mootor/classes/Router.html

http://emi420.github.io/Mootor/classes/Route.html


### .view(viewId)

The View class handles each view of the application. A list of views is specified in the application options and the files are loaded from the "views" folder. Each view has a viewName.js, viewName.html and viewName.css files.

http://emi420.github.io/Mootor/classes/View.html



    // Get a view
    myView = m.app.view("index")

#### .on(event, callback)

Sets an event handler for the view. 

* load
* beforeLoad
* unload
* beforeUnload
* ready

http://emi420.github.io/Mootor/classes/App.html#method_on

#
	
	m.app.view("index").on("load", function() {
		console.log("You are on the index view");
	});

### .go(url)

Go to an url.

http://emi420.github.io/Mootor/classes/App.html#method_go



    m.app.go("#product/15/");

### .back()

Go to the previous view in the history.

http://emi420.github.io/Mootor/classes/App.html#method_back



    m.app.back(); 
   
### .settings(key, value)

Application settings. If called with a key, returns the value. If called with key and value, sets value to key.

http://emi420.github.io/Mootor/classes/App.html#method_settings



    m.app.settings("debug", true);
    if (m.app.settings("debug") === true) {
         console.log("Debug mode activated.");
    }


### .version(value)

The application's version number.

http://emi420.github.io/Mootor/classes/App.html#method_version

    m.app.version("beta1");
    if (m.app.version().indexOf("beta") > -1) {
        console.log("Warning: beta version")
    }

## m.app.ui

### .header.title(title)

Set text title for the header element.

http://emi420.github.io/Mootor/classes/UIHeader.html#method_title

    m.app.ui.header.title("A new title");


### .loading(value)

Show or hide the 'loading' overlay.

http://emi420.github.io/Mootor/classes/UIApp.html#method_loading

    // Show
    m.app.ui.loading(true)
    // Hide
    m.app.ui.loading()


