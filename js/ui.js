/**
 * @summary User Interface Mootor plugin
 */
 
/** 
 * @class
 * @name $ 
 */
 
(function ($) {

 "use strict";

     /**
     * Checkbox instance object
     *
     * @class
     * @name Checkbox
     * @return {Checkbox} Checkbox object
     * @param {object} options  Configuration options
     * @property {element} el Container element
     */
    var Checkbox = function(options) {
        var check,
            input;

        this.el = options.el;
        this.el.innerHTML += "<b></b>";

        // FIXME CHECK: update core to support 'each'
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

    $.extend({

         /**
         * @param {object} options Configuration options
         * @return {Checkbox} Checkbox instance
         * @function
         * @name checkbox
         * @memberOf $.prototype 
         * @config {element} el Container element
         * @example #checkbox1
         *      %input{:type=>"checkbox"}
         *      %label Option 1
         *
         * :javascript
         *      $("#checkbox1").checkbox();
         */
        checkbox: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Checkbox(options);
        }
    });

}($));

