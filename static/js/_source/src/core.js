/*
 * Mootor (coded by emi420@gmail.com)
 *
 * Compatibility:
 * 
 * - Desktop: Chrome, Firefox, Safari
 * - Mobile: iOS 3+, Android 2.2+
 *  
 * Usage:
 * 
 *     // Dynamic font size
 *     $(document).Fx.dynamicType();
 */


/*
 *  Instances pattern
 */

/*
// Anonymous function for local scope
(function(window) {
    
   // Main function to call
   function Moot (query) {
       
        // Auto-init function
        var Moo = (function(){
            
            // Temporary object
            return {
                obj: query,
                check: function() {
                    console.log(this)
                }               
            }

        }());
       
        // Return instance
        return Moo;
    }
    
    // Make public!
    window.$$ = window.Moo = Moot;

}(window));
  */  
    

// *** codigo original ***/

(function(window) {

    var Mootor = Mootor || {};

    /*
     * Namespacing function
     */ 

    Mootor.namespace = function(ns_str) {

        var mods = ns_str.split('.'),  
        parent = Mootor,
        i=0;
        
        // Ommit parent module
        if(mods[0] === "Mootor") {
            mods = mods.slice(1);
        }
        
        // Add modules to parent object
        for(; i < mods.length; i += 1) {
          if(typeof parent[mods[i]] === "undefined") {
              parent[mods[i]] = {};
          } 
          parent = parent[mods[i]];
        }          

        return parent;
    };
        
    /*
     * Core
     */
    Mootor.namespace('Mootor.Core');
    
    Mootor.Core = (function() {
        
        /*
         * Private properties
         */

        var API_HOST = "http://192.168.1.12:9000",
        API_CORE_URI = "/api/core/rpc/",
        API_CATALOG_URI = "/api/catalog/rpc/",
        MEDIA_UPLOAD_URL = "http://192.168.1.12:9000/uploads/",
        VERSION = 0.1,
        init_styles,
        obj;
        

        /*
         * Initializing document
         */       
         
        // Hide/show document body 
        var hideBody = function() {
            init_styles = document.createElement("style");
            init_styles.innerHTML = "body * {display: none}";
            document.head.appendChild(init_styles);     
        },
        showBody = function() {
            document.head.removeChild(init_styles);                  
        },
        
        // When document ready
        onReady = function(fn) {
            var ready = false;

            // One-time functions
            var documentInit = function() {
                document.body.style.overflow = "hidden";
                showBody();
            },
            
            // Handler to check if the dom is full loaded
            handler = function(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && document.readyState !== "complete") {return;}
                    fn.call(document);
                    documentInit();
                    ready = true;                            
            };
            
            // Add listeners for all common load events
            if (window.addEventListener) {
                window.addEventListener("DOM-ContentLoaded", handler, false);
                window.addEventListener("readystatechange", handler, false);
                window.addEventListener("load", handler, false);                            
            } // IE8 needs attachEvent() support
                        
            // Return listener function
            return function onReady(f) {
                if (ready) {
                    f.call(document);
                }
            };
        };
        
        /* 
         * Warm up 
         */

        // Hide document body while loading
        hideBody();         

        // On document ready
        Mootor.ready = function(fn) {
            onReady(fn);
        };
               
        /* 
         * Public 
        */
       
        return {            
            
            // Returns Mootor API hostname
            getApiHost: function() {
                return API_HOST;
            },

            // Returns current object
            getCurrentObj: function() {
                return obj;
            },
            
            // Returns Mootor API Uri, by module (Core, Catalog, etc)
            getApiUri: function(mod) {
                switch( mod ) {
                case "core":
                    return API_CORE_URI;
                case "catalog":
                    return API_CATALOG_URI;
                default:
                    return undefined;
                }
            },

            // Returns Mootor current version
            version: function() {
                return VERSION;
            }
        };
        
    }());   
    
    
    // Sandbox for modules
    function Sandbox() {
 
        var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        i;
        
        // Get modules from parameters
        modules = (args[0] && typeof args[0] === "string") ? args : args[0];
        
        // Called as a constructor       
        if (!(this instanceof Sandbox)) {
            console.log("New instance!");
            return new Sandbox(modules, callback);
        }

        // Add properties to 'this' instance
        /*this.a = 1,
        this.b = 2,
        this.getA = function() {
            return this.a;
        };*/
        
        // Load all modules
        if (!modules || modules === '*') {

            modules = [];

            for (i in Sandbox.modules)
            {
                if (Sandbox.modules.hasOwnProperty(i)) {
                    modules.push(i);
                }
            } 
        }            
        
        // Add modules to 'this' instance
        for( i = 0; i < modules.length; i += 1) {
            Sandbox.modules[modules[i]](this);
        } 
        
        // Returns instance
        callback(this);
        
        // Add properties to prototype
        Sandbox.prototype = {
            name: "Mootor",
            version: "0.1",
            getVersion: function() {
                return this.version;
            }
        };            
        
    }
        
    Sandbox.modules = {};    
    
    Sandbox.modules.core = function(box){
        box.init = function(query) {
            
            var el;

            if( typeof query === "string" && query.indexOf("#") > -1) {
                query = query.replace("#","");
                el = document.getElementById(query);
            } 

            return {
                obj: el,
                ajax: function() {
                    return new Sandbox("ajax",function(){});
                },
                dom: function() {
                    return new Sandbox("dom",function(){});
                },
                event: function() {
                    return new Sandbox("event",function(){});
                }
            };
        }
    };

    Sandbox.modules.dom = function(box){
        box.getElement = function(eid) {
            eid = eid.replace("#","");
            var el = document.getElementById(eid);
            return el;
        };
        box.getDivs = function() {
            console.log(obj);
        };
    };
    
    Sandbox.modules.event = function(box){
        box.bind = function() {
            console.log("bind!");
        }
    };    

    Sandbox.modules.ajax = function(box){
        box.sendRequest = function() {
            console.log("send ajax request!!");
        }
        box.getResponse = function() {
            console.log("get ajax response!");
        }
    }; 
    
    var Moo = Sandbox("core",function(){});            
    window.$ = Moo.init;
    
    /* Main function to call
    function Moot (query) {
       
        // Auto-init function
        var Moo = (function(){
            
            // Temporary object
            console.log(typeof Mootor.Core);
            return {
                obj: query,
                ext: `Mootor,
                getInstance: function() {
                    console.log(this)
                }               
            }

        }());
        
        if( typeof query === "string" && query.indexOf("#") > -1 ) {
            Moo.obj = document.getElementById(query.replace("#",""));
        }
              
        return Moo;
    }
    
    // Let's go!
    window.$ = window.Moo = Moot; 
    */
    
    window.Mootor = Mootor;   


}(window));
