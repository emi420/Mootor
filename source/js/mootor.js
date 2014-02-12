/**
* The Mootor module handles the creation of App and Namespaces
*
* @module Mootor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function () {

    "use strict";
    
    var Mootor,
        Event,
        Context,
        m;

    Mootor = {
        // code here
    };
    
    /**
    * The Event class defines and manage events
    *
    * @class Event
    * @private
    *  @module Mootor
    */
    Event = Mootor.Event = {
        
        /**
        * Events collection
        * @private
        */
        _collection: [],

        /**
        * Add event to collection
        * @private
        */
        on: function(event, callback) {
            var eventToPush = {};
            eventToPush[event] = callback;
            Event._collection.push(eventToPush);
        },
        
        /**
        * Dispatch event
        * @private
        */
        dispatch: function(event, instance) {
            var i,
                key,
                collection = Event._collection,
                collectionCount = collection.length;
                
            for (i = 0; i < collectionCount; i++) {
                for (key in collection[i]) {
                    if (key === event) {
                        collection[i][event](instance);
                    }
                }
            }
        }

    };

    Context = Mootor.Context = function() {
        /**
        * Information about the context of the application (ej: device's viewport)
        * @class Context
        * @return object
        * @static
        */
        return ({

            /**
            * Browser info
            * @property browser
            * @type object
            */            
            browser: {},

            /**
            * Viewport info
            * @property viewport
            * @type object
            */            
            viewport: {},

            /**
            * Device info
            * @property device 
            * @type object
            */            
            device: {}

        });
    };

    // Static global objects
    
    m = {
        /**
        * m public global object
        * @class window.m
        * @static
        */
        
        /**
        * @property context
        * @type Context
        */
        context: (
            function() {
                new Context();
            }()
        ) 
    };

    // Make it public!
    
    window.Mootor = Mootor;
    window.m = m;

}());
