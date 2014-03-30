describe("UIApp", function() {

	describe("I want to get the app's ui", function() {

		beforeEach(createApp);

		it("Should be able to get the app's ui", function(done) {
            expect(
                m.app.ui instanceof Mootor.UIApp
            ).toBe(true);
            done();
		});

	});
});

