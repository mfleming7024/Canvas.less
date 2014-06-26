var canvas = $("canvas");
var currentColor = "#000000";
var randColor;
var ctx = document.getElementById("paint-area").getContext('2d');

function init() {
	//set up touch events
	canvas.on('touchstart', function(e) {
		e.preventDefault();
		console.log("touch started");
		currentColor = "#00ff00";
		canvas.css({"border-color": currentColor});
	});
	
	canvas.on('touchmove', function(e) {
//		randColor = 'rgb('
//			+ (Math.floor(Math.random() * 256)) + ','
//			+ (Math.floor(Math.random() * 256)) + ','
//			+ (Math.floor(Math.random() * 256)) + ')';
		e.preventDefault();
		ctx.beginPath();
		ctx.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        ctx.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
		ctx.closePath();
		ctx.strokeStyle = currentColor;
		ctx.stroke();
	});
	
	
	//draw instructions on screen
	ctx.beginPath();
	ctx.moveTo(10,10);
    ctx.lineTo(10, 70);
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