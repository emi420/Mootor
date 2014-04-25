colors_vary = ["gray","primary","success","warning","info","danger"]

for (c in colors_vary) {
	color = colors_vary[c];
	$line = $("<div></div>").addClass("color-line");
	$("#colors_container").append($line);

	$div = $("<div></div>").addClass("color m-bg-color-"+color+"-darker").html(color);
	$line.append($div);
	$div = $("<div></div>").addClass("color m-bg-color-"+color+"-dark").html(color);
	$line.append($div);
	$div = $("<div></div>").addClass("color m-bg-color-"+color).html(color);
	$line.append($div);
	$div = $("<div></div>").addClass("color m-bg-color-"+color+"-light").html(color);
	$line.append($div);

	$div = $("<div></div>").addClass("color m-bg-color-"+color+"-lighter").html(color);
	$line.append($div);

}

$line = $("<div></div>").addClass("color-line");
$("#colors_container").append($line);

colors_static = ["white","cream","black","transparent"];
for (c in colors_static) {
	color = colors_static[c];
	$div = $("<div></div>").addClass("color m-bg-color-"+color).html(color);
	$line.append($div);
}