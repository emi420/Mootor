// Public constructors

$.extend({

     ui: function(options) {
         options.el = this.el;
         switch (options.type) {
             case "Switch":
                return new Switch(options);
                break;
             case "Text":
                return new Text(options);
                break;
             case "TextArea":
                return new TextArea(options);
                break;
             case "Select":
                return new Select(options);
                break;
             case "Radio":
                return new Radio(options);
                break;
             case "Checkbox":
                return new Checkbox(options);
                break;                 
         }
     },
});

$.extend({
     ui: {
         overlay: function() {
            return new Overlay();
         },
         loading: function() {
            return new Loading();
         },
         modal: function(options) {
            return new Modal();
         }
     }
}, $);


// Private static functions & utilities

 /**
 * Stop event propagation and prevent default
 * @private
 * @param {object} gesture Mootor gesture
 */
var _stopEventPropagationAndPreventDefault = function(gesture) {
    gesture.e.stopPropagation();
    gesture.e.preventDefault();
};


