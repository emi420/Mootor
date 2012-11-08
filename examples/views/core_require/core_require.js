(function($) {

    var view_name = "core_require",
    
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
            nav.header.setTitle("$.require()");     
        },        

            
    }
    
    // Initialize view

    view.init()
    
    var showTestVar = function() {
        alert(app.data.get("testvar"));
    }

    $("#core_require_Load").onTapEnd(function() {
        $.require(
            "views/core_require/test.js", 
            showTestVar
        );
    });
    
    $("#core_require_Show").onTapEnd(function() {
        showTestVar();
    });
    
}(Mootor));