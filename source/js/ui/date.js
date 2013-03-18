
/**
 * UIDate
 * @param {object} options Options
 * @return {object} UIDate Mootor UI UIDate object
 */
var UIDate = function(options) {
    var i = 0,
        pseudoItems = this.pseudoItems = [],
        self = this;
        
    this.y = 0;
    this.input = options.el;        
    this._visibility = "hidden";
    this._makeHTML();       
    this._setTouchEvents();     
    
    // Init value
    if (options.value !== undefined) {
        this.value = options.value;
    }
    
    return this;
            
};

/*
 * UIDate prototype
 */   
UIDate.prototype = {

    set: function(value) {
        this.input.value = value;
        this.value = this.input.value;
        $(this.textspan).html(this.input.value);
    },

    // Make HTML
    _makeHTML: function() {
        var el = document.createElement("div"),
            template = _templates.uidate,
            container = this.input.parentElement;

        el.innerHTML = _templateParse({
            template: template,
            self: this
        });           
        
        this.el = el.firstChild;                      
        this.el.parentElement.insertBefore(this.input);
        
        // FIXME CHECK
        container.appendChild(el);
        
        this.textspan = $(this.el).find(".moo-ui-date-text")[0];
        
    },
    
    // Set touch events
    _setTouchEvents: function() {
        var self = this;
                
        // Show selection box
        $(this.input).onTapEnd(function(gesture) {
            if (self._visibility !== "visible") {
                self.input.focus();                
                self._visibility = "visible";
            }
        });
        
        $(this.input).on("blur", function() {
            self._visibility = "hidden";
        });
        
        $(this.input).on("change", function() {
            
            // FIXME CHECK (date formatting)
            var value = self.value = self.input.value,
                valueString = "",
                d = new Date(value);
            
            valueString = (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear()
            
            $(self.textspan).html(valueString);
        });          

        // Prevents default on DragStart
        $(this.el).onDragStart(_stopEventPropagationAndPreventDefault);        

    },
    
};


