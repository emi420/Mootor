describe("Gestures", function() {
    var divMain,
        eventClick = document.createEvent("HTMLEvents");
        eventClick.initEvent("click", false, true),
        bindCallback = function() { $.testCallback = true;},
        bindCallback2 = function() { $.testCallback2 = true;};
        
    beforeEach(function() {
        $.testCallback = false;
        $.testCallback2 = false;
        divMain = $("#main");
    });    
    
    
    /*
    See:
    
        https://developer.mozilla.org/en/DOM/event.initMouseEvent
        https://developer.mozilla.org/en/DOM/element.dispatchEvent
        https://developer.mozilla.org/en/DOM/document.createEvent
        
    To emulate mouse events.
    
    it("should be able to bind Drag Start events to a callback function", function() {
        $("#main").onDragStart(bindCallback);        
        $("#main").el.dispatchEvent(eventClick);
        expect($.testCallback).toEqual(true);  
        expect(true).toEqual(false);
    });

    it("should be able to bind Drag End events to a callback function", function() {
        expect(true).toEqual(false);
    });

    it("should be able to bind Drag Move events to a callback function", function() {
        expect(true).toEqual(false);
    });

    it("should be able to bind Tap Start events to a callback function", function() {
        expect(true).toEqual(false);
    });

    it("should be able to bind Tap Hold events to a callback function", function() {
        expect(true).toEqual(false);
    });
    
    it("should be able to bind Tap End events to a callback function", function() {
        expect(true).toEqual(false);
    });
    
    it("should be able to bind Swipe events to a callback function", function() {
        expect(true).toEqual(false);
    });

    it("should be able to bind Pinch events to a callback function", function() {
        expect(true).toEqual(false);
    });

    it("should be able to bind Pinch (with more than 2 fingers) events to a callback function", function() {
        expect(true).toEqual(false);
    });

    it("should be able to bind Double Tap events to a callback function", function() {
        expect(true).toEqual(false);
    });
    */

    
});
