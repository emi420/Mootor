/**
* The Event class defines and manage events
*
* @class Event
* @private
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";
    
    var Event;
    
    Event = Mootor.Event = {
        
        /**
        * Events collection
        * @private
        */
        _collection: {},

        /**
        * Add event to collection
        * @method on
        * @param {string} event Name of the event
        * @param {function} callback Callback function\
        * @example
        *     Mootor.on("myCustomEvent", function(self) {
        *         console.log("Event fired!");
        *     });
        * @private
        */
        on: function(event, callback) {
            if (Event._collection[event] === undefined) {
                Event._collection[event] = [];
            } 
            Event._collection[event].push(callback);
        },
        
        /**
        * Dispatch event
        * @method dispatch
        * @param {string} event Name of the event
        * @param {object} instance Instance for scope
        * @private
        * @example
        *     Mootor.dispatch("myCustomEvent", myInstance);
        */
        dispatch: function(event, instance) {
            var i,
                count = 0,
                callbacks = Event._collection[event],
                callback;
                
            if (callbacks !== undefined) {
                count = callbacks.length ;
            }
            
            for (i = 0; i < count; i++) {
                (function(callback) {
                    window.setTimeout(function() {
                        callback(instance);
                    }, 1);
                }(callbacks[i]));
            }
        }, 

        /**
        * Extend objects with Event methods
        * @method extend
        * @param {object} object Object to extend
        * @param {string} objectName String name of the object
        * @private
        * @example
        *     Person = function(name) {
        *         this.name = name;
        *     }
        *
        *     Mootor.Event.extend(Person.prototype);
        *
        *     person = new Person("Anon");
        *     person.on("fire", function(self) {
        *          console.log(self.name + " is on fire!");
        *     }
        *     person.dispatch("fire", person);
        */
        extend: function(object, objectName) {
            $.extend(object, {
                on: function(event, callback) {
                    Event.on(objectName + ":" + event, callback); 
                },
                dispatch: function(event, self) {
                    Event.dispatch(objectName + ":" + event, self);
                }
            });
            
        }

    };

}(window.$, window.Mootor));