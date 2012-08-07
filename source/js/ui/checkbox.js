/**
 * Checkbox
 * @param {object} options Options
 * @config {object} el Fieldset element
 * @return {object} Checkbox Mootor UI Checkbox object
 */
var Checkbox = function(options) {
    var self = this,
        i = 0,
        item;
                
    this.input = options.el;                       
    $(this.input).hide();
    this._makeHTML();
    
    // "Pseudo" items
    this.mooItems = $(this.el).find(".moo-ui-checkbox");        

    for (i = this.mooItems.length; i--;) { 
        item = this.mooItems[i];

        // Set gesture events
        $(item).onTapEnd(function(gesture) {
            self.set($(gesture.e.target));
        });
    }    
};

/*
 * Checkbox prototype
 */   
Checkbox.prototype = {
    // Make HTML
    _makeHTML: function() {
        var template = _templates.checkbox,
            i;
        
        this.el = document.createElement("div");
        this.el.innerHTML = _templateParse({
            template: template,
            self: this
        });
        
        this.input.parentElement.appendChild(this.el);            
        
    },
    
    set: function(element) {
        var i = 0,
            j = 0,
            items = {},
            item,
            itemIndex,
            checked = true;
                            
        if($(element.el).hasClass("moo-ui-checkbox-icon") === false) {
            item = $(element.el.parentElement).find(".moo-ui-checkbox-icon")[0];
        } else {
            item = element.el;
        }            
            
        for (i = this.mooItems.length; i--;) {
            items = $(this.mooItems[i]).find(".moo-ui-checkbox-icon");
            for (j = items.length; j--;) {
                if (items[j] === item) {
                    if($(items[j]).hasClass("moo-active") === false) {
                        $(items[j]).setClass("moo-active");
                        checked = true;
                    } else {
                        $(items[j]).removeClass("moo-active");
                        checked = false;
                    }
                    itemIndex = i;                                                                                              
                }
            } 
        }
        
        if (checked === true) {
            this.items[itemIndex].el.setAttribute("checked", "checked");        
        } else {
            this.items[itemIndex].el.removeAttribute("checked", "checked");
        }

    }
}
