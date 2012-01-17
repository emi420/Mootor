/*
 * Mootor Effects (coded by emi420@gmail.com)
 */

(function(Mootor, window, $) {
    
    Mootor.modules.Fx = function(Moo){
         
        // Module dependences
        var Event = $().Event();
    
        var max_font_size,
        min_font_size;
        
        // Max and Min font sizes
        max_font_size=105;
        min_font_size=20;
        
        // Show an element
        Moo.show = function(e) {
            //console.log(this)
            if( typeof e === "object") {
                e.style.display = "block";
            } else {
                this.get().style.display = "block";
            }
        };
        
        // Hide an element
        Moo.hide = function(e) {
            //console.log(this)
            if( typeof e === "object") {
                e.style.display = "block";
            } else {
                this.get().style.display = "none";
            }
        };
                        
        // Adjust font size relative to viewport size
        Moo.dynamicType = function() {

            // Update viewport font-size
           var updateSize = function() {               

                // This calc can be optimized
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

            };    

            // Add event listeners to update font size when user 
            // rotate device (or resize window)
            Event.bind(window, "orientationChange", updateSize);
            
            // Initialize font-size
            updateSize();
 
         };           
    };

}(Mootor, window, $));