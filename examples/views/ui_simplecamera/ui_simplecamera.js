(function($) {

    var view_name = "ui_simplecamera",
    
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

            // Initialize navigation items
            navCurrent.initNavigation();

            // Set onLoad callbacks
            navCurrent.onLoad = view.onLoad;
            if(app.views[nav.current].id === view_name) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
            // Set header title
            nav.header.setTitle("UI SimpleCamera");    
            imageElement.src = "";                    
        },        

            
    }
    
    // Initialize view

    view.init();
    
    var scamera = {},
        imageElement = $("#ui_simplecamera_Picture")[0];
    
    scamera = $("#ui_simplecamera_Button").ui({
        type: "SimpleCamera"
    });
    
    scamera.onSuccess = function(src) {
        imageElement.src = src;
    }
       
        
}(Mootor));