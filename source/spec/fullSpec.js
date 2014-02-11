describe("App", function() {
	var app;
	beforeEach(function() {
		app = $.app({views: ["index"]});	
	})
	

	describe("I want to create a new app", function() {


		it("Should be able to return a new app instance", function() {
			expect(
				(typeof app)
			).toBe("object");
			//Actually: We expect it to be an App
		});
	});


	describe("I want to load views when create a new app", function() {

		it("Should be able to load view's HTML", function() {
			view = app.getView("index");
			expect(
				view
			).toBeDefined();

			//Also expect the index html element to be added to the DOM (but that's asynchronous)
			//Also, expect a nonexistant view to throw error

			// expect(
			// 	($("#"+view.id).length > 0)
			// ).toBe(true);

		});
		xit("Should be able to load view's JavaScript from the view", function() {
			view = app.getView("index");
			expect(
				view
			).toBeDefined();

			//Also expect the view's JS to be run (but that's asynchronous)

		});
		xit("Should be able to load view's CSS", function() {
			//I don't know how to test this
		});
		xit("Should be able to add View instances to the main App instance", function() {
			view = app.addView("index");
			expect(
				view
			).toBeDefined();

		});
	});


	describe("I want to determine the behavior of the application's initialization", function() {

		xit("Should be able to define a method callback run after initializaiton", function() {
			var run = false;
			app.addView("index", function() { run = true; });	
			//This is asynchronous
			expect(run).toBe(true);
		});
	});


	describe("I want to load new views to my app", function() {

		it("Should be able to define a method callback run after load", function() {
			var run = false;
			app = $.app({views: ["index"]}, function() { run = true; });	
			//This is asynchronous
			expect(run).toBe(true);

		});
	});


	describe("I want to run my app a as web app", function() {

		xit("Should be able to load a view from an URL", function() {
			var view = app.getViewByURL("/index");
			expect(view).toBeDefined();
		});
		xit("Should be able to detect it is running in a browser", function() {

		});
	});


	describe("I want to run my app a as native app", function() {

		xit("Should be able to detect it is running in PhoneGap / Cordova", function() {

		});
		xit("Should be able to detect device vendor", function() {

		});
		xit("Should be able to detect browser vendor, engine and version ... and available features (needs to be more specific)", function() {

		});
		xit("Should be able to detect hardware buttons", function() {

		});
		xit("Should be able to define a method callback run on back button event", function() {

		});
		xit("Should be able to define a method callback run on home button event", function() {

		});
		xit("Should be able to define a method callback run on menu button event", function() {

		});
	});


	describe("I want to add a link to another view", function() {

		xit("Should be able to click a link and change the view", function() {

		});
	});


	describe("I want to add a link to another view with parameters", function() {

		xit("Should be able to click a link and change the view and recieve parameters", function() {

		});
	});


	describe("I want to state the version number of my application", function() {

		xit("Should be able to define a version number for the App instance", function() {

		});
	});


	describe("I want to define settings for my app", function() {

		xit("Should be able to set a setting value for the App instance", function() {

		});
		xit("Should be able to read a setting value for the App instance", function() {

		});
	});


	describe("I want to define if my app is on debug or production mode", function() {

		xit("Should be able to set a debug boolean value", function() {

		});
		xit("Should be able to read a debug boolean value", function() {

		});


	});
});

describe("Form", function() {
	describe("I want to add Form components to a view", function() {

		xit("Should be able to activate all Form controls for a view", function() {

		});
	});


	describe("I want to determine the behavior of a Form control", function() {

		xit("Should be able to define a default value for the control", function() {

		});
		xit("Should be able to define a method callback run on value change", function() {

		});
		xit("Should be able to disable or enable the control", function() {

		});
		xit("Should be able to define if a control is required or not", function() {

		});
	});


	describe("I want to group multiple controls", function() {

		xit("Should be able to group multiple controls on a fieldset", function() {

		});
		xit("Should be able to return an array of the controls on a fieldset", function() {

		});
	});


	describe("I want to read an set values for a Form control", function() {

		xit("Should be able to read the value of a control", function() {

		});
		xit("Should be able to change the value for the control", function() {

		});
		xit("Should be able to return all values from a fieldset", function() {

		});
	});


	describe("I want to add a control to allow the selection of one value among multiple listed, but only shows the one selected (UIForm.Select)", function() {

		xit("Should be able to select an option by index", function() {

		});
		xit("Should be able to select an option by value", function() {

		});
		xit("Should be able to add options", function() {

		});
	});


	describe("I want to add a control that allow the input of a string of text of one line (Form.Text)", function() {

		xit("Should be able to clear the text with one single action", function() {

		});
	});


	describe("I want to add a control that can be toggled on and off with one action (Form.Checkbox)", function() {

	});


	describe("I want to add a control that allows selecting one option among many, but shows all of them at once (Form.Radio)", function() {

	});


	describe("I want to add a control to input a date (Form.Date)", function() {

	});


	describe("I want to add a control to input a time (Form.Time)", function() {

	});


	describe("I want to add a control to input a long text with multiple lines (Form.TextArea)", function() {

	});


	describe("I want to add a control to input a boolean value (Form.Switch)", function() {

	});


	describe("I want to add a control to attach images or take a photos with the device's camera (Form.Camera)", function() {

		xit("Should be able to add a picture from the camera roll", function() {

		});
		xit("Should be able to add a new picture from the camera", function() {

		});
		xit("Should be able to add several photos", function() {

		});
		xit("Should be able to remove a picture", function() {

		});
		xit("Should be able to remove multiple pictures", function() {

		});
		xit("Should be able to determine the number of pictures that an instance of this control can accept", function() {

		});
		xit("Should be able to return the pictures count", function() {

		});
		xit("Should be able to return the picture URL by picture index", function() {

		});
	});


	describe("I want to auto-complete data into a text input (Form.AutoComplete)", function() {

		xit("Should be able to bind a remote data source", function() {

		});
		xit("Should be able to bind a local data source", function() {

		});
	});


	describe("I want to add a control to input a password (Form.Text , type=password)", function() {

	});


	describe("I want to add a modal box control (UIModal)", function() {

		xit("Should be able to block the interaction with the background", function() {

		});
		xit("Should be able to add controls to this modal box", function() {

		});
		xit("Should be able to input text", function() {

		});
		xit("Should be able to confirm an action", function() {

		});
		xit("Should be able to show an alert", function() {

		});
	});


	describe("I want to display a loading indicator (UILoading)", function() {

		xit("Should be able to display a loading indicator", function() {

		});
		xit("Should be able to hide a loading indicaor", function() {

		});
	});


	describe("I want to hide all the content behind an overlay (UIOverlay)", function() {

		xit("Should be able to display it", function() {

		});
		xit("Should be able to hide it", function() {

		});
	});


	describe("I want to display a map (UIMap)", function() {

		xit("Should be able to set the center position of the map", function() {

		});
		xit("Should be able to define method callback run on map load", function() {

		});
		xit("Should be able to add a marker to the map", function() {

		});
		xit("Should be able to remove a marker from the map", function() {

		});
		xit("Should be able to remove all markers from the map", function() {

		});
		xit("Should be able to define the zoom of the map", function() {

		});
	});
});

