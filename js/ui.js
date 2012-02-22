/* 
 * Mootor User Interface
 */

(function (Moo) {
    "use strict";
        
    var Checkbox = function(options) {
        var html;
    
        this.el = options.el;
        this.input = $(this.el.getElementsByTagName('input')[0]);
        this.label = $(this.el.getElementsByTagName('label')[0]);
        this.value = this.input.value;
                
        // Hide original elements
        // FIXME CHECK: update core to support each
        this.input.hide()
        this.label.hide()
        
        html = "<canvas id=\"moo_" + this.el.id + "\" width=\"200\" height=\"20\">undefined</canvas>";
        this.el.innerHTML = html;
        
        return this;
    };
    
    Checkbox.prototype.set = function(value) {
        this.value = value;
    }

    Moo.UI = {
        checkbox: function(options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Checkbox(options);
        }
    };
    
    Moo.extend(Moo.UI);

}($));

