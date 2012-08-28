/**
 * Camera
 * @return {object} Camera Mootor UI Camera object
 */
var Camera = function(options) {

    this.input = options.el;
    this.position = options.position;
    this.count = 0;

    Camera._makeHTML(options, this);       
    Camera._setTouchEvents(this);               
    Camera._initProperties(this, options);

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
Camera.prototype = {        
    
    show: function() {
        if (typeof this.onShowBox === "function") {
            this.onShowBox();
        }
        $(this.el).show();
    },
    
    hide: function() {
        $(this.el).hide()
    },    

    onShowBox: function(callback) {
        this.onShowBox = callback;  
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
    
    push: function(imageElement) {
    
        var tmpDiv = document.createElement("div"),
            imgDiv;
                    
        tmpDiv.innerHTML = this.imageWrapper.outerHTML;

        imgDiv = $(tmpDiv).find(".moo-image")[0];
        imgDiv.appendChild(imageElement);
        
        this.value.push(imageElement.getAttribute("src"));
        $(tmpDiv.firstChild).show();
        this.imageList.appendChild(tmpDiv.firstChild); 

        $(this.el).removeClass("moo-empty");

        this.count++;
        
    },
    
    clear: function() {
        var items = $(this.imageList).find("li"),
            i = 0;
            
        for (i = items.length; i--;) {
            this.imageList.removeChild(items[i]);
        }
        
        this.count = 0;        
        this.value = [];
        
    }
    
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
        $(self.el).setClass("moo-empty");

        
        if (self.position == "top") {
            $(self.el).setClass("moo-top");
        } else if (self.position == "bottom") {
            $(self.el).setClass("moo-bottom");            
        }
        
        self.takeButton = $(self.el).find(".moo-ui-add-new")[0];
        self.chooseButton = $(self.el).find(".moo-ui-add-filed")[0];
        self.imageWrapper = $(self.el).find(".moo-image-wrapper")[0];
        self.imageList = $(self.el).find(".moo-image-list")[0];

        $(self.el).hide();

        self.input.appendChild(self.el);

        // FIXME CHECK: remove template element
        $(self.imageWrapper).hide();
    },
    
    _setTouchEvents: function(self) {
    
        // Show/hide box
        $(self.input).onTapEnd(function() {
           self.show();
        });
        $(self.el).onTapEnd(function() {
           self.hide();
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
        
        if (self.disabled !== true) {
            if (window.Camera !== undefined) {
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
    
            } else {
                console.log("Not camera! using sample pic");
                self.onSuccess("img/temp/samplepic.jpg"); 
            }
        }
    }
}, Camera);

