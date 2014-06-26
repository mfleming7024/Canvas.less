var canvas = $("canvas");
var canvasSizeRef = document.getElementById("paint-area");
var currentColor = "#000000";
var currentWidth = 2;
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
	
	//set up clear button
	$("#clearCanvas").on("click", function(){
		console.log("hi");
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
	});
}


//Color changing
var newColor;
$(".color-box").on("click", function(){
	newColor = $(this).attr("data-hex");
	currentColor = newColor;
	canvas.css({"border-color": currentColor});
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
})

init();