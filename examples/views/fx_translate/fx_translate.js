(function($) {

    var view_name = "fx_translate",
    
        nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navCurrent = nav.get(view_name),
        $fx_translate_myDiv = $("#fx_translate_myDiv");

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
            nav.header.setTitle("$().translate()");                        

            $fx_translate_myDiv.translate({
                x: 0,
                y: 0,
                transitionDuration: .25
            });

        },        

            
    }
    
    // Initialize view

    view.init();
    
    
    $("#fx_translate_Button").onTapEnd(function() {

        $fx_translate_myDiv.translate({
            x: 100,
            y: 100,
            transitionDuration: .25
        });
            
    });

        
}(Mootor));