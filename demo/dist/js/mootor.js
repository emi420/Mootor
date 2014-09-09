(function($) {

    // Allow to use "click" or tap and 
    // not worry about device capabilities
    
    if ( 'ontouchstart' in window ) {
        $.fn._on = $.fn.on;
        $.fn.on = function(event, selector, data, callback, one) {
            if (event.indexOf("click") > -1 && event.indexOf("tap") > -1) {
                event = event.replace("click","");
            }
            return $.fn._on.call(this, event, selector, data, callback, one);
        };
    }

}(window.$));
(function($) {

    var ua = navigator.userAgent,
        androidversion,
        startY,
        lastY;
    
    if( ua.indexOf("Android") >= 0 ) {
      androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
      if (androidversion <= 2.3) {
          document.addEventListener("touchstart", function(e) {
             startY = e.touches[0].clientY;
          });
          document.addEventListener("touchmove", function(e) {
              lastY = e.touches[0].clientY;
              m.app.view().ui.el.scrollTop -= (lastY - startY);
          });
      }
    }
    
}(window.$));
/**
* Mootor public objects
*
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function () {

    "use strict";
    
    var Mootor,
        m;

    Mootor = {
        // code here
    };
 
    // Static global objects
    
    /**
    * m public global object
    * @class window.m
    * @static
    */
    m = {
        // code here
    };

    // Make it public!
    
    window.Mootor = Mootor;
    window.m = m;
    

}());
/**
* The Event class defines and manage events
*
* @class Event
* @private
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";
    
    var Event;
    
    Event = Mootor.Event = {
        
        /**
        * Events collection
        * @private
        */
        _collection: {},

        /**
        * Add event to collection
        * @method on
        * @param {string} event Name of the event
        * @param {function} callback Callback function\
        * @example
        *     Mootor.on("myCustomEvent", function(self) {
        *         console.log("Event fired!");
        *     });
        * @private
        */
        on: function(event, callback) {
            if (Event._collection[event] === undefined) {
                Event._collection[event] = [];
            } 
            Event._collection[event].push(callback);
        },
        
        /**
        * Dispatch event
        * @method dispatch
        * @param {string} event Name of the event
        * @param {object} instance Instance for scope
        * @private
        * @example
        *     Mootor.dispatch("myCustomEvent", myInstance);
        */
        dispatch: function(event, instance) {
            var i,
                count = 0,
                callbacks = Event._collection[event],
                callback;
                                
            if (callbacks !== undefined) {
                count = callbacks.length ;
            }
            
            callback = function(cb) {
                window.setTimeout(function() {
                    cb(instance);
                }, 1);
            };
            
            for (i = 0; i < count; i++) {
                callback(callbacks[i]);
            }
        }, 

        /**
        * Extend objects with Event methods
        * @method extend
        * @param {object} object Object to extend
        * @param {string} objectName String name of the object
        * @private
        * @example
        *     Person = function(name) {
        *         this.name = name;
        *     }
        *
        *     Mootor.Event.extend(Person.prototype);
        *
        *     person = new Person("Anon");
        *     person.on("fire", function(self) {
        *          console.log(self.name + " is on fire!");
        *     }
        *     person.dispatch("fire", person);
        */
        extend: function(object, objectName) {
            $.extend(object, {
                on: function(event, callback) {
                    Event.on(objectName + ":" + event, callback); 
                },
                dispatch: function(event, self) {
                    Event.dispatch(objectName + ":" + event, self);
                }
            });
            
        }

    };

}(window.$, window.Mootor));/**
* Information about the context of the application (ej: device's viewport)
* @class Context
* @return object
* @static
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var Context;

    Context = Mootor.Context = function() {
        return ({


            /**
            * System info
            * @property os
            * @type function
            * @example
            *     if (m.context.os === "android") {
            *          console.log("Your device use Android.");
            *     }
            */            
            os: $.os,

            /**
            * Browser info
            * @property browser
            * @type string
            * @example
            *     if (m.context.browser === "firefox") {
            *          console.log("Your browser is Firefox.");
            *     }
            */            
            browser: $.browser,

            /**
            * Viewport info
            * @property viewport
            * @type object
            * @example
            *     img.width = m.context.viewport.width
            *     img.height = m.context.viewport.height
            */            
            viewport: {
                width: window.screen.width,
                height: window.screen.height
            },
            
            cordova: function() {
                return window.Cordova !== undefined
            },
            phonegap:function() {
                return window.PhoneGap !== undefined
            },
            _androidversion: function() {
                var ua = navigator.userAgent;
                if( ua.indexOf("Android") >= 0 ) {
                  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                }
                return androidversion;
            }

        });
    };

    // Static global objects
    
    $.extend(m, { 
        
        /**
        * @property context
        * @for window.m
        * @type Context
        */
        context: new Context()
    });

}(window.$, window.Mootor, window.m));/*
 *  @author Emilio Mariscal (emi420 [at] gmail.com)
 *  @author Martin Szyszlican (martinsz [at] gmail.com)
 */

