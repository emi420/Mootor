describe("UI", function() {

	describe("I want to be able to create inherited instances of UI ", function() {

		beforeEach(createApp);

		it("It should be able to set hidden class for DOM elements", function(done) {
            m.app.view("index").ui.header.hide();
            expect(
                m.app.view("index").ui.header.$el.hasClass("m-hidden")
            ).toBe(true);
            done();
		});

		it("It should be able to remove hidden class for DOM elements", function(done) {
            m.app.view("index").ui.header.show();
            expect(
                m.app.view("index").ui.header.$el.hasClass("m-hidden")
            ).toBe(false);
            done();
		});

		it("It should be able to get the DOM element for the UI instance", function(done) {
            expect(
                $(".m-panel")[0] === m.app.view("index").ui.panel.el
            ).toBe(true);
            done();
		});

		it("It should be able to get the Zepto/jQuery object instance of DOM element for the UI instance", function(done) {
            expect(
                m.app.view("index").ui.panel.$el
            ).toBeDefined();
            done();
		});

	});

});

