# Getting Started with Mootor


## First setup


###1. Clone the project

* git@github.com:emi420/Mootor.git

### 2. Open base app

You must run the app on a webserver, for example:

* http://localhost/Mootor/examples/base/

This *base* is composed of several files:

* index.html  *main HTML file*
* manifest.webapp *example of webapp manifest*
* addview *bash utility for add views*
* views/index/index.js *index view script*
* views/index/index.html *index view template*
* views/index/index.css *index view styles*
* mootor *link to Mootor library*

### 3. Edit the files

#### index.html

Let's see what this file is doing.

##### Header

Includes Mootor css and the color system:

  <link rel="stylesheet" href="mootor/css/mootor.css">
  <link rel="stylesheet" href="mootor/css/color.css">

The color system is a system of colors that can be changed on source/css/_colors.scss if you want to recompile the css source.

Includes Zepto (yes! Mootor can be used with Zepto.js or jQuery)

  <script type="text/javascript" src="mootor/js/zepto-bundle.js"></script>

And includes Mootor:

  <script type="text/javascript" src="mootor/js/mootor.js"></script>
  
##### Script

###### App instance initialization

First, create and *app* instance, with an array of views ids and initialize it:
  
    var app = m.app({
        views: [
            "index",
        ]
    }).init();

* m is for Mootor 
* m.app is a Mootor app instance factory.
* views: [] is an array of views ids, you will need .js, .css and .html files on views/<view id>/ folder
* .init() is a method for initialized the application. You can initialize now or later if you need.

###### URL routing

Route URL to index view:

    app.route("^$", app.view("index"));

*app.route()* takes a regular expresion and a view as parameters.

* http://emi420.github.io/Mootor/classes/Router.html#method_route


##### View

On *views/index/index.html* you can add some HTML code for testing.

The scripting of this view will be on *views/index/index.js* , for example:

    m.app.view("index").on("load", function() {
        // code here
    });

Using *m.app.view* you can get the View instance and with the *on* method run code when the view is loaded.  This method support parameters too, for example:

    m.app.route("^#product/(.*)", app.view("product"));

    m.app.view("product").on("load", function(self) {
       console.log("Product Id: " + self.params[0];
    });

Documentation:

* http://emi420.github.io/Mootor/classes/View.html#method_on







