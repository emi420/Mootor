(function ($) {
    
    "use strict";

    var view = m.app.view("index");
    
    view.on("load", function() {
        // code here
    });
    
    $("#btnLogin").on("tap", function() {
        var email = $("#inputEmail")[0].value;
        m.app.go("#welcome/" + email );
    });


}(window.$));
