$(document).ready(function(e){
	
	var win = $(window);
	var canvas = $("#paint-area");
	var canvasRef = document.getElementById("paint-area");
	var currentTool = "Paintbrush";
	var currentColor = "#000000";
	var currentWidth = 5;
	var randColor;
	var ctx = canvasRef.getContext('2d');
	var container = canvas.parent();
	var contWidth;
	var offsetLft;
	var offsetTop = canvas[0].offsetTop;
	var buffer = document.getElementById('buffer');
	
	win.resize(respondCanvas); 
	function respondCanvas(){ 
		offsetLft = (win.width() - container.width()) / 2;
		contWidth = container.width();
		buffer.width = contWidth;
		buffer.height = contWidth;
		buffer.getContext('2d').drawImage(canvasRef, 0, 0);
		canvas.attr('width', contWidth);
		canvas.attr('height',contWidth);
		canvasRef.getContext('2d').drawImage(buffer, 0, 0);
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
			ctx.moveTo(newTouch.pageX-offsetLft,newTouch.pageY-offsetTop);
		});

		canvas.on('touchmove', function(e) {
			e.preventDefault();
			touchMoved(e);
		});

		var touchMoved = function (event) {
			currentTouch = event.originalEvent.changedTouches[0];
			ctx.lineTo(currentTouch.pageX-offsetLft,currentTouch.pageY-offsetTop);
			ctx.lineWidth = currentWidth;
			ctx.lineCap = 	"round";
			ctx.lineJoin = 	"round";
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
	
	//set up paintbrush button
	$("#paintbrush").on("click", function(){
		currentTool = "Paintbrush";
		$(".active").toggleClass("active");
		$(this).toggleClass("active");
	});

	//set up eraser button
	$("#eraser").on("click", function(){
		currentTool = "Eraser";
		$(".active").toggleClass("active");
		$(this).toggleClass("active");
	});

	//set up paintbrush button
	$("#confetti").on("click", function(){
		currentTool = "Confetti";
		$(".active").toggleClass("active");
		$(this).toggleClass("active");
	});
	
	//set up clear button
	$("#clearCanvas").on("click", function(){
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
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
	
	//Save Picture Functionality
	$("#savePicture").on("click", function(){
		var data = canvasRef.toDataURL();
		var prev = window.location.href;
		data.replace("image/png", "image/octet-stream");
		window.location.href = data;
		//data.replace("image/png", "image/octet-stream");
		//window.location.href = prev;
	})

	init();
});









