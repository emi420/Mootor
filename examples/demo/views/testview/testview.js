(function ($) {

    "use strict";
    
    var view = m.app.view("testview");
    
    view.on("load", function() {
       $("#welcomeName").html(view.params[0]);
    });

    var goToHomeView = function () {
        m.app.go("");
    }

    $("#btnOk").on("tap", function(e) {
        goToHomeView();
        $("#btnLogin").off("click", goToHomeView);
    });

    $("#btnOk").on("click", goToHomeView);

    $("#btnOk").on("touchend", function(e) {
        e.preventDefault();
    });
    
}(window.$));