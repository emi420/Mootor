var UI = function() {};

// Public constructors

$.extend({

     ui: function(options) {
     
         var UIControl = UI.get(this.query);

         if (UIControl === undefined) {

             options.el = this.el;
             switch (options.type) {
                 case "Switch":
                    UIControl = new Switch(options);
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
             }

             UIControl.id = this.query;
             UI.push(UIControl);

             return UIControl;

        } else {
             return UI.get(this.query);
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



