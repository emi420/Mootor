/**
* The App class defines the main object of the applications
* It handles creating the views.
*
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Zepto) {

    "use strict";

    var App,
        _app;

    // Private constructors

    /**
    * @class App
    * @constructor
    * @param {Object} options An object defining options for the application.
    * * views - An array with a list of view names
    */
    App = function(options) {
        App.init(options, this);
    }
    
    $.__App = App;

    // Private static methods and properties

    $.extend(App, {
    
        views: {},
        
        currentView: undefined,
    
        init: function(options, self) {
        	// Defer init until dom loaded
        	Zepto(function($){
        		App.initViews(options.views, self);
        	}) 
        },
    
        /**
        * Init views, load remote files and call the View class to handle it.
        *
        * @method initViews
        * @param {Array} views A list of view names to be initialized
        */
        initViews: function (views, self) {
            var i,
                view;
                
        	for (i = 0; i < views.length; i++) {

                view = self.view({
                    id: views[i],
                });
                
                App.views[view.id] = view;

        	}
            
        },
    
    })
    
    $.extend(App.prototype, {
        
        getView: function(id) {
            return App.views[id];
        },
        
        getCurrentView: function() {
            return App.currentView;
        },
        
        go: function(id) {
            var view;
            if (App.currentView !== undefined) {
                this.getCurrentView().hide();
            }
            view = this.getView(id);
            App.currentView = view;
            view.show();
        }
    });

    // Public constructors

    /** 
    *  App instance factory
    *
    *  $.app({
    * 	 views: [
    * 		"index",
    * 		"view1"
    * 	 ]
    *  });
    */

    $.extend($, {
        app: function(options) {
            if (_app === undefined) {
                _app = new App(options);
            }
            return _app;
        }
    });
        
}(window.$, window.Zepto));
