/*
 * Mootor Events (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {

    Mootor.modules.Event = function(box) {

        /*
         * Module dependencies
         */ 

        var Fx = Mootor.modules.Fx;

        var pointStartX=0,
        pointLastX=0,
        init_client_width;        
    
        // Initial viewport width
        init_client_width=document.documentElement.clientWidth;

        // Handler for drag events
        var dragHandler = function(fn) {
            
            var distance=0,
            pageX,
            eventType;

            eventType = event.type;            

            // If touch start or move, update X position and distance            
            // from previous X point

            if ( eventType === "touchmove" || eventType === "touchstart") {
                pageX = event.touches[0].pageX;
                distance =  pageX - pointLastX;
            }

            switch( eventType ) {

            case "touchstart":

                // Initialize previous and start points

                pointLastX = pointStartX = pageX;    
                break;

            case "touchmove":
            
                // Prevents default handlers took over event
                event.preventDefault();

                // Update previuos X point
                pointLastX = pageX;                

                // Call callback function
                fn(distance);                
                break;
                
            case "touchend":
            
                // Update distance from start to last point
                // and call callback function
                
                distance = pointStartX - pointLastX;
                fn(distance);
                break;

            }
        };
        
        // Handler to capture orientationchange event when is not present
        // (ex: Android 2.2) or resize window on desktop browsers
        var viewportHandler = function(fn) {

            // Viewport width size
            var clientWidth = document.documentElement.clientWidth;                   
 
            if( clientWidth != init_client_width) {

                 // Check if new width is equal to screen size (orientationchange)
                 // or different (window resize) and call callback function

                 if (( clientWidth == screen.width || clientWidth == screen.height ) ||
                     ( clientWidth != screen.width && clientWidth != screen.height)) {
                     fn.call();
                 }
                   
                 // Set new init client width
                 init_client_width = clientWidth;
            }
        };   
                       
        /*
         * Public 
         */ 
         
        box.bind = function(el ,event, callback ) {                
            var fn;
            
            switch( event ) {

            case "drag": 

                fn = function() { dragHandler(callback); };                
                el.addEventListener("touchstart", fn, false);
                el.addEventListener("touchmove", fn, false);                    
                break;

            case "dragEnd": 

                fn = function() { dragHandler(callback); };                
                el.addEventListener("touchend", fn, false);
                break;

            case "orientationChange": 
            
                fn = function() { viewportHandler(callback); };                
                if( typeof el.onorientationchange != "undefined" ) {
                    el.addEventListener("orientationchange", fn, false);
                } else {
                    el.addEventListener("resize", fn, false);                    
                }
                break;

            }
        };
    };   

}(Mootor, window, $));
