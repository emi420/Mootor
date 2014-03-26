/**
* The UILoading is the loading indicator 
*
* @class UILoading
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    // Force strict mode for ECMAScript
    "use strict";

    var UILoading,
        
        UIApp,
        UI;

    // Dependences

    UI = Mootor.UI;
    UIApp = Mootor.UIApp;
    
    // Event handlers
    
    UIApp.on("init", function(self) {
        self.loading = new UILoading(self.el);
        self.loading.hide();
    });

    // Private constructors

    UILoading = Mootor.UILoading = function(containerEl) {
        this.$el = $("<div>").addClass("m-loading");
        this.el = this.$el[0];        
        $("<div>").addClass("m-loading-circle m-loading-circle-01").appendTo(this.el)
        $("<div>").addClass("m-loading-circle m-loading-circle-02").appendTo(this.el)
        $("<div>").addClass("m-loading-circle m-loading-circle-03").appendTo(this.el)
        this.$el.appendTo(containerEl.parentElement);
    };

    // Prototypal inheritance

    UILoading.prototype = UI.prototype;

    
    // Private static methods and properties

    $.extend(UILoading, {
        // code here
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
        style: function(options) {
            
        }
    });      
    

    $.extend(UIApp.prototype, {
        
        /**
        * Show/Hide the loading indicator
        *
        * @method loading
        * @for UIApp
        * @param {Boolean} [show] Show or hide the loading indicator
        * @return {Boolean}
        */
        loading: function(show) {
            
        }

    });   
      
}(window.$, window.Mootor));
