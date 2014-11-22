# Getting Started with Mootor


##1. Download

**[https://github.com/emi420/Mootor/blob/master/dist/mootor-beta-v0.1.zip?raw=true](https://github.com/emi420/Mootor/blob/master/dist/mootor-beta-v0.1.zip?raw=true)**

You must run the app on a webserver, for example:

* http://localhost/mootor-app/

This *base app* is composed of several files:

* index.html  *main HTML file*
* manifest.webapp *example of webapp manifest*
* views/index/index.js *index view script*
* views/index/index.html *index view template*
* views/index/index.css *index view styles*


## 2. Edit

#### New views

##### 1.Create the files

* views/my-view/my-view.html - HTML content for the view
* views/my-view/my-view.css - CSS styles for the view
* views/my-view/my-view.js - JavaScript code for the view

On *views/my-view/my-view.html* you can add some HTML code for testing.

The scripting of this view will be on *views/my-view/my-view.js* , for example:

    m.app.view("my-view").on("load", function() {
        // code here
    });

Using *m.app.view* you can get the View instance and with the *on* method run code when the view is loaded.  This method support parameters too, for example:

    m.app.route("^#my-view/(.*)", app.view("my-view"));

    m.app.view("my-view").on("load", function(self) {
       console.log("Value: " + self.params[0];
    });

Documentation:

* http://emi420.github.io/Mootor/classes/View.html#method_on


##### 2.Add view on app init

    var app = m.app({
        views: [
            "index",
            "my-view",


##### 3.Add a route

    app.route("^#my-view$", app.view("my-view"));

Now you can load the view on the browser, for example:

* http://localhost/mootor-app/#my-view

*app.route()* takes a regular expresion and a view as parameters.

* http://emi420.github.io/Mootor/classes/Router.html#method_route




