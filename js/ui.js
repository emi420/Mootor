/* 
 * Mootor User Interface
 */

(function (Moo) {
    "use strict";

    var Checkbox = function (options) {
        var check,
            input;

        this.el = options.el;

        // FIXME CHECK: update core to support 'each'
        input = this.el.getElementsByTagName('input')[0];
        // FIXME CHECK: temporary initial value
        this.value = 1;
        $(input).hide();
        this.input = input;
        this.el.innerHTML += "<b></b>";

        check = $(this.el);
        check.setClass("moo_checkbox");

        // FIXME CHECK: optimize me
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

    Moo.UI = {
        checkbox: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options.el = this.el;
            return new Checkbox(options);
        }
    };

    Moo.extend(Moo.UI);

}($));

