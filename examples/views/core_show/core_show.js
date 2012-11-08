(function($) {

    var view_name = "core_show",
    
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
            nav.header.setTitle("$().show()");                        

            $("#core_show_myDiv").hide()
        },        

            
    }
    
    // Initialize view

    view.init()

    $("#core_show_Button").onTapEnd(function() {       
        $("#core_show_myDiv").show()
    });
     
}(Mootor));