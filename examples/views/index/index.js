(function ($) {

    var app = $.app();

    $.extend(app.getView('index'), {

        title: "Index",

        onInit: function() {

            console.log("View 'index' initialized.")
            
            app.go("index");

			$("#buttonGoToView1").click(function() {
                app.go("view1");
			})		

        },

        onLoad: function() {
            console.log("View 'index' loaded.")
        }

    });

}(window.$));