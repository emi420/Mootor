(function ($) {
    
    "use strict";

    var view = m.app.view("index"),
        inputEmail = $("#inputEmail")[0];
    
    view.ui.panel.on("transitionEnd", function() {
        inputEmail.focus();            
    });
    
    $("#btnLogin").on("tap", function() {
        var email = inputEmail.value;
        if (email !== "") {
            m.app.go("#welcome/" + email );
        } else {
            alert("Type your name!");
            inputEmail.focus();            
        }
    });


}(window.$));
