describe("Route", function() {

	describe("I want to get regex for a route", function() {
		beforeEach(createApp);
		it("It should be able to get regex for a route", function(done) {
            expect(
                m.app.route("#testview.html").regex === "#testview.html"
            ).toBe(true);
            done();
		});
	});

	describe("I want to get a view for a route", function() {
		beforeEach(createApp);
		it("It should be able to get a view for a route", function(done) {
            expect(
                m.app.route("#testview.html").view === m.app.view("testview")
            ).toBe(true);
            done();
		});
	});

});

