describe("Router", function() {

	describe("I want to define a view for an URL route", function() {
		beforeEach(createApp);
        
		it("Should be able to define a regular expression for route the URL to a view", function(done) {
            view = app.view("index");
			app.route("/(.*).html",view);

			expect(app.route("/hola.html").view).toBe(view);
            
            done();
		});
	});


	describe("I want to pass parameters for a view", function() {
		beforeEach(createApp);

		it("Should be able to define a regular expression for read parameters passed to a view", function(done) {
            view = app.view("index");
			app.route("#index/prod-([0-9][0-9])/(.*)/([a-z])",view);

			expect(app.route("#index/prod-15/Product Name/view").view).toBe(view);
            done();

		});
	});

	describe("I want to add a link to another view with parameters", function() {

		beforeEach(function (done) { 
			createApp(done) 
                view = app.view("index");
                app.route("#index/(.*)/(.*)$", app.view("index"));
                $a = $("<a href=\"#index/10/20\"></a>").appendTo(view.ui.el);
                $a.onclick = function() { 
                    return false;
                };
                $a.click();
                
		});

		it("Should be able to click a link and change the view and recieve parameters", function(done) {

			expect(
                view.params[0]
            ).toBe("10");
			expect(
                view.params[1]
            ).toBe("20");
            
            done();

		});
	});



	describe("I want to run my app a as web app", function() {
		beforeEach(createApp);
		it("Should be able to load a view from an URL", function(done) {
            // Except route.view
       		var view = app.view("testview");   
            app.route("#testview.html", view);         
            app.go("#index.html");
			app.go("#testview.html");
            window.setTimeout(function() {
    			expect(app.view()).toBe(view);
    			done();
            }, 500);

		});

	});

});
