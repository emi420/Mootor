/**
 * Camera
 * @return {object} Camera Mootor UI Camera object
 */
var Camera = function(options) {

    this.input = options.el;

    Camera._makeHTML(options, this);       
    Camera._setTouchEvents(this);               
    Camera._initProperties(this, options);

    // Init value
    if (options.value !== undefined) { 
        this.value = options.value;
    }
    
    return this;
            
};

/*
 * Public prototype
 */
Camera.prototype = {        
    
    show: function() {
        $(this.el).removeClass("moo-hidden");
    },
    
    hide: function() {
        $(this.el).setClass("moo-hidden");
    },
    
    onCamera: function(callback) {
        this.onCamera = callback;  
    },

    onSuccess: function(callback) {
        this.onSuccess = callback;  
    },

    onFail: function(callback) {
        this.onFail = callback;  
    },
    
}

/*
 * Private static properties
 */
$.extend({
    _makeHTML: function(options, self) {
        var type = options.type,
            el = document.createElement("div");
        el.innerHTML = _templates.camera;

        self.el = el.firstChild;
        self.takeButton = $(self.el).find(".moo-ui-add-new")[0];
        self.chooseButton = $(self.el).find(".moo-ui-add-filed")[0];
        self.imageWrapper = $(self.el).find(".moo-image-wrapper")[0];
        self.imageList = $(self.el).find(".moo-image-list")[0];

        $(self.el).hide();
        $(document.body).el.appendChild(self.el);
        // FIXME CHECK: remove template element
        //self.el.removeChild(self.imageWrapper);
    },
    _setTouchEvents: function(self) {
    
        // Show/hide box
        $(self.input).onTapEnd(function() {
           $(self.el).show();
        });
        $(self.el).onTapEnd(function() {
           $(self.el).hide();
        });
        
        // Take/choose pictures
        $(self.takeButton).onTapEnd(function() {
            Camera.camera(self);
        });
        $(self.chooseButton).onTapEnd(function() {
            Camera.camera(self, "album");
        });
    },
    _initProperties: function(self, options) {
        self.quality = self.quality ? self.quality : 50;
        self.width = self.width ? self.width : 1024;
        self.height = self.height ? self.height : 768;
    },
    camera: function(self, sourceType) {
        var source;

        if (typeof self.onCamera === "function") {
            self.onCamera();
        }        
        if (sourceType === "album") {
            source = window.Camera.PictureSourceType.SAVEDPHOTOALBUM
        }

       var onSuccess = function(data) {
           // TODO: update image list? use callback?
           self.onSuccess(data);
       };

       navigator.camera.getPicture(           
           onSuccess,
           self.onFail, 
           { 
               quality: self.quality, 
               destinationType: window.Camera.DestinationType.FILE_URI,
               sourceType: source,
               targetWidth: self.width,
               targetHeight: self.height,
           }
       );
    }
}, Camera);


/*       // Thumbnail image element
       $img = $("#clientPic" + count);

       // Create a temporary "img" element
       // with the taken picture as a source
       // and resize that picture, then
       // call the callback function with
       // JPEG raw data as the response

       tmpImg = document.createElement("img");
       $(tmpImg).hide();           
       tmpImg.onload = function() {
           tmpImg.onload = null;
           app.thumbnailer({
                img: tmpImg, 
                width: 100,
                callback: function(data) {

                    nav.loading.hide();
                    nav.overlay.hide();   

                    $img.el.src = data;
                                    
                    view.data.pics.push(data.replace(/data:image\/jpeg;base64,/, ''));
                }
           });           
       }           
       tmpImg.src = imageURI;
    },
    
    onFail = function(message) {
        console.log('Failed because: ' + message);
    };
    
    $("#clientPics").onTapEnd(function(gesture) {   
        $("#clientPicsBox").show();
    });

    // FIXME CHECK
    $("#clientPicsBox").onTapEnd(function(gesture) {   
        $("#clientPicsBox").hide();
    });

    $("#clientPics_takePic").onTapEnd(function(gesture) {
        // Pictures count
        var count = view.data.pics.length;
        
        if (count < 5) {
            camera();
        } else {
            alert("Not allowed more than 5 images");
        }
    });
        
    $("#clientPics_choosePic").onTapEnd(function(gesture) {
        var count = view.data.pics.length;
        
        if (count < 5) {
            camera("album");
        } else {
            alert("Not allowed more than 5 images");
        }
    });
*/