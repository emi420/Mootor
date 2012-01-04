(function(Mootor, window) {

    Mootor.namespace('Mootor.Nav');
    Mootor.Nav = (function() {
        // Dependencies
        // Ex: var ajax = Mootor.utils.init ;
        
        // Private properties
        // ...
        
        // Private methods
        // ... (end var)
        
        // One-time init properties
        // ...
        console.log("Nav one-time init.");
        
        // Public API
        return {            
            Panels: function(panels) {
                console.log("Nav.Panels instance init.");
                var i = 1;
                for(; i < panels.length ; i += 1) {
                    panels[i].style.display = "none";
                }
            }
            // ,...
        };
        
    }());   


}(Mootor, window));
