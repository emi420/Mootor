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
    it("should be able to return lat and lon of user location", function() {
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
    it("should be able to return the nearby point from one point to many", function() {
        runs(function() {
            expect(typeof(location.nearbyMarker)).toEqual("object");
        });
    });

    it("should be able to return a list with nearby points from one point to many", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });

    it("should be able to show a static map image with one or more points", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });

    /*it("should be able to return directions from one point to another", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });
    
    it("should be able to show google map with lines", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });

    it("should be able to show google map with polygons", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });

    it("should be able to show google map with custom tiles", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });
    
    it("should be able to show google map with custom street tiles", function() {
        runs(function() {
            expect(true).toEqual(false);
        });
    });*/
    
});