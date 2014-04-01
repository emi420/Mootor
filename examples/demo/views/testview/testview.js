(function ($) {

    "use strict";
    
    var view = m.app.view("testview");
    
    view.on("load", function() {
        var welcomeName = view.params[0];
        if (welcomeName !== "") {
            $("#welcomeName").html(welcomeName);
        } else {
            m.app.go("");
        }
    });

    $("#btnOk").on("tap", function(e) {
        m.app.go("");
        e.preventDefault();
    });
    
}(window.$));