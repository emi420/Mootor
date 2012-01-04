(function(Mootor, window) {

    Mootor.namespace('Mootor.Event');
    Mootor.Event = (function() {
        var pointStartX,
        pointLastX, 
        fn,
        distance;
        swipeHandler = function() {
            switch( event.type ) {
            case "touchstart":
                pointStartX = event.touches[0].pageX;                
                break;
            case "touchmove":
                pointLastX = event.touches[0].pageX;
                distance = event.touches[0].pageX - pointStartX;
                
                if( distance > 10 || distance < 10) {
                    // Swaping
                    // Desplazar paneles (3D transform, etc)
                }
                break;
                case "touchend":
                    console.log("swipe! " + distance);
                    fn.call();
                    pointStartX = 0;
                break;
            }
            //fn.call();
        };
        
        return {            
            addEventListener: function(el ,event, callback ) {
                if( event === "swipe") {
                    /*
                     * TODO: swipe event
                     */
                    fn = callback;
                    el.addEventListener("touchstart", swipeHandler, false);
                    el.addEventListener("touchmove", swipeHandler, false);
                    el.addEventListener("touchend", swipeHandler, false);
                    el.addEventListener("click", swipeHandler, false);
                }
            }
        };        
    }());   

}(Mootor, window));
