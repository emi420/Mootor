describe("UIPanel", function() {


  describe("I want to determine the behavior of the panel's load / unload", function() {

    it("Should be able to define panel's transition (slide-right, slide-left, slide-up, slide-bottom, slide-fade, slide-backface, ...)", function() {
      expect(panel.transition()).toBeDefined();
    });
  });

  describe("I want to know the panel properties", function() {

    it("Should be able to get panel's height", function() {
      size = panel.size();
      expect(size.height).toBeGreaterThan(0);
    });
    it("Should be able to get panel's vertical scroll position", function() {
      pos = panel.position();
      expect(pos.x).toBeGreaterThan(0);
    });

  });



  describe("Panel asynchronous specs", function() {
    beforeEach(function () { 
      createApp(done); 
      panel.show();
    });

      it("Slides a panel in", function(done) {
        //TODO: Which one is gonig to be the zeptified element? panel? panel.el? or $(panel.el) ?
        expect(panel.el.css("left")).toBe("0px");
        done();
      });
  });
});