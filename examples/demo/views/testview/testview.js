(function ($) {

    "use strict";
    
    var view = m.app.view("testview");
    
    view.on("load", function() {
       $("#welcomeName").html(view.params[0]);
    });

    $("#btnOk").on("tap", function(e) {
        m.app.go("");
    });
    
}(window.$));