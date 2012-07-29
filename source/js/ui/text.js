 /**
 * Text
 * @param {object} options Options
 * @config {object} el Text input element
 * @return {object} Text Mootor UI Text object
 */
var Text = function(options) {
    var self = this;
                
    this.el = this.input = options.el;                               
    if (options.value) {
        this.value = options.value;
    }

    this._makeHTML();
                
    $(this.el).onDragStart(_stopEventPropagationAndPreventDefault);                

    $(this.el).onTapEnd(function(gesture) {
        gesture.el.focus();
        _stopEventPropagationAndPreventDefault(gesture);
    });        
    $(this.cleanbox).onTapEnd(function() {
        self.clean();
    })
                    
    return this;
};

 /*
* Text prototype
*/  
Text.prototype = {
    // Make HTML
    _makeHTML: function() {
        var el,
            parent = this.el.parentElement,
            self = this;
        
        this.cleanbox = document.createElement("div");
        this.cleanbox.innerHTML = _templates.text;                        
        this.input.value = this.value;

        el = document.createElement("div");
        $(el).setClass("moo-ui-text");
        el.appendChild(this.cleanbox);         
        el.appendChild(this.input);
        this.input.onkeyup = function() {
            self.value = self.input.value;
            if (typeof self.onChange === "function") {
                self.onChange();                    
            }
        }
        parent.appendChild(el);         
    },
    
    clean: function() {
        this.input.value = "";
    },
    
    on: function(event, callback) {
        switch (event) {
            case "change":
                this.onChange = callback;
                break;
        }
    }
}