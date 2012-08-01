/**
 * @summary User Interface Mootor plugin
 * @author Emilio Mariscal (emi420 [at] gmail.com)
 */
 
/** 
 * @class
 * @name $ 
 */
 
(function ($) {

    "use strict";
var _templates = {
    radio: '<div moo-template="foreach: input"><div class="moo-ui-radio"><label><span class="moo-ui-radio-label" moo-template="text: this.label"></span><span class="moo-ui-radio-icon"> &nbsp;</span></label></div></div>',

    checkbox: '<div moo-template="foreach: input"><div class="moo-ui-checkbox"><label><span class="moo-ui-checkbox-label" moo-template="text: this.label"></span><span class="moo-ui-checkbox-icon"> &nbsp;</span></label></div></div>',
    
    overlay: "<div class='moo-overlay'></div>",
    
    loading: "<div class='moo-ui-loading'><div class='moo-ui-loading-block moo-loading-01'></div><div class='moo-ui-loading-block moo-loading-02'></div><div class='moo-ui-loading-block moo-loading-03'></div><div class='moo-ui-loading-block moo-loading-04'></div><div class='moo-ui-loading-block moo-loading-05'></div><div class='moo-ui-loading-block moo-loading-06'></div><div class='moo-ui-loading-block moo-loading-07'></div><div class='moo-ui-loading-block moo-loading-08'></div></div>",
    
    modal: "<div class='moo-ui-modal-container'><div class='moo-ui-modal-panel' moo-template='html: this.html'></div></div>",
    
    _switch: "<div class='moo-ui-switch'><b><span class='moo-before'>I</span><span class='moo-button'>&nbsp;</span><span class='moo-after'>O</span></b></div>",
    
    text: '<span class="cleanbox">&times</span>',
    
    select: '<div class="moo-ui-select-container moo-top"><span class="moo-ui-select-text"></span><span class="mo-ui-select-link"> &#9660;</span><div class="moo-ui-select-menu" style="height:217px;display:none"><div class="moo-ui-select-wrapper"><ul class="moo-ui-select-list" moo-template="foreach: option"><li moo-template="text: this.text"></li></ul></div></div>'

},

/**
 * Remove spaces from a string
 * @private
 * @param {string} string String for remove spaces
 * @return {string} string String without spaces
 */
_removeSpaces = function(string) {
    return string.split(" ").join("");
},


// Mootor UI internal template system

 /**
 * Mootor UI template parser
 * @private
 * @param {object} options Options
 * @config {string} template HTML template
 * @config {object} self Mootor object instance (scope)
 * @return {string} parsedHTML Parsed HTML template
 */
_templateParse = function(options) {
    var template = options.template,
        self = options.self,
        
        elements = [],
        parsedHTML = document.createElement("div"),
        tmpElements = [],
        i = 0,
        attr = [],
        index;
    
    parsedHTML.innerHTML = template;        
    tmpElements = parsedHTML.getElementsByTagName("*");     

    for (i = tmpElements.length; i--;) {

        if (tmpElements[i].getAttribute("moo-template") !== null) {

            attr = _removeSpaces(tmpElements[i].getAttribute("moo-template"))
                  .split(":");
                  
            elements.push({
                el: tmpElements[i],
                key: attr[0],
                value: attr[1]
            });
            
        }
        
        if ((index = tmpElements[i].getAttribute("moo-foreach-index")) !== null) {
            elements[i].index = index;
        }
        
    }

    if(_templateArrayHasForeach(elements) === true) {       
        for (i = elements.length; i--;) {
            if (elements[i].key === "foreach") {
                _templateForEach(elements[i], self);            
            } 
        }
    } else {
        for (i = elements.length; i--;) {
            switch (elements[i].key) {
                case "text":
                    _templateText(elements[i], self);
                    break;
                case "html":
                    _templateHTML(elements[i], self);
                    break;
            }
        }
    }
    
    return parsedHTML.innerHTML;
    
},


 /**
 * Check if any element of a Mootor template array has a "foreach" attribute
 * @private
 * @param {object} options Options
 * @config {string} template HTML template
 * @config {object} self Mootor object instance (scope)
 * @return {boolean}
 */
_templateArrayHasForeach = function(elements) {
    var i;
    
    for (i = elements.length; i--;) {        
        if(elements[i].key === "foreach") {
            return true;
        }                
    }

    return false;
},

 /**
 * Parse a "foreach" Mootor template
 * @private
 * @param {object} element Mootor template object to parse
 * @param {object} self Mootor object instance (scope)
 */
 _templateForEach = function(element, self) {
    var tag = element.value,
        collection = self.input.getElementsByTagName(tag),
        i = 0,
        tmpDiv = {},
        html = element.el.innerHTML,
        items = [],
        labels = [],
        tmpElement = document.createElement("div");
                    
    self.items = [];
    
    items = $(self.input).find(tag);
            
    if(tag === "input") {
        labels = $(self.input).find("label");
    }
            
    for (i = 0; i < items.length; i++) {
        self.items.push({
            el: items[i],
            text: items[i].innerText
        });
        if(tag === "input") {
            self.items[self.items.length-1].label = labels[i];
        }
    }
                    
    element.el.innerHTML = "";
    
    for (i = 0; i < collection.length; i++) {
        tmpDiv = document.createElement("div")
        tmpDiv.innerHTML = html;
        tmpDiv.firstChild.setAttribute("moo-foreach-index", i);
        
        tmpDiv.innerHTML = _templateParse({
            template: tmpDiv.innerHTML,
            self: self
        });

        tmpElement.appendChild(tmpDiv.firstChild);       

    }        
    
    element.el.innerHTML = tmpElement.innerHTML;

},

 /**
 * Parse a "text" Mootor template
 * @private
 * @param {object} element Mootor template object to parse
 * @param {object} self Mootor object instance (scope)
 */
_templateText = function(element, self) {
    var index = element.index,
        value = "",
        valueToLoad = "";
                    
    if(element.value.indexOf("this.") > -1) {
        value = element.value.replace("this.","");
        valueToLoad = self.items[index][value];
        if (typeof valueToLoad === "string") {
            element.el.innerText = valueToLoad;
        } else {
            element.el.innerText = valueToLoad.innerText;                        
        }
    }
},


 /**
 * Parse a "html" Mootor template
 * @private
 * @param {object} element Mootor template object to parse
 * @param {object} self Mootor object instance (scope)
 */
_templateHTML = function(element, self) {
    var index = element.index,
        value = "";
        
    if(element.value.indexOf("this.") > -1) {
        value = element.value.replace("this.","");
        element.el.innerHTML = self[value];        
    }
};
/**
 * Overlay
 * @return {object} Overlay Mootor UI Overlay object
 */
var Overlay = function() {
    if (Overlay.el === undefined) {
        Overlay._makeHTML({
            type: "overlay",
            object: Overlay
        });    
    }
    this.el = Overlay.el;
    return this;
},


/**
 * Modal
 * @return {object} Modal Mootor UI Modal object
 */
Modal = function() {
    if (Modal.el === undefined) {
        Overlay._makeHTML({
            type: "modal",
            object: Modal
        });    
    }
    this.el = Modal.el;
    return this;
},

/**
 * Loading
 * @return {object} Loading Mootor UI Loading object
 */
Loading = function() {
    if (Loading.el === undefined) {
        Overlay._makeHTML({
            type: "loading",
            object: Loading
        });    
    }
    this.el = Loading.el;
    return this;
};

/*
 * Overlay prototype
 */
Loading.prototype = Overlay.prototype = {        
    
    show: function() {
        $(this.el).removeClass("moo-hidden");
    },
    
    hide: function() {
        $(this.el).setClass("moo-hidden");
    },
}

// Modal prototype
Modal.prototype = {
    html: function(html) {
        this.html = html;
        this.el.innerHTML = _templateParse({
            template: this.el.innerHTML,
            self: this
        });
    }
}

$.extend(Overlay.prototype, Modal.prototype);



// Static properties

$.extend({
    el: undefined,
    _makeHTML: function(options) {
        var type = options.type,
            object = options.object,
            el = document.createElement("div");
        el.innerHTML = _templates[type];
        object.el = el.firstChild;
        $(object.el).setClass("moo-hidden");
        $(document.body).el.appendChild(object.el);
    }
}, Overlay);
var Input = function() {
};
/**
 * Switch
 * @param {object} options Options
 * @config {object} el Switch container
 * @return {object} Switch Mootor UI Switch object
 */
var Switch = function(options) {
    var self = this;
                
    this.input = options.el;                   
    $(this.input).hide();
    this._makeHTML();
    this._setTouchEvents();

    
    if (options.value) {
        this.input.value = options.value;
    }
    
    this.toggle(this.input.value);       
    
    return this;
};

Switch.prototype = {

    _makeHTML: function() {
        var el;
        el = document.createElement("div");
        el.innerHTML = _templates._switch;            
        this.el = el.firstChild;
        this.input.parentElement.appendChild(this.el);                        
    },
    
    _setTouchEvents: function() {
        var self = this,
            el = $(self.el).find("b")[0],

            // FIXME CHECK: 32? 3?
            limit = self.el.offsetWidth - 32,
            treshold = limit / 3,
            swipe = 0;
        
        self.x = 0;
        self.isDragging = 0;

        // On TapEnd: toggle
        $(this.el).onTapEnd(function(gesture) {
            self.toggle();
        });  
        
        // On Swipe: update _swipe flag
        $(this.el).onSwipeRight(function(gesture) {
            self._swipe = 1;

        });   
        $(this.el).onSwipeLeft(function(gesture) {
            self._swipe = -1;
        });         

        // On DragMove: translate container element
        $(this.el).onDragMove(function(gesture) {
            var newX = self.x + (gesture.x - gesture.lastX);  
            
            self.isDragging = 1;                              
            $(self.el).removeClass("moo-on");
            $(self.el).removeClass("moo-off");

            gesture.e.stopPropagation();
            if ((newX <= limit) && (newX > -4)) {
                self.x = newX;
                $(el).translateFx({x: self.x, y: 0}, {transitionDuration: 0});
            }
                                      
        });

        // On DragEnd: check gesture time
        //             and toggle by swipe
        //             or drag
        $(this.el).onDragEnd(function(gesture) {
            var newX;
                            
            gesture.e.stopPropagation();                
            $(el).cleanFx();
            
            if (self._swipe !== 0 && gesture.time < 400) {
                if (self._swipe === 1) {
                    self.toggle(1);                        
                } else {
                    self.toggle(0);                                                
                }
            } else if (self.isDragging === 1) {
                self.isDragging = 0;    

                if (self.x < (limit / 2)) {
                    self.toggle(0);                            
                } else {
                    self.toggle(1);                            
                }                    
            }                    
                                      
        });
    },

    /**
    * Toggle control
    *
    * @example myCheck.toggle();
    */
    toggle: function (value) {
        var el = $(this.el);

        if (value !== undefined) {
            this.value = +value;
        } else {
            if (this.value === 0) {
                this.value = 1;
            } else {
                this.value = 0;
            }                                
        }
        
        if (this.value === 0) {
            el.removeClass("moo-on");
            el.setClass("moo-off");                
        } else {
            el.removeClass("moo-off");
            el.setClass("moo-on");                
        }

        this.input.value = this.value;
        
        if (typeof this.onChange === "function") {
            this.onChange();
        }
    },
    
    on: function(event, callback) {
        switch (event) {
            case "change":
                this.onChange = callback;
                break;
        }
    }
}
/**
 * Checkbox
 * @param {object} options Options
 * @config {object} el Fieldset element
 * @return {object} Checkbox Mootor UI Checkbox object
 */
var Checkbox = function(options) {
    var self = this,
        i = 0;
                
    this.input = options.el;                       
    $(this.input).hide();
    this._makeHTML();
    
    this.mooItems = $(this.el).find(".moo-ui-checkbox");        

    for (i = this.mooItems.length; i--;) {
        $(this.mooItems[i]).onTapEnd(function(gesture) {
            self.activate($(gesture.e.target));
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
    
    activate: function(element) {
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
 /**
 * Text
 * @param {object} options Options
 * @config {object} el Text input element
 * @return {object} Text Mootor UI Text object
 */
var Text = function(options) {
    var self = this;
                
    this.el = this.input = options.el;                               
    if (options.value !== undefined) {
        this.value = options.value;
    } else {
        this.value = "";
    }

    this._makeHTML();
                
    $(this.el).onDragStart(_stopEventPropagationAndPreventDefault);                

    $(this.el).onTapEnd(function(gesture) {
        gesture.el.focus();
        _stopEventPropagationAndPreventDefault(gesture);
    });        
    $(this.cleanbox).onTapEnd(function() {
        self.clean();
    })
                    
    return this;
};

 /*
* Text prototype
*/  
Text.prototype = {
    // Make HTML
    _makeHTML: function() {
        var el,
            parent = this.el.parentElement,
            self = this;
        
        this.cleanbox = document.createElement("div");
        this.cleanbox.innerHTML = _templates.text;                        
        this.input.value = this.value;

        el = document.createElement("div");
        $(el).setClass("moo-ui-text");
        el.appendChild(this.cleanbox);         
        el.appendChild(this.input);
        this.input.onkeyup = function() {
            self.value = self.input.value;
            if (typeof self.onChange === "function") {
                self.onChange();                    
            }
        }
        parent.appendChild(el);         
    },
    
    clean: function() {
        this.input.value = "";
    },
    
    on: function(event, callback) {
        switch (event) {
            case "change":
                this.onChange = callback;
                break;
        }
    }
}/**
 * TextArea
 * @param {object} options Options
 * @config {object} el Textarea element
 * @return {object} TextArea Mootor UI TextArea object
 */
var TextArea = function(options) {
    var self = this;
                
    this.el = this.input = options.el;      
    
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
            parent = this.el.parentElement;
        
        el = document.createElement("div");
        $(el).setClass("moo-ui-textarea");
        el.appendChild(this.input);
        parent.appendChild(el);         
    },

}
// Public constructors

$.extend({

     ui: function(options) {
         options.el = this.el;
         switch (options.type) {
             case "Switch":
                return new Switch(options);
                break;
             case "Text":
                return new Text(options);
                break;
             case "TextArea":
                return new TextArea(options);
                break;
             case "Select":
                return new Select(options);
                break;
             case "Radio":
                return new Radio(options);
                break;
             case "Checkbox":
                return new Checkbox(options);
                break;                 
         }
     },
});

$.extend({
     ui: {
         overlay: function() {
            return new Overlay();
         },
         loading: function() {
            return new Loading();
         },
         modal: function(options) {
            return new Modal();
         }
     }
}, $);


// Private static functions & utilities

 /**
 * Stop event propagation and prevent default
 * @private
 * @param {object} gesture Mootor gesture
 */
var _stopEventPropagationAndPreventDefault = function(gesture) {
    gesture.e.stopPropagation();
    gesture.e.preventDefault();
};


}(Mootor));
