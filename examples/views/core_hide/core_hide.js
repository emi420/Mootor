(function($) {

    var view_name = "core_hide",
    
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
            nav.header.setTitle("$().hide()"); 
            
            $("#core_hide_myDiv").show()                       
        },        

            
    }
    
    // Initialize view

    view.init()

    $("#core_hide_Button").onTapEnd(function() {       
        $("#core_hide_myDiv").hide()
    });
    
            
}(Mootor));