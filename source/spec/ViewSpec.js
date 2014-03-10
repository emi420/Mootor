window._testViewOnInit = false;
window._testViewOnBeforeLoad = false;
window._testViewOnLoad = false;
window._testViewOnBeforeUnLoad = false;
window._testViewOnUnLoad = false;

describe("View", function() {

	describe("I want to determine the behavior of a view after is initialized", function() {
		beforeEach(createApp);

		it("Should be able to define a method callback run after init", function(done) {
			expect(window._testViewOnInit).toBe(true);

		    done();
		});
	});

	describe("I want to determine the behavior of the view's load / unload", function() {
		beforeEach(createApp);
        
		it("Should be able to define a method callback run before load", function(done) {
		    expect(window._testViewOnBeforeLoad).toBe(true);

		    done();
		});
		it("Should be able to define a method callback run after load", function(done) {
		    expect(window._testViewOnLoad).toBe(true);

		    done();
		});
		it("Should be able to define a method callback run before unload", function(done) {
		    expect(window._testViewOnBeforeUnLoad).toBe(true);

		    done();
		});
		it("Should be able to define a method callback run after unload", function(done) {
		    expect(window._testViewOnUnLoad).toBe(true);

		    done();
		});
	});


	describe("I want to determine the view's header", function() {
		beforeEach(createApp);

		xit("Should be able to define a view header different from the app's header", function(done) {

		    done();
		});
		it("Should be able to define a view's title", function(done) {
			view.title("test")
			expect(view.title()).toBe("test");

		    done();
		});

	});
});