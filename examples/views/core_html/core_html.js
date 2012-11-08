(function($) {

    var view_name = "core_html",
    
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
            nav.header.setTitle("$().html()");   
            
            $("#core_html_myDiv").html("");                     
        },        

            
    }
    
    // Initialize view

    view.init();
    
    $("#core_html_Load").onTapEnd(function() {
        $("#core_html_myDiv").html("<p style='text-align:center'>Lorem ipsum dolor amet</p>");
    });
            
}(Mootor));