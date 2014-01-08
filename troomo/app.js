var views = ["panel1","panel2","panel3","panel4","panel5"]


function App() {

	//Show first panel
	$("#panel1").showPanel();

	//On first panel click show second panel
	$("#panel1").click(function() {
		$("#panel1").hidePanel();
		$("#panel2").showPanel();
	})

	//On second panel click show first panel
	$("#panel2").click(function() {
		$("#panel2").hidePanel();
		$("#panel3").showPanel();

	})
	//On second panel click show first panel
	$("#panel3").click(function() {
		$("#panel3").hidePanel();
		$("#panel4").showPanel();

	})
	//On second panel click show first panel
	$("#panel4").click(function() {
		$("#panel4").hidePanel();
		$("#panel5").showPanel();

	})
}