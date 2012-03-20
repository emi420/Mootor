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
    
    Geo.prototype = {
        // Sample geocode function
        geocode: function(options) {
            var address,
                apiURL = this.geocodeApi,
                query = apiURL + "?address=" + this.lat + "," + this.lon + "&sensor=true";
            $.ajax({
                url: query, 
                callback: options.callback
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
        geolocation: function (options) {
            return new Geo(this.el, options);
        }

    });

}($));

