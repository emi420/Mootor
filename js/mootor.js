(function(window) {


var Mootor = (function(){  
  
    // Inherits Moo constructor prototype 
    // and return new instance
    Mootor = function(query) {
        var Moo = Mootor.object(Mootor.prototype);
        Moo.get = function() {
            return query;    
        }
        return Moo;
    }
    
    // Prototypal inheritance
    Mootor.object = function(obj) {
        function fn() {}
        fn.prototype = obj;
        return new fn();
    }
    
    // All reusable methods must be in the
    // prototype
    
    Mootor.prototype.get = function() {
        return this.get();
    }
    
    return Mootor;

}());

// Go public!
window.$ = Mootor;


}(window));
