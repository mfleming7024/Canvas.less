$(document).ready(function(e){
	
	var win = $(window);
	var canvas = $("canvas");
	var canvasSizeRef = document.getElementById("paint-area");
	var currentTool = "Paintbrush";
	var currentColor = "#000000";
	var currentWidth = 5;
	var randColor;
	var ctx = document.getElementById("paint-area").getContext('2d');
	
	win.on("orientationchange", function(){
		alert("orientation change");
	});

	var container = canvas.parent();
	win.resize(respondCanvas); 
	var offsetLft;
	function respondCanvas(){ 
		offsetLft = (win.width()-canvas.parent().width())/2;
		canvas.attr('width', container.width());
		canvas.attr('height', container.width());
	}
	respondCanvas();


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
			ctx.moveTo(newTouch.pageX - offsetLft, newTouch.pageY);
		});

		canvas.on('touchmove', function(e) {
			e.preventDefault();
			touchMoved(e);
		});

		var touchMoved = function (event) {
			currentTouch = event.originalEvent.changedTouches[0];
			ctx.lineTo(currentTouch.pageX - offsetLft, currentTouch.pageY - );
			ctx.lineWidth = currentWidth;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			if (currentTool == "Eraser") {
				ctx.strokeStyle = "#ffffff";
			} else if (currentTool == "Paintbrush") {
				ctx.strokeStyle = currentColor;
			} else if (currentTool == "Confetti") {
				//use dots instead?
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

	init();
});