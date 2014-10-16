/**
* UIFormCameraSingle take or choose a single picture
*
* @class UIFormCameraSingle
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormCameraSingle,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormCameraSingle = Mootor.UIFormCameraSingle = function (element) {
        UIFormCameraSingle.__init(this, element, {template: false});
    };

    // Prototypal inheritance
    if (UI) {
        $.extend(UIFormCameraSingle.prototype, UI.prototype);
    }

    // Private static methods and properties

    $.extend(UIFormCameraSingle, {
        
        _init: function (uiview) {
            var elements;
            
            elements = uiview.$el.find(".m-camera-single");
            elements.each(function (index ,element) {
                 new UIFormCameraSingle(element);
            });
        },

        _openFileSelector: function(self) {
            if (window.cordova !== undefined) {
                navigator.camera.getPicture(           
                   function(data) {
                       self._$img.setAttribute("src", data);
                   },
                   function() {
                       console.log("Error");
                   }, 
                   { 
                       quality: self.quality || 50, 
                       destinationType: window.Camera.DestinationType.FILE_URI,
                       sourceType: self.source || window.Camera.PictureSourceType.CAMERA,
                       targetWidth: self.width || 1024,
                       targetHeight: self.height || 768
                   }
                );
            } else {
                self._$input.click();
            }
        
        },

        __init: function(self, element, options) {
            
            self.options = options;

            // Use internal template (Mootor)
            // or element (Angular)
            if (self.options && self.options.template === false) {
                self._$coverHTML = $(UIFormCameraSingle._template)[0];
                $(element).replaceWith(self._$coverHTML);
            } else {
                self._$coverHTML = element;
            }
            
            // Original element
            self._$originalElement = element;
            
            // Image element
            self._$img = self._$coverHTML.parentElement.getElementsByTagName("img")[0];
            // File input element
            self._$input = self._$coverHTML.getElementsByTagName("input")[0];
            // Placeholder element
            self._$placeholder = self._$coverHTML.getElementsByClassName("m-camerasingle-placeholder")[0];
            // Modal container element
            self.__$modalContainer = self._$coverHTML.getElementsByClassName("m-camerasingle-modal")[0];
            if (UIFormCameraSingle._initialized) {
                self._$modalContainer = UIFormCameraSingle._$modalContainer;
            } else {
                self._$modalContainer = UIFormCameraSingle._$modalContainer =  self.__$modalContainer;
            }

            // Move attributes
            UIFormCameraSingle._moveAttrs(self);
            
            // Initialize modal
            UIFormCameraSingle._initModal(self);
            
            // Add event listeners
            UIFormCameraSingle._addEventListeners(self);
            
            // Put title text in the placeholder
            self._$placeholder.innerHTML = self._$img.getAttribute("title");
            
            // Hide picture element
            $(self._$img).addClass("m-hidden");
            
            // UIFormCameraSingle was initialized once
            UIFormCameraSingle._initialized = true;
        },
    
        _initModal: function(self) {
            
            var $modalPicture,
                $modalContainer,
                $modalPictureContainer;
            
            if (UIFormCameraSingle._initialized !== true) {
                document.body.appendChild(self._$modalContainer);
                UIFormCameraSingle._$modalContainer = self._$modalContainer;
                $modalPicture = document.createElement("img");
                $modalPictureContainer = self._$modalContainer.getElementsByClassName("m-camerasingle-img-container")[0];
                $modalPictureContainer.appendChild($modalPicture);
                UIFormCameraSingle._$modalPicture = $modalPicture;
                UIFormCameraSingle._$modalPictureContainer = $modalPictureContainer;
            } 
            
            self._$modalContainer = UIFormCameraSingle._$modalContainer;
            self._$modalPicture = UIFormCameraSingle._$modalPicture;
            self._$modalPictureContainer =  UIFormCameraSingle._$modalPictureContainer;
            
            self._$deleteBtn = self._$modalContainer.getElementsByClassName("m-camerasingle-button-delete")[0];
            self._$changeBtn = self._$modalContainer.getElementsByClassName("m-camerasingle-button-change")[0];
            
        },

        _moveAttrs: function(self) {
        
            var aAttrs = {
                type:         self._$input.getAttribute("type"),
                accept:       self._$input.getAttribute("accept"),
            }

            self._$coverHTML.removeAttribute("type");
            self._$coverHTML.removeAttribute("accept");
            self._$coverHTML.removeAttribute("placeholder");

            self._$input.setAttribute("type", aAttrs.type);
            self._$input.setAttribute("accept", aAttrs.accept);
        },
    
        _onChange: function(event, self) {
          var file,
              picReader;
    
          file = event.target.files[0];

    	  if (file && file.type.match('image')) {
              picReader = new FileReader();
                picReader.addEventListener('load', function(event) {
                    var picFile = event.target;
                    self._$img.src=picFile.result;
                });
                picReader.readAsDataURL(file);
            } 
        },
    
        _onImgLoad: function(self) {
            // Overrides me
        },
    
        _onImgLoadError: function(self) {
            // Overrides me
        },
    
        _addEventListeners: function(self) {
        
        
            self._$coverHTML.parentElement.addEventListener("click", function() {
                UIFormCameraSingle._currentInstance = self;
                self.open();
            });

            if (UIFormCameraSingle._initialized !== true) {
                self._$deleteBtn.addEventListener("click", function() {
                   self.delete();
                });

                self._$changeBtn.addEventListener("click", function() {
                    self.change();
                });

                self._$modalContainer.addEventListener("click", function() {
                    self.close();
                });
            }

            if (window.cordova === undefined) {
                self._$input.addEventListener("change", function(event) {
                    UIFormCameraSingle._onChange(event, self);
                });
            }

            self._$img.addEventListener("load", function() {
                UIFormCameraSingle._onImgLoad(self);
            });

            self._$img.addEventListener("error", function() {
                UIFormCameraSingle._onImgLoadError(self);
            });

        }        
   
    });

    // Public methods and properties

    $.extend(UIFormCameraSingle.prototype, {
        
        // Open modal or file selector
        "open": function() {
            var self = UIFormCameraSingle._currentInstance;

            if (self._$img.getAttribute("src") !== "") {
                
                $(UIFormCameraSingle._$modalContainer).removeClass("m-hidden");
                self._$modalPicture.src = self._$img.src;

            } else {
                UIFormCameraSingle._openFileSelector(self);
            }
        },
    
        // Delete current selected file
        "delete": function() {
            var self = UIFormCameraSingle._currentInstance;
            self._$img.setAttribute("src", "");                      
        },
    
        // Change current selected file
        change: function() {
            var self = UIFormCameraSingle._currentInstance;
            UIFormCameraSingle._openFileSelector(self);
        },
    
        // Close modal
        "close": function() {
            var self = UIFormCameraSingle._currentInstance;
            $(self._$coverHTML.parentElement).append(self._$img);
            $(UIFormCameraSingle._$modalContainer).addClass("m-hidden");
            
            self._$modalPicture.src = "";            

        },

        _$coverHTML: {} ,
        _$input: {} ,
        _$modalContainer: {} ,
        _$imgContainer: {} ,
        _$originalImgContainer: {} ,
        _$deleteBtn: {} ,
        _$changeBtn: {} ,
        _$img: {} ,
        _$placeholder: {},

    });       
    
    UIFormCameraSingle._template = '<div class="m-camerasingle m-camerasingle-cover"> \
        <input class="m-hidden" type="file" class="m-camera-single" accept="image/*" /> \
        <span class="m-camerasingle-placeholder">...</span> \
        <div class="m-camerasingle-modal m-hidden"> \
            <div class="m-camerasingle-modal-header"> \
                <span class="m-canvas-cancel m-camerasingle-cancel"><span class="m-icon-arrow-left"></span></span> \
            </div> \
            <div class="m-camerasingle-img-container"> \
                <button class="button button-positive button-block m-camerasingle-button-change m-button m-button m-button-primary"><span class="m-icon-refresh-small-white"></span></button> \
                <button class="button button-assertive button-block m-camerasingle-button-delete m-button m-button m-button-danger"><span class="m-icon-delete-small-white"></span></button> \
            </div> \
            <div class="m-camerasingle-modal-footer"> \
            </div> \
        </div> \
    </div>'; 

    if (UIForm) {
        UIForm.registerControl(UIFormCameraSingle);  
    }


}(window.$, window.Mootor));
