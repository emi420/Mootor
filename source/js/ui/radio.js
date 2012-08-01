/**
 * Radio
 * @param {object} options Options
 * @config {object} el Fieldset element
 * @return {object} Radio Mootor UI Radio object
 */
var Radio = function(options) {
    var self = this,
        i = 0;
                
    this.input = options.el;                       
    $(this.input).hide();
    this._makeHTML();
    
    this.mooItems = $(this.el).find(".moo-ui-radio");        
    
    for (i = this.mooItems.length; i--;) {
        $(this.mooItems[i]).onTapEnd(function(gesture) {
            self.activate($(gesture.e.target));
        });
    }  
};


/*
 * Radio prototype
 */   
Radio.prototype = {
    // Make HTML
    _makeHTML: function() {
        var template = _templates.radio,
            i;
        
        this.el = document.createElement("div");
        this.el.innerHTML = _templateParse({
            template: template,
            self: this
        });
        
        this.input.parentElement.appendChild(this.el);            
        
    },
    
    activate: function(element) {
        var i = 0,
            j = 0,
            items = {},
            item;
                            
        if($(element.el).hasClass("moo-ui-radio-icon") === false) {
            item = $(element.el.parentElement).find(".moo-ui-radio-icon")[0];
        } else {
            item = element.el;
        }            
            
        for (i = this.mooItems.length; i--;) {
            items = $(this.mooItems[i]).find(".moo-ui-radio-icon");
            for (j = items.length; j--;) {
                if (items[j] !== item) {
                    $(items[j]).removeClass("moo-active");
                    this.items[i].el.removeAttribute("checked");
                } else {
                    $(items[j]).setClass("moo-active");
                    this.selectedIndex = i;                                              
                }
            } 
        }
        
        this.items[this.selectedIndex].el.setAttribute("checked", "checked");

    }
}
