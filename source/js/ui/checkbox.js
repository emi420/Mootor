/**
 * Checkbox
 * @param {object} options Options
 * @config {object} el Fieldset element
 * @return {object} Radio Mootor UI Checkbox object
 */
var Checkbox = function(options) {
    var self = this,
        i = 0,
        pseudoItems = this.pseudoItems = [];
        
    this.input = options.el;        
    this.value = [];
    $(this.input).hide();
    this._makeHTML();    

    // Create "pseudo" items collection
    pseudoItems = $(this.container).find("div");
    for(i = 0; i < pseudoItems.length; i++) {
        this.pseudoItems.push({
            el: pseudoItems[i],
            value: pseudoItems[i].value,
            mooSelectIndex: i
        });            
    }
    
    this._setTouchEvents();               

    // Init value
    if (options.value !== undefined) {
        this.selectByValue(options.value);
    }
    
    return this;
            
};

/*
 * Checkbox prototype
 */   
Checkbox.prototype = {

    // Make HTML
    _makeHTML: function() {
        this.el = document.createElement("div");
        this.el.innerHTML = _templateParse({
            template: _templates.checkbox,
            self: this
        });        
        this.container = $(this.el).find("div")[0];
        this.input.parentElement.appendChild(this.el);  
    },
    
    // Set touch events
    _setTouchEvents: function() {
       var self = this,
            i = 0;
        
       for(i = 0; i < this.pseudoItems.length; i++) {
       
           $(this.pseudoItems[i].el).onTapEnd(function(gesture) {
                var i,
                    $el = $(gesture.el);
                
                _stopEventPropagationAndPreventDefault(gesture); 

                if ($el.hasClass("moo-active")) {
                    $el.removeClass("moo-active");
                    self.unselect(gesture.el.getAttribute("moo-foreach-index"));
                } else {
                    $el.setClass("moo-active");                
                    self.select(gesture.el.getAttribute("moo-foreach-index"));
                }
                              
           });

       }
        
        
    },

    /**
    * Select an item from the list
    * @param {integer} index Index of element to select
    */
    select: function(index) {
        var self = this;
        
        // Get value
        this.value.push(this.items[index].value);
        this.items[index].el.setAttribute("checked", "checked");
        
    },

    /**
    * Unselect an item from the list
    * @param {integer} index Index of element to select
    */
    unselect: function(index) {
        var self = this;
        
        // Get value
        this.value.splice(index, index);
        this.items[index].el.removeAttribute("checked", "");
        
    },

    selectByValue: function(value) {
        var i,
            j;
            
        if( Object.prototype.toString.call( value ) !== '[object Array]' ) {
            value = [value];
        }
        for (i = this.items.length; i--;) {
            for (j = value.length; j--;) {
                if (this.items[i].value === value[j]) {
                    $(this.pseudoItems[i].el).setClass("moo-active");
                    this.select(i);
                }                
            }
        }
    }    
    
}

