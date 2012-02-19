/*
 * Mootor Gestures
 */
 
/*    
    - dragStart
    - dragEnd
    - dragMove
    - tapStart
    - tapEnd
    - tapHold
    - doubleTap
    - swipe        
    - pinch

*/


(function (Moo) {

    Moo.extend({
        gestures: {
            list: []
        }
    }, Moo);
    
    // Add gesture for element
    var addGesture = function(options) {
        var gestureList = Moo.gestures.list,
            type = options.type,
            fn = options.fn,
            callback = options.callback,
            key = createKey(fn.el);

        if (gestureList[key] === undefined) {
            gestureList[key] = {
                handler: []
            };
        }     

        // Bind listeners only once
        if (type === "onTapStart" || type === "onTapHold") {
            if(gestureList[key].handler["onTapStart"] === undefined && gestureList[key].handler["onTapStart"]  === undefined){
                fn.bind("mousedown", fn);        
            }
        } else if (type === "onTapEnd" || type === "onTapHold") {
            if(gestureList[key].handler["onTapEnd"] === undefined && gestureList[key].handler["onTapHold"]  === undefined){
                fn.bind("mouseup", fn);        
            }
        }
            
        if (gestureList[key].handler[type] === undefined) {
            gestureList[key].handler[type] = [];
        }     
        gestureList[key].handler[type].push(callback);
           
    },
    
    // Create key for element
    createKey = function(el) {
        if(el.rel !== undefined) {
            return el.rel;               
        }
        if (typeof el === "object") {
            return el;
        }
    },
    
    // Fire callbacks
    fire = function(info, callbacks) {
        for(i = callbacks.length; i-- ;) {
            callbacks[i](info);               
        }
    }
            
    /*
     *      Public
     */
    Moo.Gesture = {    

        onTapEnd: function(callback) {
            addGesture({
                fn: this,
                callback: callback,                          
                type: "onTapEnd"
            })
        },
        onTapStart: function(callback) {
            addGesture({
                fn: this,
                callback: callback,                            
                type: "onTapStart"
            })
        },
        onTapHold: function(callback) {
            addGesture({
                fn: this,
                callback: callback,
                type: "onTapHold"
            })
        },

        // Handler to detect gestures and fire callbacks        
        handleEvent: function(e) {
            var i,
                key = createKey(this.el),
                info = {
                    el: this.el                
                },
                gesture =  Moo.gestures.list[key],
                date = new Date();
            
            // TapStart
            if( e.type === "mousedown") {
                gesture.handler.time = date.getTime();        
                gesture.handler.mousedown = true;
                // TapHold
                window.setTimeout(function() { 
                    if (gesture.handler.mousedown === true) {                        
                         fire(info, gesture.handler.onTapHold);
                    }                     
                 }, 500);
                fire(info, gesture.handler.onTapStart);
            }
            
            // TapEnd
            if( e.type === "mouseup") {
                info.time = date.getTime() - gesture.handler.time;
                gesture.handler.mousedown = false;
                fire(info, gesture.handler.onTapEnd);
            }
        }
    }
    
    Moo.extend(Moo.Gesture);
    

}($));

