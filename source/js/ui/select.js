
/**
 * Select
 * @param {object} options Options
 * @return {object} Select Mootor UI Select object
 */
var Select = function(options) {
    var i = 0,
        pseudoItems = this.pseudoItems = [];
        
    this.y = 0;
    this.input = options.el;        
    this.position = options.position;
    $(this.input).hide();
    this._visibility = "hidden";
    this._makeHTML();       
    this._setTouchEvents();               

    // Create "pseudo" items collection
    pseudoItems = $(this.ul).find("li");        
    for(i = 0; i < pseudoItems.length; i++) {
        this.pseudoItems.push({
            el: pseudoItems[i],
            mooSelectIndex: i
        });            
    }
    
    // Init value
    if (options.value !== undefined) {
        this.selectByValue(options.value);
    }
    
    return this;
            
};

/*
 * Select prototype
 */   
Select.prototype = {

    // Make HTML
    _makeHTML: function() {
        var el = document.createElement("div"),
            template = _templates.select;

        el.innerHTML = _templateParse({
            template: template,
            self: this
        });           
        
        this.el = el.firstChild;
        
        if (this.position === "top") {
            $(this.el).setClass("moo-top");
        } else if (this.position === "bottom") {
            $(this.el).setClass("moo-bottom");            
        }
                      
        this.input.parentElement.appendChild(this.el);                        
        this.ul = $(this.el).find("ul")[0];
        
        this.box = $(this.el).find(".moo-ui-select-menu")[0];
        this.textspan = $(this.el).find(".moo-ui-select-text")[0];            
    },
    
    // Set touch events
    _setTouchEvents: function() {
        var self = this;
                
        // Show selection box
        $(this.el).onTapEnd(function(gesture) {
            if (self._visibility !== "visible") {
                //$(self.box).show();
                $(self.input).show();
                self.input.focus();                
                self._visibility = "visible";
            } 
        });
        
        $(this.input).on("blur", function() {
            $(self.input).hide();
            self._visibility = "hidden";
            self.select(self.input.selectedIndex);
        });
        
        // Prevents default on DragStasrt
        $(this.el).onDragStart(_stopEventPropagationAndPreventDefault);        

    },

    /**
    * Select an item from the list
    * @param {integer} index Index of element to select
    */
    select: function(index) {
        var self = this;
            
        window.setTimeout(function() { 
            $(self.box).hide();
            self._visibility = "hidden";
        }, 100);
        
        // Get value
        this.value = this.items[index].value;
        
        // Update selected index
        this.selectedIndex = index;
        this.input.selectedIndex = index;
        
        // Update text with selected value
        $(this.textspan).html(this.pseudoItems[index].el.innerHTML);
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


