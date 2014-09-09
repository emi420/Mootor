(function ($) {

    "use strict";
    
    var view = m.app.view("test"),
        _hidden = true;
        
    view.on("ready", function() {
        $("#testClick").on("tap click", function() {
            if (_hidden === true) {
                $("#testP").show();
                _hidden = false;
            } else {
                $("#testP").hide();                
                _hidden = true;
            }
        });
    });
    
}(window.$));

