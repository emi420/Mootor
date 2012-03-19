describe("Mootor", function() {
    var divMain;    
    
    beforeEach(function() {
        divMain = $("#main");
    });
    
    it("should be able to select return an element by id", function() {
        expect(divMain.el).toEqual(document.getElementById("main"));
    });

    it("should be able to return the query that was passed", function() {
        expect(divMain.query).toEqual("main");
    });

});