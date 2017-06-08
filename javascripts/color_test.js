SVG_NS = "http://www.w3.org/2000/svg"
var size = 30;
var num_r = 1;
var num_g = 1;
var num_b = 1;
var red_func;
var green_func;
var blue_func;
var pos_func;
var child_count = 0;
var timeOut;
var shape_func;
//TODO  entire image done at once, then rendered.
function init(){
	initColor();
	syncFormValues();
	stop = false;
	child_count = 0;
	render();
}


function syncFormValues(){
	pos_func = $("#pos_func").val();
	red_func = $("#red_func").val();
	green_func = $("#green_func").val();
	blue_func = $("#blue_func").val();
}

function createRedDropDown(){
	var obj = $("#red_func");
	var html = "<select id ='#red_func'>";
	var funcs = getColorFunctions();
	for(var i = 0; i<funcs.length; i++){
		html += "<option>" + funcs[i].name+ " </option>";
	}
	html += "</select>";
	obj.html(html);
}

function createGreenDropDown(){
	var obj = $("#green_func");
	var html = "<select id ='#green_func'>";
	var funcs = getColorFunctions();
	for(var i = 0; i<funcs.length; i++){
		html += "<option>" + funcs[i].name+ " </option>";
	}
	html += "</select>";
	obj.html(html);
}

function createBlueDropDown(){
	var obj = $("#blue_func");
	var html = "<select id ='#blue_func'>";
	var funcs = getColorFunctions();
	for(var i = 0; i<funcs.length; i++){
		html += "<option>" + funcs[i].name+ " </option>";
	}
	html += "</select>";
	obj.html(html);
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
     	var rgb = getColorWithFunctionsRGB(x,y,window[red_func], window[green_func], window[blue_func]);
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
	//setTimeout(init, 1000);
	context.putImageData(imageData, 0, 0);
}








