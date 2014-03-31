describe("UIView", function() {

	describe("I want to get the view's ui", function() {

		beforeEach(createApp);

		it("Should be able to get the views's ui", function(done) {
            expect(
                m.app.view("index").ui instanceof Mootor.UIView
            ).toBe(true);
            done();
		});

	});
});

