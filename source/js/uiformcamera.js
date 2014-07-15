/**
* UIFormCamera is a camera pseudo-input of a form
*
* @class UIFormCamera
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIFormCamera,
        UIFormCameraPicture,

        UI,
		UIForm,
		_aaFiles = {};
        
    // Dependences

    UI = Mootor.UI;
	UIForm = Mootor.UIForm;

    // Private constructors

    UIFormCamera = function() {
        // code here
    };

    UIFormCameraPicture = function(file) {
		// code here
        this.image = file;
    };

    // Prototypal inheritance
    $.extend(UIFormCamera.prototype, UI.prototype);
    //$.extend(UIFormCamera.prototype, UIFormPseudoInput.prototype);

    // Private static methods and properties

    $.extend(UIFormCamera, {

		_init: function(uiview) {

			var inputs = uiview.$el.find(".m-camera");
            inputs.each(function(index,element) {
                var self = new UIFormCamera();
                UIFormCamera._makeUI(self, element);
                //UIFormCamera._addListeners(self);
            });
		},

		_makeUI: function(self, element) {
			var $element,
                coverHTML,
                $cover,
                $label,
                $canvas,
                $canvasContainer,
                h,
                w;

			$element = $(element);
            
            // Inherits UIFormCamera prototype
            $.extend(element, UIFormCamera.prototype);

            $label = $("label[for=" + element.getAttribute("id") + "]");

			// TODO: Agregar estilos a m-camera-cover

            /*jshint multistr: true */
            coverHTML = '<div class="m-camera m-camera-cover m-camera-btn"> \
                <span class="m-camera-icon m-icon-arrow-right-small"></span> \
            </div>';

			//$cover = element.$cover = $(coverHTML).insertBefore(element);
			//$label.insertBefore($cover.find(".m-camera-icon"));
			$element.hide();

			// contenedor
			$canvasContainer = $('\
				<div class="m-camera-container"> \
					<div class="m-camera-message">\
                    <span class="m-icon-camera"></span><br/> \
						<strong class="m-camera-no-pics">No pictures yet.</strong> \
						<p>Choose or take a picture</p> \
                    </div> \
                    <div class="m-tmp">&nbsp;</div> \
                    <div id="camera-btns"> \
                    <div class="m-choose-image">Choose a picture</div> \
                    <div class="m-take-image">Take a picture</div> \
                </div></div> \
                ');
                
			if (!$(".m-camera-canvas").length) {
				$canvasContainer.insertBefore(document.body.lastChild);
				//$canvasContainer.prependTo($('.m-camera-container'));
			}

            $canvasContainer.insertBefore($element);
            $canvasContainer[0].replaceChild(element, $canvasContainer.find(".m-tmp")[0]);
            
            //$('#choose-picture').hide();

			// test
			$('.m-camera-message').hide();
			if ($('.m-camera-container').find('m-camera-images').length === 0) {
				$('.m-camera-message').show();
			}

			var $cameraContainer = $('.m-camera-container');
            
            _aaFiles[element.id] = [];


			// files
			var i;
			var $imageFiles = $element;

			$imageFiles.on('change', function(event) {
				var files = event.target.files;
				var output = $('.m-camera-container');

				for (i = 0; i < files.length; i++) {
					var file = files[i];

					if (!file.type.match('image')) {
						continue;
					}

					var picReader = new FileReader();

					picReader.addEventListener('load', function(event) {
						var picFile = event.target;

						var div = $('<div class="m-camera-img"></div>');

						div.append("<img class='thumbnail' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/>");


						output.append(div,null);
						$('.m-camera-message').hide();
					});

					picReader.readAsDataURL(file);

					_aaFiles[this.id].push(new UIFormCameraPicture(file));

				}

				//console.log(this._aaPictures);
			});

			// end files



			h = m.app.ui.$container.height();

			//$('.m-camera-canvas').css('padding-top', h / 2);

			//$('.m-camera-container').height(h - 55 + 'px');

			$label[0].onclick = function() {
				//alert('Choose a picture');
				return false;
            };

            $(".m-choose-image").on("tap click", function() {
                $element.trigger('click');
            });

            $(".m-take-image").on("tap click", function() {
                $element.trigger('click');
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
             return _aaFiles[this.id];
        },

        /**
        * Remove picture from input
        *
        * @param {UIFormCameraPicture} picture Picture to be removed
        * @method remove
        */
        remove: function(picture) {
            // code here
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
        * @example
        *   var sign = $("#myCameraInput").m.formCamera.export();
        */
        "export": function(options) {
             // code here
        }
    });

	UIForm.registerControl(UIFormCamera);

}(window.$, window.Mootor));
