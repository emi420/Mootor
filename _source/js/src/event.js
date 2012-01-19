/*
 * Mootor Events (coded by emi420@gmail.com)
 */

/***
    TODO: 
        - Mejorar el uso de swipe / touch
        - Scroll horizontal
        - Clase "active" 
***/ 
 
 
(function (Mootor) {

    "use strict";

    var Drag,
        Touch,
        Orientation;

    // Touch

    Touch = function (element, callback) {
        this.element = this;
        this.el = element;
        this.callback = callback;

        // Prevents default callback
        element.addEventListener('click', function (e) { e.preventDefault(); }, false);
        element.onclick = function () {return false; };

        // Disable selection, copy, etc
        element.style.webkitTouchCallout = "none";
        element.style.webkitUserSelect = "none";
        element.style.webkitUserDrag = "none";
        element.style.webkitUserModify = "none";
        element.style.webkitHighlight = "none";

        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchend', this, false);
    };

    // Touch Handler
    Touch.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'touchstart':
            this.onTouchStart(e);
            break;
        case 'touchend':
            this.onTouchEnd(e);
            break;
        }
    };

    // Touch Start
    Touch.prototype.onTouchStart = function () {
        if (this.onTouchStart.callback !== undefined) {
            this.onTouchStart.callback.call();
        }
    };

    // Touch End
    Touch.prototype.onTouchEnd = function () {
        if (this.onTouchEnd.callback !== undefined) {
            this.onTouchEnd.callback(this.el.rel);
        }
    };

    // Drag 
    Drag = function (element, callback) {
        this.element = this;
        this.el = element;
        this.startTouchX = 0;
        this.endTouchX = 0;
        this.lastTouchX = 0;
        this.callback = callback;
        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchmove', this, false);
        element.addEventListener('touchend', this, false);
    };

    // Dreag Handler
    Drag.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'touchstart':
            this.onDragStart(e);
            break;
        case 'touchmove':
            this.onDragMove(e);
            break;
        case 'touchend':
            this.onDragEnd(e);
            break;
        }
    };

    // Drag Start
    Drag.prototype.onDragStart = function (e) {
        this.lastTouchX = this.startTouchX = e.touches[0].clientX;
    };

    // Drag Move
    Drag.prototype.onDragMove = function (e) {
        var distance = e.touches[0].clientX - this.lastTouchX,
            distanceFromOrigin = this.startTouchX - this.lastTouchX;

        if (distanceFromOrigin > 50 && Mootor.listeners.isDragging === false) {
            Mootor.listeners.isDragging = true;
        }

        this.lastTouchX = e.touches[0].clientX;
        if (this.onDragMove.callback !== undefined) {
            this.onDragMove.callback({
                distance: distance,
                distanceFromOrigin: distanceFromOrigin
            });
        }
    };

    // Drag End
    Drag.prototype.onDragEnd = function () {
        var distance = this.startTouchX - this.lastTouchX;

        if (this.onDragEnd.callback !== 'undefined') {
            this.onDragEnd.callback(distance);
        }
    };

    // Orientation
    Orientation = function (element, callback) {
        this.callback = callback;
        this.element = this;
        element.addEventListener("orientationchange", this, false);
    };

    // Handler
    Orientation.prototype.handleEvent = function (e) {
        if (e.type === 'orientationchange') {
            this.onOrientationChange(e);
        }
    };

    // Change
    Orientation.prototype.onOrientationChange = function () {
        this.callback();
    };

    Mootor.Event = {
        bind: function (el, eventtype, callback) {
            var listenerId = Mootor.listeners.count,
                listenerCount = 1,
                lis,
                i = 0;

            switch (eventtype) {

            case 'dragMove':
                el.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                lis = Mootor.listeners[listenerId] = new Drag(el, callback);
                lis.onDragMove.callback = callback;
                lis.id = listenerId;

                Mootor.listeners.count += 1;
                break;

            case 'dragEnd':

                for (i = 0; i < Mootor.listeners.count; i++) {
                    if (Mootor.listeners[i].el === el) {
                        listenerId = i;
                        listenerCount = 0;
                    }
                }
                if (listenerCount > 0) {
                    Mootor.listeners[listenerId] = new Drag(el, function () {});
                    Mootor.listeners.count += listenerCount;
                }
                lis = Mootor.listeners[listenerId];
                lis.onDragEnd.callback = callback;
                lis.id = listenerId;
                break;

            /*case 'touch':
                Mootor.listeners[el.rel] = new Touch(el, callback);
                break;
            */
            case 'touchStart':
                console.log("touch start");
                break;

            case 'touchEnd':
                lis = Mootor.listeners[listenerId] = new Touch(el, function () {});
                lis.onTouchEnd.callback = callback;
                lis.id = listenerId;
                Mootor.listeners.count += 1;
                break;

            case "orientationChange":
                lis = Mootor.listeners[listenerId] = new Orientation(el, callback);
                lis.id = listenerId;
                Mootor.listeners.count += 1;
                break;

            }
        }
    };

    Mootor.extend(Mootor.Event);

    /*
     * Private
     */

    Mootor.listeners = {
        count: 0,
        isDragging: false
    };

}(Mootor));

window.Mootor = Mootor;