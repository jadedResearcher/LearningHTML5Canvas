SVG_NS = "http://www.w3.org/2000/svg"
var size = 30;
var num_r = 1;
var num_g = 1;
var num_b = 1;
var red_func;
var green_func;
var blue_func;
var child_count = 0;
var timeOut;
var shape_func;
//TODO  entire image done at once, then rendered.
function init(){
	initColor();
	stop = false;
	child_count = 0;
	red_func = randomPieceMealArray(num_r);
	green_func = randomPieceMealArray(num_g);
	blue_func = randomPieceMealArray(num_b);
	render();
}


function removeAllChildren(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	child_count = 0;
}


function render(){
	//TODO, render entire canvas at once, go through all x and y values and set the image data
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var x = 0;
    var y = 0;
    for(var i = 0; i < data.length; i += 4) {
     	var rgb = getColorWithFunctionsRGB(x,y,red_func, green_func, blue_func);
        // red
        data[i] = rgb[0];
        // green
        data[i + 1] = rgb[1];
        // blue
        data[i + 2] =rgb[2];
        data[i+3] = 255;  //needs to be explicit or is transparent?
        x += 1;
        if(x>=canvas.width){ //if just >, then picture is slanted.
        	x = 0;
        	y += 1;
        }
     }
	
	context.putImageData(imageData, 0, 0);
	setTimeout(init, 100);
}








