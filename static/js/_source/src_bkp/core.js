/*
 *  Mootor (coded by emi420@gmail.com)
 *
 *  Examples:
 *
 *  // Initialize Mootor
 *  $(document).Mootor({
 *      Panels = [$("#Panel1"),$("#Panel2")]
 *  });
 * 
 */

/*
 * TODO: 
 *  - codigo independiente de jQuery
 *  - codigo valido en JSLint
 *  - revision de patrones de diseño
 *  - revision de performance
 *  - implementacion de paneles, etc
 */

var API_HOST = "http://192.168.1.12:9000";
var API_CORE_URI = "/api/core/rpc/";
var API_CATALOG_URI = "/api/catalog/rpc/";
var MEDIA_UPLOAD = "http://192.168.1.12:9000/uploads/";

(function( $ ){
 
// Overrides jQuery Mobile methods
$.mobile.showPageLoadingMsg = function() {};

var methods = {
    /*
     *  Main
     */
	main: undefined,
    init: function( options ) {
        /*
         *  Initialize Mootor plugin
         */
    	console.log("Mootor initialized.");
    	return this.each(function(){
            main = $(this);        
            
	        // Store data in a jQuery data object
            data = $(this).data('Main', {
               options : options
            });               

            // TODO: diferentes paneles, cambio entre ellos mediante swipe y
            //	     otros eventos. Luego hay que optimizar la carga del xhtml
            //		 y los scripts. Quizas precompilando o cargando todo antes.
            for(var i=0;i<options.Panels.length;i++) {
            	$(options.Panels[i]).css("display","none");
            }
            // TODO: show first panel only when all elements (images, etc) are loaded.
            $(options.Panels[0]).css("display","block");
		});
    },
};
   
$.fn.Mootor = function( method ) {   
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.Mootor' );
    }    
    
};

})( jQuery );
 



