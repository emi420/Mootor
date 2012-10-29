(function($) {

    var view_name = "gestures",
    
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
            nav.header.setTitle("Gestures");                        
        },        

            
    }
    
    // Initialize view

    view.init()
    
    // Block panel movement
    $("#gestures").on("touchmove",function(e) {
        e.stopPropagation(); 
        e.preventDefault(); 
    });
    
    // Controllers
    
    var $gestureTestingStatus = $("#gestureTestingStatus");
    
    $("#gestureTestingArea").onTapStart(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onTapStart <br />" + content);
    });
    
    $("#gestureTestingArea").onTapHold(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onTapHold <br />" + content);
    });

    $("#gestureTestingArea").onTapEnd(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onTapEnd <br />" + content);
    });

    $("#gestureTestingArea").onDragStart(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onDragStart <br />" + content);
    });

    $("#gestureTestingArea").onDragMove(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onDragMove <br />" + content);
    });

    $("#gestureTestingArea").onDragEnd(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onDragEnd <br />" + content);
    });

    $("#gestureTestingArea").onSwipeLeft(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onSwipeLeft <br />" + content);
    });
    
    $("#gestureTestingArea").onSwipeRight(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onSwipeRight <br />" + content);
    });    

    $("#gestureTestingArea").onSwipeUp(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onSwipeUp <br />" + content);
    });    

    $("#gestureTestingArea").onSwipeDown(function(gesture) {
        var content = $gestureTestingStatus.el.innerHTML;
        $gestureTestingStatus.html("onSwipeDown <br />" + content);
    });    
        
}(Mootor));