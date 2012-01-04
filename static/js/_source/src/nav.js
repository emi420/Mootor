(function(Mootor, window) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {
        // Dependencies
        var Fx = Mootor.Fx;

        return {            
            Panels: function(panels) {
                var Event = Mootor.Event,
                i = 0,
                clientHeight = document.documentElement.clientHeight,
                eventHandler = function() {
                    console.log("Next panel!");
                };
                
                Event.addEventListener(document.body, "swipe", eventHandler);

                for(; i < panels.length ; i += 1) {
                    Fx.hide(panels[i]);
                    if(clientHeight > panels[i].style.height) {
                        panels[i].style.height = clientHeight + "px";
                    }
                }
                Fx.show(panels[0]);                
            }        
        };
    }());   

}(Mootor, window));
