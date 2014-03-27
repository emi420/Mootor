describe("UILoading", function() {

	describe("I want to display a loading indicator (UILoading)", function() {

		it("Should be able to display a loading indicator", function() {
			m.app.ui.loading(true);
			expect($(".m-loading").not(".m-hidden").get(0).style.display).toBe("");
		});
		it("Should be able to hide a loading indicaor", function() {
			m.app.ui.loading(false);
			expect($(".m-loading").not(".m-hidden").length).toBe(0);
			expect($(".m-loading.m-hidden").length).toBe(1);

		});
	});
});

