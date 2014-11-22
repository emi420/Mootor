
describe("Form", function() {
    
	it("Should be able to detect geolocation", function(done) {

        Mootor.UIFormGeo._onSuccess = function() {
            done();
        }
        Mootor.UIFormGeo._getCurrentPosition({"_$icon":""})
		
	});

});
 