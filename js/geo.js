/**
 * Maplocalization Mootor Fx Plugin
 */
 
 /** 
 * @class
 * @name $ 
 */

var $ = window.$ || $;

(function ($) {

    "use strict";

    var Location;

    /**
     * Location
     * @class
     * @param {element} element HTML container element
     * @param {object} options Option parameters
     * @property {element} element HTML container element
     * @property {object} options Option parameters
     */
    Location = function (element, options) {

        var success,
            error,
            marker,
            latlng,
            optionsKeys,
            instance,
            i;

        this.el = element;
        this.options = options;
        instance = this;
        
        optionsKeys = ["msg","msgLoading","msgFound","error"];
                
        options.msg = $("#" + options.msg);
        options.msg.el.innerHTML = options.msgLoading;
        
                
        success = function (position) {
            var mapOptions,
                map,
                stop,
                msg = options.msg;
            
                instance.lat = position.coords.latitude;
                instance.lon = position.coords.longitude;
            
                // Messages
                options.msgFound = options.msgFound.replace(
                    "$coords", "Lat: " + position.coords.latitude + " Lon: " + position.coords.longitude
                );
                options.msg.el.innerHTML = options.msgFound;
                                
                // Geocoding
                instance.geocode({
                    callback: function(response) {  
                        var jsonData = {};
                        
                        jsonData = JSON.parse(response).results[0];
                        
                        // Show message
                            
                        instance.geocode = {
                            address:  jsonData.address_components[1].short_name + 
                                " " + jsonData.address_components[0].short_name +
                                ", " + jsonData.address_components[2].short_name
                        }
 
                        msg.el.innerHTML += options.msgFound.replace("$address", instance.geocode.address)
 
                        // Request markers xml
                        $.ajax({
                            url: instance.options.dataNearby, 
                            callback: function(data) {
                                var parser = new window.DOMParser(),
                                msgNearby = "",
                                tmpDiv,
                                nearbyMarker,
                                marker,
                                distance,
                                xml=parser.parseFromString(data,"text/xml"),
                                markers = xml.documentElement.getElementsByTagName("marker");

                                for (var i = 0; i < markers.length; i++) {
                                    marker = {lat: markers[i].getAttribute("lat"), lng: markers[i].getAttribute("lng"), data: markers[i].childNodes[1].childNodes[1].data};
                                    if (i === 0) {
                                        nearbyMarker = marker;
                                        nearbyMarker.distance = distanceP(marker, {lat: instance.lat, lng: instance.lon});
                                    } else {
                                        distance = distanceP(marker, {lat: instance.lat, lng: instance.lon});
                                        if (distance < nearbyMarker.distance) {
                                            nearbyMarker.lat = markers[i].getAttribute("lat");
                                            nearbyMarker.lng = markers[i].getAttribute("lng")
                                            nearbyMarker.data = marker.data;
                                            nearbyMarker.distance = distance;
                                        };
                                    }
                                }
                                
                                instance.nearbyMarker = nearbyMarker;

                                tmpDiv = document.createElement("div");
                                tmpDiv.innerHTML = nearbyMarker.data;
                                
                                options.msgNearby = options.msgNearby.replace("$distance",Math.round(nearbyMarker.distance * 100)/100);
                                msg.el.innerHTML += options.msgNearby.replace("$info", tmpDiv.getElementsByClassName("divInfoTiendaMapa textoContenidosV2")[0].innerHTML);
                                
                                // Map image
                                $("#" + options.map).el.innerHTML = '<img class="mapimg" src="http://maps.google.com/maps/api/staticmap?center=' +
                                    nearbyMarker.lat + ',' + nearbyMarker.lng +'&zoom=15&size=' +
                                    Math.round($.view.clientH  / 2) + 'x' + Math.round($.view.clientH / 1.75) +
                                    '&maptype=roadmap&maptype=mapnik&markers=color:red%7Clabel:A%7C' +
                                    nearbyMarker.lat + ',' + nearbyMarker.lng + '&sensor=true" />' +
                                    element.innerHTML;
                                   
                                
                            }
                        });
                    }
                });

            return this;

        };

        error = function () {
            element.innerHTML = "error";
        };

        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(success, error);
        } else {
            this.el.innerHTML =  'not supported';
        }

    };
    
    Location.prototype = {
        geocode: function(options) {
            var address,
                apiURL = "http://ec2.volks.co:9001/maps/api/geocode/json",
                query = apiURL + "?address=" + this.lat + "," + this.lon + "&sensor=true";
            $.ajax({
                url: query, 
                callback: options.callback
            });
            
        }
    }
    
    if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }
    }
    
    var distanceP = function(a,b) {
        a.lat = eval(a.lat);
        a.lng = eval(a.lng);
        var R = 6371, // km
             dLat = (b.lat - a.lat).toRad(),
             dLon = (b.lng - a.lng).toRad(),
             c,
             a;
             
             a.lat = a.lat.toRad(),
             b.lat = b.lat.toRad(),
             a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(a.lat) * Math.cos(b.lat),
             c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

        return (R * c);
    }

    $.extend({
        /**          
         * Location
         * @name map
         * @function
         * @memberOf $.prototype
         * @example $("#map").map();
         * @return {Location} Geolocated map
         */
        location: function (options) {
            return new Location(this.el, options);
        }

    });

}($));

