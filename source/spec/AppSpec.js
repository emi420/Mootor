// TODO: Async

describe("App", function() {

	var app = m.app({views: ["index"]});	

	describe("I want to create a new app", function() {

		it("Should be able to return a new app instance", function() {
			expect(
				app instanceof Mootor.App
			).toBe(true);
		});
	});

});

window.setTimeout(function() {
    
    describe("App", function() {


    	describe("I want to load views when create a new app", function() {


    		it("Should be able create a new View instance", function() {
                // Except View instance
        		expect(
        			view instanceof Mootor.View
        		).toBeDefined(true);
    		});

    		it("Should be able to load view's HTML", function() {
                // Except loaded html source
    			expect(
    			 	view.html().length > 0;
    			).toBe(true);
    		});

    		xit("Should be able to load view's JavaScript from the view", function() {
                // Except loaded javascript source
    			expect(
    			 	view.script().length > 0;
    			).toBe(true);
    		});
            
    		xit("Should be able to load view's CSS", function() {
                // Except loaded css source
    			expect(
    			 	view.css().length > 0;
    			).toBe(true);
    		});
            
    		xit("Should be able to add View instances to the main App instance", function() {    			
                app.view("testview")
        			.insert(function(view) {
            			expect(
            				view instanceof Mootor.View
            			).toBe(true);
        			});                
    		});
    	});


    	describe("I want to determine the behavior of the application's initialization", function() {

    		xit("Should be able to define a method callback run after initialization", function() {

    		});
    	});


    	describe("I want to determine the behavior of a view after is loaded", function() {

    		it("Should be able to define a method callback run after load", function() {
                var window._testOnLoadView = false;
                
                m.app.view("testview").on("load", function() {
                    window._testOnLoadView = true;
                });
                
                app.go("testview");
                
                window.setTimeout(function() {
        			expect(
        				window._testOnLoadView
        			).toBe(true);
                }, 500);

    		});
    	});


    	describe("I want to run my app a as web app", function() {

    		xit("Should be able to load a view from an URL", function() {
    			var route = app.route("/testing.html");
    			expect(route.view).toBeDefined();
    		});
            
    		xit("Should be able to detect if it is running in a browser", function() {
                // FIXME CHECK
                expect(m.context().browser).toBe(true);
    		});

    	});


    	describe("I want to run my app a as native app", function() {

    		xit("Should be able to detect it is running in PhoneGap / Cordova", function() {

    		});
    		xit("Should be able to detect device vendor", function() {

    		});
    		xit("Should be able to detect browser vendor, engine and version ... and available features (needs to be more specific)", function() {

    		});
    		xit("Should be able to detect hardware buttons", function() {

    		});
    		xit("Should be able to define a method callback run on back button event", function() {

    		});
    		xit("Should be able to define a method callback run on home button event", function() {

    		});
    		xit("Should be able to define a method callback run on menu button event", function() {

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

}, 1000);
