describe("Fx", function() {    
    var divMain;
        
    beforeEach(function() {
        divMain = $("#main");
    });
    
    it("should be able to translate instantatly an element in the viewport space", function() {
        var x = new_x = divMain.el.offsetX,
            y = new_y = divMain.el.offsetY;
            
        $("#main").translate({x:x+10,y:y+10});
        
        new_x = divMain.el.offsetX;
        new_y = divMain.el.offsetY;
        
        expect({x:x,y:y}).toNotEqual({x:new_x,y:new_y});
        
    });

    it("should be able to clear all css transforms from an element", function() {
        expect(true).toEqual(false);
    });
    
});