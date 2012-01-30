/*
 * Mootor Geo
 */

(function (Mootor) {

    "use strict";

    var Geo;

    /*
     *      Geo
     */
    Geo = function (element) {
    
        var content,
            success,
            error,
            marker,
            latlng;
        
        this.el = element;

        success = function(position) {
            var res,
                options,
                map;

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
                title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
            });
              
        }

        error = function() {
            element.innerHTML = "error";
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            this.el.innerHTML =  'not supported';
        }
        
    };

    Geo.prototype = {

        /*      
         *     Refresh current location
         */
        refresh: function () {
            cosole.log("refresh");
        }

    };

     /*
      *     Public
      */
    Mootor.Geo = {

        /*          
         *      Panels navigation
         *      Usage: $("#panels").panels();
         */
        map: function () {
            return new Geo(this.el);
        }

    };

    Mootor.extend(Mootor.Geo);

}($));

