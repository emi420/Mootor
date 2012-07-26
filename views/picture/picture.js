(function() {

    /*
     * Camera and localStorage example
     */
    
    // Load pictures
  
    var imageURI = window.localStorage.getItem("imageURI");
    
    // Take or choose and save pictures
    
    var sourceType,
  
    picture = function(sourceType) {
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
        window.localStorage.setItem("imageURI", imageURI);  
        $("#myImage").el.src = imageURI;
    },
    
    onFail = function(message) {
        console.log('Failed because: ' + message);
    };
    
    if (imageURI !== null) {
        $("#myImage").el.src = imageURI;
    }

    $("#takePicture").onTapEnd(function(gesture) {
        picture();
    });
        
    $("#choosePicture").onTapEnd(function(gesture) {
        picture("album");
    });


}());