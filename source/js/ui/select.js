
/**
 * Select
 * @param {object} options Options
 * @config {object} el Input select element
 * @return {object} Select Mootor UI Select object
 */
var Select = function(options) {
    var self = this,
        i = 0,
        pseudoItems = this.pseudoItems = [];
        
    this.y = 0;
    this.input = options.el;        
    this.position = options.position;
    $(this.input).hide();
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
        
        if (this.position == "top") {
            $(this.el).setClass("moo-top");
        } else if (this.position == "bottom") {
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
            $(self.box).show();
        });
        
        // Prevents default on DragStasrt
        $(this.el).onDragStart(_stopEventPropagationAndPreventDefault);        

        // Tap (to select)
        $(this.ul).onTapEnd(function(gesture) {
            var i;
            _stopEventPropagationAndPreventDefault(gesture); 
    
            for(i = 0; i < self.pseudoItems.length; i++) {
                $(self.pseudoItems[i].el).removeClass("selected");                
            }
            $(gesture.e.target).setClass("selected");

            self.select(gesture.e.target.getAttribute("moo-foreach-index"));
        });
        
        // Scroll
        $(this.ul).onDragMove(function(gesture) {
            var newY,
                i;
            
            _stopEventPropagationAndPreventDefault(gesture);

            newY = self.y + (gesture.y - gesture.lastY);

            // FIXME CHECK: 160?
            if ((newY <= 0) && (newY >= -(self.ul.offsetHeight - 160))) {
                self.y = newY;
                $(self.ul).translateFx({x: 0, y: self.y}, {});
            }
            
        });
    },

    /**
    * Select an item from the list
    * @param {integer} index Index of element to select
    */
    select: function(index) {
        var self = this;
            
        window.setTimeout(function() { 
            $(self.box).hide() 
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
    
}


