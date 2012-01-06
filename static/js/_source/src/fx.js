/*
 * Mootor Effects (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {

    Mootor.modules.Fx = function(box){
    
        var max_font_size,
        min_font_size, 
        init_client_width,
        divPanels;
        
        max_font_size=105;
        min_font_size=20;
        init_client_width=document.documentElement.clientWidth;
        
        // Show element
        box.show = function(e) {
            e.style.display = "block";
        };
        
        // Hide element
        box.hide = function(e) {
            e.style.display = "none";
        };
                        
        // Adjust font size relative to viewport size
        box.dynamicType = function() {
           var divPanels = this.obj;
            // Update viewport font-size
           var updateSize = function() {
                var font_size = window.innerWidth / 10 + (window.innerHeight / 40);

                if( typeof(document.body) !== null) {
                    if(font_size < max_font_size && font_size > min_font_size) {
                      document.body.style.fontSize=font_size + "%";                  
                    } else if(font_size >= max_font_size) {
                      document.body.style.fontSize=max_font_size + "%";                  
                    } else if(font_size <= min_font_size) {
                      document.body.style.fontSize=min_font_size + "%";                  
                    }
                }
                divPanels.style.width = document.documentElement.clientWidth + "px";
            };    

            // Handler to capture orientationchange event when is not present
            // or resize on desktop browsers

            var eventHandler = function(fn) {

               /*
                *  FIXME: - use callback function (fn)
                *           updateSize() is hardoded function
                */
               
               // Viewport width size
                   var clientWidth = document.documentElement.clientWidth;                   
 
                   if( clientWidth != init_client_width) {

                      // Check if new width is equal to screen size (orientationchange)
                  // or different (window resize)

                  if (( clientWidth == screen.width || clientWidth == screen.height ) ||
                      ( clientWidth != screen.width && clientWidth != screen.height)) {
                      updateSize();
                  }
                   
                   // Set new init client width
                   init_client_width = clientWidth;
               }
            };

            // Add event listeners to update font size when user 
            // rotate a device or resize a window
            if( window.onorientationchange ) {
                window.addEventListener( "onorientationchange", updateSize, false);
            } else {
                window.addEventListener( "resize", eventHandler, false);                    
            }
            
            // Update current font-size
                updateSize();
 
            };           
    };

}(Mootor, window, $));
