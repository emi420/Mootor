describe("Fx", function() {    
    var divMain;
        
    beforeEach(function() {
        divMain = $("#main");
    });
    
    it("should be able to translate instantatly an element in the viewport space, on webkit", function() {

        $(divMain.el).translate(
            {y: 8473, x: 8953},
            {} 
        );
        
        expect(divMain.el.style.webkitTransform).toNotEqual(undefined);
        expect(divMain.el.style.webkitTransform.indexOf("8473")).toNotEqual(-1);
        expect(divMain.el.style.webkitTransform.indexOf("8953")).toNotEqual(-1);
        
    });
    
    it("should be able to clear all css transforms from an element, on webkit", function() {
        $(divMain.el).cleanFx()
        expect(divMain.el.style.webkitTransform).toEqual("");
    });

    it("should be able to translate instantatly an element in the viewport space, on webkit, \
         with transition duration and callback function", function() {
        runs(function(){
            $(divMain.el).translate(
                {
                    y: 1983, 
                    x: 1983
                },
                {
                    transitionDuration: 0.1, // 100 ms
                    callback: function(){  $(divMain.el).cleanFx() }
                } 
            );
        });
        runs(function(){
            expect(divMain.el.style.webkitTransform).toNotEqual("");
        });
        waits(100);
        runs(function(){
            expect(divMain.el.style.webkitTransform).toEqual("");
        });
    });
        
    
});