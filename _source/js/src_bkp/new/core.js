/*
 * Mootor (coded by emi420@gmail.com)
 *
 * Compatibility:
 * 
 * - Desktop: Chrome, Firefox, Safari
 * - Mobile: iOS 3+, Android 2.2+
 *  
 */
    
// Copy of global objects
var document = window.document;
    

// Sandbox for Mootor
Mootor = function ( query ) { 

    var args = Array.prototype.slice.call(arguments),
    callback = args.pop(),
    i; 
    
    // Get modules from parameters, ex: new Mootor("*",function(){});
    modules = (args[0] && typeof args[0] === "string") ? args : args[0];
    
    // Add properties to 'this' instance
    /*this.a = 1,
    this.b = 2,
    this.getA = function() {
        return this.a;
    };*/

    // Called as a constructor       
    if (!(this instanceof Mootor)) {
        return new Mootor(modules, callback);
    }
    
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
    //callback(this);
    
    // Add properties to prototype
    /*Mootor.prototype = {
        version: "0.1",
        getVersion: function() {
            return this.version;
        }
    };*/            
    
}

/*
 *  Core modules
 */    
 
Mootor.modules = {};    

Mootor.modules.core = function(Moo){
    
    // Hide/show document body 

    var init_styles = "",

    // Hide document body
    hideBody = function() {
        init_styles = document.createElement("style");
        init_styles.innerHTML = "body * {display: none}";
        document.head.appendChild(init_styles);     
    },
    
    // Show document body
    showBody = function() {
        document.head.removeChild(init_styles);                  
    },
    
    extend = function( target, module ) {        

        // This only extends the methods of the module
        // to the instance. No chains allowed.
        
        //target[module] = new Mootor( module, function(){} );
        //target[module].get = target.get;        
        //return target[module];

        // This extends all methods to the instance
        // allowing chains: $("#elementId").Fx().Nav()        
        
        var mod = new Mootor( module, function(){} );
        for( i in mod) {
            target[i] = mod[i];
        }
        return target;

    };
        
    /*
     *  Public
     * 
     *  Moo is the instance. For example if you have
     *  an Moo.ready method you can later call:
     * 
     *  $(document).ready(). 
     * 
     *  In other modules (Mootor.Fx, Mootor.Event, etc) 
     *  you will find Moo.show, Moo.hide, etc. 
     *  For this modules can do:
     * 
     *  $("#elementId").Fx().show()
     *  $("#elementId").Fx().hide()
     * 
     */ 
    
    // Main method for create Mootor instances 
    
    Moo.query = function(query) {        
        return Moo.init(query);
    };
           
    Moo.init = function(query) {
        
        var q_type = typeof query;                    

        if( q_type === "string" || q_type === "object" ) {
        
            var el; 
            
            // Get object from query
                
            switch(q_type) {
    
            case "string":

                //console.log("FIXME CHECK: Query to the Dom *** EXPENSIVE")

                if( query.indexOf('#') > -1 ) {
                    query = query.replace("#","");
                    el = document.getElementById(query);                
                } else if( query.indexOf(".") > -1) {
                    query = query.replace(".","");
                    el = document.getElementsByClassName(query);   
                }
                break;
    
            case "object":
                el = query;
                break;
            }             
        }
        /*
         * Public
         */

        var modules = {

            /* 
             * Core properties
             * 
             * Example usage:
             * 
             * $(document).ready( function(){ console.log("document ready!" )} )
             * 
             */
            
            get: function() {
                return el;
            },
            ready: function(fn) {
                Moo.ready(fn, el);
            },
            
            /*
             * Modules
             * 
             * Extend instance object functionality when a module
             * is called. Usage examples:
             * 
             * $("#elementId").Fx().hide()
             * $("#panelsId").Nav().panels()
             * 
             */ 

            Fx: function() {
                var updated_instance = extend(this, "Fx");
                return updated_instance;
            },
            Nav: function() {
                var updated_instance = extend(this, "Nav");
                return updated_instance;
            },
            Event: function() {
                var updated_instance = extend(this, "Event");
                return updated_instance;
            }

        };
        
        //this.init = function() { console.log("aha!") }
                
        return modules;

    },
    
    // On document ready
    Moo.ready = function(fn, el) {
        if(el === window || el === window.document ) { 
            var ready = false;
            
            // Handler to check if the dom is full loaded
            handler = function(e) {                
                if (ready) {return;}
                if (e.type === "readystatechange" && window.document.readyState !== "complete") {return;}
                    fn.call(window.document);
                    ready = true;                        
            };
    
            // Add listeners for all common load events
            if (el.addEventListener) {
                el.addEventListener("DOM-ContentLoaded", handler, false);
                el.addEventListener("readystatechange", handler, false);
                el.addEventListener("load", handler, false);                            
            } // IE8 needs attachEvent() support
        } else {
            el.onload = fn;        
        }
    };

    // Hide document body while loading
    // and show when ready
    hideBody();
    Moo.ready(showBody, window);
    
};

// Let's go public!
window.$ = $ = Mootor("core",function(){}).query;


/// Testing area
/// WARNING: comment this area in production
}(window));

// your testing code here (WARNING: global scope)

(function (window) {


    