/**
 * Checkbox
 * @param {object} options Options
 * @return {object} Radio Mootor UI Checkbox object
 */
var Checkbox = function(options) {
    var i = 0,
        pseudoItems = this.pseudoItems = [];
        
    this.input = options.el;        
    this.value = [];
    this._disabled = false;
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
               
                if (self._disabled === false) {
                
                    var $el,
                        index,
                        onTap;
               
                    $el = $(gesture.el);
                    index = gesture.el.getAttribute("moo-foreach-index");
                    onTap = function() {
                        if ($el.hasClass("moo-active")) {
                            self.unselect(index);
                        } else {
                            self.select(index);
                        }
                    }                     
                
                    if ($.context.userAgent === "android") {
                        window.setTimeout(function() {
                           onTap();
                        }, 0)
                    } else {
                        onTap();
                    }
                }
                
                _stopEventPropagationAndPreventDefault(gesture); 
                              
           });

       }
        
        
    },

    /**
    * Select an item from the list
    * @param {integer} index Index of element to select
    */
    select: function(index) {
        if (this.value.indexOf(index) < 0) {
            this.value.push(index.toString());
            this.items[index].el.setAttribute("checked", "checked");
            $(this.pseudoItems[index].el).setClass("moo-active");
            _onChange(this);
        } 
    },

    /**
    * Unselect an item from the list
    * @param {integer} index Index of element to select
    */
    unselect: function(index) {
        this.value.splice(this.value.indexOf(index) , 1);
        this.items[index].el.removeAttribute("checked", "");
        $(this.pseudoItems[index].el).removeClass("moo-active");
        _onChange(this);
    },


    /**
    * Unselect all items from the list
    */
    unselectAll: function() {
        var i = 0;        
        
        for (i = this.items.length;i--;) {            
            this.unselect(i);
        }        

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
    },
    
    onChange: function(callback) {
        if (_onChangeCallbacks[this.input.id] === undefined) {
            _onChangeCallbacks[this.input.id] = [];
        }
        _onChangeCallbacks[this.input.id].push(callback);
    },
    
    disable: function() {
        this._disabled = true;
    },

    enable: function() {
        this._disabled = false;
    },
    
};

var _onChangeCallbacks = {},
    _onChange;
    
_onChange = function(self) {
    var i;
    if (_onChangeCallbacks[self.input.id] !== undefined) {
        for (i = _onChangeCallbacks[self.input.id].length; i--;) {
            _onChangeCallbacks[self.input.id][i](self);
        }
    }
}