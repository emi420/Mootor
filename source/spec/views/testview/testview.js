(function ($) {
    
   // console.log("test view init");
    
    var view = m.app.view("testview");
    
    view.on("load", function() {
       // console.log("testview view loaded");
    });

    $("#btnOk").on("tap", function(e) {
        m.app.go("");
    });

    $("#btnOk").on("touchend", function(e) {
        e.preventDefault();
    });
    
}(window.$));