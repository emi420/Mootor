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
        * @private
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
                    }, 1)
                }(callbacks[i]));
            }
        }, 

        /**
        * Extend objects with Event methods
        * @private
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