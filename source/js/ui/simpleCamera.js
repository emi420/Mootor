/*** Require Apache Cordova ***/

/**
 * simpleCamera
 * @return {object} SimpleCamera Mootor UI SimpleCamera object
 */
var SimpleCamera = function(options) {

    this.input = options.el;
    this.sourceType = options.sourceType;

    SimpleCamera._setTouchEvents(this);               
    SimpleCamera._initProperties(this, options);

    // Init value
    if (options.value !== undefined) { 
        this.value = options.value;
    } else {
        this.value = [];
    }
    
    return this;
            
};

/*
 * Public prototype
 */
SimpleCamera.prototype = {        
    
    onCamera: function(callback) {
        this.onCamera = callback;  
    },

    onSuccess: function(callback) {
        this.onSuccess = callback;  
    },

    onFail: function(callback) {
        this.onFail = callback;  
    },
    
    onChange: function(callback) {
        this.onChange = callback;
    },

};

/*
 * Private static properties
 */
$.extend({
    
    _setTouchEvents: function(self) {
        if (self.sourceType === "album") {
            $(self.input).onTapEnd(function() {
                Camera.camera(self, "album");
            });            
        } else {
            $(self.input).onTapEnd(function() {
                Camera.camera(self);
            });            
        }
    },
    
    _initProperties: function(self, options) {
        self.quality = self.quality ? self.quality : 50;
        self.width = self.width ? self.width : 1024;
        self.height = self.height ? self.height : 768;
    },
    
    camera: function(self, sourceType) {
        var source,
            onSuccess;

        if (typeof self.onCamera === "function") {
            self.onCamera();
        }        
        
        if (self.disabled !== true) {
            if (window.Camera !== undefined) {
                if (sourceType === "album") {
                    source = window.Camera.PictureSourceType.SAVEDPHOTOALBUM;
                }
        
                onSuccess = function(data) {
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
                       targetHeight: self.height
                   }
                );
    
            } else {
                console.log("Not camera! using sample pic");
                self.onSuccess("img/temp/samplepic.jpg"); 
            }
        }
    }
}, SimpleCamera);

