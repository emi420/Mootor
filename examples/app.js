
(function ($) {
    "use strict";

	var app = $.app({
		views: [
		"panel1",
		"panel2",
		"panel3"
		]
		,
		init: function() {
			$("#panel1").show();
		}
	});
}($));