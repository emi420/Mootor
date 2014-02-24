/**
* The Mootor module handles the creation of Namespaces and global objects
*
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function () {

    "use strict";
    
    var Mootor,
        m;

    Mootor = {
        // code here
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
        context: null
        
    };

    // Make it public!
    
    window.Mootor = Mootor;
    window.m = m;

}());
