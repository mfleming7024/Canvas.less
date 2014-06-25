var canvas = $("canvas");
var currentColor = "#000000";
var ctx = document.getElementById("paint-area").getContext('2d');

canvas.on('touchstart', function(e) {
    e.preventDefault();
	console.log("touch started");
	currentColor = "#00ff00";
	canvas.css({"border-color": currentColor});
});

canvas.on('touchmove', function(e) {
    e.preventDefault();
	console.log("touch moved");
	currentColor = "#ff0000";
	canvas.css({"border-color": currentColor});
});

//Color changing
var newColor;
$(".color-box").on("click", function(){
	newColor = $(this).attr("data-hex");
	currentColor = newColor;
	canvas.css({"border-color": currentColor});
});