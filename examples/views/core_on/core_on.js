(function($) {

    var view_name = "core_on",
    
        nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navCurrent = nav.get(view_name);

    if( app.settings.debug === true ) {
        console.log("Load " + view_name + ".js");
    }
    
    view = {
       
        init: function() {
            
            // >> Put view init code here <<
            
            // Set onLoad callbacks
            navCurrent.onLoad = view.onLoad;
            if(app.views[nav.current].id === view_name) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
            // Set header title
            nav.header.setTitle("$().on()");                        
        },        

            
    }
    
    // Initialize view

    view.init()
    
    $("#core_on_myDiv").on("touchstart", function() {
         $(this).setClass("blue");
    });

    $("#core_on_myDiv").on("touchend", function() {
         $(this).removeClass("blue");
    });
            
}(Mootor));