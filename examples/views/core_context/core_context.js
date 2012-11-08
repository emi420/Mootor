(function($) {

    var view_name = "core_context",
    
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
            nav.header.setTitle("$.context");                        
        },        

            
    }
    
    // Initialize view

    view.init();
    
    $("#core_context_Info").html(
        "Your user agent is: <strong>" + $.context.userAgent + "</strong>"
    );
    
        
}(Mootor));