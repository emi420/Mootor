(function ($) {
    "use strict";
    $.extend($, { 
    	App: {
			views: ["panel1","panel2","panel3"]
			,
			init: function () {
				//Show first panel
				$("#panel1").showPanel();
			}
		}
	})
}(window.Zepto));