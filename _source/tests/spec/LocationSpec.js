describe("Geo", function() {    
    var location,
        address;
    
    // Create a Location object
    runs(function() {
            window.myLocation = location = $.geoLocation({
            error: "error",
            msg: "msg",
            msgLoading: "Loading ...",
            msgFound: "$coords",
            map: "map",
            msgNearby: 'distancia: $distance info: $info',
            dataNearby:  "../../data/sample.xml",
            geocodeApi:  "http://ec2.volks.co:9001/maps/api/geocode/json",
        });  
        waits(500) // Limit in milliseconds
    });

    
    // Geolocation enabled or disabled
    it("should be able to return if user geolocation is enabled", function() {
        runs(function() {
           expect(typeof(location.userEnabled)).toEqual("boolean");
        });
    });

   // Latitude and Longitude
    it("should be able to return lat and lon of user location if location is enabled", function() {
        runs(function() {
            if (location.userEnabled === true) {
                expect(typeof(location.lat)).toEqual("number");
                expect(typeof(location.lon)).toEqual("number");
                expect(location.lat).toNotEqual(0);
                expect(location.lon).toNotEqual(0);            
            }            
        });
    });

    // Latitude and Longitude if location is disabled
    it("should be able to return lat==0 and lon==0 if user location is disabled", function() {
        runs(function() {
            if (location.userEnabled === false) {
                expect(location.lat).toEqual(0);
                expect(location.lon).toEqual(0);
            }
        });
    });
    
    // Address
    it("should be able to return geocoded address", function() {
        runs(function() {
            location.geocode({
                apiURL: "http://ec2.volks.co:9001/maps/api/geocode/json", 
                callback: function(response) { 
                    location.address = response.address;
                }
            });
        });
        waits(500) // Limit in milliseconds
        runs(function() {                    
            expect(typeof(location.address)).toEqual("string");
        });
    });

    // Nearby marker
    it("should be able to return the nearby point from one point to many", function() {
        var marker = {lat: "-34.20388", lng: "-58.311009"},
            markers = [
                {
                    lat: "-34.603884",
                    lng: "-58.411009",
                },
                {
                    lat: "-34.587775",
                    lng: "-58.410323",
                },
                {
                    lat: "-32.9265",
                    lng: "-60.670795",
                },
                {
                    lat: "-34.615365",
                    lng: "-58.429005",
                },
                {
                    lat: "-34.584941",
                    lng:"-58.39995",
                },
                {
                    lat: "-34.677837",
                    lng: "-58.36806",
                },
            ];
            
        debugger;
        runs(function() {
            var result = $.geoNearby(marker, markers);
            expect({lat: result.lat, lng: result.lng}).toEqual(
                {
                    lat: "-34.603884",
                    lng: "-58.411009",
                }
            );
        });
    });

   /* it("should be able to return a list with nearby points from one point to many", function() {
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