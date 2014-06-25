var canvas = $("canvas");
var currentColor = "#000000";
var randColor;
var ctx = document.getElementById("paint-area").getContext('2d');

canvas.on('touchstart', function(e) {
    e.preventDefault();
	console.log("touch started");
	currentColor = "#00ff00";
	canvas.css({"border-color": currentColor});
});

canvas.on('touchmove', function(e) {
	randColor = 'rgb('
		+ (Math.floor(Math.random() * 256)) + ','
		+ (Math.floor(Math.random() * 256)) + ','
		+ (Math.floor(Math.random() * 256)) + ')';
    e.preventDefault();
	console.log("touch moved");
	currentColor = "#ff0000";
	canvas.css({"border-color": randColor});
});

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