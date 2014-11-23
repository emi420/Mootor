# Getting Started with Mootor


##1. Download

**[https://github.com/emi420/Mootor/blob/master/dist/mootor-beta-v0.1.zip?raw=true](https://github.com/emi420/Mootor/blob/master/dist/mootor-beta-v0.1.zip?raw=true)**

You must run the app on a webserver, for example:

* http://localhost/mootor-app/

## 2. Edit

#### New views

##### 1.Create the files

* **views/my-view/my-view.html** *HTML content for the view*
* **views/my-view/my-view.css** *CSS styles for the view*
* **views/my-view/my-view.js** *JavaScript code for the view*

The scripting of this view will be on *views/my-view/my-view.js* , for example:

    m.app.view("my-view").on("load", function() {
        // code here
    });

Using *m.app.view* you can get the View instance and with the *on* method run code when the view is loaded.  This method support parameters too, for example:

    m.app.view("my-view").on("load", function(self) {
       console.log("Value: " + self.params[0];
    });

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




