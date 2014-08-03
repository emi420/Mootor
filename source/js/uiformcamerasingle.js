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

    UIFormCameraSingle = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormCameraSingle.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormCameraSingle, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-camera-single");
            inputs.each(function(index,element) {
                var $element,
                    $coverHTML,
                    $cover,
                    $value,
                    $modalContainer,
                    $modal,
                    $img,
                    $deleteBtn,
                    $changeBtn,
                    $imgContainer,
                    $originalImgContainer;
            
    			$element = $(element);
            
                $coverHTML = $('<div class="m-select m-select-cover">\
                    <span class="m-value"></span>\
                    <span class="m-icon-arrow-right-small m-select-icon"></span>\
                </div>');
                
                $element.addClass("m-hidden");
                $coverHTML.insertBefore(element);
                $value = $coverHTML.find(".m-value");
                $value.html(element.placeholder);
                

                $modalContainer = $('<div class="m-camerasingle-modal"> \
                        <div class="m-camerasingle-modal-header"> \
                            <span class="m-canvas-cancel m-camerasingle-cancel"><span class="m-icon-arrow-left"></span></span> \
                        </div> \
                        <div class="m-camerasingle-img-container"> \
                        <button class="m-camerasingle-button-change m-button m-button m-button-primary"><span class="m-icon-refresh-small-white"></span></button> \
                        <button class="m-camerasingle-button-delete m-button m-button m-button-danger"><span class="m-icon-delete-small-white"></span></button> \
                        </div> \
                        <div class="m-camerasingle-modal-footer"> \
                        </div> \
                    </div>');
        
                
                $modalContainer.hide();
                $modalContainer.on("tap click", function() {
                    $img.detach().appendTo($originalImgContainer);
                    $img.hide();
                    $modalContainer.hide();
                });
                
                $imgContainer = $modalContainer.find(".m-camerasingle-img-container");
                $img = $("img[m-for='" + element.id + "']");
                $originalImgContainer = $img.parent();
                
                $img.hide();

                $modalContainer.insertBefore(document.body.lastChild);
        
                $deleteBtn = $modalContainer.find(".m-camerasingle-button-delete");
                $changeBtn = $modalContainer.find(".m-camerasingle-button-change");
                
                $deleteBtn.on("tap click", function() {
                   $img[0].setAttribute("src", "");
                });

                $changeBtn.on("tap click", function() {
                    $element.click();
                });

                $element.on("change", function(event) {
                    var file,
                        picReader;
                    file = event.target.files[0];

					if (file && file.type.match('image')) {
                        // FIXME CHECK (loading)
                        m.app.ui.loading(true);

                        picReader = new FileReader();
                        picReader.addEventListener('load', function(event) {
                            var picFile = event.target;
                            $img[0].src=picFile.result;

                            // FIXME CHECK (loading)
                            m.app.ui.loading();

                        });
                        picReader.readAsDataURL(file);
                    } 
                });
                
                $coverHTML.on("tap click", function () {
                    $img.detach().appendTo($imgContainer);
                    $img.show();
                    if ($img[0].getAttribute("src") !== "") {
                        $modalContainer.show();
                    } else {
                        $element.click();
                    }
                });
                
                $.extend(element, UIFormCameraSingle.prototype);

            });
        }
   
    });

    // Public methods and properties

    $.extend(UIFormCameraSingle.prototype, {
    });        

    UIForm.registerControl(UIFormCameraSingle);  


}(window.$, window.Mootor));