(function ($, Mootor, m) {

    "use strict";

    var App,
    
        Event,
        View;

    // Dependencies

    Event = Mootor.Event;
    View = Mootor.View;

    // Private constructors
    
    /**
    * The App class defines the main object of the applications
    *
    * @class App
    * @constructor
    * @module App
    * @private
    * @param {Object} options An object defining options for the application.
    * * views - An array with a list of view names
    */
    App = Mootor.App = function() {
    };

    // Private static 
    
    $.extend(App, {
  
        _version: undefined,

        _settings: {}
    });
    
    Event.extend(App, "App");
    
    // Public methods

    App.prototype = {

        /**
        * The application's version number
        * Note: It's not Mootor version, this value is defined in application code, not framework code.
        *
        * @method version
        * @param {String} [version] The version number or name
        * @return {String} Version number or name
        * @example
        *     m.app.version("beta1");
        *     if (m.app.version().indexOf("beta") > -1) {
        *         console.log("Warning: beta version")
        *     }
        */
        version: function(version) {
            if (version !== undefined) {
                App._version = version;
            }
            return App._version;
        },

        /**
        * Application settings
        * If called with a key, returns the value. If called with key and value, sets value to key.
        *
        * @method settings
        * @param {String} key The name of the setting
        * @param {object} [value] The value of the setting
        * @return object the setting value
        * @example
        *     m.app.settings("debug", true);
        *     if (m.app.settings("debug") === true) {
        *          console.log("Debug mode activated.");
        *     }
        *     
        */
        settings: function(key, value) {
            if (value !== undefined) {
                // this.settings[key] = value;
                App._settings[key] = value;
            }
            // return this.settings[key] = value;
            return App._settings[key];
        },

        /**
        * Go to an url
        *
        * @method go
        * @param {String} url The url to go
        * @return Route
        * @example
        *     m.app.go("/product/15/");
        */
        go: function(url, _noPushState) {
            var route,
                stateObj;
                
            route =  m.app.route(url);

            
            if (route !== undefined) {
                App._currentRoute = route;
                App.dispatch("go", this);
                
                stateObj = { view: route.view.id };
        
                if (_noPushState !== true) {
                    if (route.url === "") {
                        route.url = " ";
                    }
                    window.history.pushState(stateObj, route.view.id, route.url);
                }
                                    
            } else {
                throw(new Error("Route " + url + " is not defined"));
            }                       
            return route;
        },        

        /**
        * Go to the previous view in the history
        *
        * @method back
        * @chainable
        * @return Route
        * @example
        *     m.app.back();
        */
        back: function() {
            window.history.back();
            return this;
        },        

        /**
        * Set callbacks for app events
        * @method on
        * @chainable
        * @return App instance
        * @example
        *     m.app.on("ready", function(self) {
        *         console.log("App started.");
        *     });
        */    
        on: function(event, callback) {
            App.on(event, callback);
            return this;
        },
        
        /* 
        * Remove callbacks for app events
        * @method off
        * @chainable
        * @return App instance
        */    
        
        /** TODO
        off: function(event, callback) {
            return this;
        },
        */
        
        /*
        * Initialize app
        * @chainable
        * @method init
        * @return App instance
        * @example
        *     m.app.on("init", function() {
        *          console.log("App initialized.");
        *     })
        *     m.app.init();
        */
        init: function() {
            var self = this;
            App.dispatch("init", this);   
            this.init = function() { return self; };
            return this;
        }
        
    };
    
    $.extend(m, {        
        /**
        * Creates a new app with the defined options.
        * If the app is already created, it can be called without options to have a reference to the Mootor app. 
        *
        * App instance factory
        *
        * @method app 
        * @for window.m
        * @param {Array} [views] A list of view names to be initialized
        * @return App
        * @example
        *     window.m.app({
        *       views: [
        *          "index",
        *          "view1"
        *       ]
        *     });
        */
        app: function(options) {
            if (App.app === undefined) {
                if (options === undefined) {
                    options = {};
                }
                App.app = new App(options);
                App._options = options;
                this.app = App.app;
                return this.app;
            }
        }
    });


}(window.$, window.Mootor, window.m));
/**
* The View class handles each view of the application. 
* A list of views is specified in the applications options
* and the files are loaded from the "views" folder.
* Each view has a viewName.js, viewName.html and viewName.css files.
*
* @class View
* @module View
* @constructor
* @param {Object} options An object defining options for the current view.
* * constructor - A function that will be run after the view has loaded (optional).
* * animation - a string defining the type of animation used to show this view (one of: "slide-left", "slide-right", "none").
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";
    
    var View,
    
        Event,
        App;
        
    // Dependencies
    
    Event = Mootor.Event;
    App = Mootor.App;
    
    // Event handlers
    
    App.on("init", function() {

        var views = App._options.views,
            viewCount = views.length,
            i,
            view;
            
        for (i = 0; i < viewCount; i++) {
            view = m.app.view(views[i]);
        }
        
        view.on("ready", function() {
            App.dispatch("ready");
        });
        
    });   
    
    App.on("go", function() {
        
        var view,
            currentView,
            stateObj,
            router = App._currentRoute,
            url = router.url;
        
        currentView = App._currentView;

        if (currentView !== undefined) {
            View.dispatch("beforeUnload", currentView);
        }

        view = App._currentView = router.view;

        if (currentView !== undefined) {
            View.dispatch("unload", currentView);
        }

        View.dispatch("beforeLoad", view);            
    
        stateObj = { view: view.id };
        
        View.dispatch("load", view);
        
    });
    
    // Private constructors

    View = Mootor.View = function(options) {
        this.id = options.id;
        View._init(options, this);
    };
    
    Event.extend(View, "View");
    View._dispatch = View.dispatch;
    View.dispatch = function(event, instance) {
        if (!instance) {
            console.error("view dispatch called with undefined instance for event: ",event);
            return false;    
        }
        
        if (event !== "init" ) {
            View._dispatch(event + ":" + instance.id, instance);
        } else {
            View._dispatch(event, instance);
        }
    };

    // Private static methods and properties
    
    $.extend(View, {        

        /**
        * Views collection
        */
        _collection: {},
    
        /**
        * Current active view
        */
        _current: undefined,

        /**
        * Init View instance, load HTML, CSS and JavaScript files for the view
        */
        _init: function(options, self) {
            View._collection[self.id] = {id: self.id, obj: self};

            View.dispatch("init", self);

            self.on("getHtml", function() {
                window.setTimeout(function() {
                    View._getScript(self);
                }, 1);
            });

            self.on("getScript", function() {
                View.dispatch("ready", self);
            });

            // Load Html, Css and JavaScript
            window.setTimeout(function() {
                View._getHtml(self);
            }, 1);
            View._getCss(self);

        },

        /**
        * Get view HTML
        */
        _getHtml: function(self) {
            var path,
                id = self.id;
                
            path = "views/" + id + "/" + id + ".html";
            $.get(
                path,
                function(source) {
                    View._get(self.id).html = source;
                    View.dispatch("getHtml", self);
                }
            );
        },

        /*
        * Get view script
        */
        _getScript: function (self) {
            var path,
                id = self.id,
                script,
                $script;
                
            path = "views/" + id + "/" + id + ".js";
            
            script = document.createElement("script");
            $script = $(script);
        
            script.src = path;
            script.type = "text/javascript";

            View._get(self.id).script = script;
            
            script.addEventListener("load", function() {
                View.dispatch("getScript", self);
            });
            
            $("head")[0].appendChild(script);
            
        },

        /*
        * Get view CSS
        */
        _getCss: function (self) {
            var path,
                id = self.id,
                link,
                $link;
                
            path = "views/" + id + "/" + id + ".css";
            
            link = document.createElement("link");
            $link = $(link);
        
            link.href = path;
            link.type = "text/css";
            link.rel = "stylesheet";

            $("head").append(link);
            
            $link.one("load", {
                path: path
            }, function() {
                View._get(self.id).css = link;
                View.dispatch("getCss", self);
            });
        },
        
        _get: function(id) {
            return View._collection[id];
        },
        
        _getHtmlPath: function(self) {
            return  View._get(self.id).html;
        },

        _getCssPath: function(self) {
            return View._get(self.id).css;
        },

        _getScriptPath: function(self) {
            return View._get(self.id).script;
        }
    });
    
    // Public instance prototype
    
    $.extend(View.prototype, {
        
        /**
        * Title is the friendly name for the current view.
        * When called without parameters, returns a string containing the title. When called with parameters, sets the title.
        * 
        * @method title
        * @param {string} [title] New title for this view.
        * @return string
        * @example
        *     // Get title
        *     m.app.view("index").title();
        *    
        *     // Get title
        *     m.app.view("index").title("My title");
        */  
        title: function(title) {
            var view = View._collection[this.id];
            if (title === undefined) {
                return view.title;
            } else {
                view.title = title;
                return this;
            }
        },

        /**
        * Sets an event handler for the view
        * Possible values for event: load, beforeLoad, unload, beforeUnload, init
        * 
        * @method on
        * @param {string} event Defines in which event the handler will be called
        * @param {function} callback The function to be called when the event is fired.
        * @return View
        * @example
        *
        *     // Simple example
        *
        *     m.app.route("^#index$", app.view("index"));
        *
        *     m.app.view("index").on("load", function(self) {
        *        console.log("Index view is loaded."); 
        *     });
        *
        *     // With parameters
        *
        *     m.app.route("^#product/(.*)", app.view("product"));
        *   
        *     m.app.view("product").on("load", function(self) {
        *        console.log("Product Id: " + self.params[0];
        *     });
        */   
        on: function(event,callback) {
            if (event !== "init") {
                View.on(event + ":" + this.id, callback);                
            } else {
                View.on(event, callback);
            }
            return this;
        }

        /**
        * Unsets event handlers for the view
        * Possible values for event: load, beforeLoad, unload, beforeUnload, init
        * 
        * @method off
        * @param {string} event Defines in which event we want to unset handlers
        * @param {function} [callback] If this parameter is specified, only that function is removed. Otherwise all callbacks for this event are removed.
        * @return View
        */  
        /*
        off: function(event,callback) {

        }*/

    });    
    
    $.extend(Mootor.App.prototype, {

        /**
        * Create or get a view
        *
        * @method view
        * @param {String} id The id of the view
        * @for App
        * @param {String} [options] The options object for the view
        * @return View the referenced view object
        * @example
        *     indexView = m.app.view("index");
        */
        view: function(id, options) {
            var views = View._collection,
                view;
            
            if (id !== "" && id !== undefined) {
                
                if (views[id] !== undefined) {
                    view = views[id].obj;
                } else {
                    if (options === undefined) {
                        options = {};
                    }
                    options.id = id;
                    view = new View(options);
                }
            } else {
                view = App._currentView;
            }

            return view;
        }
        
    });

}(window.$, window.Mootor, window.m));
/**
* The UI class is the class for all user interface elements.
* It is not directly used, but extended by many other classes.
*
* @class UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UI;
    
    // Private constructors

    UI = Mootor.UI = function() {
    };

    // Private static methods and properties

    $.extend(UI, {
        // code here
    });
    
    // Public methods

    $.extend(UI.prototype, {
        
        /**
        * DOM element
        *
        * @property el
        * @return {DOM Element}
        * @example
        *     appDOMElement = m.app.ui.el;
        *     appDOMElement.addEventListener("touchend", function() {
        *         console.log("Header was touched.");
        *     });
        */
        el: undefined,
        
        /**
        * Zepto/jQuery object for DOM element
        *
        * @property $el
        * @return {Zepto/jQuery object instance}
        * @example
        *     $appDOMElement = m.app.ui.$el;
        *     $appDOMElement.on("tap", function() {
        *         console.log("Header was tapped.");
        *     });
        */
        $el: undefined ,
        
        /**
        * Shows element (not necesarily, since the element's parent might be hidden or out of view)
        *
        * @method show
        * @return {UI}
        * @example
        *     m.app.ui.show();
        */
        show: function() {
            this.$el.removeClass("m-hidden");
        },

        /**
        * Hides element from view
        *
        * @method hide
        * @return {UI}
        * @example
        *     m.app.ui.hide();
        */
        hide: function() {
            this.$el.addClass("m-hidden");
        }
    });
        
}(window.$, window.Mootor));
/**
* The UIApp class is the UI representation of an app
*
* @class UIApp
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UIApp,
    
        UI,
        App,
        View,
        Event;

    // Dependences

    UI = Mootor.UI;
    Event = Mootor.Event;
    App = Mootor.App;
    View = Mootor.View;

    // Private constructors

    UIApp = Mootor.UIApp = function() {
        var $container;

        App = Mootor.App;

        if (App._options.container) {
            $container = App._options.container;
        }
        else {
            $("html").addClass("m-html");
            $container = $("body");
        }
        $container.addClass("m-app");
        
        // Update context viewport
        m.context.viewport = {
            width: $container.width(),
            height: $container.height()
        };

        // Event handlers
    
        window.addEventListener("resize", function() {
            m.context.viewport = {
                width: $container.width(),
                height: $container.height()
            };
        });

        this.$el = $("<div>").addClass("m-views-container");

        // Disable transitions on Android
        m.app.settings("uipanel-transitions", m.context.os.android !== true);

        if (m.app.settings("uipanel-transitions") !== true) {
            this.$el.addClass("m-no-transitions");
        }
        
        this.el = this.$el[0];        
        this.$el.appendTo($container);
        this.$container = $container;

        UIApp.dispatch("init", this);
        
    };
    
    // Event handlers
    
    App.on("init", function(self) {
        $.extend(self, {
           ui: new UIApp()
        });
    });    

    // Extends from UI

    $.extend(UIApp.prototype, UI.prototype);


    // Private static methods and properties

    Event.extend(UIApp, "UIApp");

    // Public methods

    $.extend(UIApp.prototype, {
    
    });  
    
    App.on("ready", function() {
           var links = $("a"),
               setEvent,
               onClick;
            
        
       // Android/iOS fixes
       setEvent = function(el, href) {
           $(el).on("tap", function(e) {
               m.app.go(href);
           });
           el.addEventListener("touchend", function(e) {
               e.preventDefault();
           });
       };
      if ( 'ontouchstart' in window ) {
           onClick = function() {
               return false;
           };
       } else {
           onClick = function() {
               m.app.go(href);
               return false;
           };
       }
    
       $.extend(UIApp, {
           _improveLinksForTouch: function(links) {
               var i,
                   href;
               if ( 'ontouchstart' in window ) {
                   for (i = links.length; i--;) {
                       href = links[i].getAttribute("href");
                       links[i].onclick = onClick;
                       if (href !== null && m.app.route(links[i].getAttribute("href")) !== undefined) {
                           setEvent(links[i], href);
                       }
                   }
               } 
           }
       });
       
       UIApp._improveLinksForTouch(links);
       
   });


}(window.$, window.Mootor, window.m));
/**
* The UIView class is the UI representation of a view
*
* @class UIView
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, document) {

    "use strict";

    var UIView,
    
        UI,
        Event,
        View,
        UIApp;

    // Dependences

    Event = Mootor.Event;
    UI = Mootor.UI;
    View = Mootor.View;
    UIApp = Mootor.UIApp;

    // Event handlers

    View.on("init", function(self) {
        self.ui = new UIView(self);
    });
    
    // Private constructors

    UIView = Mootor.UIView = function(view) {
        var self = this;
        this.view = view;
        this.el = document.createElement("div");
        this.$el = $(this.el);

        view.on("getHtml", function() {
            UIView._loadHTML(self, View._getHtmlPath(view))
        });

        // Apply enhacements (ie: controls like UIFormSelect, etc..)
        view.on("ready", function() {
            UIView._applyEnhancements(self);
            if (m.context.os.iphone === true || m.context.os.ipad === true) {
                UIView._preventiOSNativeBounce(self);
            }
        });
        
    };


    // Private static methods and properties

    Event.extend(UIView, "UIView");

    // Private static methods and properties

    $.extend(UIView, {
        
        _applyEnhancements: function(self) {
            var i,
                applyEnhancements;
                
            applyEnhancements = function (i, element) {
                new UIView._enhancements[i].className(element);    
            };
            for (i in UIView._enhancements) {
                $(UIView._enhancements[i].selector).each(
                    applyEnhancements(i, self)
                );    
            }
        },
        
        _preventiOSNativeBounce: function(self) {
            var el = self.el,
                blockScroll,
                unblockScroll,
                _stopEvent,
                view = self.view;
            
            _stopEvent = function(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            // Block/unblock scroll
            blockScroll = function() {
                window.setTimeout(function() {
                    if (el.scrollHeight <= el.offsetHeight) {
                        document.addEventListener("touchmove", _stopEvent);
                    }
                }, Mootor.UIPanel._transitionDuration);
            };
            unblockScroll = function() {
                if (el.scrollHeight >= el.offsetHeight) {
                    document.removeEventListener("touchmove", _stopEvent);
                }
            };
            view.on("load", function() {
                blockScroll();
            });
            view.on("unload", function() {
                unblockScroll();
            });
            window.addEventListener("resize", unblockScroll);

            // Only for webkit
            el.addEventListener("overflowchanged", unblockScroll);            
            
            // Prevent iOS bounce
            el.addEventListener('scroll', function(e) {
                var scrollTop = el.scrollTop,
                    offsetHeight = el.scrollHeight - el.offsetHeight;
                    
                if (scrollTop < 1) {
                    el.scrollTop = 1;
                } else if (scrollTop > (offsetHeight - 1)) {
                    el.scrollTop = offsetHeight - 1;
                }
            }, false);

            
        },
        _loadHTML: function(self, html) {
            self.el.innerHTML = html;
            UIView.dispatch("init", self);
        }
    });

    // Public methods

    UIView.prototype = {
    };

    // Prototypal inheritance

    $.extend(UIView.prototype, UI.prototype);

}(window.$, window.Mootor, window.document));
/**
* A Panel to show views
*
* @class UIPanel
* @extends UI
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UIPanel,
        
        UI,
        View,
        UIView,
        UIApp,
        Event;
        
    // Dependences 

    Event = Mootor.Event;
    UI = Mootor.UI;  
    View = Mootor.View;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    
    // Event handlers

    UIView.on("init", function(self) {
        var view = self.view;
        
        self.panel = new UIPanel(view);
        self.panel.el = self.el;
        self.panel.$el = $(self.el);
        self.panel.hide();
        
        UIPanel.on("transitionEnd", function() {
            if (Mootor.App._currentView !== view) {
                view.ui.panel.hide();    
            } 
        });
        
        view.on("load", function() {

            self.panel.position("right").show();

            UIPanel._startTransition();
            
            if (m.app.settings("uipanel-transitions") === true) {
                window.setTimeout(function() {
                    UIPanel.dispatch("transitionEnd", self.panel);
                }, UIPanel._transitionDuration);
            }

            UIPanel.on("transitionEnd", function() {
                self.panel.position("left");
            });
            

            if (m.app.settings("uipanel-transitions") !== true) {
                UIPanel.dispatch("transitionEnd", self.panel);
            }
            
        });
    
        view.on("unload", function() {
            self.panel.position("left");
        }); 
                
    });
    
    UIApp.on("init", function() {
        
        UIPanel._addTransitionClass();    
        UIPanel._setTransitionDuration();
        if (m.context.os.ipad === true || m.context.os.iphone === true) {
            m.app.ui.$el.addClass("m-ios");
        }
          
    });

  
    // Private constructors

    UIPanel = Mootor.UIPanel = function(view) {
        UIPanel._init(this, view);
    };

    // Prototypal inheritance

    $.extend(UIPanel.prototype, UI.prototype);
    Event.extend(UIPanel, "UIPanel");
    
    
    // Private static methods and properties
        
    $.extend(UIPanel, {

        DEFAULT_TRANSITION: "hslide",
        
        //Initialize panel

        /**
        * Initialize  a panel
        *
        * @method _init
        * @private
        */
        _init: function(self, view) {

            var $el,
                el;

            el = view.ui.el;
            $el = $(el);
            
            $el.addClass("m-panel overthrow");
            
            self.transition(UIPanel.DEFAULT_TRANSITION);

            m.app.ui.$el.append(el);            
            
        },
        
        _startTransition: function () {
            
            var uiapp = m.app.ui;
            
            if (m.app.settings("uipanel-transitions") === true) {
                uiapp.$el.addClass("m-transition-hslide");
                uiapp.$el.addClass("m-transition-hslide-left").removeClass("m-transition-hslide-right");
            }
            
            UIPanel.on("transitionEnd", function () {
                if (m.app.settings("uipanel-transitions") === true) {
                    uiapp.$el.removeClass("m-transition-hslide");
                    uiapp.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");
                }
            });
        },
        
        _addTransitionClass: function () {
            var uiapp = m.app.ui;

            if (UIPanel.DEFAULT_TRANSITION == "hslide") {
                uiapp.$el.addClass("m-transition-hslide m-double-width");
                uiapp.$el.addClass("m-transition-hslide-right").removeClass("m-transition-hslide-left");
            }
        },
        
        _transitionDuration: null,
        
        _setTransitionDuration: function() {

            var getStyleBySelector,
                transitionDurationCSS,
                transitionDurationMiliseconds,
                t;
            
                getStyleBySelector = function ( selector ) {
               var sheetList = document.styleSheets,
                   ruleList,
                   i, j, ss;

               /* look through stylesheets in reverse order that
                  they appear in the document */
               for (i=sheetList.length-1; i >= 0; i--)
               {
                    if (!sheetList[i].href) {
                        continue;
                    }
                    ss = sheetList[i].href.split("/");
                   
                   if (ss[ss.length-1] != "mootor.css") {
                        continue;
                   }
                   
                   ruleList = sheetList[i].cssRules;
                   
                   for (j=0; j<ruleList.length; j++)
                   {
                       if (ruleList[j].type == window.CSSRule.STYLE_RULE && 
                           ruleList[j].selectorText == selector)
                       {
                           return ruleList[j].style;
                       }   
                   }
               }
               return null;
            };


            t = getStyleBySelector(".m-app .m-transition-hslide");
            
            if (t !== null) {
                transitionDurationCSS = t.transitionDuration || t.webkitTransitionDuration || t.operaTransitionDuration || t.mozTransitionDuration;
                transitionDurationMiliseconds = parseFloat(transitionDurationCSS) * 1000;
            } else {
                transitionDurationMiliseconds = 0;
            }

            UIPanel._transitionDuration = transitionDurationMiliseconds;
        }        
        
    });

    // Public prototype    
    
    $.extend(UIPanel.prototype, {

        _transition: UIPanel.DEFAULT_TRANSITION,

        /**
        * Move the element to the specified position inside the UIApp / m-views-container. 
        * If coordinates are not specified, it returns coordinates object with the current position.
        *
        * @method position
        * @param {object} [coordinates] Object with coordinates. Example: {x: 0, y: 0}
        * @return {object} Object with coordinates. Example: {x: 0, y: 0}
        */
        position: function(side) {
            if (side) {
                var counterSide = (side == "left" ? "right" : "left");
                this.$el.addClass("m-position-"+side).removeClass("m-position-"+counterSide);
                return this;                
            }
            else {
                var $el = $(this.el);
                return $el.hasClass("m-position-left") ? "left" : "right"; 
            }
            
        },

        /**
        * Block/Unblock or return block status.
        *
        * @method blocked
        * @param {Boolean} [blocked] Whether the panel is blocked
        * @return {Boolean} Whether the panel is blocked
        */
        /*
        blocked: function(blocked) {
            
        },
        */

        /**
        * Set or get transition type
        *
        * @method transition
        * @param {String} [transition] Transition type. MUST be one of: slide-left, slide-right, none
        * @return {String} Transition type
        */
        transition: function(transition) {
            if (transition) {
                this._transition = transition;
            }
            else {
                return this._transition;
            }
        },
        
        /**
        * Set callback function for an event
        *
        * @method on
        * @param {String} event Event string name
        * @return {Function} Callback function
        * @example
        *     m.app.view("index").panel.on("transitionEnd", function(self) {
        *         console.log("transition end!")
        *     });
        */
        on: function(event, callback) {
            UIPanel.on(event, callback);    
            return this;            
        }

    });
    
}(window.$, window.Mootor, window.m));/**
* The Router class is for defining routes
*
* @class Router
* @constructor
*  @module Router
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var Router,

        Route,
        App,
        _appGo,
        _pendingGo,
        _lastHash,
        _onPopState;
                    
    // Dependencies
    
    App = Mootor.App;
    Route = Mootor.Route;
    
    // Private constructors

    Router = Mootor.Router = function() {
    };

    // Event handlers
    
    if ("onpopstate" in window) {
        window.onpopstate = function(e) {
            _appGo(window.location.hash, true);
        };
    }

    _appGo = function(url) { 
        _pendingGo = url;
    };

    App.on("ready", function() {
        _appGo = function(url, _noPushState) {
            m.app.go(url, _noPushState);
        };
        if (_pendingGo === undefined) {
            _pendingGo = window.location.hash;
        }
        m.app._firstHash = _pendingGo;

        m.app.go(_pendingGo);
    });

    // Private static methods and properties

    $.extend(Router, {
        _collection: {}
    });

    
    $.extend(App.prototype, {
        
        /**
        * Create a route
        *
        * @method route
        * @param {string} url Regular expresion string
        * @param {string} url URL to route
        * @param {View} view View object
        * @return Route
        * @example
        *     // Set route
        *     m.app.route("index.html", m.app.view("index"));
        *     /
        *     // Get route
        *     route = m.app.route("index.html");
        */
        route: function(url, view) {
            Route = Mootor.Route;
            
            if (view === undefined) {
                var s,
                    route,
                    match;
                    
                for (s in Router._collection) {
                    match = url.match(new RegExp(s));
                    if (match !== null) {
                        route = Router._collection[s];
                        route.view.params = match.slice(1, match.length);
                        route.url = url;
                        return route;
                    }
                }
                return undefined;
            } else {
                Router._collection[url] = new Route(url, view);
                return Router._collection[url];
            }
        }
    });
          
}(window.$, window.Mootor, window.m));
/**
* The Route class is for defining a route
*
* @class Route
* @constructor
* @module Router
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/


(function ($, Mootor) {

    "use strict";

    var Route;

    // Private constructors
    
    Route = Mootor.Route = function(regex, view) {
        this.regex = regex;
        this.view = view;
    };
    
    // Private static methods and properties

    $.extend(Route, {
        // code here
    });

    // Public methods

    $.extend(Route.prototype, {
        
        /**
        * The URL regex referenced by this route
        *
        * @property regex
        * @type String
        * @example
        *     url_regex = m.app.route("index.html").regex;
        */
        regex: "",

        /**
        * The view that implements this route
        * If called with no parameters, it returns the currently set view in this route.
        *
        * @method view
        * @param {View} [view] - The view that implements this route
        * @return view
        * @example
        *     url_view = m.app.route("index.html").view;
        */
        view: {}

    });        

}(window.$, window.Mootor));
/**
* The UINavItem is an item of a UINavBar, like an action button or an anchor link
*
* @class UINavItem
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UINavItem,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    Mootor.UINavItem = UINavItem = function(options) {
        this.el = options.el;
        this.$el = $(this.el);
        this.$el.addClass("m-nav-item");
    };

    // Prototypal inheritance
    $.extend(UINavItem.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UINavItem, {
   
    });

    // Public methods and properties

    $.extend(UINavItem.prototype, {
        
        /**
        * Block/Unblock or return block status.
        *
        * @method blocked
        * @param {Boolean} [blocked] Whether the item is blocked
        * @return {Boolean} Whether the panel is blocked
        * @chainable
        */
        /*
        blocked: function(blocked) {
            // code here
        }*/

    });        
}(window.$, window.Mootor));
/**
* The UINavBar class is a navigational element at the top or bottom of the page (header or footer)
*
* @class UINavBar
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UINavBar,
    
        UI,
        UIView,
        UINavItem,
        barContainerEl = [];
        
    // Dependences
    
    UI = Mootor.UI;
    UIView = Mootor.UIView;
    UINavItem = Mootor.UINavItem;

    // Private constructors

    UINavBar = Mootor.UINavBar = function(options) {
        this.el = options.container;
        this.$el = $(this.el);
        this.$el.addClass("m-navbar");
        this.$el.addClass("m-" + options.type + "-navbar");
        this.nav = UINavBar._initNavItems(this.el);
    };

    // Prototypal inheritance
    
    $.extend(UINavBar.prototype, UI.prototype);
    
    // Private static methods and properties

    $.extend(UINavBar, {
        _initNavItems: function(el) {
            if (!el) {
                console.error("UINavBar _initNavItems called without el");
                return;
            }
            var i,
                j,
                navGroupsElements = el.getElementsByTagName("nav"),
                navItemsElements,
                navGroups = [],
                navItem;
                
            for (i = navGroupsElements.length; i--; i > 1) {
                $(navGroupsElements[i]).addClass("m-nav");
                navItemsElements = navGroupsElements[i].getElementsByTagName("a");
                for (j = navItemsElements.length; j--;) {
                    navItem = new UINavItem({
                        el: navItemsElements[j]
                    });
                }
                navGroups.push();
            }
            
            return navGroups;
        },

        // self = uiapp
        initBar: function(barName, self, BarClass) {
            
            var barEl = self.el.parentElement.getElementsByTagName(barName)[0],
                _emptyContainer = false;
            
            barContainerEl[barName] = document.createElement("div");
            barContainerEl[barName].setAttribute("class","m-" + barName + "-container");

            if (barEl) {
                barEl.parentElement.replaceChild(barContainerEl[barName], barEl);
                barContainerEl[barName].appendChild(barEl);
            } else {
                barEl = document.createElement("div");
                self.el.parentElement.insertBefore(barContainerEl[barName], self.el);
                $(barContainerEl[barName]).hide();
                _emptyContainer = true;
            }
            
            barContainerEl[barName].addEventListener('touchmove', function(e) {
                e.preventDefault();
            });
            
            self[barName] = new BarClass({
                el: barEl,
                type: "global",
            });
            
            self[barName]._emptyContainer = _emptyContainer;
            self[barName].hide();
        },
                    
        // self = uiview
        createBar: function(barName, self, BarClass) {
            
            // FIXME CHECK
            if (self.panel) {
                
                var barEl = self.panel.el.getElementsByTagName(barName)[0];

                if (barEl) {
             
                    self[barName] = new BarClass({
                        el: barEl,
                        type: "view"
                    });
                
                    barEl.parentElement.removeChild(barEl);
                    barContainerEl[barName].appendChild(barEl);
                
                    self[barName].hideContainer();

                    self.view.on("load", function(self) {
                       self.ui[barName].showContainer(barName);
                       if (m.app.ui[barName]._emptyContainer === true) {
                           $(barContainerEl[barName]).show();
                       }
                       $(barContainerEl[barName]).show();
                    });

                    self.view.on("unload", function(self) {
                       self.ui[barName].hideContainer(barName);
                       if (m.app.ui[barName]._emptyContainer === true) {
                           $(barContainerEl[barName]).hide();
                       }
                    });

                } else {
                    self.view.on("load", function(self) {
                        m.app.ui[barName].show();
                    });

                    self.view.on("unload", function(self) {
                        m.app.ui[barName].hide();
                    });
                }
            
            }
            
        }
    });

    //Public methods

    $.extend(UINavBar.prototype, {
        hideContainer: function(barName) {
            
            this.hide();
        },
        showContainer: function(barName) {
            
            this.show();
        }

    });  

}(window.$, window.Mootor, window.m));
/**
* The UIHeader class is a navigational element at the top of the page (header)
*
* @class UIHeader
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor, m) {

    "use strict";

    var UIHeader,
    
        UINavBar,
        UIView,
        View,
        UIApp,
        UINavItem,
        App,
        UI;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    UI = Mootor.UI;
        
    // Private constructors

    UIHeader = Mootor.UIHeader = function(options) {
        this.nav = new UINavBar({
            container: options.el,
            type: options.type
        });
        this.type = options.type;
        this.el = this.nav.el;
        this.$el = $(this.el);
        if (this.$el.find("nav").length < 1) {
            this.el.appendChild(document.createElement("nav"));
        }
        UIHeader._initBackButton(this);
    };

    // Event handlers
    UIView.on("init", function(self) {
        UINavBar.createBar("header",self, UIHeader);
    });

    UIApp.on("init", function(self) {
        UINavBar.initBar("header",self, UIHeader);
    });

    
    // Private static methods and properties

    $.extend(UIHeader, {
        
        _initBackButton: function(self) {
            var backEl = document.createElement("a"),
                backIconEl = document.createElement("icon"),
                backNavEl = document.createElement("nav");
                
                // FIXME CHECK (white?)
                backIconEl.setAttribute("class", "m-icon-arrow-left-white");
                
            backEl.appendChild(backIconEl);
            backNavEl.appendChild(backEl);
            backNavEl.setAttribute("class", "m-nav-header-back-container");

            if (self.el.firstChild !== undefined) {
               self.el.insertBefore(backNavEl,self.el.firstChild); 
            } else {
               self.el.appendChild(backNavEl);
            }
            
            self.back = new UINavItem({
                el: backEl
            });
            self.back.$el.addClass("m-header-back");
            
            self.back.$el.on("tap click", function() {
                m.app.back();
            });
            self.back.el.onclick = function() {
                return false;
            };
            
            // FIXME CHECK
            App.on("go", function(app) {
                if (m.app._firstHash === window.location.hash) {
                    self.back.hide();
                } else {
                    self.back.show();
                }
            });         
        }
        
    });

    // Public methods

    $.extend(UIHeader.prototype, {
        
        /**
        * Back
        * The back button
        *
        * @object back
        * @return {UINavItem} 
        * @example
        *     m.app.view("index").ui.header.back.hide();
        */
        back: {},
        
        /**
        * Title
        * The text to display in the header
        * If called with no arguments returns the current title
        *
        * @method title
        * @param {string} [title] The text for the title
        * @return {String} 
        * @chainable
        * @example
        *     m.app.view("index").ui.header.title("My title");
        */
        title: function(title) {
            var titleEl = this.el.getElementsByTagName("h1")[0];
            if (title !== undefined) {
                titleEl.innerHTML = title;
            } else {
                return titleEl.innerHTML;
            }
            return this;
        }
        
    });  
          
    // Prototypal inheritance

    $.extend(UIHeader.prototype, UINavBar.prototype);
    $.extend(UIHeader.prototype, UI.prototype);

}(window.$, window.Mootor, window.m));
/**
* The UIFooter class is a navigational element at the bottom of the page (footer)
*
* @class UIFooter
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIFooter,
    
        UINavBar,
        UIView,
        View,
        UIApp,
        UINavItem,
        App,
        UI;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    UI = Mootor.UI,
    
    
    // Private constructors

    UIFooter = Mootor.UIFooter = function(options) {
        this.nav = new UINavBar({
            container: options.el,
            type: options.type
        });
        this.type = options.type;
        this.el = this.nav.el;
        this.$el = $(this.el);
        if (this.$el.find("nav").length < 1) {
            this.el.appendChild(document.createElement("nav"));
        }
    };

    // Event handlers
    UIView.on("init", function(self) {
        UINavBar.createBar("footer",self, UIFooter);
    });

    UIApp.on("init", function(self) {
        UINavBar.initBar("footer",self, UIFooter);
    });
    // Private static methods and properties

    $.extend(UIFooter, {
        
    });

    // Prototypal inheritance

    $.extend(UIFooter.prototype, UINavBar.prototype);
    $.extend(UIFooter.prototype, UI.prototype);

}(window.$, window.Mootor));
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


/**
* The UIForm is a form to input data
*
* @class UIForm
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIForm,
        UIView,
        UI,
        View;
        
    // Dependences

    UI = Mootor.UI;
    UIView = Mootor.UIView;
    View = Mootor.View;
    
    // Private constructors

    Mootor.UIForm = UIForm = function(element) {
    };
    
    // Event handlers

    UIView.on("init", function(self) {
        var i;
        for (i in UIForm._controls) {
            UIForm._controls[i].constructor._init(self);
        }
    });


    // Prototypal inheritance
    $.extend(UIForm.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIForm, {
        /**
        * Controls
        * @private
        */
        _controls: [],

        /**
         * @method registerControl
         * @param {Object} Constructor An object with a private _init method
         * @example
         *     UIForm.registerControl(UIFormText);  
         *
         */
        registerControl: function(constructor) {
            UIForm._controls.push({
                constructor: constructor
            });
        }

    });

}(window.$, window.Mootor));
/**
* UIFormVirtualInput is a virtual-input item of a form
*
* @class UIFormVirtualInput
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormVirtualInput,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    
    // Private constructors

    UIFormVirtualInput = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormVirtualInput.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormVirtualInput, {
   
    });

    // Public methods and properties

    $.extend(UIFormVirtualInput.prototype, {

        /**
        * Value of the input
        *
        * @property value
        */         
        value: undefined,

        /**
        * Sets an event handler for the input
        *
        * @method on
        * @param {string} event Defines in which event the handler will be called
        * @param {function} callback The function to be called when the event is fired.
        * @return this
        */ 
        on: function(event, callback) {
            // code here
        }

    });        
    
    Mootor.UIFormVirtualInput = UIFormVirtualInput;

}(window.$, window.Mootor));
/**
* UIFormGeo detect geolocation
*
* @class UIFormGeo
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormGeo,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormGeo = Mootor.UIFormGeo = function(element) {
        UIFormGeo.__init(this, element);
    };

    // Prototypal inheritance
    if (UI) {
        $.extend(UIFormGeo.prototype, UI.prototype);
    }

    // Private static methods and properties

    $.extend(UIFormGeo, {

        _init: function(uiview) {
            var elements;
            elements = uiview.$el.find(".m-geo");
            elements.each(function(index,element) {
                new UIFormGeo(element);
            });
        },
        
        __init: function(self, element) {
            self._$coverHTML = element;
            self._$input = element;
            self._$icon = self._$coverHTML.parentElement.getElementsByClassName("m-icon")[0];
            self._$originalHtml = self._$coverHTML.innerHTML;
            UIFormGeo._addEventListeners(self);
            $(self._$coverHTML).addClass("m-geo-input"); 
            
        },
                
        _addEventListeners: function(self) {
            self._$input.addEventListener("click", function() {
               UIFormGeo._getCurrentPosition(self); 
               self._$input.setAttribute("disabled", "disabled");
            });
            self._$input.addEventListener("blur", function() {
               window.setTimeout(function() {
                   self._$input.removeAttribute("disabled");
               }, 200);
            });
            
        },
        
        __onSuccess: function(self, position) {
            var coords,
                strCoords;

            coords = position.coords;
            strCoords = (Math.ceil(coords.latitude * 10000) / 10000) + "," + (Math.ceil(coords.longitude * 10000) / 10000);
            $(self._$coverHTML).addClass("m-geo-located");
            self._$input.value = strCoords;
            return strCoords;
        },

        _onSuccess: function(self, position) {
            UIFormGeo.__onSuccess(self, position);
        },

        _onError: function(self) {
            $(self._$coverHTML).removeClass("m-geo-located");
            self._$coverHTML.innerHTML = self._$originalHtml;
            self._$input.value = "";
        },

        _getCurrentPosition: function(self) {
            
            var $icon = $(self._$icon);
            
            $icon.addClass("m-icon-anim-blink");

            navigator.geolocation.getCurrentPosition(
                function(position) {

                    UIFormGeo._onSuccess(self, position);
                    $icon.removeClass("m-icon-anim-blink");
                    
                },
                function(e) {

                    UIFormGeo._onError(self);
                    $icon.removeClass("m-icon-anim-blink");
                },
                { timeout: 10000, enableHighAccuracy: true }
            );
        }
   
    });

    // Public methods and properties

    $.extend(UIFormGeo.prototype, {
        // code here
    });        

    if (UIForm) {
        UIForm.registerControl(UIFormGeo);  
    }


}(window.$, window.Mootor));
/**
* UIFormText is a text input of a form
*
* @class UIFormText
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormText,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;

    // Event handelers
    
    // Private constructors

    UIFormText = function() {
        // Code here
    };

    // Prototypal inheritance
    $.extend(UIFormText.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormText, {

        _init: function(uiview) {
            var inputs,
                i;
                
            inputs = uiview.$el.find(".m-text");
            for (i = inputs.length; i--;) {
                $(inputs[i]).on("tap", function() {
                    this.focus();
                });
            }

        }
        
    });

    // Public methods and properties

    $.extend(UIFormText.prototype, {
    });      
    
    UIForm.registerControl(UIFormText);  

}(window.$, window.Mootor));
/**
* UIFormTextArea is a textarea input of a form
*
* @class UIFormTextArea
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormTextArea,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormTextArea = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormTextArea.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormTextArea, {
        _init: function(uiview) {
            var inputs,
                i;
                
            inputs = uiview.$el.find(".m-textarea");
            for (i = inputs.length; i--;) {
                $(inputs[i]).on("tap", function() {
                    this.focus();
                });
            }

        }
   
    });

    // Public methods and properties

    $.extend(UIFormTextArea.prototype, {
    });        

    UIForm.registerControl(UIFormTextArea);  

}(window.$, window.Mootor));
/**
* UIFormSelect is a select input of a form
*
* @class UIFormSelect
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormSelect,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormSelect = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormSelect.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormSelect, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-select");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $value,
                    updateValue;

                updateValue = function() {
                    // Value is the text of the selected option or the placeholder text
                    var value = element.options[element.selectedIndex].text || element.placeholder;
                    if (value !== undefined) {
                        $value.html(value);
                    }
                }
                
                /*jshint multistr: true */
                coverHTML = '<div class="m-select m-select-cover">\
                    <span class="m-value"></span>\
                    <span class="m-icon-arrow-down-small m-select-icon"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML).insertBefore(element);
                $value = $cover.find(".m-value");

                updateValue();
                $element.on("change", function() {
                    if (this === element) {
                        updateValue();
                    }
                });

                $element.on("tap", function() {
                    $element.focus();
                });
                $element.on("focus", function() {
                    var me = document.createEvent("MouseEvents");
                    me.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                });

            });
        }
   
    });

    // Public methods and properties

    $.extend(UIFormSelect.prototype, {
    });        

    UIForm.registerControl(UIFormSelect);  

}(window.$, window.Mootor));
/**
* UIFormCheckbox is a checkbox input of a form
*
* @class UIFormCheckbox
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormCheckbox,
        UIForm,
        UI;

    // Dependences

    UI = Mootor.UI,
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormCheckbox = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormCheckbox.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormCheckbox, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-checkbox");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $label,
                    $icon,
                    updateValue;

                updateValue = function() {
                    var checked = element.getAttribute("checked");
                    if (checked) {
                        $icon.removeClass("m-hidden");
                    } else {
                        $icon.addClass("m-hidden");
                    }
                }
                
                /*jshint multistr: true */
                coverHTML = '<div class="m-checkbox m-checkbox-cover">\
                    <span class="m-checkbox-icon m-icon-ok-small m-hidden"></span>\
                </div>';


                $cover = element.$cover = $(coverHTML).insertBefore(element);
                
                $label = $("label[for=" + element.id + "]");
                $icon = $cover.find(".m-checkbox-icon");
                $cover[0].appendChild($label[0]);
                
                $element.removeClass("m-checkbox")
                $element.addClass("m-checkbox-hidden");

                updateValue();
                $element.on("change", updateValue);
                $cover.on("tap click", function() {
                    if (element.getAttribute("checked")) {
                        element.removeAttribute("checked");
                    } else {
                        element.setAttribute("checked", "checked");                      
                    }
                    updateValue();
                });
                
            });
        }   
    });

    // Public methods and properties

    $.extend(UIFormCheckbox.prototype, {
    });        

    UIForm.registerControl(UIFormCheckbox);  

}(window.$, window.Mootor));
/**
* UIFormOption is a option input of a form
*
* @class UIFormOption
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormOption,
        UIForm,
        UI;

    // Dependences

    UI = Mootor.UI,
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormOption = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormOption.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormOption, {
        _init: function(uiview) {
            
            var inputs;
                 
            inputs = uiview.$el.find(".m-option");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $label,
                    $icon,
                    updateValue,
                    iconElementName = element.name.replace(".","_");

                updateValue = function() {
                    var checked = element.checked,
                        $icon = $(".m-option-icon-name-" + iconElementName + "-" + element.getAttribute("m-option-index"));

                    if (checked === true) {
                        $icon.removeClass("m-hidden");
                    } else {
                        $icon.addClass("m-hidden");
                    }
                } 
                               
                /*jshint multistr: true */
                coverHTML = '<div class="m-option m-option-cover">\
                    <span class="m-option-icon m-icon-ok-small m-hidden m-option-icon-name-$elementName m-option-icon-name-$elementName-$index"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML.replace("$elementName", iconElementName).replace("$elementName", iconElementName).replace("$index", index)).insertBefore(element);
                element.setAttribute("m-option-index",  index);
                
                $label = $("label[for=" + element.id + "]");
                $icon = $cover.find(".m-option-icon");
                $cover[0].appendChild($label[0]);
                
                $element.removeClass("m-option")
                $element.addClass("m-option-hidden");

                $element.on("change", updateValue);
                
                $cover.on("tap click", function() {
                    $(".m-option-icon-name-" + iconElementName).addClass("m-hidden");
                    element.checked = true;
                    $element.change();
                });

                updateValue(true);
                

            });
        }   
    });

    // Public methods and properties

    $.extend(UIFormOption.prototype, {
    });        

   UIForm.registerControl(UIFormOption);  

}(window.$, window.Mootor));
/**
* UIFormDate is a date input of a form
*
* @class UIFormDate
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormDate,
        UIForm,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormDate = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormDate.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormDate, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-date");
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $value,
                    updateValue;
                
                updateValue = function() {
                    // Value is the text of the selected option or the placeholder text
                    var value = element.value;
                    $value.html(value);
                }

                /*jshint multistr: true */
                coverHTML = '<div class="m-select m-select-cover">\
                    <span class="m-value">Select ...</span>\
                    <span class="m-icon-arrow-down-small m-select-icon"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML).insertBefore(element);
                $value = $cover.find(".m-value");
                inputs.addClass("m-date-hidden");      
                inputs.removeClass("m-date");                   

                $element.on("change", updateValue);

                $element.on("tap", function() {
                    $element.focus();
                });
                $element.on("focus", function() {
                    var me = document.createEvent("MouseEvents");
                    me.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                });

            });
        }   
    });

    // Public methods and properties

    $.extend(UIFormDate.prototype, {
    });        

    if (m.context.os.ios === true) {
        UIForm.registerControl(UIFormDate);  
    }


}(window.$, window.Mootor));
/**
* UIFormTime is a time input of a form
*
* @class UIFormTime
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormTime,
        UIForm,
    
        UI;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormTime = function() {
        // code here
    };

    // Prototypal inheritance
    $.extend(UIFormTime.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIFormTime, {
        _init: function(uiview) {
            
            var inputs;
                
            inputs = uiview.$el.find(".m-time");
            inputs.addClass("m-time-hidden");                
            inputs.removeClass("m-time");                   
            inputs.each(function(index,element) {
                var $element = $(element),
                    coverHTML,
                    $cover,
                    $value,
                    updateValue;
                

                updateValue = function() {
                    // Value is the text of the selected option or the placeholder text
                    var value = element.value;
                    $value.html(value);
                }

                /*jshint multistr: true */
                coverHTML = '<div class="m-select m-select-cover">\
                    <span class="m-value">Select ...</span>\
                    <span class="m-icon-arrow-down-small m-select-icon"></span>\
                </div>';

                $cover = element.$cover = $(coverHTML).insertBefore(element);
                $value = $cover.find(".m-value");

                $element.on("change", updateValue);

                $element.on("tap", function() {
                    $element.focus();
                });

            });
        }   
    });

    // Public methods and properties

    $.extend(UIFormTime.prototype, {
    });        

    if (m.context.os.ios === true) {
        UIForm.registerControl(UIFormTime);  
    }

}(window.$, window.Mootor));
/**
* UIButton is a button element, it uses UIForm to extend elements with aria-roles
*
* @class UIButton
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martin Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIButton,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;

    // Event handelers
    
    // Private constructors

    UIButton = function() {
        // Code here
    };

    // Prototypal inheritance
    $.extend(UIButton.prototype, UI.prototype);

    // Private static methods and properties

    $.extend(UIButton, {

        _init: function(uiview) {
            var buttons;
                
            buttons = uiview.$el.find(".m-button");
            
            // code here

            buttons.attr("aria-role","button");

        }
        
    });

    // Public methods and properties

    $.extend(UIButton.prototype, {
    });      
    
    UIForm.registerControl(UIButton);  

}(window.$, window.Mootor));
/**
* UIFormDraw is a draw pseudo-input of a form
*
* @class UIFormDraw
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormDraw,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormDraw = Mootor.UIFormDraw = function(element) {
        UIFormDraw.__init(this, element, {template: false});
    };

    // Prototypal inheritance
    if (UI) {
        $.extend(UIFormDraw.prototype, UI.prototype);
    }

    // Private static methods and properties

    $.extend(UIFormDraw, {
        
        _init: function(uiview) {
            var elements;
            elements = uiview.$el.find(".m-draw");
            elements.each(function(index,element) {
                new UIFormDraw(element);
            });
        },
        
        __init: function(self, element, options) {
            self._$originalElement = element;
            self.options = options;
            UIFormDraw._build(self, element);
            UIFormDraw._addEventListeners(self);            
        },
        
        _build: function(self, element) {
            if (self.options && self.options.template === false) {
                self._$coverHTML = $(UIFormDraw._template)[0];
                $(element).replaceWith(self._$coverHTML);
            } else {
                self._$coverHTML = element;
            }
            self._$img = self._$coverHTML.parentElement.getElementsByTagName("img")[0];
            $(self._$img).addClass("m-hidden");
            self._$input = self._$coverHTML.getElementsByTagName("input")[0];
            self._$placeholder = self._$coverHTML.getElementsByClassName("m-draw-placeholder")[0];
            
            self._$modalContainer = self._$coverHTML.getElementsByClassName("m-draw-canvas")[0];

            
            UIFormDraw._moveAttrs(self);
            UIFormDraw._initModal(self);
            UIFormDraw._initCanvas(self);
            UIFormDraw._setCanvasSize(self);
            UIFormDraw._addEventListeners(self);
            
            self.clear()
            
            window.onresize = function() {
                UIFormDraw._onResize(self);
            };

            self._$placeholder.innerHTML = self._$img.getAttribute("title");

        },
    
        _initModal: function(self) {
            self._$modalContainer.parentElement.removeChild(self._$modalContainer);
            if (UIFormDraw._initialized !== true) {
                document.body.appendChild(self._$modalContainer);
                UIFormDraw._initialized  = true;
                UIFormDraw._$modalContainer = self._$modalContainer;
            } else {
                self._$modalContainer = UIFormDraw._$modalContainer;
            }
        },


        _initCanvas: function(self) {
            self._$canvas = self._$modalContainer.getElementsByTagName("canvas")[0];
            self._$ctx = self._$canvas.getContext("2d");
            self._$ctx.strokeStyle = "black";
            self._$ctx.lineWidth = 2;
            self._$ctx.fillStyle = "black";
            self._$canvasHeader = self._$modalContainer.getElementsByClassName("m-draw-canvas-header")[0];
            self._$clearBtn = self._$modalContainer.getElementsByClassName("m-draw-erase")[0];
            self._$saveBtn = self._$modalContainer.getElementsByClassName("m-draw-done")[0];
            self._$cancelBtn = self._$modalContainer.getElementsByClassName("m-draw-cancel")[0];
        },
        
        _setCanvasSize: function(self) {
            var h = window.innerHeight;
            var w = window.innerWidth - 40;

            if (w > h) {
                h = h - 30;
                $(self._$canvasHeader).addClass("m-hidden")
            } else {
                h = h - 85;
                $(self._$canvasHeader).removeClass("m-hidden")
            }

            self._$canvas.style.height = h + "px";
            self._$canvas.style.width = w + "px";

            self._$canvas.setAttribute("height",  h + "px");
            self._$canvas.setAttribute("width",  w + "px");            
        },

        _moveAttrs: function(self) {
        
            var aAttrs = {
                type:         self._$input.getAttribute("type"),
                accept:       self._$input.getAttribute("accept"),
            }

            self._$coverHTML.removeAttribute("type");
            self._$coverHTML.removeAttribute("accept");
            self._$coverHTML.removeAttribute("placeholder");

            self._$input.setAttribute("type", aAttrs.type);
            self._$input.setAttribute("accept", aAttrs.accept);
        },
    
        _onResize: function(self) {
            
            
            // FIXME CHECK
            
            UIFormDraw._setCanvasSize(self);
            
            /*var self = self;
            
            self._$img.onload = function() {
                
                self._setCanvasSize();

                self._$ctx.drawImage( self._$img,0,0);
                self._$ctx.lineWidth = 2;
                self._$ctx.restore();

             }

             self._$img.src = self._$canvas.toDataURL();*/
            
        },
    
        _addEventListeners: function(self) {
        
            var 
                $canvas = self._$canvas,
                ctx = self._$ctx,
                lastX,
                lastY,
                offsetLeft,
                offsetTop;
        
            self._$coverHTML.parentElement.addEventListener("click", function() {
                self.open();
            });

            self._$cancelBtn.addEventListener("click", function() {
                self.close();
            });

            self._$clearBtn.addEventListener("click", function() {
                self.clear();
            });

            self._$saveBtn.addEventListener("click", function() {
                self.save();
            });

                
            $canvas.addEventListener("touchstart", function(e) {
                
                self._canvasOffsetLeft = $canvas.offsetLeft - window.scrollX;
                self._canvasOffsetTop = $canvas.offsetTop - window.scrollY;

                lastX = e.changedTouches[0].clientX - self._canvasOffsetLeft;
                lastY = e.changedTouches[0].clientY - self._canvasOffsetTop;


                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(lastX, lastY, 2, 2);
                ctx.closePath();

                e.stopPropagation();
                e.preventDefault();                

                offsetLeft = self._canvasOffsetLeft;
                offsetTop = self._canvasOffsetTop;
            });
            
            $canvas.addEventListener("touchmove", function(e) {
                var x,
                    y,
                    touchX = e.changedTouches[0].clientX,
                    touchY = e.changedTouches[0].clientY;

                x = touchX - offsetLeft;
				y = touchY - offsetTop;

                ctx.beginPath();
                ctx.moveTo(lastX,lastY);
                ctx.lineTo(x,y);
                ctx.stroke();
                ctx.closePath();

                lastX = x;
                lastY = y;

                e.stopPropagation();
                e.preventDefault();

            });
            
            $canvas.addEventListener("touchend", function(e) {

                e.stopPropagation();
                e.preventDefault();
                
            });

        },
        
        _save: function(self) {
            self._$img.onload = function() {
                self.close();
            }
            self._$img.src = self._$canvas.toDataURL();
        }
        
    });

    // Public methods and properties

    $.extend(UIFormDraw.prototype, {
        
        // Open modal or file selector
        "open": function() {
            var self = this;
            self.clear();
            self._$ctx.drawImage( self._$img,0,0);
            self._$ctx.lineWidth = 2;
            self._$ctx.restore();
            $(self._$modalContainer).removeClass("m-hidden");
        },
    
        // Clear current draw
        "clear": function() {
            var self = this,
                ctx = self._$ctx,
                $canvas = self._$canvas,
                w = $canvas.offsetWidth,
                h = $canvas.offsetHeight;
      
            // Store the current transformation matrix
            ctx.save();
        
            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
        
            // Restore the transform
            ctx.restore();
        },
        
        // Close modal
        "close": function() {
            var self = this;
            $(self._$modalContainer).addClass("m-hidden");
        },
        
        save: function() {
            var self = this;
            UIFormDraw._save(self);
        },

        options: {},
        
        _$coverHTML: {} ,
        _$canvas: {} ,
        _$modalContainer: {} ,
        _$clearBtn: {} ,
        _$saveBtn: {} ,
        _$input: {},
        _canvasOffsetLeft: 0,
        _canvasOffsetTop: 0,

    });        
    
    UIFormDraw._template = '<div class="m-draw m-draw-cover"> \
        <input class="m-hidden" type="file" class="m-draw" accept="image/*" /> \
       <span class="m-draw-placeholder">...</span> \
        <div class="m-hidden m-draw-canvas"> \
            <div class="m-draw-canvas-header"> \
                <span class="m-draw-cancel m-icon-delete-circle"></span> \
                <span class="m-draw-done m-icon-ok-circle"></span> \
            </div> \
            <canvas></canvas> \
            <div class="m-draw-canvas-footer"> \
                <span class="m-draw-erase m-icon-erase"></span> \
            </div> \
        </div> \
    </div>';
    
    if (UIForm) {
        UIForm.registerControl(UIFormDraw);  
    }

}(window.$, window.Mootor));
/**
* UIFormCamera is a camera pseudo-input of a form
*
* @class UIFormCamera
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Federico Palma (federico.palma [at] hotmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIFormCamera,
        UIFormCameraPicture,
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;

    // Private constructors

    UIFormCamera = function() {

        this.pictures = [];

    };

    UIFormCameraPicture = function(file) {

        this.image = file;

    };

    // Prototypal inheritance
    $.extend(UIFormCamera.prototype, UI.prototype);
    //$.extend(UIFormCamera.prototype, UIFormPseudoInput.prototype);

    // Private static methods and properties

    $.extend(UIFormCamera, {

        _pictures: [],

        _init: function(uiview) {
            var inputs = uiview.$el.find(".m-camera");
            
            inputs.each(function(index, element) {

                var self = new UIFormCamera();
                UIFormCamera._makeUI(self, element);               
                $.extend(element, UIFormCamera.prototype);
            });
        },

        _makeUI: function(self, element) {
            var $element,
                coverHTML,
                $cover,
                $label,
                $cameraContainer,
                $cameraImgContainer,
                $cameraMessage;

            $element = $(element);

            
            
            $label = $("label[for=" + element.getAttribute("id") + "]");

            coverHTML = '<div class="m-camera m-camera-cover m-camera-btn">\
                <span class="m-camera-icon m-icon-arrow-right-small"></span>\
            </div>';
            
            $cover = element.$cover = $(coverHTML).insertBefore(element);
            $label.insertBefore($cover.find(".m-camera-icon"));
            $element.hide();
            
            $cameraContainer = $('\
                <div class="m-camera-container">\
                    <div class="m-header-container">\
                        <header>\
                            <nav class="m-nav-header-back-container">\
                                <a class="m-nav-item m-camera-back">\
                                    <icon class="m-icon-arrow-left-white"></icon>\
                                </a>\
                            </nav>\
                            <h1 class="m-camera-title">Pictures</h1>\
                            <nav>\
                            </nav>\
                        </header>\
                    </div>\
                    <div class="m-camera-message">\
                        <span class="m-icon-camera"></span><br/>\
                        <strong class="m-camera-no-pics">No pictures yet.</strong>\
                        <p>Choose or take a picture</p>\
                    </div> \
                    <div class="m-img-container"></div>\
                    <div class="m-camera-btns"> \
                        <div class="m-choose-image">Choose a picture</div> \
                        <div class="m-take-image">Take a picture</div> \
                    </div> \
                </div> \
                ');

            $cameraContainer.hide();
            
            $cameraContainer.insertBefore(document.body.lastChild);
            
            $cameraMessage = $('.m-camera-message');

            $cameraMessage.hide();

            if ($cameraContainer.find('m-camera-images').length === 0) {

                $cameraMessage.show();

            }
            
            $cameraImgContainer = $('.m-img-container');
            
            $label[0].onclick = function() {
                return false;
            };

            var $choosePicture = $(".m-choose-image");
            
            UIFormCamera._addFiles(self, $element);
            
            
            $cover.on("click tap", function() {

                UIFormCamera._addListeners(self);
                $cameraContainer.show();
                
                var $closeButton = $cameraContainer.find('.m-camera-back');
                $closeButton.click(function() {
                    self._$cameraContainer.hide();
                });
            });
            
                       
            
            self._$cameraContainer = $cameraContainer;
            self._$pictures = $element;
            self._$backButton = $('.m-camera-back');
            self._$choosePicture = $choosePicture;
            self._$cameraImgContainer = $cameraImgContainer;
        },

        _addListeners: function(self) {

            self._$choosePicture.on('tap click', function(e) {

                self._$pictures.trigger("click");

            });
        },
        
        _addFiles: function(self, $element) {
            $element.on('change', function(event) {
                var files = event.target.files,
                    output = self._$cameraImgContainer,
                    picture;

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    if (!file.type.match('image')) {
                        continue;
                    }

                    var picReader = new FileReader();

                    picReader.addEventListener('load', function(event) {
                        var picFile = event.target;

                        picture = $('<div class="m-camera-img"></div>');
                        picture.append("<img class='thumbnail' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/>");

                        output.append(picture, null);
                        
                        $('.m-camera-message').hide();
                    });

                    picReader.readAsDataURL(file);

                    picture = new UIFormCameraPicture(file);
                    
                    var obj = $element[0];
                    if (obj.pictures === undefined) {
                        obj.pictures = [];
                        obj.pictures.push(picture);
                    } else {
                        var arrPicturesLength = obj.pictures.length;
                        obj.pictures[arrPicturesLength] = picture;
                    }
                }
            });
        }

    });

    $.extend(UIFormCameraPicture, {

    });

    // Public methods and properties

    $.extend(UIFormCamera.prototype, {
        
        /**
        * Take a picture
        *
        * @method take
        * @chainable
        */
        take: function(){
            // code here
        },

        /**
        * Choose a picture
        *
        * @method choose
        * @chainable
        */
        choose: function(){
            // code here
        },

        /**
        * Returns all pictures paths
        *
        * @method all
        * @return {Array} Array of pictures paths
        * @chainable
        */
        all: function() {

            $.each(this.pictures, function(item, val) {
                console.log(val);
            });
        },

        /**
        * Remove picture from input
        *
        * @param {UIFormCameraPicture} picture Picture to be removed
        * @method remove
        */
        remove: function(picture) {

            var index = this.pictures.indexOf(picture);

            if (index > -1) {
                this.pictures.splice(index, 1);
            }
        }
    });

    $.extend(UIFormCameraPicture.prototype, {
        /**
        * Export picture data
        *
        * @method export
        * @return {String} Exported data (ej: base 64 string)
        * @param {Array} options A list of options
        * @chainable
        */
        "export": function(options) {
        
            var reader = new FileReader();
            reader.readAsDataURL(this.image)

            reader.onerror = function() {
                return 'error';
            }
            
            reader.onloadend = function() {
                return reader.result;
            }
        }
    });

    UIForm.registerControl(UIFormCamera);

}(window.$, window.Mootor));
/**
* UIFormCameraSingle take or choose a single picture
*
* @class UIFormCameraSingle
* @extends UI
* @constructor
* @module UI
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/

(function ($, Mootor) {
    
    "use strict";

    var UIFormCameraSingle,
    
        UI,
        UIForm;

    // Dependences

    UI = Mootor.UI;
    UIForm = Mootor.UIForm;
    
    // Private constructors

    UIFormCameraSingle = Mootor.UIFormCameraSingle = function (element) {
        UIFormCameraSingle.__init(this, element, {template: false});
    };

    // Prototypal inheritance
    if (UI) {
        $.extend(UIFormCameraSingle.prototype, UI.prototype);
    }

    // Private static methods and properties

    $.extend(UIFormCameraSingle, {
        
        _init: function (uiview) {
            var elements;
            
            elements = uiview.$el.find(".m-camera-single");
            elements.each(function (index ,element) {
                 new UIFormCameraSingle(element);
            });
        },

        _openFileSelector: function(self) {
            if (window.cordova !== undefined) {
                navigator.camera.getPicture(           
                   function(data) {
                       self._$img.setAttribute("src", data);
                   },
                   function() {
                       console.log("Error");
                   }, 
                   { 
                       quality: self.quality || 50, 
                       destinationType: window.Camera.DestinationType.FILE_URI,
                       sourceType: self.source || window.Camera.PictureSourceType.CAMERA,
                       targetWidth: self.width || 1024,
                       targetHeight: self.height || 768
                   }
                );
            } else {
                self._$input.click();
            }
        
        },

        __init: function(self, element, options) {
            
            self.options = options;

            // Use internal template (Mootor)
            // or element (Angular)
            if (self.options && self.options.template === false) {
                self._$coverHTML = $(UIFormCameraSingle._template)[0];
                $(element).replaceWith(self._$coverHTML);
            } else {
                self._$coverHTML = element;
            }
            
            // Original element
            self._$originalElement = element;
            
            // Image element
            self._$img = self._$coverHTML.parentElement.getElementsByTagName("img")[0];
            // File input element
            self._$input = self._$coverHTML.getElementsByTagName("input")[0];
            // Placeholder element
            self._$placeholder = self._$coverHTML.getElementsByClassName("m-camerasingle-placeholder")[0];
            // Modal container element
            self.__$modalContainer = self._$coverHTML.getElementsByClassName("m-camerasingle-modal")[0];
            if (UIFormCameraSingle._initialized) {
                self._$modalContainer = UIFormCameraSingle._$modalContainer;
            } else {
                self._$modalContainer = UIFormCameraSingle._$modalContainer =  self.__$modalContainer;
            }

            // Move attributes
            UIFormCameraSingle._moveAttrs(self);
            
            // Initialize modal
            UIFormCameraSingle._initModal(self);
            
            // Add event listeners
            UIFormCameraSingle._addEventListeners(self);
            
            // Put title text in the placeholder
            self._$placeholder.innerHTML = self._$img.getAttribute("title");
            
            // Hide picture element
            $(self._$img).addClass("m-hidden");
            
            // UIFormCameraSingle was initialized once
            UIFormCameraSingle._initialized = true;
        },
    
        _initModal: function(self) {
            
            var $modalPicture,
                $modalContainer,
                $modalPictureContainer;
            
            if (UIFormCameraSingle._initialized !== true) {
                document.body.appendChild(self._$modalContainer);
                UIFormCameraSingle._$modalContainer = self._$modalContainer;
                $modalPicture = document.createElement("img");
                $modalPictureContainer = self._$modalContainer.getElementsByClassName("m-camerasingle-img-container")[0];
                $modalPictureContainer.appendChild($modalPicture);
                UIFormCameraSingle._$modalPicture = $modalPicture;
                UIFormCameraSingle._$modalPictureContainer = $modalPictureContainer;
            } 
            
            self._$modalContainer = UIFormCameraSingle._$modalContainer;
            self._$modalPicture = UIFormCameraSingle._$modalPicture;
            self._$modalPictureContainer =  UIFormCameraSingle._$modalPictureContainer;
            
            self._$deleteBtn = self._$modalContainer.getElementsByClassName("m-camerasingle-button-delete")[0];
            self._$changeBtn = self._$modalContainer.getElementsByClassName("m-camerasingle-button-change")[0];
            
        },

        _moveAttrs: function(self) {
        
            var aAttrs = {
                type:         self._$input.getAttribute("type"),
                accept:       self._$input.getAttribute("accept"),
            }

            self._$coverHTML.removeAttribute("type");
            self._$coverHTML.removeAttribute("accept");
            self._$coverHTML.removeAttribute("placeholder");

            self._$input.setAttribute("type", aAttrs.type);
            self._$input.setAttribute("accept", aAttrs.accept);
        },
    
        _onChange: function(event, self) {
          var file,
              picReader;
    
          file = event.target.files[0];

    	  if (file && file.type.match('image')) {
              picReader = new FileReader();
                picReader.addEventListener('load', function(event) {
                    var picFile = event.target;
                    self._$img.src=picFile.result;
                });
                picReader.readAsDataURL(file);
            } 
        },
    
        _onImgLoad: function(self) {
            // Overrides me
        },
    
        _onImgLoadError: function(self) {
            // Overrides me
        },
    
        _addEventListeners: function(self) {
        
            self._$coverHTML.parentElement.addEventListener("click", function() {
                self.open();
            });

            self._$deleteBtn.addEventListener("click", function() {
               self.delete();
            });

            self._$changeBtn.addEventListener("click", function() {
                self.change();
            });
            
            if (UIFormCameraSingle._initialized !== true) {
                self._$modalContainer.addEventListener("click", function() {
                    self.close();
                });
            }

            if (window.cordova === undefined) {
                self._$input.addEventListener("change", function(event) {
                    UIFormCameraSingle._onChange(event, self);
                });
            }

            self._$img.addEventListener("load", function() {
                UIFormCameraSingle._onImgLoad(self);
            });

            self._$img.addEventListener("error", function() {
                UIFormCameraSingle._onImgLoadError(self);
            });

        }        
   
    });

    // Public methods and properties

    $.extend(UIFormCameraSingle.prototype, {
        
        // Open modal or file selector
        "open": function() {
            var self = this;

            if (self._$img.getAttribute("src") !== "") {
                
                $(UIFormCameraSingle._$modalContainer).removeClass("m-hidden");
                self._$modalPicture.src = self._$img.src;

            } else {
                UIFormCameraSingle._openFileSelector(self);
            }
        },
    
        // Delete current selected file
        "delete": function() {
            var self = this;
            self._$img.setAttribute("src", "");                      
        },
    
        // Change current selected file
        change: function() {
            var self = this;
            UIFormCameraSingle._openFileSelector(self);
        },
    
        // Close modal
        "close": function() {
            var self = this;
            $(self._$coverHTML.parentElement).append(self._$img);
            $(UIFormCameraSingle._$modalContainer).addClass("m-hidden");
            
            self._$modalPicture.src = "";            

        },

        _$coverHTML: {} ,
        _$input: {} ,
        _$modalContainer: {} ,
        _$imgContainer: {} ,
        _$originalImgContainer: {} ,
        _$deleteBtn: {} ,
        _$changeBtn: {} ,
        _$img: {} ,
        _$placeholder: {},

    });       
    
    UIFormCameraSingle._template = '<div class="m-camerasingle m-camerasingle-cover"> \
        <input class="m-hidden" type="file" class="m-camera-single" accept="image/*" /> \
        <span class="m-camerasingle-placeholder">...</span> \
        <div class="m-camerasingle-modal m-hidden"> \
            <div class="m-camerasingle-modal-header"> \
                <span class="m-canvas-cancel m-camerasingle-cancel"><span class="m-icon-arrow-left"></span></span> \
            </div> \
            <div class="m-camerasingle-img-container"> \
                <button class="button button-positive button-block m-camerasingle-button-change m-button m-button m-button-primary"><span class="m-icon-refresh-small-white"></span></button> \
                <button class="button button-assertive button-block m-camerasingle-button-delete m-button m-button m-button-danger"><span class="m-icon-delete-small-white"></span></button> \
            </div> \
            <div class="m-camerasingle-modal-footer"> \
            </div> \
        </div> \
    </div>'; 

    if (UIForm) {
        UIForm.registerControl(UIFormCameraSingle);  
    }


}(window.$, window.Mootor));
