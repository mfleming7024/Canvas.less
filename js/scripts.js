<<<<<<< HEAD
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
})
=======
//page fade animation
$("body").animate({opacity:1}, 2000);

//Grid pixel/class name animation
$("#grid_system .row div").hover(function() {
    var that = $(this);
    that.find("h2").stop().animate({opacity: 0, left: "20px"}, 400);
    that.find("h3").stop().animate({opacity: 1, right: "0px"}, 400);
    
}, function(){
    var that = $(this);
    that.find("h2").stop().animate({opacity: 1, left: "0px"}, 400);
    that.find("h3").stop().animate({opacity: 0, right: "20px"}, 400);
});
>>>>>>> FETCH_HEAD
