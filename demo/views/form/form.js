m.app.view("form").on("ready", function() {
   $("#myForm").on("submit", function() {
      alert("Not implemented on this demo.")
      return false; 
   });
   
   // FIXME CHECK
   // Firefox OS fix
   $("input.m-text").on("blur", function() {
       window.setTimeout(function() {
           window.document.body.scrollTop = 0;
       }, 200);
   });   
   $("textarea").on("blur", function() {
       window.setTimeout(function() {
           window.document.body.scrollTop = 0;
       }, 200);
   });
   
});