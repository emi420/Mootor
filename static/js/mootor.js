/*
 *  Mootor (coded by emi420@gmail.com)
 *
 *  Examples:
 *
 *  1. Subscribe Form
 * 
 *  $("#suscribeForm").Form({
 *      type: "Subscribe",
 *      fields: $("#fieldEmail"),
 *      actions: $("#suscribeBtn"),
 *  });
 *
 */


/*
 * Mootor Forms
 */
 
(function( $ ){

  var API_HOST = "http://192.168.1.10:9000";
  var API_CORE_URI = "/api/core/rpc/";

  var methods = {
  	
  		/*
  		 *  Forms
  		 */
		obj: undefined,
		xmlhttp: undefined,
        init: function( options ) {
	    	/*
	    	 *  Initialize Form plugin
	    	 */
            return this.each(function(){

                obj = $(this);

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
        	// #("#suscribeForm").Form("clear")
        	console.log("Clear Form");
        	if( confirm("Está seguro?") ) {
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
                obj.submit(function() { 
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

