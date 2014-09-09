describe("Event", function() {

	describe("I want to have an event based workflow", function() {
		beforeEach(createApp);

        var myObject = function(){};
            pong = 0;
            
        Mootor.Event.extend(myObject, "myObject");
        
		it("I should be able to add events to any custom object", function(done) {
            myObject.on("ping", function() {
                pong++;
            });
            myObject.dispatch("ping", myObject);
            window.setTimeout(function() {
                expect(pong).toBe(1);
                done();
            }, 5);
		});
        
		it("I should be able to fire events from any custom object", function(done) {
            myObject.dispatch("ping");
            window.setTimeout(function() {
                expect(pong).toBe(2);
                done();
            }, 15);
		});
        
	});
});

