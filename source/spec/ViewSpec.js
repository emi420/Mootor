
describe("View", function() {
	var app,
		view;
	beforeEach(function(done) {
	    app = m.app({views: ["index"], onInit: function() { window._appIsInitTest = true; } });	
	    view = app.view("index");

	    window._testViewOnInit = false;
	    window._testViewOnBeforeLoad = false;
	    window._testViewOnLoad = false;
	    window._testViewOnBeforeUnLoad = false;
	    window._testViewOnUnLoad = false;

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


		setTimeout(function() {
		  done();
		}, 200);
	});


	describe("I want to determine the behavior of a view after is initialized", function() {

		it("Should be able to define a method callback run after init", function() {
			expect(window._testViewOnInit).toBe(true);
		    expect(window._testViewOnBeforeLoad).toBe(false);
		    expect(window._testViewOnLoad).toBe(false);
		    expect(window._testViewOnBeforeUnLoad).toBe(false);
		    expect(window._testViewOnUnLoad).toBe(false);
		});
	});

	describe("I want to determine the behavior of the view's load / unload", function() {

		it("Should be able to define a method callback run before load", function() {
			expect(window._testViewOnInit).toBe(true);
		    expect(window._testViewOnBeforeLoad).toBe(true);
		    expect(window._testViewOnLoad).toBe(false);
		    expect(window._testViewOnBeforeUnLoad).toBe(false);
		    expect(window._testViewOnUnLoad).toBe(false);
		});
		it("Should be able to define a method callback run after load", function() {
			expect(window._testViewOnInit).toBe(true);
		    expect(window._testViewOnBeforeLoad).toBe(true);
		    expect(window._testViewOnLoad).toBe(true);
		    expect(window._testViewOnBeforeUnLoad).toBe(false);
		    expect(window._testViewOnUnLoad).toBe(false);
		});
		it("Should be able to define a method callback run before unload", function() {
			expect(window._testViewOnInit).toBe(true);
		    expect(window._testViewOnBeforeLoad).toBe(true);
		    expect(window._testViewOnLoad).toBe(true);
		    expect(window._testViewOnBeforeUnLoad).toBe(true);
		    expect(window._testViewOnUnLoad).toBe(false);
		});
		it("Should be able to define a method callback run after unload", function() {
			expect(window._testViewOnInit).toBe(true);
		    expect(window._testViewOnBeforeLoad).toBe(true);
		    expect(window._testViewOnLoad).toBe(true);
		    expect(window._testViewOnBeforeUnLoad).toBe(true);
		    expect(window._testViewOnUnLoad).toBe(true);
		});
	});


	describe("I want to determine the view's title", function() {

		it("Should be able to define a view's title", function() {
			view.title("test")
			expect(view.title()).toBe("test");
		});

	});
});