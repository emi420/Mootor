(function($) {

    var view_name = "core_selector",
    
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
            nav.header.setTitle("$ selector");                        
        },        

            
    }
    
    // Initialize view

    view.init()
    
    $("#myImage").ready(function(){alert("I'm ready!")});
    
    $("#loadMyImage").onTapEnd(function() {
        $("#myImage")[0].src = "http://upload.wikimedia.org/wikipedia/commons/7/76/Clementina.jpg";
    });
        
}(Mootor));