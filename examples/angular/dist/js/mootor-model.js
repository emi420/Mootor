/*
 * Model module
 *
 * FIXME CHECK (migrated code)
 *
 * file: mootor-model.js
 * @author Emilio Mariscal emi420 [at] gmail.com
 * 
 */  

(function ($) {

    "use strict";

    /*
    * Model object
    *
    */ 

    var Model,
        LocalStorage;
            
    Model = function(options) {
       switch(options.engine) {
           case "localStorage":
               return new LocalStorage(options);       
               break;
           default:
               if (options.engine !== undefined && typeof options.engine === "function") {
                   return new options.engine(options);           
               }
               break;
       }
    };

    LocalStorage = function(options) {
       this.model = options.model;
       this.localStoragePrefix = options.localStoragePrefix;
       this._loadIndex();
       return this;
    };

    LocalStorage.prototype = {
      
        // Created
        create: function(obj) {
            var i = 0, 
                objCopy = {},
                result,
                self = this;
                            
            // Set record id
            if (obj.id === undefined) {
            
                // A copy of the object. If any value is an object and
                // that object has an id, then save the id and not the object
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

            // FIXME CHECK
            $.extend(result, {
                put: function() {
                    self.put(this);
                },
                save: function() {
            
                    var obj,
                        count = self.count(),
                        i,
                        item;

                    // Set id
                    count++;
                    this.id = count;
                
                    for (i = 1; i < count+1;i++) {
                        item = self.get(i);
                        if (item === undefined || item === null) {
                            this.id = i;
                        }
                    }

                    obj = self.save(this);

                    self._index.push(obj.id);
                    self._updateIndex();
                }
            });

            return result;
        },
    
        // Save
        save: function(obj) {
    
            var strObj,
                prefix = this.localStoragePrefix;

            // Save object as a JSON string
            strObj = JSON.stringify(obj);
            window.localStorage.setItem(prefix + "-" + obj.id, strObj);
        
            delete obj.save;
        
            return obj;

        },
    
        // Get
        get: function(id) {
            var result,
                self = this;
            
            id = this.localStoragePrefix + '-' + id;                
            result = window.localStorage.getItem(id); 
        
            if (result !== null) {
                result = JSON.parse(result);
                // FIXME CHECK
                $.extend(result, {
                    put: function() {
                        self.put(this);
                    }                    
                });
            }         

            return result;
        },

        // Get all
        all: function() {
            var count = this.count(),
                result = [],
                i = 0,
                id;
             
            // If any records found, fill the response array
            if (count > 0) {
                for (i = 0; i <= count; i++) {
                    id = this._index[i];
                    if (id) {
                        result.push(this.get(id));
                    }
                }
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

        // Update
        put: function(obj) {
            var prefix = this.localStoragePrefix;
            window.localStorage.removeItem(prefix + '-' + obj.id);
            return this.save(obj);
        },
    
        // Destroy
        destroy: function(id) {        
             var count = this.count(),
                 prefix = this.localStoragePrefix,
                 index = this._index,
                 i;
     
             window.localStorage.removeItem(prefix + "-" + id);
         
             for (i = index.length;i--;) {
                 if (index[i] === id) {
                     index.splice(i,1);
                 }
             }
    
             count--;
         
             this._updateIndex();
        },

        // Count
        count: function() {
            var index = this._index;
            
            if (index.length) {
                return index.length;
            } else {
                return 0;
            }
        },
    
        // Index management
        _updateIndex: function() {
            var strObj = JSON.stringify(this._index),
                prefix = this.localStoragePrefix;
            window.localStorage.setItem(prefix + "-index", strObj);
        },
        _loadIndex: function() {
            var prefix = this.localStoragePrefix,
                data = window.localStorage.getItem(prefix + "-index"),
                result;
            
            if (data !== null) {
                result = JSON.parse(data);
            }
            
            if (!result) {
                this._index = result = [];
                this._updateIndex();
            }
            
            this._index = result;
        }

    };

    window.Mootor.Data = {
        Model: function (options) {
            if (options.engine === undefined) {
                options.engine = "localStorage";
            }
            return Model(options);
        },
        models: {}
    };
    
}(window.$));
