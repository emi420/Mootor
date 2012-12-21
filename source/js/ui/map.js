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
    
    self.onLoad = options.onLoad;
    
    Map._includeScript(self.key, function() {
        Map._API = google.maps;
        Map._initProperties(self, options);
        Map._initMap(self, options);
        if (typeof self.onLoad === "function") {
            self.onLoad();
        }
        return self;                
    });
            
};

/*
 * Public prototype
 */
Map.prototype = {
    addMarker: function(options) {
        var marker = new Marker(options, this.map);
        marker.setMap(this);
        return this;
    }
};

/*
 * Marker
 */
var Marker = function(options, map) {
    var infowindow,
    self = this;

    this.lat = options.lat;
    this.lon = options.lon;
    this.html = options.html;    

    this._APIMarker = new Map._API.Marker();
    this._APIMarker.setPosition(
        new Map._API.LatLng(
            this.lat,
            this.lon
            )
        );
    
    infowindow = new Map._API.InfoWindow({
        content: self.html
    });
    
    Map._API.event.addListener(this._APIMarker, 'click', function() {             
        infowindow.open(map,self._APIMarker);
    });
    
    return this;
}

Marker.prototype = {
    setMap: function(map) {
        this._APIMarker.setMap(map.map);
    }
}

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
        self.mapType = options.mapType ? options.mapType : Map._API.MapTypeId.ROADMAP
    },

    _includeScript: function(key, callback) {
        // TODO: multiple callbacks support
        $._UIMapCallbacks = callback;
        _includeScript(Map._APIScript + "&key=" + key)
    },
    
    _initMap: function(self) {
        var mapOptions;
    
        mapOptions = {
            zoom: self.zoom,
            center: new Map._API.LatLng(self.center[0], self.center[1]),
            mapTypeId: self.mapType                    
        };
        Map._API.Map.prototype.markers = new Array();
        Map._API.Map.prototype.getMarkers = function() {
            return this.markers
        };
        Map._API.Map.prototype.clearMarkers = function() {
            
            for(var i=0; i<this.markers.length; i++){
                this.markers[i].setMap(null);
            }
            this.markers = new Array();
        };
        self.map = new Map._API.Map(self.el,
            mapOptions);        
    },
    
    _APIScript: "https://maps.googleapis.com/maps/api/js?sensor=false&callback=$._UIMapCallbacks"
    
}, Map);


var _includeScript = function(script, callback) {
    var scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.setAttribute("src", script)  
    scriptElement.onload = callback;  
    document.body.appendChild(scriptElement);    
}
