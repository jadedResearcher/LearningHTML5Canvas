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
var krMode = true;
var multiplier = 1;
var reputation = 130000;
var num_interns = 10;
var last_rep = 0;
var shape_func = textShape;
var total_clicks = 0;
function init(){
	initPosition();
	initColor();
	lastInitTime = Date.now();
	last_rep = reputation;
	stop = false;
	size = Math.floor(Math.random()*30)+3 + 30/(1+num_interns);
	child_count = 0;
	num_r = Math.floor(Math.random()*100);
	num_g = Math.floor(Math.random()*100);
	num_b = Math.floor(Math.random()*100);
	red_func = randomPieceMealArray(num_r);
	green_func = randomPieceMealArray(num_g);
	blue_func = randomPieceMealArray(num_b);
	pos_func = randomPosFunction();
	hireIntern();
}

function removeAllChildren(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	child_count = 0;
}

function tick(){
	if(num_interns > 0){
		click();
	}
	
}

function calculateTimeout(){
	//each intern increases the speed.
	var speed =  Math.floor(5000/num_interns)-50;
	if(speed < 0){
		speed = 0;
	}
	return speed;
}

function click(){
	total_clicks ++;
	reputation += 1 * multiplier;
	evaluateReset();
	addNewSquare();
}


function updateDisplays(){
	displayReputation();
	displayInterns();
}

function displayReputation(){
	$("#reputation").html(reputation + " Reputation Obtained.");
}

function displayInterns(){
	$("#interns").html(num_interns + " Interns are working tirelessly for your glory.");
}

function evaluateReset(){
	if(!lastPositionValid() || timedOut()){
		last_x = Math.random()*canvas.width;
		last_y = Math.random()*canvas.height;
		init();
		redoTimeout();
	}
}

function redoTimeout(){
	clearInterval(timeOut);
	if(num_interns > 0){
		timeOut = setInterval(tick, calculateTimeout())
	}
}

function timedOut(){
	var time_elapsed = Date.now() - lastInitTime;
	var random_timer = Math.random()* 1200000+30000; //different random timer each time.
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
	chooseShapeBasedOnRep(x,y,color);
	shape_func(x,y,color);
	
}

function chooseShapeBasedOnRep(x,y,color){
	if(total_clicks % 1000 == 0 ){
        last_rep = reputation;
        shape_func = textShape;
	}
}










