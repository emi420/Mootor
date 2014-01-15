(function ($) {

    var app = $.app();

    $.extend(app.getView('view1'), {

        title: "View 1",

        onInit: function() {
            
            console.log("View 'view1' initialized.")

			$("#buttonGoToIndex").click(function() {
                app.go("index");
			})		

        },

        onLoad: function() {
           console.log("View 'view1' loaded.")
        }

    });

}(window.$));