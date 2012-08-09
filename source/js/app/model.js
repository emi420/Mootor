/*
* Model object (draft using localStorage)
*
* TODO: DB engine/storage independence
*
*/ 

var Model = function(options) {
   this.model = options.model;

   // Legacy compatibility
   if (options._localStoragePrefix !== undefined) {
        options.localStoragePrefix = options.localStoragePrefix;
   }

   this.localStoragePrefix = options.localStoragePrefix;
   return this;
};

Model.prototype = {
      
    // Get
    get: function(id) {
        var result,
            self = this;
        
        id = this.localStoragePrefix + '-' + id;                
        result = JSON.parse(window.localStorage.getItem(id));
        
        if (result !== null) {
            $.extend({
                put: function() {
                    self.put(this)
                }                    
            }, result);
        }         

        return result;
    },
    
    // Filter            
    filter: function(oQuery) {

        var allRecords = this.all(),
            field,
            value,
            result = [],
            i = 0;
        
        // FIXME CHECK
        for (i in oQuery) {
            field = i;                        
        }
        value = oQuery[field];
        
        if(typeof value === "object" && value.id !== undefined) {
           value = value.id;
        }
        
        for (i = allRecords.length; i--;) {
            if (allRecords[i][field] === value) {
                result.push(allRecords[i]);
            }
        }
        
        return result;

    },
    
    // Created
    create: function(obj) {
        var i = 0,
            strObj = "",
            objCopy = {},
            result,
            count = this.count(),
            prefix = this.localStoragePrefix;
                            
        // Set record id
        if (obj.id === undefined) {
            
            count++;
            obj.id = count;

            // A copy of the object. If any value is an object and
            // that object has an id, save the id and not the object
            for (i in obj) {
                if (typeof obj[i] === "object" && obj[i].id !== undefined) {
                    objCopy[i] = obj[i].id;
                } else {
                    objCopy[i] = obj[i];
                }
            }           

        } else {
            objCopy = obj;
        }

        // Create a new record from data model
        result = new this.model(objCopy);

        // Save object as a JSON string
        strObj = JSON.stringify(result);
        window.localStorage.setItem(prefix + "-" + result.id, strObj);

        // Update record count
        count = JSON.stringify({value: count});
        window.localStorage.setItem(prefix + "-count", count);

        return result;
    },
    
    // Get all
    all: function() {
        var count = this.count(),
            result = [],
            i = 0,
            item,
            record;
             
        // If any records found, fill the response array
        if (count > 0) {
            for (i = 0; i <= count; i++) {
                record = this.get(i);
                if (record) {
                    result.push(record);
                }
            }
        }
        
        return result;                
    },

    // Update
    put: function(obj) {
        var prefix = this.localStoragePrefix;
        window.localStorage.removeItem(prefix + '-' + obj.id);
        return this.create(obj);
    },
    
    // Count
    count: function() {
        var prefix = this.localStoragePrefix,
            count = 0;
            
        count = JSON.parse(window.localStorage.getItem(prefix + "-count"));
        if (count !== null) {
            return count.value;
        } else {
            return 0;
        }
    }, 

    // Delete (not implemented yet)
    delete: function(id) {        
        return null;                       
    },

}

$.extend({
    Model: function (options) {
        return new Model(options);
    },
    models: {}
}, App.prototype);
    
