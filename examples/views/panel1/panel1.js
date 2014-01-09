(function ($) {
	var view = $.app.View({
		constructor: function() {
			//On first panel click show second panel
			$("#panel1").click(function() {
				$("#panel1").hidePanel();
				$("#panel2").showPanel();
			})		
		}
	});
}($));