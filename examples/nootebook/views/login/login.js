(function ($) {
    
    "use strict";

    var view = m.app.view("login");
    
    view.on("load", function() {
        // code here
    });
    
    var goToList = function() {
        var email = $("#inputEmail")[0].value;
        m.app.go("#list/" + email );
    }

    function login() {
        $.ajax({url:"https://dev.voolks.com/users/login/?username=nootebookuser&password=12345", 
            success: processLogin,
            errror: processError
        });          
    }

    function processLogin(r) {
        if (r.code == "666") {
            alert(r.text);
        }

        
    }
    function processError(r) {
        throw(new Error(r));
    }

    $("#btnLogin").on("tap click", function(e) {
        goToList();
        //login();
        e.preventDefault();
    });


}(window.$));
