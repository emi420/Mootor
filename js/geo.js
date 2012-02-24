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

    var Map;

    /**
     * Map
     * @class
     * @param {element} element HTML container element
     * @property {element} element HTML container element
     */
    Map = function (element) {

        var success,
            error,
            marker,
            latlng;

        this.el = element;

        success = function (position) {
            var options,
                map,
                google = window.google || undefined,
                stop;

            if (google !== undefined) {

                latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                options = {
                    zoom: 15,
                    center: latlng,
                    mapTypeControl: false,
                    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById(element.id), options);

                marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
                });

            }

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

    $.extend({
        /**          
         * Map
         * @name map
         * @function
         * @memberOf $.prototype
         * @example $("#map").map();
         * @return {Map} Geolocated map
         */
        map: function () {
            return new Map(this.el);
        }

    });

}($));

