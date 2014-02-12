describe("App", function() {

    window._appIsInitTest = false;

    var app = m.app({
        views: ["index"]
    }).on("init", function() {
        window._appIsInitTest = true;
    });	

    var view = m.app().view("index");
    window._testIndexOnLoadView = false;
    view.on("load", function() {
        window._testIndexOnLoadView = true;
    });

    describe("I want to create a new app", function() {
        // Except App instance
    	it("Should be able to return a new app instance", function() {
            window.setTimeout(function() {
        		expect(
        			app instanceof Mootor.App
        		).toBe(true);
            }, 500);
    	});
    });

    describe("I want to determine the behavior of the application's initialization", function() {

    	it("Should be able to define a method callback run after initialization", function() {
            window.setTimeout(function() {
        		expect(
                    window._appIsInitTest
                ).toBe(true);
            }, 500);
    	});
    });

	describe("I want to load views when create a new app", function() {
        
		it("Should be able create a new View instance", function() {
            // Except View instance

            window.setTimeout(function() {
                var view = app.view("testview");

                window.setTimeout(function() {
            		expect(
            			view instanceof Mootor.View
            		).toBeDefined(true);
                }, 500);
                
            }, 500);
		});

		it("Should be able to load view's HTML", function() {
            // Except loaded html source
            window.setTimeout(function() {
                var view = app.view("testview");
    			expect(
        			expect(
        			 	view.html()
        			).toBeDefined()
    			).toBe(true);
            }, 500);
		});

		it("Should be able to load view's JavaScript from the view", function() {
            // Except loaded javascript source
            window.setTimeout(function() {
    			expect(
    			 	view.script()
    			).toBeDefined();

    			//TODO: Index view init function should have been run
    			expect(
    			 	window._testIndexOnLoadView
    			).toBe(true);
            }, 500);

		});
        
		it("Should be able to load view's CSS", function() {
            // Except loaded css source
            window.setTimeout(function() {
                var view = app.view("testview");
    			expect(
    			 	view.css()
    			).toBeDefined();
            }, 500);
			//TODO: Research CSS introspection to check for added classes
		});
        
		it("Should be able to add View instances to the main App instance", function() {    			
            // Except View instance on app
            window.setTimeout(function() {
                var newview = app.view("testview").insert();
                window.setTimeout(function() {
        			expect(
        				app.view("testview") instanceof Mootor.View
        			).toBe(true);
                }, 500);
            }, 500);
		});
	});


	describe("I want to run my app a as web app", function() {

		it("Should be able to load a view from an URL", function() {
            // Except route.view
            //app.router. 
			var route = app.route("/index");
			expect(route.view).toBeDefined();
		});
        
		it("Should be able to detect if it is running in a browser", function() {
            // Except context().browser to be true
            expect(m.context().browser).toBe(true);
		});

	});


	describe("I want to run my app a as native app", function() {

		it("Should be able to detect it is running in PhoneGap / Cordova", function() {
            // Except context().cordova or context().phonegap to be true
            expect(m.context().cordova || m.context().phonegap).toBe(false);
		});
		it("Should be able to detect device vendor", function() {
            // Except context().device.vendor
            expect(m.context().device.vendor).toBeDefined();
		});
		it("Should be able to detect browser vendor, engine and version ... and available features (needs to be more specific)", function() {
            // Except context().browser.vendor, context().browser.version, context().browser.engine 
            expect(m.context().browser.vendor || m.context().browser.version || m.context().browser.engine).toBeDefined();
		});
		it("Should be able to detect hardware buttons", function() {
            // Except context().device.backButton
            expect(m.context().device.backButton).toBeDefined();
		});
		xit("Should be able to define a method callback run on back button event", function() {
            // TODO
		});
		xit("Should be able to define a method callback run on home button event", function() {
            // TODO
		});
		xit("Should be able to define a method callback run on menu button event", function() {
            // TODO
		});
	});


	describe("I want to add a link to another view", function() {

		xit("Should be able to click a link and change the view", function() {

		});
	});


	describe("I want to add a link to another view with parameters", function() {

		xit("Should be able to click a link and change the view and recieve parameters", function() {

		});
	});


	describe("I want to state the version number of my application", function() {

		xit("Should be able to define a version number for the App instance", function() {

		});
	});


	describe("I want to define settings for my app", function() {

		xit("Should be able to set a setting value for the App instance", function() {

		});
		xit("Should be able to read a setting value for the App instance", function() {

		});
	});


	describe("I want to define if my app is on debug or production mode", function() {

		xit("Should be able to set a debug boolean value", function() {

		});
		xit("Should be able to read a debug boolean value", function() {

		});


	});
});

describe("App ync", function() {
	var view;
	beforeEach(function(done) {
	    window._appIsInitTest = false;
	    var app = m.app({views: ["index"], onInit: function() { window._appIsInitTest = true; } });	
	    view = m.app().view("index");

		setTimeout(function() {
		  done();
		}, 100);
	});

    describe("I want to determine the behavior of the application's initialization", function() {

    	it("Should be able to define a method callback run after initialization", function() {
    		expect(
                window._appIsInitTest
            ).toBe(true);
    	});
    });

	describe("I want to load views when create a new app", function() {
		it("Should be able to load view's HTML", function() {
            // Expect html source variable
			expect(
			 	view.html()
			).toBeDefined();

			//Expect code to be in the DOM
			expect(
			 	view.ui.el.childNodes.length > 0
			).toBeDefined();
		});
	})

})
