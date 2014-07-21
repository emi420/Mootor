/**
* UIFormCamera is a camera pseudo-input of a form
*
* @class UIFormCamera
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Federico Palma (federico.palma [at] hotmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIFormCamera,
        UIFormCameraPicture,
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;

    // Private constructors

    UIFormCamera = function() {

        this.pictures = [];

    };

    UIFormCameraPicture = function(file) {

        this.image = file;

    };

    // Prototypal inheritance
    $.extend(UIFormCamera.prototype, UI.prototype);
    //$.extend(UIFormCamera.prototype, UIFormPseudoInput.prototype);

    // Private static methods and properties

    $.extend(UIFormCamera, {

        _pictures: [],

        _init: function(uiview) {
            var inputs = uiview.$el.find(".m-camera");
            
            inputs.each(function(index, element) {

                var self = new UIFormCamera();
                UIFormCamera._makeUI(self, element);               
                $.extend(element, UIFormCamera.prototype);
            });
        },

        _makeUI: function(self, element) {
            var $element,
                coverHTML,
                $cover,
                $label,
                $cameraContainer,
                $cameraImgContainer,
                $cameraMessage;

            $element = $(element);

            
            
            $label = $("label[for=" + element.getAttribute("id") + "]");

            coverHTML = '<div class="m-camera m-camera-cover m-camera-btn">\
                <span class="m-camera-icon m-icon-arrow-right-small"></span>\
            </div>';
            
            $cover = element.$cover = $(coverHTML).insertBefore(element);
            $label.insertBefore($cover.find(".m-camera-icon"));
            $element.hide();
            
            $cameraContainer = $('\
                <div class="m-camera-container">\
                    <div class="m-header-container">\
                        <header>\
                            <nav class="m-nav-header-back-container">\
                                <a class="m-nav-item m-camera-back">\
                                    <icon class="m-icon-arrow-left-white"></icon>\
                                </a>\
                            </nav>\
                            <h1 class="m-camera-title">Pictures</h1>\
                            <nav>\
                            </nav>\
                        </header>\
                    </div>\
                    <div class="m-camera-message">\
                        <span class="m-icon-camera"></span><br/>\
                        <strong class="m-camera-no-pics">No pictures yet.</strong>\
                        <p>Choose or take a picture</p>\
                    </div> \
                    <div class="m-img-container"></div>\
                    <div class="m-camera-btns"> \
                        <div class="m-choose-image">Choose a picture</div> \
                        <div class="m-take-image">Take a picture</div> \
                    </div> \
                </div> \
                ');

            $cameraContainer.hide();
            
            $cameraContainer.insertBefore(document.body.lastChild);
            
            $cameraMessage = $('.m-camera-message');

            $cameraMessage.hide();

            if ($cameraContainer.find('m-camera-images').length === 0) {

                $cameraMessage.show();

            }
            
            $cameraImgContainer = $('.m-img-container');
            
            $label[0].onclick = function() {
                return false;
            };

            var $choosePicture = $(".m-choose-image");
            
            UIFormCamera._addFiles(self, $element);
            
            
            $cover.on("click tap", function() {

                UIFormCamera._addListeners(self);
                $cameraContainer.show();
                
                var $closeButton = $cameraContainer.find('.m-camera-back');
                $closeButton.click(function() {
                    self._$cameraContainer.hide();
                });
            });
            
                       
            
            self._$cameraContainer = $cameraContainer;
            self._$pictures = $element;
            self._$backButton = $('.m-camera-back');
            self._$choosePicture = $choosePicture;
            self._$cameraImgContainer = $cameraImgContainer;
        },

        _addListeners: function(self) {

            self._$choosePicture.on('tap click', function(e) {

                self._$pictures.trigger("click");

            });
        },
        
        _addFiles: function(self, $element) {
            $element.on('change', function(event) {
                var files = event.target.files,
                    output = self._$cameraImgContainer,
                    picture;

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    if (!file.type.match('image')) {
                        continue;
                    }

                    var picReader = new FileReader();

                    picReader.addEventListener('load', function(event) {
                        var picFile = event.target;

                        picture = $('<div class="m-camera-img"></div>');
                        picture.append("<img class='thumbnail' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/>");

                        output.append(picture, null);
                        
                        $('.m-camera-message').hide();
                    });

                    picReader.readAsDataURL(file);

                    picture = new UIFormCameraPicture(file);
                    
                    var obj = $element[0];
                    if (obj.pictures === undefined) {
                        obj.pictures = [];
                        obj.pictures.push(picture);
                    } else {
                        var arrPicturesLength = obj.pictures.length;
                        obj.pictures[arrPicturesLength] = picture;
                    }
                }
            });
        }

    });

    $.extend(UIFormCameraPicture, {

    });

    // Public methods and properties

    $.extend(UIFormCamera.prototype, {
        
        /**
        * Take a picture
        *
        * @method take
        * @chainable
        */
        take: function(){
            // code here
        },

        /**
        * Choose a picture
        *
        * @method choose
        * @chainable
        */
        choose: function(){
            // code here
        },

        /**
        * Returns all pictures paths
        *
        * @method all
        * @return {Array} Array of pictures paths
        * @chainable
        */
        all: function() {

            $.each(this.pictures, function(item, val) {
                console.log(val);
            });
        },

        /**
        * Remove picture from input
        *
        * @param {UIFormCameraPicture} picture Picture to be removed
        * @method remove
        */
        remove: function(picture) {

            var index = this.pictures.indexOf(picture);

            if (index > -1) {
                this.pictures.splice(index, 1);
            }
        }
    });

    $.extend(UIFormCameraPicture.prototype, {
        /**
        * Export picture data
        *
        * @method export
        * @return {String} Exported data (ej: base 64 string)
        * @param {Array} options A list of options
        * @chainable
        */
        "export": function(options) {
        
            var reader = new FileReader();
            reader.readAsDataURL(this.image)

            reader.onerror = function() {
                return 'error';
            }
            
            reader.onloadend = function() {
                return reader.result;
            }
        }
    });

    UIForm.registerControl(UIFormCamera);

}(window.$, window.Mootor));
