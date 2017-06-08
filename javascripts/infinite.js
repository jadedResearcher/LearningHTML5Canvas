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
var lastInitTime;
var shape_func;
var refresh_speed = 10;

function init(){
	initPosition();
	initColor();
    shape_func = randomShape();
	lastInitTime = Date.now();
	stop = false;
	size = Math.floor(Math.random()*30)+3;
	last_x = 0;
	last_y = 0;
	child_count = 0;
	red_func = randomPieceMealArray(num_r);
	green_func = randomPieceMealArray(num_g);
	blue_func = randomPieceMealArray(num_b);
	pos_func = randomPosFunction();
	//pos_func = squareSpiral;
	tick();
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
	if(!lastPositionValid() || timedOut()){
		//console.log("ran long enough");
		stop = true;
		clearTimeout(timeOut);
		setTimeout(init, 1000)
	}
}

function timedOut(){
	var time_elapsed = Date.now() - lastInitTime;
	var random_timer = Math.random()* 30000+120000; //different random timer each time.
	return time_elapsed > random_timer;
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
	var coords = pos_func(last_x, last_y);
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
    shape_func(x,y,color);
}






