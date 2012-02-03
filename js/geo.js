/*
 * Mootor Geo plugin
 */

var $ = window.$ || $;

(function (Moo) {

    "use strict";

    var Geo;

    /*
     *      Geo
     */
    Geo = function (element) {

        var success,
            error,
            marker,
            latlng;

        this.el = element;

        success = function (position) {
            var options,
                map,
                google = window.google || undefined;

            if (google !== undefined) {

                latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                options = {
                    zoom: 15,
                    center: latlng,
                    mapTypeControl: false,
                    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(element, options);
                
                Moo.Event.bind(element, "onDrag", {
                    onDragMove: function() { 
                            //if (event.target === element) {
                                event.preventDefault();
                                event.stopPropagation();
                                return false;
                            //}
                        }
                });

                marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
                });

            }

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

        /*      
         *     Refresh current location
         */
        refresh: function () {
            // TODO: refresh map
        }

    };

     /*
      *     Public
      */
    Moo.Geo = {

        /*          
         *      Panels navigation
         *      Usage: $("#panels").panels();
         */
        map: function () {
            return new Geo(this.el);
        }

    };

    Moo.extend(Moo.Geo);

}($));

