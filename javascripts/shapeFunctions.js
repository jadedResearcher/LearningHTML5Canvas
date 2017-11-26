var text = getRandomText();

function randomShape(){
    var funcs = getShapeFunctions();
    var index = Math.floor(Math.random() * funcs.length);
    return funcs[index];
}

//each new shape is different
function superRandom(x,y,color){
    var funcs = [emptyDiamond,emptySquareRotate, emptySquare, emptyCircle,textShape, quadCurve, downDiagonalStroke, upDiagonalStroke, square, diamond, circle,randomStroke,quadCurveStroke,quadCurveRotate, squareRotate,randomStrokeRotate,quadCurveStrokeRotate,textShape];
    var index = Math.floor(Math.random() * funcs.length);
    funcs[index](x,y,color);
}

function getShapeFunctions(){
	return [circle,emptyDiamond,emptySquareRotate,emptySquare, emptyCircle,textShape, superRandom,quadCurve, downDiagonalStroke, upDiagonalStroke, square, diamond,randomStroke,quadCurveStroke,quadCurveRotate, squareRotate,randomStrokeRotate,quadCurveStrokeRotate];
}

function downDiagonalStroke(x,y,color){
    context.moveTo(x,y);
    context.lineTo(x+size,y+size);
    context.strokeStyle=color;
    context.stroke();
}

function upDiagonalStroke(x,y,color){
    context.moveTo(x,y);
    context.lineTo(x+size,y-size);
    context.strokeStyle=color;
    context.stroke();
}

function randomStroke(x,y,color){
    var x1 = Math.random()*size;
    var y1 = Math.random()* size;
    context.moveTo(x,y);
    context.lineTo(x+size+x1,y-size+y1);
    context.strokeStyle=color;
    context.stroke();
}

function randomStrokeRotate(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    var i = Math.random() * 4;
    context.rotate(Math.PI/i);
    var x1 = Math.random()*size;
    var y1 = Math.random()* size;
    context.moveTo(-size/2,-size/2);
    context.lineTo(-size/2+size+x1,-size/2-size+y1);
    context.strokeStyle=color;
    context.stroke();
    context.restore();
}

function square(x,y,color){
    context.rect(x,y,size,size);
    context.fillStyle=color;
    context.fill();
}

function emptySquare(x,y,color){
	context.lineWidth = Math.ceil(size/4);
	context.rect(x,y,size,size);
	context.strokeStyle=color;
    context.stroke();
}

function getRandomText(x,y,color){
    var possibilities = ["KR","Get Well Soon!","Feel Better!","KR is a best.", "KR is a cool.", "KR c3< JR","Plz dont ban me.","You gave me my rank and began my rise to Power you buff badass motherfucker.","Your hammer strikes fear and love into everyone's heart!","You bring joy in one hand and memes in the other!","KR is amazing! "]
    if(!krMode){
        return "bluh";
    }
    text = possibilities[Math.floor(Math.random()*possibilities.length)];
    return text;

}

function textShape(x,y,color){
    	text = getRandomText(); //finishText iwll be called async
    	finishText(x,y,color);
}

function finishText(x,y,color){
	context.fillStyle=color;
    context.strokeStyle=black;
    context.font = size+"px Arial";
	context.fillText(text,x,y);
    //context.strokeText(text,x,y);
}

function squareRotate(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    var i = Math.random() * 4;
    context.rotate(Math.PI/i);
    context.fillStyle=color;
    context.fillRect(-size/2, -size/2, size, size); //new origin is shapes center
    context.restore();
}

function emptySquareRotate(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    var i = Math.random() * 4;
    context.rotate(Math.PI/i);
    context.lineWidth = Math.ceil(size/4);
    context.strokeStyle=color;
	context.strokeRect(-size/2, -size/2, size, size); //new origin is shapes center
    context.restore();
}

function diamond(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    context.rotate(Math.PI/4);
    context.fillStyle=color;
    context.fillRect(0, 0, size, size); //new origin is shapes center
    context.restore();
}

function emptyDiamond(x,y,color){
	var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    context.rotate(Math.PI/4);
    context.lineWidth = Math.ceil(size/4);
    context.strokeStyle=color;
	context.strokeRect(-size/2, -size/2, size, size); //new origin is shapes center
    context.restore();
}

function circle(x,y,color){
    context.arc(x,y,size/2,0,2*Math.PI);
    context.fillStyle=color;
    context.fill();
}

function emptyCircle(x,y,color){
	context.lineWidth = Math.ceil(size/4);
	context.arc(x,y,size/2,0,2*Math.PI);
    context.strokeStyle=color;
    context.stroke();

}

function quadCurve(x,y,color){
    context.moveTo(x,y);
    context.quadraticCurveTo(x+size/2,y+size,x+size,y+size/2);
    context.fillStyle=color;
    context.fill();
}

function quadCurveRotate(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    var i = Math.random() * 4;
    context.rotate(Math.PI/i);
    context.moveTo(-size/2,-size/2);
    context.quadraticCurveTo(size/2,size+size/2,size+size/2,size/2);
    context.fillStyle=color;
    context.fill();
    context.restore();
}

function quadCurveStroke(x,y,color){
    context.moveTo(x,y);
    context.quadraticCurveTo(x+size/2,y+size,x+size,y+size/2);
    context.strokeStyle=color;
    context.stroke();
}

function quadCurveStrokeRotate(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    var i = Math.random() * 4;
    context.rotate(Math.PI/i);
    context.moveTo(-size/2,-size/2);
    context.quadraticCurveTo(size/2,size+size/2,size+size/2,size/2);
    context.strokeStyle=color;
    context.stroke();
    context.restore();
}

function randQuadCurve(x,y,color){
    var x1 = Math.random()*size;
    var y1 = Math.random()* size;
    context.moveTo(x,y);
    context.quadraticCurveTo(x+x1,y+size,x+size,y+y1);
    context.fillStyle=color;
    context.fill();
}



function randQuadCurveRotate(x,y,color){
    var x2 = x+ size/2;
    var y2 = y + size/2;
    context.save();
    context.translate(x, y);
    var i = Math.random() * 4;
    context.rotate(Math.PI/i);
    var x1 = Math.random()*size;
    var y1 = Math.random()* size;
    context.moveTo(-size/2,-size/2);
    context.quadraticCurveTo(size/2+x1,size/2+size,size/2+size,size/2+y1);
    context.fillStyle=color;
    context.fill();
    context.restore();
}
