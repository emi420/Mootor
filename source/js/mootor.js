/**
* The Mootor module handles the creation of App and Namespaces
*
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function () {

    "use strict";
    
    var Mootor,
        Context,
        m;

    Mootor = {
        // code here
    };

    Context = Mootor.Context = function() {
        /**
        * Information about the context of the application (ej: device's viewport)
        * @class Context
        * @return object
        * @static
        */
        return ({

            /**
            * Browser info
            * @property browser
            * @type object
            */            
            browser: {},

            /**
            * Viewport info
            * @property viewport
            * @type object
            */            
            viewport: {},

            /**
            * Device info
            * @property device 
            * @type object
            */            
            device: {}

        });
    };

    // Static global objects
    
    m = {
        /**
        * m public global object
        * @class window.m
        * @static
        */
        
        /**
        * @property context
        * @type Context
        */
        context: (
            function() {
                new Context();
            }()
        ) 
    };

    // Make it public!
    
    window.Mootor = Mootor;
    window.m = m;

}());
