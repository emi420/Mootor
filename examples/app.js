
(function ($) {
    "use strict";

	var app = $.app({
		views: [
		"panel1",
		"panel2"
		]
		,
		init: function() {
			$("#panel1").show();
		}
	});
}($));