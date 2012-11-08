(function($) {

    var view_name = "core_unbind",
    
        nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navCurrent = nav.get(view_name),
        $core_unbind_myDiv = $("#core_unbind_myDiv"),
        setClass = function() { $(this).setClass("blue") },
        removeClass = function() { $(this).removeClass("blue") };

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
            nav.header.setTitle("$().unbind()");                        

            $core_unbind_myDiv.on("touchstart", setClass);        
            $core_unbind_myDiv.on("touchend", removeClass);

        },        

            
    }
    
    // Initialize view

    view.init();
    
    $("#core_unbind_Button").onTapEnd(function() {
        $core_unbind_myDiv.unbind("touchstart", setClass);
        $core_unbind_myDiv.unbind("touchend", removeClass);
    });
        
}(Mootor));