(function($) {

    var $msg = $("#gestureMessages"),
        addItem = function(text) {
            $msg.html(text);
        };
    
    $("#gestures").onTapEnd(function() {
        addItem("Tap end"); 
    });

    $("#gestures").onTapStart(function() {
        $msg.html("");
        addItem("Tap start"); 
    });

    $("#gestures").onDragStart(function() {
        $msg.html("");
        addItem("Drag start"); 
    });

    $("#gestures").onDragMove(function() {
        addItem("Drag move"); 
    });

    $("#gestures").onDragEnd(function() {
        addItem("Drag end"); 
    });

    $("#gestures").onSwipeRight(function() {
        addItem("Swipe right"); 
    });

    $("#gestures").onSwipeLeft(function() {
        addItem("Swipe left"); 
    });

    $("#gestures").onSwipeUp(function() {
        addItem("Swipe up"); 
    });

    $("#gestures").onSwipeDown(function() {
        addItem("Swipe down"); 
    });
    
}(Mootor));