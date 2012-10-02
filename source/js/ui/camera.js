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
        this._visibility = "visible";
    },
    
    hide: function() {
        $(this.el).hide();
        this._visibility = "hidden";
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
    
    onChange: function(callback) {
        this.onChange = callback;
    },
    
    push: function(imageElement) {
    
        var tmpDiv = document.createElement("div"),
            imgDiv,
            self = this,
            items;
                    
        tmpDiv.innerHTML = this.imageWrapper.outerHTML;        
        items = $(tmpDiv).find(".moo-image");        
        imgDiv = items[0];
        imgDiv.setAttribute("moo-index", this.count);
        items = $(self.imageList).find("li");

        for (i = items.length; i--;) {
            $(items[i].firstChild).removeClass("moo-active");
        }
        $(imgDiv).setClass("moo-active");
        self.itemSelected = this.count;    

        $(imgDiv).onTapEnd(function(gesture) {
            var $el = $(gesture.el),
                i,
                items = $(self.imageList).find("li");
                
            if ($el.hasClass("moo-active") === false) {

                for (i = items.length; i--;) {
                    $(items[i].firstChild).removeClass("moo-active");
                }

                $(gesture.el).setClass("moo-active");
                self.itemSelected = gesture.el.getAttribute("moo-index");    
                                
            }
        });

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
        
    },
    
    removeItem: function(index) {
        var items = $(this.imageList).find("li"),
            i = 0;
            
        console.log("remove item!");
            
        this.imageList.removeChild(items[i]);
        this.value.splice(index,1)
        
        this.count = items.length-1;   
        
        if (typeof this.onChange === "function")  {
            this.onChange(this, index);
        }    
        
        // FIXME CHECK
        $(items[this.count]).setClass("moo-active");
        this.itemSelected = this.count;
    }
    
};

/*
 * Private static properties
 */
$.extend({

    _makeHTML: function(options, self) {
    
        var el = document.createElement("div"),
            $selfEl;
        el.innerHTML = _templates.camera;

        self.el = el.firstChild;
        $selfEl = $(self.el);
        $selfEl.setClass("moo-empty");

        
        if (self.position === "top") {
            $selfEl.setClass("moo-top");
        } else if (self.position === "bottom") {
            $selfEl.setClass("moo-bottom");            
        }
        
        self.takeButton = $selfEl.find(".moo-ui-add-new")[0];
        self.chooseButton = $selfEl.find(".moo-ui-add-filed")[0];
        self.imageWrapper = $selfEl.find(".moo-image-wrapper")[0];
        self.imageList = $selfEl.find(".moo-image-list")[0];

        $selfEl.hide();
        self._visibility = "hidden";

        self.input.appendChild(self.el);

        // FIXME CHECK: remove template element
        $(self.imageWrapper).hide();
    },
    
    _setTouchEvents: function(self) {
    
        // Show/hide box
        $(self.input).onTapEnd(function() {
           if (self._visibility === "hidden") {
               self.show();           
           } else {
               self.hide();                          
           }
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
                       targetHeight: self.height
                   }
                );
    
            } else {
                console.log("Not camera! using sample pic");
                self.onSuccess("img/temp/samplepic.jpg"); 
            }
        }
    }
}, Camera);

