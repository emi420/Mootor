/**
* The UIView class is the UI representation of a view
*
* @class UIView
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, document) {

    "use strict";

    var UIView,
    
        UI,
        Event,
        UIPanel,
        View;

    // Dependences

    Event = Mootor.Event;
    UI = Mootor.UI;
    UIPanel = Mootor.UIPanel;
    View = Mootor.View;

    // Event handlers
    
    Event.on("View:startInit", function(self) {
        self.ui = new UIView(self);
    });
        
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var self = this;

        self.view = view;


        self.panel = new UIPanel();
        self.panel.hide();

       //There is a tricky moment when HTML's are already loaded before UIViews are initialized
        if (View._getHtmlPath(view) !== window.undefined) {
            self.panel.el.innerHTML = View._getHtmlPath(view);                
        }
        else {
            Event.on("View:getHtml:" + view.id, function(view) {
                self.panel.el.innerHTML = View._getHtmlPath(view);
            });
        }

        Event.on("View:load:" + view.id, function(view) {
            self.panel.position("right").show();
            m.app.ui.onTransitionEnd(function() {
                self.panel.position("left");
            });
        });
        
        // on m.app.go
        Event.on("View:unload:" + view.id, function(view) {
            self.panel.position("left");
            m.app.ui.onTransitionEnd(function() {
                //This if is needed because on application start the first view is "unloaded" before it's loaded
                if (Mootor.App._currentView !== view) {
                    self.panel.hide();    
                }
                
            });
        }); 

        Event.dispatch("UIView:init:" + view.id, self);

    };


    // Private static methods and properties

    $.extend(UIView, {
        
    });

    // Public methods

    UIView.prototype = {
        // code here
    }

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
