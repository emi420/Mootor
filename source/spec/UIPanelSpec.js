describe("Panel", function() {
  var panel;
  beforeEach(function() {
   
    "use strict";
	panel = $.__App.panel({id: "test"})
	
  });
  it("Creates a panel and hides it", function() {
    expect(panel.hasClass("moo-panel")).toBe(true);
  });
  it("hides the panel by default", function() {
    expect(panel.css("display")).toBe("none");
  });
  it("adds transition data", function() {
    expect(panel.data("transition")).toBeDefined();
  });
  it("adds transition class", function() {
    expect(panel.addTransitionClass("test").hasClass("moo-transition-test")).toBe(true);
  });
  it("removes transition class", function() {
    expect(panel.removeTransitionClass().hasClass("moo-transition-none")).toBe(false);
    expect(panel.removeTransitionClass().hasClass("moo-transition-slide")).toBe(false);
  });
  it("Shows a panel", function() {
  	panel.show();
    expect(panel.css("display")).not.toBe("none");
  });
  it("Repositions a panel left", function() {
  	panel.reposition("left");
    expect(panel.css("left")).not.toBe(0);
    expect(panel.css("left")).toBe(document.documentElement.clientWidth + "px");
  });
  it("Repositions a panel right", function() {
  	panel.reposition("right");
    expect(panel.css("left")).not.toBe(0);
    expect(panel.css("left")).toBe("-"+document.documentElement.clientWidth + "px");
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


describe("Panel asynchronous specs", function() {
  var panel;

  beforeEach(function(done) {
	panel = $("<div></div>").panel();
	panel.slideIn();
	setTimeout(function() {
      done();
    }, 2);
  });
  it("Slides a panel in", function(done) {
    expect(panel.css("left")).toBe("0px");
    done();
  });
});