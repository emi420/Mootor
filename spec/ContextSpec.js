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


	describe("I want to take action when the device is rotated", function() {

		xit("Should be able to set an event callback when the device is rotated", function() {

		});

	});



	describe("I want to run my app a as web app", function() {
		beforeEach(createApp);

        
		it("Should be able to detect if it is running in a browser", function(done) {
            // Except context().browser to be true
            expect(m.context.browser.webkit).toBe(true);

            done();

		});

	});


	describe("I want to run my app a as native app", function() {
		beforeEach(createApp);
		xit("Should be able to detect it is running in PhoneGap / Cordova", function(done) {
            // Except context().cordova or context().phonegap to be true
            expect(m.context.cordova || m.context.phonegap).toBe(true);

            done();

		});
		xit("Should be able to detect hardware buttons", function(done) {
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

});

