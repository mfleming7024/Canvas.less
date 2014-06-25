var canvas = $("canvas");
var currentColor = 000000;
var ctx = document.getElementById("paint-area").getContext('2d');

canvas.on('touchstart', function(e) {
    e.preventDefault();
	console.log("touch started");
});

canvas.on('touchmove', function(e) {
    e.preventDefault();
	console.log("touch moved");
});

//Color changing
var newColor;
$(".color-box").on("click", function(){
	newColor = $(this).attr("data-hex");
	//change canvas border color
	currentColor = newColor;
	canvas.css({"border-color": currentColor});
});