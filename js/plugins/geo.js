/**
 * Geolocation Mootor plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */
 
 /** 
 * @class
 * @name $ 
 */

var $ = window.$ || $;

(function ($) {

    "use strict";

    var Geo;

    /**
     * Geo
     * @class
     * @param {element} element HTML container element
     * @param {object} options Option parameters
     * @property {element} element HTML container element
     * @property {object} options Option parameters
     */
    Geo = function (element, options) {

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
        
        this.lat = 0;
        this.lon = 0;
                
        success = function (position) {
            var mapOptions,
                map,
                stop,
                msg = options.msg;
                            
                instance.userEnabled = true;
                $.context.geolocation = {lat: instance.lat, lon: instance.lon};

                instance.lat = position.coords.latitude;
                instance.lon = position.coords.longitude;
            
                // Messages
                options.msgFound = options.msgFound.replace(
                    "$coords", "Lat: " + position.coords.latitude + " Lon: " + position.coords.longitude
                );
                options.msg.el.innerHTML = options.msgFound;
        };

        error = function () {
            this.userEnabled = true;
            $.context.geolocation = "error";
        };

        if (window.navigator.geolocation) {
            this.userEnabled = false;
            window.navigator.geolocation.getCurrentPosition(success, error);
        } else {
            $.context.geolocation = "";
        }

    };
    
    Geo.prototype = {
        
        // Geocode function
        geocode: function(options) {
            var address,
                query =  options.apiURL + "?address=" + this.lat + "," + this.lon + "&sensor=true",
                callback;
                        
            callback = function(response) {                
                var jsonData = JSON.parse(response).results[0],
                    address = {
                        address: jsonData.address_components[1].short_name + 
                        " " + jsonData.address_components[0].short_name +
                        ", " + jsonData.address_components[2].short_name
                    }
                options.callback(address);
            }            
            
            $.ajax({
                url: query, 
                callback: callback
            });
            
        }
            
    }
    
    $.extend({
        /**          
         * geolocation
         * @name map
         * @function
         * @memberOf $.prototype
         * @example $("#location").geolocation();
         * @return {Geo} Geolocation object
         */
        geoLocation: function (options) {
            return new Geo(this.el, options);
        },
        
        geoNearby: function(marker, markers) {        
            var nearbyMarker,
                distance,
                tmpMarker;
            
            for (var i = 0; i < markers.length; i++) {
                tmpMarker = markers[i];
                console.log(tmpMarker);
                tmpMarker.distance = $.geoDistance(marker,tmpMarker);
                if (i === 0) {
                    nearbyMarker = tmpMarker;
                } else {
                    if (tmpMarker.distance < nearbyMarker.distance) {
                        nearbyMarker = tmpMarker;
                    };
                }
            }
            return nearbyMarker;
        },
        
        geoDistance: function(a,b) {
            a.lat = eval(a.lat);
            a.lng = eval(a.lng)
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

    }, $);
    
    if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }
    }
    

}($));

