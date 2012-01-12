(function(window) {


var Mootor = (function(){  

	Mootor = function(query) {
		return new Mootor.prototype.fn(query);	
	}
	
	Mootor.prototype = {

		fn: function(query) {
						
			this.query = (function() { 
				return query 
			}()) ;

			return this;		

		}	

	}
	
	Mootor.extend = function(obj) {
		console.log("extending...");
		for( i in obj ) {
			if( obj.hasOwnProperty(i) ) {
				Mootor.prototype[i] = obj[i];				
			}			
		}
	}
		
	Mootor.prototype.fn.prototype = Mootor.prototype;
		
	return Mootor
	
}());

// All reusable methods must be in the
// prototype
/*
Mootor.prototype.Fx = function() {
	console.log("Fx.test!");
	console.log(this.query);
}
*/




var Fx = {
	test: function() { console.log("Fx.test!"); }
}

Mootor.extend(Fx);


// Go public!
window.$ = Mootor;

}(window));
