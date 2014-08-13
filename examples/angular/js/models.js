(function(Data) {

   "use strict";
       
   var Item = function(options) {
       var d = new Date();
       this._updatedAt = d.getDate() + "/" + (d.getMonth() + 1) + '/' + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
       this.picture = options.picture || "img/no-picture.png";
       this.description = options.description || "";
       this.type = options.type || "The option number one";
       this.street = options.street || "";
       this.streetN = options.streetN || "";
       this.geo = options.geo || "";
       this.calification = options.calification || "";
       this.name = options.name || "";
       this.lastname = options.lastname || "";
       this.govid = options.govid || "";
       this.email = options.email || "";
       this.sign = options.sign || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
   }
       
   Data.models.Item = Data.Model({ 
        model: Item,
        localStoragePrefix: "main"
   });
  
}(window.Mootor.Data));


 
