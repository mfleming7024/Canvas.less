var canvas = $("canvas");
var currentColor = "#000000";
var randColor;
var ctx = document.getElementById("paint-area").getContext('2d');

function init() {
	//set up touch events
	canvas.on('touchstart', function(e) {
		e.preventDefault();
	});
	
	canvas.on('touchmove', function(e) {
		e.preventDefault();
		touchMoved(e);
	});
	
	
	var touchMoved = function (event) {
		var touches = event.changedTouches;

		for (var i=0; i < touches.length; i++) {
			var touch = touches[i];
			var currentTouchIndex = findCurrentTouchIndex(touch.identifier);

			if (currentTouchIndex >= 0) {
				var currentTouch = currentTouches[currentTouchIndex];

				ctx.beginPath();
				ctx.moveTo(currentTouch.pageX, currentTouch.pageY);
				ctx.lineTo(touch.pageX, touch.pageY);
				ctx.lineWidth = currentWidth;
				ctx.strokeStyle = currentTouch.color;
				ctx.stroke();

				// Update the touch record.
				currentTouch.pageX = touch.pageX;
				currentTouch.pageY = touch.pageY;

				// Store the record.
				currentTouches.splice(currentTouchIndex, 1, currentTouch);
			} else {
				console.log('Touch was not found!');
			}

		}
	};
	
	
	
	//draw instructions on screen
	ctx.beginPath();
	ctx.moveTo(11,10);
    ctx.lineTo(10.5, 70);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();
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