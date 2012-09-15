/**
 * TextArea
 * @param {object} options Options
 * @config {object} el Textarea element
 * @return {object} TextArea Mootor UI TextArea object
 */
var TextArea = function(options) {
    var self = this;
                
    this.el = this.input = options.el;  
    
    // Value
    if (options.value !== undefined) {
        this.el.innerHTML = options.value;
    } 
    this.value = self.el.innerHTML; 
    
    this._makeHTML();

    $(this.el).onDragStart(_stopEventPropagationAndPreventDefault);                
    $(this.el).onTapEnd(function(gesture) {
        gesture.el.focus();
        _stopEventPropagationAndPreventDefault(gesture);
    });        
    
    return this;      
};

 /*
* TextArea prototype
*/  
TextArea.prototype = {
    // Make HTML
    _makeHTML: function() {
        var el,
            parent = this.el.parentElement,
            self = this;

        $(this.input).on("keyup", function(gesture) {
            self.value = self.input.value;
        });
        
        el = document.createElement("div");
        $(el).setClass("moo-ui-textarea");
        el.appendChild(this.input);
        parent.appendChild(el);         
    }

};
