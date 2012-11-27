(function($) {

    var view_name = "ui_camera",
    
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
            nav.header.setTitle('Camera');                        
        },        

            
    }
    
    // Initialize view

    view.init();
    
    var camera = {},
        counterElement = $("#ui_camera_count");
    
    var camera = $("#ui_camera_Button").ui({
        type: "Camera"
    });
    
    camera.onSuccess(function(imageURI) {
       var thumbnail;        
       thumbnail = document.createElement("img");
       thumbnail.src = imageURI
       this.push(thumbnail);
       counterElement.html(this.count);
    });
            
}(Mootor));