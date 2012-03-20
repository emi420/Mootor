describe("Location", function() {    
    var location;
    
    // Create a Location object
    runs(function() {
        location = $("#location").geolocation({
            error: "error",
            msg: "msg",
            msgLoading: "Loading ...",
            msgFound: "$coords",
            map: "map",
            msgNearby: 'distancia: $distance info: $info',
            dataNearby:  "../../data/sample.xml",
            geocodeApi:  "http://ec2.volks.co:9001/maps/api/geocode/json",
        });  
        waits(1000) // Limit in milliseconds
    });

    
    // Latitude and Longitude
    it("should be able to return lat and lon", function() {
        runs(function() {
            expect(typeof(location.lat)).toEqual("number");
            expect(typeof(location.lon)).toEqual("number");
        });
    });

    // Address
    it("should be able to return geocoded address", function() {
        runs(function() {
            expect(typeof(location.geocode.address)).toEqual("string");
        });
    });

    // Nearby marker
    it("should be able to return the nearby marker", function() {
        runs(function() {
            expect(typeof(location.nearbyMarker)).toEqual("object");
        });
    });

    // Nearby marker
    it("should be able to return distance from my position to the nearby marker", function() {
        runs(function() {
            expect(typeof(location.nearbyMarker.distance)).toEqual("number");
        });
    });

});