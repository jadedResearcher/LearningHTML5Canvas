SVG_NS = "http://www.w3.org/2000/svg"
var size = 3;
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

function init(){
	syncFormValues();
	stop = false;
	last_x = 0;
	last_y = 0;
	child_count = 0;
	initPosition();
	initColor();
	red_func = randomPieceMealArray(num_r);
	green_func = randomPieceMealArray(num_g);
	blue_func = randomPieceMealArray(num_b);
	
	tick();
}


function syncFormValues(){
	num_r = parseInt($("#red_num").val());
	num_g = parseInt($("#green_num").val());
	num_b = parseInt($("#blue_num").val());
	size = parseInt($("#size").val());
	pos_func = $("#pos_func").val();
	even = $("#even").prop("checked");
	$("#even").change(function(){
		even = $("#even").prop("checked");
	});
	red_func = randomPieceMealArray(num_r);
	green_func = randomPieceMealArray(num_g);
	blue_func = randomPieceMealArray(num_b);
}

function removeAllChildren(elt){
    while (elt.childNodes.length>0) {
		elt.removeChild(elt.firstChild)
    }
}

function syncFormValues(){
	num_r = parseInt($("#red_num").val());
	num_g = parseInt($("#green_num").val());
	num_b = parseInt($("#blue_num").val());
	size = parseInt($("#size").val());
	pos_func = $("#pos_func").val();
	shape_func = $("#shape_func").val();
	even = $("#even").prop("checked");
	$("#even").change(function(){
		even = $("#even").prop("checked");
	});
	red_func = randomPieceMealArray(num_r);
	green_func = randomPieceMealArray(num_g);
	blue_func = randomPieceMealArray(num_b);
}

function createPosDropDown(){
	var obj = $("#pos_func");
	var html = "<select id ='#pos_func'>";
	var funcs = getPositionFunctions();
	for(var i = 0; i<funcs.length; i++){
		html += "<option>" + funcs[i].name+ " </option>";
	}
	html += "</select>";
	obj.html(html);
}

function createShapeDropDown(){
	var obj = $("#shape_func");
	var html = "<select id ='#shape_func'>";
	var funcs = getShapeFunctions();
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

function tick(){
	evaluateReset();
	addNewSquare();
	if(!stop){
		timeOut = setTimeout(tick, refresh_speed)
	}
	
}

function evaluateReset(){
	if(!lastPositionValid()){
		//console.log("ran long enough");
		stop = true;
		clearTimeout(timeOut);
		setTimeout(init, 1000)
	}
}

function lastPositionValid(){
	var ret1 =  lastXValid();
	var ret2 = lastYValid();
	var ret = ret1 && ret2;
	return ret;
}

function lastXValid(){
	//console.log("Last x: " + last_x + " Canvas Width: " + canvas.width);
	if(last_x < 0 || last_x > canvas.width){
		return false;
	}
	
	return true;
}

function lastYValid(){
	//console.log("Last y: " + last_y + " Canvas Height: " + canvas.height + "Expressions: " + (last_y <= 0) + " and " + (last_y >= canvas.height));
	if(last_y < 0 || last_y > canvas.height){
		return false;
	}
	return true;
}

function addNewSquare(){
	var coords = window[pos_func].apply(null, [last_x, last_y]);
	x = coords[0];
	y = coords[1];
	last_x = x;
	last_y = y;
	var color = getColorWithFunctions(x,y,red_func, green_func, blue_func);
	addNewSquareAt(x,y,color);
}


function addNewSquareAt(x,y,color){
    child_count ++;
    context.beginPath();
    window[shape_func].apply(null, [x, y, color]);
}






