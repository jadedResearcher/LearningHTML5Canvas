var last_angle = 0;
var num_rings = 0;
var last_line_segment_number = 0;
var stable_rand_1;
var stable_rand_2;
var position_array;

function initPosition(){
	last_angle = 0;
	num_rings = 0;
	last_line_segment_number = 0;
	stable_rand_1 = Math.random()*100;
	stable_rand_2 = Math.random()*100;
	position_array = [];
}
function randomPosFunction(){
	var funcs = getPositionFunctions()
	var index = Math.floor(Math.random() * funcs.length);
	return funcs[index];
}

function getPositionFunctions(){
	return [randomWalk,randomSpirograph,randomWalkXSpread,donut,daisy,spirograph,mosaicHorizontalLines,fullMosaicSpiral,mosaicSquareSpiral,squareSpiral,swirly,spiralDoodle,rings,sunburstSprial,uLines, u2Lines,xSpiral, tSpiral, pieSpiral, sinWaves, cosWaves,mosaicSpiral, tightSpiral,randCoord, smoothRandCoord,horizontalLines,verticalLines,  mosaicVerticalLines ];
}

function randomWalk(){
	//turn position_array into a matrix of width/size elements by height/size elements.
	if(position_array.length == 0){
		initPositionMatrix();
		position_array[0][0] = "active";
		return [0,0];
	}
	//find a cell that is occupied and has at least one empty neighbor.
	//fill that neighbor
	return findEmptyCellWithFilledNeighbor();
}

function initPositionMatrix(){
	position_array = new Array(Math.floor(canvas.height/size));
	for(var i = 0; i<position_array.length; i++){
		position_array[i] = new Array(Math.floor(canvas.width/size));
		for(var j= 0; j<position_array[i].length; j++){
			position_array[i][j] = "empty";
		}
	}
}

function findEmptyCellWithFilledNeighbor(){
	var saved_value = [canvas.height*2, canvas.height*2]; //useful if randomness means i never choose a valid location
	for(var i = 0; i<position_array.length; i++){
		for(var j= 0; j<position_array[i].length; j++){
			if(position_array[i][j]  == "active"){ //don't always pick the first one
				var possible = searchForEmptyNeighbors(i,j);
				if(possible){
					//console.log("found an empty neighbor: " + possible);
					saved_value = [possible[0]*size, possible[1]*size];
					if(Math.random()*100 > 98){
						position_array[possible[0]][possible[1]] = "active";
						return saved_value;
					}
				}else{
					position_array[i][j]  = "dead"
				}
			}
		}
	}
	return saved_value;
}

function searchForEmptyNeighbors(i,j){
	var arr = [look1,look2,look3,look4];
	//pick the order to do them in randomly.
	
	
	for(var k= 0; k<4; k++){
		var index = Math.floor(Math.random() * arr.length);
		var results = arr[index](i,j);
		arr.splice(index,1); //remove from array
		if(results){
			return results;
		}
	}
	return;
}

function look1(i,j){
	if(i<position_array.length-1 && j<position_array[0].length-1 && position_array[i+1][j+1]=="empty"){
		return [i+1,j+1];
	}
}

function look2(i,j){
	if(i > 0 && j<position_array[0].length-1 && position_array[i-1][j+1]=="empty"){
		return [i-1,j+1];
	}
}

function look3(i,j){
	if(i > 0 && j > 0 && position_array[i-1][j-1]=="empty"){
		return [i-1,j-1];
	}
}

function look4(i,j){
		if(i<position_array.length-1 && j > 0 && position_array[i+1][j-1]=="empty"){
		return [i+1,j-1];
	}
}

function randomWalkXSpread(){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var ret;
	var amount_x = Math.random()*size*7;
	var amount_y = Math.random()*size*7;
	if(position_array.length == 0){
		ret = [origin_x,origin_y];
	}else if(position_array.length < 25 && position_array.length % 4 == 0 ){  //seeding
		ret = [origin_x + amount_x,origin_y+amount_y];
	}else if(position_array.length < 25 && position_array.length % 4 == 3 ){
		ret = [origin_x - amount_x,origin_y+amount_y];
	}else if(position_array.length < 25 && position_array.length % 4 == 1 ){
		ret = [origin_x + amount_x,origin_y-amount_y];
	}else if(position_array.length < 25 && position_array.length % 4 == 2 ){
		ret = [origin_x - amount_x,origin_y-amount_y];
	}else{
		//otherwise, pick a random shape in the latter half of the array, and put a new shape there, based on which quadrent it is in.
		var index = Math.floor(Math.random() * position_array.length/2);  //index is one of the last half
		//console.log("index is: " + index + " from end, length is: " + position_array.length);
		var last = position_array[position_array.length - index-1];
		//console.log("last is: " + last);

	
		if(last[0] > origin_x && last[1] > origin_y){  //lower right
			ret = [last[0]+amount_x, last[1]+amount_y];
		}else if(last[0] > origin_x && last[1] < origin_y){ //upper right
			ret = [last[0]+amount_x, last[1]-amount_y];
		}else if(last[0] < origin_x && last[1] < origin_y){  //upper left
			ret = [last[0]-amount_x, last[1]-amount_y];
		}else if(last[0] < origin_x && last[1] > origin_y){  //lower left
			ret = [last[0]-amount_x, last[1]+amount_y];
		}
	}
	//console.log("ret is: " + ret);
	position_array.push(ret);
	return ret;
}

