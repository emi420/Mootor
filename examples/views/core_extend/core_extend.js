(function($) {

    var view_name = "core_extend",
    
        nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navCurrent = nav.get(view_name),
        testvar = {};

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
            nav.header.setTitle("$.extend()");
            
            testvar = {};                     
        },        
            
    }
    
    // Initialize view

    view.init();
    
    $("#core_extend_Load").onTapEnd(function() {
        $.extend({
            test: "This is the testvar.test value"
        }, testvar)
    });
    
    
    $("#core_extend_Show").onTapEnd(function() {
        alert(testvar.test);
    });
    
        
}(Mootor));