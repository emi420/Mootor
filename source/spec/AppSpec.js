var app,
	view,
	panel;

window._appIsInitTest = false;

if (window.location.hash !== "") {
    window.location = "";
}

var createApp = function(done) {
	if (typeof m.app === "function") {
		app = m.app({
		    views: ["index"]
		});
        
        app.init()
        
        view = app.view("index");
        panel = view.ui;
        
        app.route("/index.html", view);

        view.on("init", function() {
            window._testViewOnInit = true;
        });

        view.on("beforeLoad", function() {
            window._testViewOnBeforeLoad = true;
        });

        view.on("load", function() {
            window._testViewOnLoad = true;
        });

        view.on("beforeUnload", function() {
            window._testViewOnBeforeUnLoad = true;
        });

        view.on("unload", function() {
            window._testViewOnUnLoad = true;
        });
        
        _appIsInitTest = true;

	}
	window.setTimeout(done, 100);
}

describe("App", function() {

    describe("I want to create a new app", function() {
		beforeEach(createApp);
        
    	it("Should be able to return a new app instance", function(done) {

    		expect(
    			app instanceof Mootor.App
    		).toBe(true);

    		done();

    	});
    });

	describe("I want to load views when create a new app", function(done) {
		beforeEach(createApp);
        

        
		it("Should be able create a new View instance", function(done) {
            // Except View instance
        	

    		expect(
    			view instanceof Mootor.View
    		).toBeDefined(true);

    		done();


		});

		it("Should be able to load view's HTML", function(done) {
            // Except loaded html source
			expect(
			 	Mootor.View._getHtmlPath(view)
			).toBeDefined();

			done();

		});

		it("Should be able to load view's JavaScript from the view", function(done) {
            // Except loaded javascript source

			expect(
			 	Mootor.View._getScriptPath(view)
			).toBeDefined();

			done();

		});
        
		it("Should be able to load view's CSS", function(done) {
            // Except loaded css source       
			expect(
			 	Mootor.View._getCssPath(view)
			).toBeDefined();

			done();

		});
        
		it("Should be able to add View instances to the main App instance", function(done) {    			
            // Except View instance on app
            var newview = app.view("testview").insert();
			expect(
				app.view("testview") instanceof Mootor.View
			).toBe(true);

			done();

		});
	});


	describe("I want to run my app a as web app", function() {
		beforeEach(createApp);
		it("Should be able to load a view from an URL", function(done) {
            // Except route.view
       		var view = app.view("testview");   
            app.route("/testview.html", view);         
            app.go("/index.html");
			app.go("/testview.html");
			expect(app.view()).toBe(view);
			done();

		});

	});


	describe("I want to state the version number of my application", function() {
		beforeEach(createApp);
		it("Should be able to define a version number for the App instance", function(done) {
			app.version("0.1");
			expect(
				app.version()
			).toBe("0.1");

			done();

			
		});
	});


	describe("I want to define settings for my app", function() {
		beforeEach(createApp);
		it("Should be able to set a setting value for the App instance", function(done) {
			expect(
				app.settings("testSetting",true)
			).toBe(true);

			done();


		});
		it("Should be able to read a setting value for the App instance", function(done) {
			var testSetting = app.settings("testSetting");
			expect(
				testSetting
			).toBe(true);

			done();


		});
	});


	describe("I want to define if my app is on debug or production mode", function() {
		beforeEach(createApp);
		it("Should be able to set a debug boolean value", function(done) {
			expect(
				app.settings("debug",true)
			).toBe(true);

			done();

		});
		it("Should be able to read a debug boolean value", function(done) {
			expect(
				app.settings("debug")
			).toBe(true);

			done();


		});

	});


    describe("I want to determine the behavior of the application's initialization", function() {
		beforeEach(createApp);

    	it("Should be able to define a method callback run after initialization", function(done) {
    		expect(
                window._appIsInitTest
            ).toBe(true);

            done();
    	});

    	

    });

	describe("I want to load views when create a new app", function() {
		beforeEach(createApp);
		it("Should be able to load view's HTML", function(done) {
			// Expect view 'index' html to be defined
			expect(
                Mootor.View._get("index").html
			).toBeDefined();

			done();
		});

		

	})
});


describe("App Links", function() {

	describe("I want to add a link to another view with parameters", function() {

		beforeEach(function (done) { 
			createApp(done) 
                view = app.view("index");
                app.route("#index/(.*)/(.*)$", app.view("index"));
                a = $("<a href=\"#index/10/20\"></a>").appendTo(view.ui.el);
                a.onclick = function() { return false };
                a.click();
		});

		it("Should be able to click a link and change the view and recieve parameters", function(done) {

			expect(
                view.params[0]
            ).toBe("10");
			expect(
                view.params[1]
            ).toBe("20");
            
            done();

		});
	});


});
