describe("Context", function() {

	describe("I want to know viewport properties", function() {

		beforeEach(createApp);

		it("Should be able to get viewport's height", function(done) {
            expect(typeof m.context.viewport.height).toBe("number")
            done()
		});
		it("Should be able to get viewport's width", function(done) {
            expect(typeof m.context.viewport.width).toBe("number")
            done()
		});
	});



	describe("I want to run my app a as native app", function() {
		beforeEach(createApp);
		it("Should be able to detect it is running in PhoneGap / Cordova", function(done) {
            // Except context().cordova or context().phonegap to be true
            expect(m.context.cordova() || m.context.phonegap()).toBe(window.cordova !== undefined || window.phonegap !== undefined);

            done();

		});



	});

});

