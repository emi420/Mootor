(function($) {

    "use strict";
    
    var colors_vary,
        c,
        $line,
        color,
        colors_static,
        $div,
        classes;

    colors_vary = ["gray","primary","success","warning","info","danger"]

    for (c in colors_vary) {
    	color = colors_vary[c];
    	$line = $("<div></div>").addClass("color-line");
    	$("#colors_container").append($line);

    	classes = "m-bg-color-"+color+"-darker  m-color-white";
    	$div = $("<div></div>").addClass("color "+classes).html(classes);
    	$line.append($div);

    	classes = "m-bg-color-"+color+"-dark  m-color-white";
    	$div = $("<div></div>").addClass("color "+classes).html(classes);
    	$line.append($div);

    	classes = "m-bg-color-"+color+"-darker ";
    	classes += (color == "warning" ? "m-color-black" : "m-color-white")
    	$div = $("<div></div>").addClass("color "+classes).html(classes);
    	$line.append($div);

    	classes = "m-bg-color-"+color+"-light ";
    	classes += (color == "danger" ? "m-color-white" : "m-color-black")
    	$div = $("<div></div>").addClass("color "+classes).html(classes);
    	$line.append($div);

    	classes = "m-bg-color-"+color+"-lighter m-color-black";
    	$div = $("<div></div>").addClass("color "+classes).html(classes);
    	$line.append($div);

    }

    $line = $("<div></div>").addClass("color-line");
    $("#colors_container").append($line);

    colors_static = ["white","cream","black","transparent"];
    for (c in colors_static) {
    	classes = "m-bg-color-"+colors_static[c] + " " + (colors_static[c] != "black" ? "m-color-black" : "m-color-white")
    	$div = $("<div></div>").addClass("color  " + classes).html(classes);
    	$line.append($div);
    }
    
}(window.$));