(function($) {

    var view_name = "ui_map",
    
        nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navCurrent = nav.get(view_name);

    if( app.settings.debug === true ) {
        console.log("Load " + view_name + ".js");
    }
    
    var ui = {};
    
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
            nav.header.setTitle("Geo");        
                                                   
        },        

            
    }
    
    // Initialize view

    view.init()


    // Initialize UI
    
    $.geo().getCurrentPosition({
        onSuccess: function(position) {
            var html = position.coords.latitude + ',' + position.coords.longitude
            $("#geo_myPosition").html(html);
        },
        onError: function(position) {
            $("#geo_myPosition").html("Error");
        },
    });                

        
}(Mootor));