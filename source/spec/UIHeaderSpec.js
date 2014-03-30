describe("UIHeader", function() {

	describe("I want to get the view's header", function() {
		beforeEach(createApp);        
		it("Should be able to create a UIHeader instance for a view", function(done) {
            // Except view's ui header to be an instance UINavBar
			expect(
			 	m.app.view("index").ui.header instanceof Mootor.UIHeader
			).toBe(true);
            done();

		});
	});

	describe("I want have a back button", function() {
		beforeEach(createApp);        
		it("Should be able to create a UINavItem instance for the back button", function(done) {
            // Except view's ui header back button to be an instance UINavItem
			expect(
			 	m.app.view("index").ui.header.back instanceof Mootor.UINavItem
			).toBe(true);
            done();

		});
	});

	describe("I want set and get header's title", function() {
		beforeEach(createApp);        
		it("Should be able to set and get title", function(done) {
            // Except to title() method set and unset title
            m.app.view("index").ui.header.title("Index view");
			expect(
                m.app.view("index").ui.header.title() === "Index view"
			).toBe(true);
            done();

		});
	});
        
});

