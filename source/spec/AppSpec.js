var app,
	view;

window._appIsInitTest = false;

var createApp = function(done) {
	if (typeof m.app == "function") {
		console.log("createApp");
		app = m.app({
		    views: ["index"]
		})
		app.on("init",function() {
		    console.log("init");
			window._appIsInitTest = true;	
			view = app.view("index");
			done();	
		})
		app.init();
		

	}
	else {
		console.log("done");
		done();
	}
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
			 	view.html()
			).toBeDefined();

			done();

		});

		it("Should be able to load view's JavaScript from the view", function(done) {
            // Except loaded javascript source

			expect(
			 	view.script()
			).toBeDefined();

			done();

		});
        
		it("Should be able to load view's CSS", function(done) {
            // Except loaded css source       
			expect(
			 	view.css()
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
            app.router.route(view,"/testURL/");
			app.go("/testURL");
			expect(app.view()).toBe(view);

			done();


		});
        
		it("Should be able to detect if it is running in a browser", function(done) {
            // Except context().browser to be true
            expect(typeof m.context.browser).toBe("string");

            done();

		});

	});


	describe("I want to run my app a as native app", function() {
		beforeEach(createApp);
		it("Should be able to detect it is running in PhoneGap / Cordova", function(done) {
            // Except context().cordova or context().phonegap to be false if running jasmine in a web browser
            expect(m.context.cordova || m.context.phonegap).toBe(false);

            done();

		});
		it("Should be able to detect device vendor", function(done) {
            // Except context().device.vendor
            expect(m.context.device.vendor).toBeDefined();

            done();

		});
		it("Should be able to detect browser vendor, engine and version ... and available features (needs to be more specific)", function(done) {
            // Except context().browser.vendor, context().browser.version, context().browser.engine 
            expect(m.context.browser.vendor || m.context.browser.version || m.context.browser.engine).toBeDefined();

            done();

		});
		it("Should be able to detect hardware buttons", function(done) {
            // Except context().device.backButton
            expect(m.context.device.backButton).toBeDefined();

            done();

		});
		xit("Should be able to define a method callback run on back button event", function(done) {
            // TODO

            done();

		});
		xit("Should be able to define a method callback run on home button event", function(done) {
            // TODO

            done();

		});
		xit("Should be able to define a method callback run on menu button event", function(done) {
            // TODO

            done();

		});
	});


	describe("I want to state the version number of my application", function() {
		beforeEach(createApp);
		it("Should be able to define a version number for the App instance", function(done) {
			app.version(0.1);
			expect(
				app.version()
			).toBe(0.1);

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

    	it("Should be able to define a method callback run after initialization", function(done) {
    		expect(
                window._appIsInitTest
            ).toBe(true);

            done();
    	});

    	

    });

	describe("I want to load views when create a new app", function() {
		it("Should be able to load view's HTML", function(done) {
			// Expect view 'index' html to be defined
			expect(
			 	app.view("index").html()
			).toBeDefined();

			done();
		});

		

	})


	describe("I want to add a link to another view", function() {

		var route;

		beforeEach(function(done) {
			window._testURLonLoad = true;
			route = app.route("#testURL",view);
			view.on("load", function () {
				window._testURLonLoad = true;
				done();
			});
			app.go("#testURL");
			    //Add a route, a link and click it
		       
				//a = $("<a href=\"#testURL\"></a>").appendTo(view.el);
				//a.click();
		});

		it("Should be able to obtain a route from a url", function() {
			expect(route.view()).toBe(view);
		})


		it("Should be able to go to a view from url", function(done) {
			expect(app.view()).toBe(view);
			done();
		})




	});

	describe("I want to add a link to another view with parameters", function(done) {

		beforeEach(function(done) {
			route = app.route("#testURL/(.*)",view);
			view.on("load", function () {
				done();
			});
			app.go("#testURL/testValue");
			    //Add a route, a link and click it
		       
				//a = $("<a href=\"#testURL\"></a>").appendTo(view.el);
				//a.click();
		});
		it("Should be able to click a link and change the view and recieve parameters", function(done) {
			expect(app.view().params()).toBe({testParam: "testValue"});

			done();


		});
	});
})