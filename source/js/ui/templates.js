
var _templates = {
    radio: '<div moo-template="foreach: input"><div class="moo-ui-radio"><label><span class="moo-ui-radio-label" moo-template="text: this.label"></span><span class="moo-ui-radio-icon"> &nbsp;</span></label></div></div>',

    checkbox: '<div moo-template="foreach: input"><div class="moo-ui-checkbox"><label><span class="moo-ui-checkbox-label" moo-template="html: this.label"></span><span class="moo-ui-checkbox-icon"> &nbsp;</span></label></div></div>',
    
    overlay: "<div class='moo-overlay'></div>",
    
    loading: "<div class='moo-ui-loading'><div class='moo-ui-loading-block moo-loading-01'></div><div class='moo-ui-loading-block moo-loading-02'></div><div class='moo-ui-loading-block moo-loading-03'></div><div class='moo-ui-loading-block moo-loading-04'></div><div class='moo-ui-loading-block moo-loading-05'></div><div class='moo-ui-loading-block moo-loading-06'></div><div class='moo-ui-loading-block moo-loading-07'></div><div class='moo-ui-loading-block moo-loading-08'></div></div>",
    
    modal: "<div class='moo-ui-modal-container'><div class='moo-ui-modal-panel' moo-template='html: this.html'></div></div>",
    
    toggleswitch: "<div class='moo-ui-switch'><b><span class='moo-before'>I</span><span class='moo-button'>&nbsp;</span><span class='moo-after'>O</span></b></div>",
    
    text: '<span class="cleanbox">&times</span>',
    
    select: '<div class="moo-ui-select-container"><span class="moo-ui-select-text"></span><span class="moo-ui-select-link"> &#9660;</span><div class="moo-ui-select-menu" style="height:217px;display:none"><div class="moo-ui-select-wrapper"><ul class="moo-ui-select-list" moo-template="foreach: option"><li moo-template="text: this.text"></li></ul></div></div></div>',
    
    camera: "<div class='moo-ui-image-container'><div class='moo-ui-image-panel'><ul class='moo-image-list'><li class='moo-image-wrapper'><div class='moo-image'></div></li></ul></div><header><a class='moo-ui-add-new' href='#takepic'>Take a picture</a><a class='moo-ui-add-filed' href='#choosepic'>Choose a picture</a><a class='moo-ui-delete' href='#delete'></a><a class='moo-ui-add-comment' href='#addcomment'></a></header></div>"

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
        item,
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
        
        item = self.items[self.items.length-1];
        
        if(tag === "input") {
            item.label = labels[i];
        }
        if (item.el.value !== undefined) {
            item.value = item.el.value;
        }
    }
                    
    element.el.innerHTML = "";
    
    for (i = 0; i < collection.length; i++) {
        tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = html;
        tmpDiv.firstChild.setAttribute("moo-foreach-index", i);
        
        tmpDiv.firstChild.setAttribute("moo-foreach-value", self.items[i].value);
                
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
        if (valueToLoad !== undefined) {
            if (typeof valueToLoad === "string") {
                element.el.innerText = valueToLoad;
            } else {
                element.el.innerText = valueToLoad.innerText;                        
            }
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
        value = "",
        valueToLoad = "";
                    
    if(element.value.indexOf("this.") > -1) {
        value = element.value.replace("this.","");
        valueToLoad = self.items[index][value];
        if (typeof valueToLoad === "string") {
            element.el.innerHTML = valueToLoad;
        } else {
            element.el.innerHTML = valueToLoad.innerHTML;                        
        }
        
        // FIXME CHECK
        valueToLoad.parentElement.removeChild(valueToLoad);
    }
};
