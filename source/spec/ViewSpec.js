
describe("View", function() {

    var app = m.app({views: ["index"], onInit: function() { window._appIsInitTest = true; } });	
    var view = m.app().view("index");
    window._testViewOnUnLoadView = true;
    window._testViewOnBeforeUnLoadView = true;
    window._testViewOnBeforeView = true;
    window._testViewOnLoadView = true;

	describe("I want to determine the behavior of the view's load / unload", function() {

		it("Should be able to load a view from an URL", function() {
            // Except route.view
            app.router. 
			var route = app.route("/index");
			expect(route.view).toBeDefined();
		});


		xit("Should be able to define a method callback run after load", function() {
		    view.on("load", function() {
		        window._testViewOnLoadView = true;
		    });
		    app.go("index");

		});
		xit("Should be able to define a method callback run before load", function() {
		    view.on("beforeLoad", function() {
		        window._testViewOnBeforeView = true;
		    });
		    app.go("index");


		});
		xit("Should be able to define a method callback run before unload", function() {
		    view.on("beforeUnload", function() {
		        window._testViewOnBeforeUnLoadView = true;
		    });
		    app.go("index");
		    app.go("view1");

		});
		xit("Should be able to define a method callback run after unload", function() {
		    view.on("unload", function() {
		        window._testViewOnUnLoadView = true;
		    });
		    app.go("index");
		    app.go("view1");

		});
	});


	describe("I want to determine the view's title", function() {

		xit("Should be able to define a view's title", function() {

		});

	});
});