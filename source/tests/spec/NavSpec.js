describe("Nav", function() {
    var testNav;
    
    it("should be able to initialize a navigation area and return a Nav object", function() {
        testNav = $("#panels").nav()
        expect(typeof(testNav)).toEqual("object");
    });

    it("should be able to return panels count", function() {
        expect(testNav.count).toEqual(2);
    });

    it("should be able to return current panel", function() {
        expect(testNav.current).toEqual(0);
        testNav.set(testNav.items[1].el.id);
        testNav.load();
        expect(testNav.current).toEqual(1);
    });

/***
    it("should be able to return last or current navigation movement direction", function() {
        expect(true).toEqual(false);
    });

    it("should be able to return the navigation main container element", function() {
        expect(true).toEqual(false);
    });

    it("should be able to return the navigation main container height", function() {
        expect(true).toEqual(false);
    });

    it("should be able to return the navigation main container width", function() {
        expect(true).toEqual(false);
    });

    it("should be able to return the navigation main container current X axis position", function() {
        expect(true).toEqual(false);
    });

    it("should be able to return the navigation main container current Y axis position", function() {
        expect(true).toEqual(false);
    });

    it("should be able to return a navigation history", function() {
        expect(true).toEqual(false);
    });
    
    it("should be able to return if container is moving", function() {
        expect(true).toEqual(false);
    });
    
    it("should be able to go back to previous panel on navigation history", function() {
        expect(true).toEqual(false);
    });

    it("should be able to load a panel by id", function() {
        expect(true).toEqual(false);
    });
    
    it("should be able to load a panel by index", function() {
        expect(true).toEqual(false);
    });

    it("should be able to link an element with a rel attribute to a panel", function() {
        expect(true).toEqual(false);
    });

    it("should be able to initialize a panels area", function() {
        expect(true).toEqual(false);
    });

    it("should be able to initialize a header area", function() {
        expect(true).toEqual(false);
    });

    it("should be able to initialize a footer area", function() {
        expect(true).toEqual(false);
    });

    it("should be able to hide/show back button when cannot go back", function() {
        expect(true).toEqual(false);
    });

    it("should be able to show a title for each panel", function() {
        expect(true).toEqual(false);
    });
    
    it("should be able to change URI when load a panel", function() {
        expect(true).toEqual(false);
    });

    it("should be able to load a panel from URI", function() {
        expect(true).toEqual(false);
    });
    ***/

});
