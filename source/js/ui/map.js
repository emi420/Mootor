/**
 * Map
 * @return {object} Map Mootor UI Map object
 */
var Map = function(options) {

    var self = this;
    this.el = options.el;
    Map._setTouchEvents(self);

    if (options.key !== undefined) {
        self.key = options.key;
    } else {
        self.key = ""
    }
    
    Map._includeScript(self.key, function() {
        Map._initProperties(self, options);
        Map._initMap(self, options);
        return self;                
    });
            
};

/*
 * Public prototype
 */
Map.prototype = {        
    
};

/*
 * Private static properties
 */
$.extend({
    
    _setTouchEvents: function(self) {
        $(self.el).on("touchmove", function(e) {
            e.stopPropagation();
        });
    },
    
    _initProperties: function(self, options) {
    
        // Initialize properties or fill with sample data
    
        self.width = options.width ? options.width : "100%";
        self.height = options.height ? options.height : "100%";
        self.el.setAttribute("style", "width:" + self.width + ";height:" + self.height);
        
        self.zoom = options.zoom ? options.zoom : 13;
        self.center = options.center ? options.center : [-34.599567,-58.372553];
        self.mapType = options.mapType ? options.mapType : google.maps.MapTypeId.ROADMAP
    },

    _includeScript: function(key, callback) {
        // TODO: multiple callbacks support
        $._UIMapCallbacks = callback;
        _includeScript("https://maps.googleapis.com/maps/api/js?sensor=false&callback=$._UIMapCallbacks&key=" + key)
    },
    
    _initMap: function(self) {
        var mapOptions;
    
        mapOptions = {
            zoom: self.zoom,
            center: new google.maps.LatLng(self.center[0], self.center[1]),
            mapTypeId: self.mapType                    
        };
        self.map = new google.maps.Map(self.el,
                    mapOptions);        
    }
    
}, Map);


var _includeScript = function(script, callback) {
    var scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.setAttribute("src", script)  
    scriptElement.onload = callback;  
    document.body.appendChild(scriptElement);    
}
