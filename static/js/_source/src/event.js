(function(Mootor, window, $) {

    Mootor.modules.Event = function(box) {

        var Fx = Mootor.modules.Fx;

        var pointStartX=0,
        pointLastX=0;

        var dragHandler = function(fn) {
            
            var distance=0,
            pageX,
            eventType;

            eventType = event.type;
            
            if ( eventType === "touchmove" || eventType === "touchstart") {
                pageX = event.touches[0].pageX;
                distance =  pageX - pointLastX;
            }

            switch( eventType ) {

            case "touchstart":

                // Initialize previus and start points
                pointLastX = pointStartX = pageX;    
                break;

            case "touchmove":
            
                // Prevents default handlers took over event
                event.preventDefault();
                // Previuos X point
                pointLastX = pageX;                
                // Callback function
                fn(distance);                
                break;
                
            case "touchend":
            
                // Distance from start to last points
                distance = pointStartX - pointLastX;
                fn(distance);
                break;

            }
        };
        
        box.bind = function(el ,event, callback ) {                
                var fn = function() { dragHandler(callback) };                
                // Drag
                switch( event ) {
                case "drag": 
                    el.addEventListener("touchstart", fn, false);
                    el.addEventListener("touchmove", fn, false);                    
                    //el.addEventListener("touchend", fn, false);
                    break;
                case "dragEnd": 
                    el.addEventListener("touchend", fn, false);
                    break;
            }
        };
    };   

}(Mootor, window, $));
