(function($) {

    var view_name = "ui_overlay",
    
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
            nav.header.setTitle('UI Overlay');                        
        },        

            
    }
    
    // Initialize view

    view.init();
    
    var overlay = $.ui.overlay(),
        loading = $.ui.loading();
       
    $("#ui_overlay_show_Button").onTapEnd(function() {       
        overlay.show();
        setTimeout(function() { overlay.hide() },  1000);
    });

    $("#ui_loading_show_Button").onTapEnd(function() {       
        loading.show();
        setTimeout(function() { loading.hide() },  1000);
    });

    $("#ui_loadingoverlay_show_Button").onTapEnd(function() {       
        $.loadingScreen.show();
        setTimeout(function() { $.loadingScreen.hide(); },  1000);
    });
    
       
        
}(Mootor));