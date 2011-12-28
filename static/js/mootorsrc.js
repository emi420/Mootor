    var gel = function (eid){ return document.getElementById(eid) };
    var Mootor = {
        Forms: {
            Subscribe : function() {
                // TODO: urlPost como parametro
                this.urlPost = "http://192.168.1.14:9000/api/core/rpc/";
                this.init = function(params) {
                    /*
                     *  Initialize form
                     */
                    this.input = params['input']; 
                    this.inputText(this.input);

                    this.action = params['action'];
                    this.actionButton(this.action);

                    this.form = params['form'];
                    this.formSubmit(this.form);
                    
                    var xmlhttp = new XMLHttpRequest();
                }
                this.inputText = function(obj) {
                    /*
                     *  Field & actions events
                     */
                    obj.title=obj.value;
                    obj.onkeypress = function() {
                      if (this.className.indexOf(" changed") < 0) {
                        this.value = "";
                        this.className += " changed";
                      }
                    }
                    obj.onblur = function() {
                      if(this.value == "") {
                        this.value = this.title;
                        this.className = this.className.replace(" changed","");
                      }
                    }    
                    obj.ontouchstart = function() {
                        this.focus();
                    }
                }
                this.actionButton = function(obj) {
                    /*
                     *  Action button
                     */        
                    var fireAction = function() {  
                       
                        /***                    
                            FIXME: no toma el "this" que se necesita. Con "this" se refiere
                                   a la clase raiz Subscribe no al objeto input
                        ***/
                        console.log(this);
                        console.log(obj);
                        return false;
                        
                        if ( this.input.value == "" || this.input.value == this.input.title ) {
                            this.input.className += " alert";
                            var s = setTimeout("fieldEmail.className=fieldEmail.className.replace(' alert','')",500);
                            return false;
                        }
                    }
                    obj.onclick = fireAction;
                    obj.ontouchstart = fireAction;
                }
                this.formSubmit = function() {
                    var formSubmit = function() {
                        var jsonstr = '{"method":"addUser","params":["' + this.input.value + '"],"id":1}' ;
                        xmlhttp.open("POST", this.urlPost, true);
                        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                        xmlhttp.onreadystatechange = this.handleResponse;
                        xmlhttp.send(email=jsonstr);
                        this.actionButton.value = "Enviando...";
                        this.actionButton.disabled = "disabled";
                        return false;
                    }
                    this.form.onsubmit = formSubmit;
                }
                this.handleResponse = function() {
                    /*
                     *  Handle AJAX response
                     */
                    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                        eval('var r=' + xmlhttp.responseText);
                        eval('var res =' + r.result);
                        suscribeBtn.value = "Enviar";
                        suscribeBtn.disabled = "";
                        alert("Gracias! " + res[0].fields.email);
                        fieldEmail.value = fieldEmail.title;
                        fieldEmail.className = fieldEmail.className.replace(" changed","");
                    }    
                }
            }
        }
    }
}



/*

(function(){

    var el = function (eid) {  return document.getElementById(eid)  }

    // Base class
    this.moo = function() {};
   
    // Form
    this.moo.prototype.form = {
        init: function() {
            this.form.clear = function() {
                console.log("clear");
            }        
        },
        },
        subscription: function(form, params) {
            this.form = form;
            this.init();
        }
    }
    
    // Base object
    this.moo = new moo;

})();
 
 */