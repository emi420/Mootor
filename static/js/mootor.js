/*
 *  Mootor (coded by emi420@gmail.com)
 *
 *  Examples:
 *
 *  // Initialize Mootor
 *  $(document).Mootor({
 * 		Panels = [$("#Panel1"),$("#Panel2")]
 *  });
 * 
 *  // Subscribe form
 *  $("#suscribeForm").Form({
 *      type: "Subscribe",
 *      fields: $("#fieldEmail"),
 *      actions: $("#suscribeBtn"),
 *  });
 * 
 *  // Product gallery
 *  $("#productGallery").Catalog({
 *      type: "Gallery",
 *      category: "test",
 *  });
 *
 */


/*
 * TODO: - optimizar el diseño de las clases
 * 		 - compartir un metodo para AJAX (ver HTML5)
 */

var API_HOST = "http://192.168.1.12:9000";
var API_CORE_URI = "/api/core/rpc/";
var API_CATALOG_URI = "/api/catalog/rpc/";
var MEDIA_UPLOAD = "http://192.168.1.12:9000/uploads/";

/*
 * Mootor
 */

(function( $ ){

// Overrides jQuery Mobile methods
$.mobile.showPageLoadingMsg = function() {;};

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
 
/*
 * Forms
 */

(function( $ ){

var methods = { 	
	/*
	 *  Forms
	 */
	form: undefined,
	xmlhttp: undefined,
    init: function( options ) {
    	/*
    	 *  Initialize Form plugin
    	 */
        return this.each(function(){

            form = $(this);

            // Store data in a jQuery data object
            data = $(this).data('Form', {
               options : options
            });               
            
			// Select and initialize Form (Subscription, Contact, etc..)                
            switch(options.type) {
            	case "Subscribe":
            		
            		api_url =  "/core/rpc/"
					$(this).Form("Subscribe",{
						input: options.fields[0],
						button: options.actions[0],							
					});							
            	break;                	
            }
        });                                            
    },
    clear : function() {
		/*
		 * Clear Form fields
		 */
    	if( confirm("Está seguro?") ) { // FIXME: lang
    		var aInputs = $(this).find("input[type=text]");
    		for(var i=0; i < aInputs.length; i++) {
				aInputs[i].value="";       
				$(aInputs[i]).blur(); 			
    		}
    	}
        return undefined;
    },
    
    Subscribe: function(options) {
	/*
	 *  Subscribe Form
	 */

    	var initTextInput = function(el) {
            /*
             *  Text input
             */
            el.title=el.value;
            el.onkeypress = function() {
              if (this.className.indexOf(" changed") < 0) {
                this.value = "";
                this.className += " changed";
              }
            }
            el.onblur = function() {
              if(this.value == "") {
                this.value = this.title;
                this.className = this.className.replace(" changed","");
              }
            }    
            el.ontouchstart = function() {
                this.focus();
            }
    	}
    	
        var initButton = function(el) {  	        	
            /*
             *  Action button
             */        
            var fireAction = function() {  
           		if ( options.input.value == "" || options.input.value == options.input.title ) {
                    options.input.className += " alert";
                    var f = function() { options.input.className=options.input.className.replace(' alert','') }
                    var s = setTimeout(f,500);
                    return false;
                }
            }
            el.onclick = fireAction;
            el.ontouchstart = fireAction;
        }
        
        var initFormSubmit = function() {
           /*
            *  Form 
            */        
            var formSubmit = function() {
                xmlhttp = new XMLHttpRequest();
                var jsonstr = '{"method":"addUser","params":["' + options.input.value + '"],"id":1}' ;
                xmlhttp.open("POST", API_HOST + API_CORE_URI, true);
                xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xmlhttp.onreadystatechange = ajaxResponse;
                xmlhttp.send(email=jsonstr);
                options.button.value = "Enviando..."; // FIXME: lang
                options.button.disabled = "disabled";
            }
            form.submit(function() { 
            	formSubmit();
            	return false;
          	})
        }            
        var ajaxResponse = function() {
            /*
             *  AJAX response
             */
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {                	
            	// FIXME: eval is not a safe statement, must use strict mode
                eval('var r=' + xmlhttp.responseText);
                eval('var res =' + r.result);
                options.button.value = "Enviar";
                options.button.disabled = "";
                alert("Gracias! " + res[0].fields.email); // FIXME: lang
                fieldEmail.value = fieldEmail.title;
                fieldEmail.className = fieldEmail.className.replace(" changed","");
            }    
        }  
        
        // Initialize elements (form, text input, action button)      
        initFormSubmit();
        initTextInput(options.input);
        initButton(options.button);
    },
};
   
$.fn.Form = function( method ) {   
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.Form' );
    }    
    
};

})( jQuery );

/*
 * Catalog
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


