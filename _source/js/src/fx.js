/* 
 *  Mootor Visual FX (coded by emi420@gmail.com)
 */
 
// Module dependencies
var Event = Mootor.Event;

// Max and Min font sizes
var max_font_size=105,
min_font_size=20;

Mootor.Fx = {

    // Show an element
    show: function(e) {
        //console.log(this)
        if( typeof e === "object") {
            e.style.display = "block";
        } else {
            this.el.style.display = "block";
        }
    },
    
    // Hide an element
    hide: function(e) {
        //console.log(this)
        if( typeof e === "object") {
            e.style.display = "block";
        } else {
            this.el.style.display = "none";
        }
    },
                    
    // Adjust font size relative to viewport size
    dynamicType: function() {

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
        // rotate device or resize window
        Event.bind(window, "orientationChange", updateSize);
        Event.bind(window, "resize", updateSize);
        
        // Initialize font-size
        updateSize();
 
     }  
}

Mootor.extend(Mootor.Fx);


