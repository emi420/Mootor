(function ($) {

    "use strict";
    
    var view = m.app.view("index");
    
    view.on("ready", function() {
        $("#testClick").on("tap", function() {
            console.log("tap");
        });
        $("#testClick").on("click", function() {
            console.log("click");
        });
    });
    
}(window.$));