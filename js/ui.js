/**
 * @summary User Interface Mootor plugin
 */
 
/** 
 * @class
 * @name $ 
 */
 
(function ($) {

 "use strict";
 
    var Overlay = function() {

    },
    
    Tooltip = function(options) {
        var self = this;
        self.html = options.html;
        self.el = options.el;

        self.div = document.createElement("div");
        $(self.div).hide();
        $(self.div).setClass("moo_tooltip");
        $(self.div).html(this.html);
        
        document.body.appendChild(self.div)

        $(self.el).onTapEnd(function(event) {
            $(self.div).translateFx({
                x: event.e.clientX,
                y: event.e.clientY,
            }, {});
            $(self.div).show();
        })
        return self;
    },

     /**
     * Checkbox instance object
     *
     * @class
     * @name Checkbox
     * @return {Checkbox} Checkbox object
     * @param {object} options  Configuration options
     * @property {element} el Container element
     */
    Checkbox = function(options) {
        var check,
            input;

        this.el = options.el;
        this.el.innerHTML += "<b></b>";

        input = this.el.getElementsByTagName('input')[0];
        // FIXME CHECK: temporary initial value
        this.value = 1;
        $(input).hide();
        this.input = input;

        check = $(this.el);
        check.setClass("moo_checkbox");

        // FIXME CHECK: optimize me (initial value)
        if (input.checked === false) {
            this.toggle();
        }
        this.handleGesture = function (gesture) {
            this.toggle();
        };
        check.onTapEnd(this);

        return this;
    };

    Checkbox.prototype = {
     /**
     * Toggle control
     *
     * @this {Checkbox}
     * @example var myCheck =  $("#checkbox1").checkbox();
     * myCheck.toggle();
     */
     toggle: function () {
            var el = $(this.el);
            if (this.value === 0) {
                this.value = 1;
                this.input.checked = true;
                el.removeClass("off");
                el.setClass("on");
            } else {
                this.input.checked = false;
                el.removeClass("on");
                el.setClass("off");
                this.value = 0;
            }
        }
    };
    
    
    Tooltip.prototype = {
        
    }
    
    Overlay.prototype = {
        show: function() {
            $(this.el).show();
        },
        hide: function() {
            $(this.el).hide();
        },
    }
    
    $.extend(Overlay.prototype, Tooltip.prototype);

    $.extend({
    
         ui: function(options) {
             options.el = this.el;
             switch (options.type) {
                 case "Checkbox":
                    return new Checkbox(options);
                    break;
                 case "Tooltip":
                    return new Tooltip(options);
                    break;
             }
         }
    });
    

}($));

