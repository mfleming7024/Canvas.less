var canvas = $("canvas");
var currentColor = "#000000";
var currentWidth = 4;
var randColor;
var ctx = document.getElementById("paint-area").getContext('2d');
console.log(canvas);
function init() {
	//set up touch events
	var newTouch;
	canvas.on('touchstart', function(e) {
		e.preventDefault();
		newTouch = e.originalEvent.changedTouches[0];
		ctx.beginPath();
		ctx.moveTo(newTouch.pageX, newTouch.pageY-150);
	});
	
	canvas.on('touchmove', function(e) {
		e.preventDefault();
		touchMoved(e);
	});
	
	var currentTouch;
	var touchMoved = function (event) {
		currentTouch = event.originalEvent.changedTouches[0];
		ctx.lineTo(currentTouch.pageX, currentTouch.pageY-150);
		ctx.lineWidth = currentWidth;
		ctx.strokeStyle = currentColor;
		ctx.stroke();
	};
	
	
	
	//draw instructions on screen
//	ctx.beginPath();
//	ctx.moveTo(11,10);
//    ctx.lineTo(10.5, 70);
//    ctx.closePath();
//    ctx.strokeStyle = currentColor;
//    ctx.stroke();
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