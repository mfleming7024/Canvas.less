var canvas = $("canvas");
var canvasSizeRef = document.getElementById("paint-area");
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
	
	//set up touch events
	var newTouch;
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
	
	var currentTouch;
	var touchMoved = function (event) {
		currentTouch = event.originalEvent.changedTouches[0];
		ctx.lineTo(currentTouch.pageX, currentTouch.pageY-110);
		ctx.lineWidth = currentWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = currentColor;
		ctx.stroke();
	};
	
	//draw instructions on screen
	ctx.beginPath();
	ctx.moveTo(10,10);
    ctx.lineTo(10,70);
	ctx.moveTo(10,10);
	ctx.lineTo(40,10);
	ctx.moveTo(40,10);
	ctx.lineTo(40,70);
	ctx.moveTo(40,70);
	ctx.lineTo(10,70);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();
}

//set up clear button
$("#clearCanvas").on("click", function(){
	ctx.clearRect(0, 0, canvas.width(), canvas.height());
});

//Color changing
var newColor;
$(".color-box").on("click", function(){
	newColor = $(this).attr("data-hex");
	currentColor = newColor;
	canvas.css({"border-color": currentColor});
});

var brushSizeIndicator = $("#brushSize");
//Brush Size changing
$("#decreaseSize").on("click", function() {
	if (currentWidth > 1) {
		currentWidth--;
		console.log("size decreased", currentWidth);
		brushSizeIndicator.css("font-size", currentWidth);
	} else {
		//animate circle
	}
});

//Brush Size changing
$("#increaseSize").on("click", function() {
	if (currentWidth < 25) {
		currentWidth++;
		console.log("size increased", currentWidth);
		brushSizeIndicator.css("font-size", currentWidth);
	} else {
		//animate circle
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