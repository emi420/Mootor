 
var UI = function() {};

// Public constructors

/**
 * User Interface
 * @class $.prototype.ui
 * @constructor 
 * @param {UIOptions} UI Options
 * @return {UIControl} UI Control
 * @example
 *       // ToggleSwitch
 *       $("#moo-ui-switch-1").ui({
 *           type: "ToggleSwitch",
 *           value: 0
 *       });
 *       
 *       // Text
 *       $("#moo-ui-text-1").ui({
 *           type: "Text"
 *       });
 *       
 *       // TextArea
 *       $("#moo-ui-textarea-1").ui({
 *           type: "TextArea"
 *       });
 *       
 *       // Select
 *       $("#moo-ui-select-1").ui({
 *           type: "Select",
 *           position: "bottom"
 *       });
 *           
 *       // Radio
 *       $("#moo-ui-radio-1").ui({
 *           type: "Radio",
 *       });
 *       
 *       // Checkbox
 *       $("#moo-ui-checkbox-1").ui({
 *           type: "Checkbox",
 *       });
 */


$.extend({

     ui: function(options) {
     
         var UIControl = UI.get(this.query);

         if (UIControl === undefined) {

             options.el = this.el;
             switch (options.type) {
                 case "ToggleSwitch":
                    UIControl = new ToggleSwitch(options);
                    break;
                 case "Text":
                    UIControl = new Text(options);
                    break;
                 case "TextArea":
                    UIControl = new TextArea(options);
                    break;
                 case "Select":
                    UIControl = new Select(options);
                    break;
                 case "Radio":
                    UIControl = new Radio(options);
                    break;
                 case "Checkbox":
                    UIControl = new Checkbox(options);
                    break;                 
                 case "Camera":
                    UIControl = new Camera(options);
                    break;                 
                 case "SimpleCamera":
                    UIControl = new SimpleCamera(options);
                    break;                 
                 case "Map":
                    UIControl = new Map(options);
                    break;                 
             }

             UIControl.id = this.query;
             UIControl.type = options.type;
             UI.push(UIControl);

             return UIControl;

        } else {
             return UI.get(this.query);
        }
     }
});

/**
 * UI Control
 * @class UIControl
 */
var UIControl = {};

/**
 * Original DOM element
 * @property UIControl
 * @type HTMLElement
 */

/**
 * UI
 * @class $.ui
 */
$.extend({
     ui: {
        /**
         * Overlay
         * @method overlay
         * @example
         *      $.ui.overlay()
         */
         overlay: function() {
            return new Overlay();
         },
        /**
         * Loading
         * @method loading
         * @example
         *      $.ui.loading()
         */
         loading: function() {
            return new Loading();
         },
         modal: function(options) {
            return new Modal();
         }
     }
}, $);


$(document).ready(function() {
    var _overlay = new Overlay(),
        _loading = new Loading(); 

    /**
     * @class $
     */
    $.extend({
        loadingScreen: {
            show: function() {
                _overlay.show();
                _loading.show();
            },
            hide: function() {
                _overlay.hide();
                _loading.hide();            
            }
        }
    }, $)
});


// Private static functions

$.extend({
    
    _collection: [],
    
    get: function(id) {
        var i;
        for (i = UI._collection.length; i--;) {
            if (UI._collection[i].id === id) {
                return UI._collection[i];
            }
        }
    },
    
    push: function(obj) {
        this._collection.push(obj);
    }

} ,UI);


// Utilities

 /**
 * Stop event propagation and prevent default
 * @private
 * @param {object} gesture Mootor gesture
 */
var _stopEventPropagationAndPreventDefault = function(gesture) {
    gesture.e.stopPropagation();
    gesture.e.preventDefault();
};


/**
 * @class UIOptions
 * @static
 */
 
/**
 * Control type
 *
 * @property type
 * @type string
 */

/**
 * Original DOM element
 *
 * @property el
 * @type HTMLElement
 */

/**
 * Control position (top, bottom)
 *
 * @property position
 * @optional
 * @type string
 */

/**
 * Value
 *
 * @property value
 * @optional
 * @type string
 */

