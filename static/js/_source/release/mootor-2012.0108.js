(function(window) {

// Initialize local empty function
var Mootor = function(){};
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
    
// Prototypal inheritance

function object(obj) {
    function fn() {}
    fn.prototype = obj;
    return new fn();
}    

var Moo = (function() {
    
    // Define main constructor
    function Moo (query) {
        this.query = query;
    };
    
    // All reusable methods must be in the
    // prototype
    
    // Add properties to the prototype
    Moo.prototype.getQuery = function() {
        return this.query;
    }

    Moo.prototype.setQuery = function(query) {
        this.query = query;
        return this;
    }
    
    Moo.prototype.Fx = function() {
        console.log( "Fx!" );

        // For chain methods, return current instance 'this'
        return this;

    }

    // Inherits Moo constructor prototype 
    // and return new instance
    
    Mootor = function(query) {
        var Mootor = object(Moo.prototype);
        Mootor.query = query;
        return Mootor;
    }
    // Go public!
    window.$ = window.Mootor = Mootor;

}());


}(window));
