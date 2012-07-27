(function() {

    var $msg = $("#gestureMessages");
    
    $("#gestures").onTapEnd(function() {
        $msg.html("Tap end"); 
    });

    $("#gestures").onTapStart(function() {
        $msg.html("Tap start"); 
    });

    $("#gestures").onDragStart(function() {
        $msg.html("Drag start"); 
    });

    $("#gestures").onDragMove(function() {
        $msg.html("Drag move"); 
    });

    $("#gestures").onDragEnd(function() {
        $msg.html("Drag end"); 
    });

    $("#gestures").onSwipeRight(function() {
        $msg.html("Swipe right"); 
    });

    $("#gestures").onSwipeLeft(function() {
        $msg.html("Swipe left"); 
    });

    $("#gestures").onSwipeUp(function() {
        $msg.html("Swipe up"); 
    });

    $("#gestures").onSwipeDown(function() {
        $msg.html("Swipe down"); 
    });

}());