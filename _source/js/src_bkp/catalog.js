/*
 *  Mootor.Catalog (coded by emi420@gmail.com)
 *
 *  Examples:

 *  // Product gallery
 *  $("#productGallery").Catalog({
 *      type: "Gallery",
 *      category: "test",
 *  });
 *
 */

(function( $ ){

var methods = { 	
	/*
	 *  Catalog
	 */
	catalog: undefined,
	xmlhttp: undefined,
    init: function( options ) {
    	/*
    	 *  Initialize Catalog plugin
    	 */

        return this.each(function(){

            catalog = $(this);

            // Store data in a jQuery data object
            data = $(this).data('Catalog', {
               options : options
            });               

			// Select and initialize Catalog (Gallery, ProductCard, etc..)                
            switch(options.type) {
            	case "Gallery":            		
            		api_url =  "/catalog/rpc/"
					$(this).Catalog("Gallery",{category:options.category});							
            	break;                	
            }
        });                                            
    },
    
    Gallery: function(options) {
	/*
	 *  Product Gallery
	 */

		// API query 
        xmlhttp = new XMLHttpRequest();
        var jsonstr = '{"method":"getProducts","params":["' + options.category + '"],"id":1}' ;
        xmlhttp.open("POST", API_HOST + API_CATALOG_URI, true);
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange = function() {
        	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		    	console.log("it works! this is the AJAX callback. Now, show the gallery UI!")
				// Show image, with event listeners
				// FIXME: eval is not a safe statement, use strict mode
                eval('var r=' + xmlhttp.responseText);
                eval('var res =' + r.result);
                
                for(var i=0 ; i<res.length ; i++) {
                	var img = document.createElement("img");
                	var div = document.createElement("div");
                	img.src = MEDIA_UPLOAD + res[i].fields.image;
                	img.className = "item";
                	// FIXME: show first item only when all elements are loaded
                	if( i > 0) {
                		div.style.display = "none";
                	}

                	/*$(img).swipe(function() {
                		console.log("swipe!");
                	});*/
                	
                	$(div).bind('swipeleft',function(event, ui){
				       console.log("swipeleft!");
				    })

                	$(div).bind('swiperight',function(event, ui){
				       console.log("swiperight!");
				    })
                	
                	/*img.onclick = function() {
                		console.log("click!");
                	}*/
                	$(div).append(img);
                	catalog.append(div);
                } 
				
				/*
				 * 1) ocupar toda la pantalla con la primer imagen
				 * 2) mostrar siguiente imagen y rotar infinitamente (al hacer click)
				 * 3) idem anterior, pero con eventos swipe y anterior/siguiente
				 * 4) revisar aceleracion 3D y performance en Android, iOS3, iOS4 ..
				 * 5) que el ultimo "slide" sea el formulario de subscripcion
				 * 6) preloading
				 * 7) optimizar imagenes en el admin (ver personalizacion x sitio)
				 * 
				 */
				//debugger;		    	
        	}
        } 
        xmlhttp.send(category=jsonstr);
		
    },
    
};
   
$.fn.Catalog = function( method ) {   
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.Catalog' );
    }    
    
};

})( jQuery );
