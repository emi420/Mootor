(function(Mootor, window) {

    Mootor.namespace('Mootor.Fx');
    Mootor.Fx = (function() {
        var max_font_size=105,
        min_font_size=20,
        init_client_width=document.documentElement.clientWidth;
        
        return {            
            show: function(e) {
                e.style.display = "block";
            },
            hide: function(e) {
                e.style.display = "none";
            },
            dynamicType: function() {
                /*
                 *  FIXME check: optimize calc 
                 */
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
                },                
                eventHandler = function(fn) {
                   /*
                    *  Check resize events looking for orientationchange
                    *  event (Android not support this event)
                    * 
                    *  FIXME: - use callback function (fn)
                    */
                   var clientWidth = document.documentElement.clientWidth; 
                   if( clientWidth != init_client_width) {
                       if( clientWidth == screen.width || clientWidth == screen.height ) {
                       // on orientationchange
                           updateSize();
                       } else if( clientWidth != screen.width && clientWidth != screen.height){
                       // on resize
                           updateSize();
                       }
                       init_client_width = clientWidth;
                   }
                };

                if( window.onorientationchange ) {
                    window.addEventListener( "onorientationchange", updateSize, false);
                } else {
                    window.addEventListener( "resize", eventHandler, false);                    
                }
                updateSize();
            }       
        };        
    }());   

}(Mootor, window));
