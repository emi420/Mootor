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
//var document = window.document;
    
}(window));

// Prototypal inheritance


    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    
    
    function Mootor(query) {
        test = object(Mootor.prototype);
        test.query = query;
        return test;
        //return this;
    }
    
    Mootor.prototype.getQuery = function () {
        return this.query;
    }
    
    Mootor.prototype.Fx = function() {
        console.log(this.query);
        return "fx!";   
    }
        
    window.Mootor = Mootor ;


(function (window) {
    
}(window));