function randomSpirograph()
{
	var outer_r = Math.min(canvas.height, canvas.width)/4;
    //return spiro_update(null, 80, 100, 360*5)
    //return spiro_update(null, 80, 20.5, 360*5)
    //return spiro_update(null, 80, 17/3, 360*3)
    return spiro_update(null, stable_rand_1, stable_rand_2, 360*6)
}

function spiro_update(outer_r, inner_r, alpha, max_angle){
	if (null == outer_r)
	    outer_r = Math.min(canvas.height, canvas.width)/4;
	if (null == max_angle)
    	max_angle = 10*360
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var angle = last_angle + size/(inner_r* alpha)   *180/Math.PI *2;
	last_angle = angle;
	
	if(last_angle > max_angle){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var angle = toRadians(angle);
	//console.log([outer_r, inner_r, alpha, max_angle, angle, origin_x, origin_y])
	var x = outer_r * Math.cos(angle) + inner_r * Math.cos(alpha * angle) + origin_x;
	var y = outer_r * Math.sin(angle) + inner_r * Math.sin(alpha * angle) + origin_y;
	return [x,y];
}

function donut(){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var outer_r = Math.min(canvas.height, canvas.width)/4;
	var inner_r = 80;
	var alpha = 20.5;
	var angle = last_angle + 0.4;
	last_angle = angle;
	if(last_angle > 360*5){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var angle = toRadians(angle);
	var x = outer_r * Math.cos(angle) + inner_r * Math.cos(alpha * angle) + origin_x;
	var y = outer_r * Math.sin(angle) + inner_r * Math.sin(alpha * angle) + origin_y;
	return [x,y];
}

function daisy(){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var outer_r = Math.min(canvas.height, canvas.width)/4;
	var inner_r = 15;
	var alpha = 7;
	var angle = last_angle + 0.4;
	last_angle = angle;
	if(last_angle > 360){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var angle = toRadians(angle);
	var x = outer_r * Math.cos(angle) + inner_r * Math.cos(alpha * angle) + origin_x;
	var y = outer_r * Math.sin(angle) + inner_r * Math.sin(alpha * angle) + origin_y;
	return [x,y];
}

function spirograph(){
	//from https://en.wikipedia.org/wiki/Spirograph
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	//first, need to calculate angle.
	var angle = last_angle + 0.4;
	last_angle = angle;
	if(last_angle > 360){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}

	var angle = toRadians(angle);
	var big_r = Math.min(canvas.height, canvas.width);
	var small_r = big_r/10;
	var p = small_r -10;
	var k = small_r/big_r;
	var l = p/small_r;
	
	var x = (1-k)*Math.cos(angle) + l * k + Math.cos(((1-k)/(k))*angle);
	var y = (1-k)*Math.sin(angle) + l * k + Math.sin(((1-k)/(k))*angle);
	var x = Math.min((100 * x) + origin_x , canvas.width);
	var y = Math.min((100 * y) + origin_y, canvas.height);
	return [x,y]; 
}

function smoothRandCoord(x0, y0){
	var  max_val_x = canvas.width;
	var  max_val_y = canvas.height;
    var amount_x = Math.random()*size;
    var direction_x = Math.random()*100;
    if(direction_x > 50){
    	amount_x = amount_x * -1;
    }
    var x = x0 + amount_x;
    //don't let it go off screen too much
    if(x < max_val_x && x > 0){
    }else{
    	x = Math.random() * max_val_x;
    }
    
    var amount_y = Math.random()*size;
    var direction_y = Math.random()*100;
    if(direction_y > 50){
    	amount_y = amount_y * -1;
    }
    var y = y0 + amount_y;
    //don't let it go off screen too much
    if(y < max_val_y && y > 0){
    }else{
    	y = Math.random() * max_val_y;
    }
    return [x,y];
}

function distance(x,x1,y,y1){
	return Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2));
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function tightSpiral(x0,y0){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	//console.log("Origin x is: " + origin_x);
	//start at center.
	if(x0 == 0 && y0 == 0){
		num_rings = 1;
		return [origin_x, origin_y];
	}
	
	//a spiral is defined as being like a circle, but expanding.
	//so, given an origin at width/2, height/2
	//the next point should be size (of a rect) further away from the origin
	//BUT, I also need to know the angle...global var?
	var radius = distance(x0, origin_x, y0, origin_y) + size/(2*num_rings);
	//console.log("x0 is " +x0 + " y0 is: " + y0 + " and radius is: " + radius);
	var angle = last_angle + (50*size)/(num_rings);
	last_angle = angle;
	var x = radius * Math.cos(toRadians(angle)) + origin_x; //0,0 is not center
	var y = radius * Math.sin(toRadians(angle)) + origin_y;
	//console.log("angle is " + angle + " and x is: " + x);
	if(x > origin_x - size && x  < origin_x + size){
		num_rings ++;
	}
	return [x,y];
}

//from bob
function mosaicSpiral(){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var t = child_count +1;
	var theta = Math.sqrt(t) * 3.5;
	var r = theta*(size*1.4)/(2*Math.PI);
	var x = r*Math.cos(theta) + origin_y;
	var y = r*Math.sin(theta) + origin_x;
	return [x,y];
}

function sunburstSprial(){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var t = child_count +1;
	var theta = t/25 * 2 * Math.PI * 1.05;
	var r = t/25*size;
	var x = r*Math.cos(theta) + origin_y;
	var y = r*Math.sin(theta) + origin_x;
	return [x,y];
}

function spiralDoodle(){
	var origin_x = canvas.width/2;
	var max_x = canvas.width;
	var  origin_y = canvas.height/2;
	var min_distance = Math.min((canvas.height - origin_y), (canvas.width - origin_x));
	var num_rings = Math.floor(min_distance/size)-1;
	var t = child_count +1;
	var a = Math.floor(t/num_rings);
	var b = (t%num_rings);
	var num_arms = 75;
	if(last_angle > 3*Math.PI){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var theta = a/num_arms * 2 * Math.PI +b/(22);
	last_angle = theta;
	var r =b*size;
	var x = r*Math.cos(theta) + origin_x;
	var y = r*Math.sin(theta) + origin_y;

	return [x,y];
}

//pick a point touching (within size) of the old point. NOT random, predictable. 
function fullMosaicSpiral(x0,y0){
	var center_x = canvas.width/2;
	var center_y = canvas.height/2;
	var t = child_count + 1;
	var x = 0;
	var y = 0;
	//can go up, down, left and right,basic square
	if(t % 4 == 3 && y0 >= 0){  //up
		x = x0;
		y = y0 - size*2;
	}else if(t % 4 == 1 && y0 <= canvas.height){ //down
		x = x0;
		y = y0 + size*2;
	}else if(t % 4 == 0 && x0 >= 0){ //left
		x = x0 - size*2;
		y = y0;
	}else if(t % 4 == 2 && x0 <= canvas.width){ //right
		x = x0 + size*2;
		y = y0;
	}
	
	var gap_multiplier = 2;
	//assume square
	var max_unit_width = Math.floor(Math.min(canvas.height, canvas.width)/size/gap_multiplier); //how many shapes in the first line segment?
	//console.log("Max unit width: " + max_unit_width);
	var t = child_count +1;
	var gap = size*gap_multiplier; //distance between spirals
	//which line segment am I on? (each line segment is  max_unit_width - (line_segment-1)*gap
	var line_seg_num = Math.floor((t)/(max_unit_width- (last_line_segment_number/gap_multiplier))) ;
	last_line_segment_number = line_seg_num;
	
	//if line segment % 4 is 0, top
	if(line_seg_num%4 == 0){
		return topSpiral(x,y,gap);
	}else if(line_seg_num%4 == 1){ //right
		return rightSpiral(x,y,gap);
	}else if(line_seg_num%4 == 2){ //bottom
		return bottomSpiral(x,y,gap);
	}else if(line_seg_num%4 == 3){ //left
		return leftSpiral(x,y,gap);
	}
	return [canvas.height*2,y];
}


//want this to make a picture frame.
function mosaicSquareSpiral(x0,y0){
	var gap_multiplier = 2;
	//assume square
	var max_unit_width = Math.floor(Math.min(canvas.height, canvas.width)/size/gap_multiplier); //how many shapes in the first line segment?
	//console.log("Max unit width: " + max_unit_width);
	var t = child_count +1;
	var gap = size*gap_multiplier; //distance between spirals
	//which line segment am I on? (each line segment is  max_unit_width - (line_segment-1)*gap
	var line_seg_num = Math.floor((t)/(max_unit_width- (last_line_segment_number/gap_multiplier))) ;
	last_line_segment_number = line_seg_num;
	
	//if line segment % 4 is 0, top
	if(line_seg_num%4 == 0){
		return topSpiral(x0,y0,gap);
	}else if(line_seg_num%4 == 1){ //right
		return rightSpiral(x0,y0,gap);
	}else if(line_seg_num%4 == 2){ //bottom
		return bottomSpiral(x0,y0,gap);
	}else if(line_seg_num%4 == 3){ //left
		return leftSpiral(x0,y0,gap);
	}
	return [canvas.height*2,y];
}

function squareSpiral(x0,y0){
	var gap_multiplier = 1;
	//assume square
	var max_unit_width = Math.floor(Math.min(canvas.height, canvas.width)/size/gap_multiplier); //how many shapes in the first line segment?
	//console.log("Max unit width: " + max_unit_width);
	var t = child_count +1;
	var gap = size*gap_multiplier; //distance between spirals
	//which line segment am I on? (each line segment is  max_unit_width - (line_segment-1)*gap
	var line_seg_num = Math.floor((t)/(max_unit_width- (last_line_segment_number/gap_multiplier))) ;
	last_line_segment_number = line_seg_num;
	
	//if line segment % 4 is 0, top
	if(line_seg_num%4 == 0){
		return topSpiral(x0,y0,gap);
	}else if(line_seg_num%4 == 1){ //right
		return rightSpiral(x0,y0,gap);
	}else if(line_seg_num%4 == 2){ //bottom
		return bottomSpiral(x0,y0,gap);
	}else if(line_seg_num%4 == 3){ //left
		return leftSpiral(x0,y0,gap);
	}
	return [canvas.height*2,y];
}

function topSpiral(x0,y0,gap){
	return [x0+gap, y0];
}

function rightSpiral(x0,y0,gap){
	return [x0, y0+gap];
}

function bottomSpiral(x0,y0,gap){
	return [x0-gap, y0];
}

function leftSpiral(x0,y0,gap){
	return [x0, y0-gap];
}


function weirdFrame(x0,y0){
	var min_distance = Math.min(canvas.height, canvas.width);
	var num_rings = Math.floor(min_distance/size)-1;
	var t = child_count +1;
	var a = Math.floor(t/num_rings);
	var b = (t%num_rings);
	var num_arms = 25 + (t % num_rings);
	if(last_angle > 3*Math.PI){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var theta = (a/num_arms * 2 * Math.PI +b/(22));
	last_angle = theta;
	var r =b*size*2;
	var x = r*Math.cos(theta);
	var y = r*Math.sin(theta);
	if(x > canvas.width || x < 0){
		x = x0;
	}
	
	if(y > canvas.height || y < 0){
		y = y0;
	}
	return [x,y];
}

function swirly(){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	var min_distance = Math.min((canvas.height - origin_y), (canvas.width - origin_x));
	var num_rings = Math.floor(min_distance/size)-1;
	var t = child_count +1;
	var a = Math.floor(t/num_rings);
	var b = (t%num_rings);
	var num_arms = 25 + (t % num_rings);
	if(last_angle > 4*Math.PI){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var theta = a/num_arms * 2 * Math.PI +b/(22);
	last_angle = theta;
	var r =b*size;
	var x = r*Math.cos(theta) + origin_x;
	var y = r*Math.sin(theta) + origin_y;
	return [x,y];
}

function rings(){
	var origin_x = canvas.width/2;
	var max_x = canvas.width;
	var  origin_y = canvas.height/2;
	var min_distance = Math.min((canvas.height - origin_y), (canvas.width - origin_x));
	var num_rings = Math.floor(min_distance/size)-1;
	var t = child_count +1;
	var a = Math.floor(t/num_rings);
	var b = (t%num_rings);
	var num_arms = 25;
	if(last_angle > 3*Math.PI){
		return [canvas.height*2, canvas.width*2]; //time to stop
	}
	var theta = a/num_arms * 2 * Math.PI * 1.05;
	last_angle = theta;
	var r =b*size;
	var x = r*Math.cos(theta) + origin_x;
	var y = r*Math.sin(theta) + origin_y;

	return [x,y];
}

function xSpiral(x0,y0){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	//console.log("Origin x is: " + origin_x);
	//start at center.
	if(x0 == 0 && y0 == 0){
		return [origin_x, origin_y];
	}

	var radius = distance(x0, origin_x, y0, origin_y) + size/(2);
	//console.log("x0 is " +x0 + " y0 is: " + y0 + " and radius is: " + radius);
	var angle = last_angle + 90;
	last_angle = angle;
	var x = radius * Math.cos(toRadians(angle)) + origin_x; //0,0 is not center
	var y = radius * Math.sin(toRadians(angle)) + origin_y;
	return [x,y];
}

function tSpiral(x0,y0){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	//console.log("Origin x is: " + origin_x);
	//start at center.
	if(x0 == 0 && y0 == 0){
		return [origin_x, origin_y];
	}

	var radius = distance(x0, origin_x, y0, origin_y) + size/(2);
	//console.log("x0 is " +x0 + " y0 is: " + y0 + " and radius is: " + radius);
	var angle = last_angle + 60;
	last_angle = angle;
	var x = radius * Math.cos(toRadians(angle)) + origin_x; //0,0 is not center
	var y = radius * Math.sin(toRadians(angle)) + origin_y;
	return [x,y];
}


function pieSpiral(x0,y0){
	var origin_x = canvas.width/2;
	var  origin_y = canvas.height/2;
	//console.log("Origin x is: " + origin_x);
	//start at center.
	if(x0 == 0 && y0 == 0){
		return [origin_x, origin_y];
	}

	var radius = distance(x0, origin_x, y0, origin_y) + size/(2);
	//console.log("x0 is " +x0 + " y0 is: " + y0 + " and radius is: " + radius);
	var angle = last_angle + 45;
	last_angle = angle;
	var x = radius * Math.cos(toRadians(angle)) + origin_x; //0,0 is not center
	var y = radius * Math.sin(toRadians(angle)) + origin_y;
	return [x,y];
}

function randCoord(){
	var  max_val_x = canvas.width;
	var  max_val_y = canvas.height;
	x = Math.random() * max_val_x;	
	y =  Math.random() * max_val_y;
	return [x,y];
}

function horizontalLines(x0,y0){
	var amount = Math.random()*size;
	var w = canvas.width;
	var x = x0 + amount;
	var y = y0;
	if(x > w){
		x = 0;
		y = y0 + amount;
	}
	return [x,y];	
}


function mosaicHorizontalLines(x0,y0){
	var amount = size/2 + size;
	var w = canvas.width;
	var x = x0 + amount;
	var y = y0;
	if(x > w){
		x = 0;
		y = y0 + amount;
	}
	return [x,y];	
}


function uLines(){
	var t = child_count +1;
	var origin_x = canvas.width/2;
	var max_y = canvas.height;
	var max_x = canvas.width;
	var  origin_y = canvas.height/2;
	var y = size*Math.pow(t,2)+size;
	var x = (size*t + size);
	var row = Math.floor(y/max_y);
	y = y % max_y;
	x = x + 0.5* row*size;
	x = x % max_x;
	return [x,y];
}

function u2Lines(){
	var t = child_count +1;
	var origin_x = canvas.width/2;
	var max_y = canvas.height;
	var max_x = canvas.width;
	var  origin_y = canvas.height/2;
	var y = size*Math.pow(t,3)+size;
	var x = (size*t + size);
	var row = Math.floor(y/max_y);
	y = y % max_y;
	x = x + 0.5* row*size;
	x = x % max_x;
	return [x,y];
}

function mosaicVerticalLines(x0,y0){
	var amount = size/2+size;
	var h = canvas.height;
	var y = y0 + amount;
	var x = x0;
	if(y > h){
		y = 0;
		x = x0 + amount;
	}
	return [x,y];
}


function sinWaves(x0,y0){
	var t = child_count +1;
	var origin_x = canvas.width/2;
	var max_x = canvas.width;
	var  origin_y = canvas.height/2;
	var y = size*Math.sin(t)+size;
	var x = (size*t + size);
	var row = Math.floor(x/max_x);
	x = x % max_x;
	y = y + row*size;
	return [x,y];
}

function cosWaves(x0,y0){
	var t = child_count +1;
	var origin_x = canvas.width/2;
	var max_x = canvas.width;
	var  origin_y = canvas.height/2;
	var y = size*Math.cos(t)+size;
	var x = (size*t + size);
	var row = Math.floor(x/max_x);
	x = x % max_x;
	y = y + row*size;
	return [x,y];
}



function verticalLines(x0,y0){
	var amount = Math.random()*size;
	var h = canvas.height;
	var y = y0 + amount;
	var x = x0;
	if(y > h){
		y = 0;
		x = x0 + amount;
	}
	return [x,y];	
}