describe("Data", function() {



	describe("I want to bind data objects to an App's view", function() {

		xit("Should be able to bind data object with an UI control", function() {

		});
		xit("Should be able to bind data object with an HTML control", function() {

		});
	});


	describe("I want to define models for data", function() {

		xit("Should be able to make relationships within models fields (needs to be more specific)", function() {

		});
	});


	describe("I want to manage data objects for a model", function() {

		xit("Should be able to create a data object", function() {

		});
		xit("Should be able to delete a data object", function() {

		});
		xit("Should be able to update a data object", function() {

		});
		xit("Should be able to count all data objects for a model", function() {

		});
		xit("Should be able to get a data object by its id", function() {

		});
		xit("Should be able to get all data objects for a model", function() {

		});
		xit("Should be able to filter and get data objects for a model (needs to be more specific)", function() {

		});
		xit("Should be able to filter and count data objects for a model (needs to be more specific)", function() {

		});
	});


	describe("I want to request remote data", function() {

		xit("Should be able to request remote data and store it as a model object", function() {

		});
	});


	describe("I want to store data remotely", function() {

		xit("Should be able to take an model object and send it's data to a remote server", function() {

		});
	});


	describe("I want to store data locally", function() {

		xit("Should be able to take an model object and save it's data into local storage", function() {

		});
	});


	describe("I want to request data locally", function() {

		xit("Should be able to request local data and store it as a model object", function() {

		});
	});


	describe("I want to store data locally for use on the app instance", function() {

		xit("Should be able to set data on device memory", function() {

		});
		xit("Should be able to read data from device memory", function() {

		});
		xit("Should be able to remove data from device memory", function() {

		});
	});

});

describe("View", function() {



	describe("I want to determine the behavior of the view's load / unload", function() {

		xit("Should be able to define a method callback run after load", function() {

		});
		xit("Should be able to define a method callback run before load", function() {

		});
		xit("Should be able to define a method callback run before unload", function() {

		});
		xit("Should be able to define a method callback run after unload", function() {

		});
	});


	describe("I want to determine the view's title", function() {

		xit("Should be able to define a view's title", function() {

		});

	});
});

describe("Panel", function() {

	describe("I want to determine the behavior of the panel's load / unload", function() {

		xit("Should be able to define panel's transition (slide-right, slide-left, slide-up, slide-bottom, slide-fade, slide-backface, ...)", function() {

		});
	});


	describe("I want to know the panel properties", function() {

		xit("Should be able to get panel's height", function() {

		});
		xit("Should be able to get panel's vertical scroll position", function() {

		});

	});
});

describe("Viewport", function() {

	describe("I want to know viewport properties", function() {

		xit("Should be able to get viewport's height", function() {

		});
		xit("Should be able to get viewport's width", function() {

		});
	});


	describe("I want to take action when the viewport is resized - (when this case occurs on mobile?)", function() {

		xit("Should be able to set an event callback when the viewport is resized", function() {

		});
	});


	describe("I want to take action when the device is rotated", function() {

		xit("Should be able to set an event callback when the device is rotated", function() {

		});

	});
});

describe("Router", function() {

	describe("I want to define a view for an URL route", function() {

		xit("Should be able to define a regular expression for route the URL to a view", function() {

		});
	});


	describe("I want to pass parameters for a view", function() {

		xit("Should be able to define a regular expression for read parameters passed to a view", function() {

		});
	});
});

