describe("Router", function() {

	describe("I want to define a view for an URL route", function() {
		beforeEach(createApp);

		it("Should be able to define a regular expression for route the URL to a view", function(done) {
			app.route("/(.*).html",view);

			expect(app.route("/hola.html").view).toBe(view);
		});
	});


	describe("I want to pass parameters for a view", function() {
		beforeEach(createApp);

		it("Should be able to define a regular expression for read parameters passed to a view", function(done) {
			app.route("#index/prod-([0-9][0-9])/(.*)/([a-z]",view);

			expect(app.route("#index/prod-15/Product Name/view").view).toBe(view);

		});
	});

});

