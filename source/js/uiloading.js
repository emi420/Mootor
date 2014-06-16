/**
* The UILoading is the loading indicator 
*
* @class UILoading
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    // Force strict mode for ECMAScript
    "use strict";

    var UILoading,
        
        UIApp,
        UI;

    // Dependences

    UI = Mootor.UI;
    UIApp = Mootor.UIApp;

    // Event handlers
    UIApp.on("init", function() {
        var uiloading = new UILoading();

        $.extend(UIApp.prototype, {
            
            /**
            * Show/Hide the loading indicator
            *
            * @method loading
            * @for UIApp
            * @param {Boolean} [show] Show or hide the loading indicator
            * @return {Boolean}
            * @example
            *     m.app.ui.loading();
            *     m.app.ui.loading(true);
            */
            loading: function(show) {
                if (show === true) {
                    uiloading.show();
                }
                else {
                    uiloading.hide();
                }
            }

        });   

    });    


    // Private constructors

    UILoading = Mootor.UILoading = function() {
        var $el = this.$el = UILoading.create();
        $el.appendTo(m.app.ui.$container);
        this.hide();
    };

    // Prototypal inheritance

    UILoading.prototype = UI.prototype;

    
    // Private static methods and properties

    $.extend(UILoading, {
        /**
        * Create and add the loading indicator's elements to the DOM
        *
        * @method create
        * @return {Zepto} Zeptified element
        */

        create: function() {
            var el = document.createElement("div");
            var $el = $(el);
            $el.addClass("m-loading");
            $el.addClass("m-loading-circles");//m-loading-default-style

            $("<div>").addClass("m-loading-circle m-loading-circle-01").appendTo($el);
            $("<div>").addClass("m-loading-circle m-loading-circle-02").appendTo($el);
            $("<div>").addClass("m-loading-circle m-loading-circle-03").appendTo($el);

            return $el;
        }
    });

    // Public methods

    $.extend(UILoading.prototype, {
        
        /**
        * Set the style for the loading animation
        *
        * @method style
        * @param {object} [options] Style options TODO: Define this object's structure
        * @return {UILoading} 
        * @chainable
        */
        /*
        style: function(options) {
            
        }*/
    });      

      
}(window.$, window.Mootor, window.m));
