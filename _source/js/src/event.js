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
    
    var addGesture = function(options) {
        var gestureList = Moo.gestures.list,
            type = options.type,
            fn = options.fn,
            callback = options.callback,
            key = createKey(fn.el);

        if (gestureList[key] === undefined) {
            gestureList[key] = [];
            if (type === "onTapStart") {
                fn.bind("mousedown", fn);        
            } else if (type === "onTapEnd") {
                fn.bind("mouseup", fn);        
            }
        }     
        
        if (gestureList[key][type] === undefined) {
            gestureList[key][type] = [];
        }     
        gestureList[key][type].push(callback);
           
    },
    
    createKey = function(el) {
        if(el.rel !== undefined) {
            return el.rel;               
        }
        if (typeof el === "object") {
            return el;
        }
    },
    
    fire = function(listeners, gesture) {
        for(i = listeners.length; i-- ;) {
            listeners[i](gesture);               
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

        handleEvent: function(e) {
            var i,
                key = createKey(this.el),
                gesture = {
                    el: this.el                
                }
                                
            if( e.type === "mousedown") {
                fire(Moo.gestures.list[key].onTapStart, gesture);
            }
            if( e.type === "mouseup") {
                fire(Moo.gestures.list[key].onTapEnd, gesture);
            }
        }
    }
    
    Moo.extend(Moo.Gesture);
    

}($));

