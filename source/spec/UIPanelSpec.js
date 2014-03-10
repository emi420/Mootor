describe("UIPanel", function() {
 
  describe("I want to determine the behavior of the panel's load / unload", function() {

    it("Should be able to define panel's transition (slide-right, slide-left, slide-up, slide-bottom, slide-fade, slide-backface, ...)", function() {
      expect(panel.transition()).toBeDefined();
    });
  });

  describe("I want to know the panel properties", function() {

    it("Should be able to get panel's height", function() {
      expect(panel.$el.height()).toBeDefined();
    });
    it("Should be able to get panel's vertical scroll position", function() {
      pos = panel.position();
      expect(panel.$el.scrollTop()).toBeDefined();
    });

  });
});