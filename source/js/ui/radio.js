/**
 * Radio
 * @param {object} options Options
 * @config {object} el Fieldset element
 * @return {object} Radio Mootor UI Radio object
 */
var Radio = function(options) {
    var i = 0,
        pseudoItems = this.pseudoItems = [];
        
    this.input = options.el;        
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
 * Radio prototype
 */   
Radio.prototype = {

    // Make HTML
    _makeHTML: function() {
        this.el = document.createElement("div");
        this.el.innerHTML = _templateParse({
            template: _templates.radio,
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
                _stopEventPropagationAndPreventDefault(gesture); 
                self.select(gesture.el.getAttribute("moo-foreach-index"));              
           });

       }
        
        
    },

    /**
    * Select an item from the list
    * @param {integer} index Index of element to select
    */
    select: function(index) {
        var self = this,
            i;
        
        for(i = 0; i < self.pseudoItems.length; i++) {
            $(self.pseudoItems[i].el).removeClass("moo-active"); 
            self.pseudoItems[i].el.removeAttribute("checked", "checked");               
        }
        $(self.pseudoItems[index].el).setClass("moo-active");

        // Get value
        this.value = this.items[index].value;
        
        // Update selected index
        this.selectedIndex = index;
        this.input.selectedIndex = index;
        
        this.items[this.selectedIndex].el.setAttribute("checked", "checked");
        
    },
    
    selectByValue: function(value) {
        var i;
        for (i = this.items.length; i--;) {
            if (this.items[i].value === value) {
                this.select(i);
            }
        }
    }
    
};

