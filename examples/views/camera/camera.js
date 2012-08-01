(function($) {

    // Testing Camera
    
    var sourceType,
  
    camera = function(sourceType) {
        var source;
        if (sourceType === "album") {
            source = Camera.PictureSourceType.SAVEDPHOTOALBUM
        }
        navigator.camera.getPicture(
           onSuccess,
           onFail, 
           { 
               quality: 50, 
               destinationType: Camera.DestinationType.FILE_URI,
               sourceType: source
           }
       );         
    }, 
    
    onSuccess = function(imageURI) {
        $("#myImage").el.src = imageURI;
    },
    
    onFail = function(message) {
        console.log('Failed because: ' + message);
    };

    $("#takePicture").onTapEnd(function(gesture) {
        camera();
    });
        
    $("#choosePicture").onTapEnd(function(gesture) {
        camera("album");
    });


}(Mootor));