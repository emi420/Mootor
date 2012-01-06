/*
 * Mootor (coded by emi420@gmail.com)
 *
 * Compatibility:
 * 
 * - Desktop: Chrome, Firefox, Safari
 * - Mobile: iOS 3+, Android 2.2+
 *  
 */

(function(window) {
    
    // Mootor sandbox
    function Mootor() {
 
        var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        i;
        
        // Get modules from parameters
        modules = (args[0] && typeof args[0] === "string") ? args : args[0];
        
        // Called as a constructor       
        if (!(this instanceof Mootor)) {
            return new Mootor(modules, callback);
        }

        /*
        // Add properties to 'this' instance
        this.a = 1,
        this.b = 2,
        this.getA = function() {
            return this.a;
        };
        */
        
        // Load all modules
        if (!modules || modules === '*') {

            modules = [];

            for (i in Mootor.modules)
            {
                if (Mootor.modules.hasOwnProperty(i)) {
                    modules.push(i);
                }
            } 
        }            
        
        // Add modules to 'this' instance
        for( i = 0; i < modules.length; i += 1) {
            Mootor.modules[modules[i]](this);
        } 
        
        // Returns instance
        callback(this);
        
        // Add properties to prototype
        Mootor.prototype = {
            version: "0.1",
            getVersion: function() {
                return this.version;
            }
        };            
        
    }
        
    Mootor.modules = {};    
    
    Mootor.modules.core = function(box){
        
        // Hide/show document body 

        var init_styles = "",

        hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            // Hiding styles...
            document.head.appendChild(init_styles);     
        },
        showBody = function() {
            // Showing styles...
            document.head.removeChild(init_styles);                  
        },
    
        documentInit = function() {
            document.body.style.overflow = "hidden";
            // document ready! show body
            showBody();
        },
        
        extend = function(instance, module) {
            var i;
            for( i in module ) {
                if ( module.hasOwnProperty(i)) {
                    instance[i] = module[i];                      
                }  
            }            
        }

        box.init = function(query) {
            
            var el;

            if( typeof query === "string" && query.indexOf("#") > -1) {
                query = query.replace("#","");
                el = document.getElementById(query);
            } 
            
            return {

                obj: el,
                ready: function(fn) {
                    Moo.ready(fn);
                },
                dom: function() {
                    this.dom = new Mootor("dom",function(){});
                    return this;
                },
                event: function() {
                    this.event = new Mootor("event",function(){});
                    return this;
                },
                pageInit: function() {
                    Moo.pageInit();
                },

                Fx: function() {
                    Fx = new Mootor("Fx",function(){});
                    extend(this, Fx);                    
                    return this; 
                },
                Nav: function() {
                    Nav = new Mootor("Nav",function(){});
                    extend(this, Nav);                    
                    return this;
                },
                Event: function() {
                    Event = new Mootor("Event",function(){});
                    extend(this, Event);                    
                    return this;
                }

            };
        },
        box.ready = function(fn) {
            var ready = false;
            
            // Handler to check if the dom is full loaded
            handler = function(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && document.readyState !== "complete") {return;}
                    fn.call(document);
                    ready = true;                        
            };

            // Add listeners for all common load events
            if (window.addEventListener) {
                window.addEventListener("DOM-ContentLoaded", handler, false);
                window.addEventListener("readystatechange", handler, false);
                window.addEventListener("load", handler, false);                            
            } // IE8 needs attachEvent() support
        },
        box.pageInit = function() {
            hideBody();
            Moo.ready(documentInit);
        }
    };

    Mootor.modules.dom = function(box){
        box.getElement = function(eid) {
            eid = eid.replace("#","");
            var el = document.getElementById(eid);
            return el;
        },
        box.getDivs = function() {
            console.log(obj);
        }
    };
    
    Mootor.modules.event = function(box){
        box.bind = function() {
            console.log("bind!");
        }
    };    
       
    // An instance of Mootor core
    var Moo = Mootor("core",function(){});            

    // Let's go public!
    window.$ = Moo.init;
    window.Mootor = Mootor;
        
}(window));
