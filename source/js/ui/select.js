
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

        this.el = el;
        this.el.innerHTML = _templateParse({
            template: template,
            self: this
        });            
               
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
            _stopEventPropagationAndPreventDefault(gesture); 
            self.select(gesture.e.target.getAttribute("moo-foreach-index"));
        });
        
        // Scroll
        $(this.ul).onDragMove(function(gesture) {
            var newY;
            
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
        var i;
        $(this.box).hide();
        this.value = this.pseudoItems[index].el.getAttribute("moo-select-value");
        this.input.value = this.value;
        for(i = 0; i < this.pseudoItems.length; i++) {
            $(this.pseudoItems[i].el).removeClass("selected");                
        }
        $(this.pseudoItems[index].el).setClass("selected");
        $(this.textspan).html(this.pseudoItems[index].el.innerHTML);
    }
    
    // TODO: a show() method that position the select
    //       box on top or bottom 
}
