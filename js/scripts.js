var canvas = $("canvas");
var canvasSizeRef = document.getElementById("paint-area");
var currentTool = "Paintbrush";
var currentColor = "#000000";
var currentWidth = 5;
var randColor;
var ctx = document.getElementById("paint-area").getContext('2d');

//setting canvas width and height in js
if (window.innerWidth >= 960) {
	canvasSizeRef.width = 940;
	canvasSizeRef.height = 940;
} else {
	canvasSizeRef.width = window.innerWidth;
	canvasSizeRef.height = window.innerWidth;
}


function init() {
	//if function to check for mobile or desktop and set up corresponding events
	/**/
	
	//set up touch events
	var newTouch;
	var currentTouch;
	canvas.on('touchstart', function(e) {
		e.preventDefault();
		newTouch = e.originalEvent.changedTouches[0];
		ctx.beginPath();
		ctx.moveTo(newTouch.pageX, newTouch.pageY-110);
	});
	
	canvas.on('touchmove', function(e) {
		e.preventDefault();
		touchMoved(e);
	});
	
	var touchMoved = function (event) {
		currentTouch = event.originalEvent.changedTouches[0];
		ctx.lineTo(currentTouch.pageX, currentTouch.pageY-110);
		ctx.lineWidth = currentWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		if (currentTool == "Eraser") {
			ctx.strokeStyle = "#ffffff";
		} else if (currentTool == "Paintbrush") {
			ctx.strokeStyle = currentColor;
		} else if (currentTool == "Confetti") {
			randColor = 'rgb('
				+ (Math.floor(Math.random() * 256)) + ','
				+ (Math.floor(Math.random() * 256)) + ','
				+ (Math.floor(Math.random() * 256)) + ')';
			ctx.strokeStyle = randColor;
		}
		ctx.stroke();
	};
}

//set up clear button
$("#clearCanvas").on("click", function(){
	ctx.clearRect(0, 0, canvas.width(), canvas.height());
});

//set up eraser button
$("#eraser").on("click", function(){
	currentTool = "Eraser";
	$(".active").toggleClass("active");
	$(this).toggleClass("active");
});

//set up paintbrush button
$("#paintbrush").on("click", function(){
	currentTool = "Paintbrush";
	$(".active").toggleClass("active");
	$(this).toggleClass("active");
});

//set up paintbrush button
$("#confetti").on("click", function(){
	currentTool = "Confetti";
	$(".active").toggleClass("active");
	$(this).toggleClass("active");
});

//Color changing
var newColor;
$(".color-box").on("click", function(){
	newColor = $(this).attr("data-hex");
	currentColor = newColor;
	currentTool = "Paintbrush";
	canvas.css({"border-color": currentColor});
	$(".active").toggleClass("active");
	$("#paintbrush").toggleClass("active");
});

var brushSizeIndicator = $("#brushSize");
//Brush Size changing
$("#decreaseSize").on("click", function() {
	if (currentWidth > 1) {
		currentWidth--;
		brushSizeIndicator.html(currentWidth);
	}
});

//Brush Size changing
$("#increaseSize").on("click", function() {
	if (currentWidth < 32) {
		currentWidth++;
		brushSizeIndicator.html(currentWidth);
	}
});


//Navigation bar triggering?
$("nav.responsive .hidden a#menu").on("click", function(e){
    e.preventDefault();
    
    var that = $(this);
    
    var menu = that.parent().parent().find("ul");
    
    if (menu.css('display') == 'none'){
        menu.css("display", "block");
    } else {
        menu.css("display", "none");
    }
});

init();