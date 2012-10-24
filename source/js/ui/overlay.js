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
 * Modal * @return {object} Modal Mootor UI Modal object
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
 * Loading / Overlay prototype
 */
Loading.prototype = Overlay.prototype = {        
    
    show: function() {
        $(this.el).removeClass("moo-hidden");
    },
    
    hide: function() {
        $(this.el).setClass("moo-hidden");
    }
};

// Modal prototype
Modal.prototype = {
    html: function(html) {
        this.html = html;
        this.el.innerHTML = _templateParse({
            template: this.el.innerHTML,
            self: this
        });
    }
};

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
