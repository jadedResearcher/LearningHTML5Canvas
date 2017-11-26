//knows how to draw itself, and whether it is dirt or air.
function Plant(x,y,connectedToRoot, parent,canvas,context,block_size){
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.context = context;
    this.size = block_size;
    this.age = 0;
    this.dead = false;
    this.connectedToRoot = connectedToRoot;//true if i am a root, or my parents connectedToRoot is true
    this.parent = parent; //this will be null if i am a root
    //blood color is 0 - 12 (can turn into hex with method)
    this.bloodColor = null;
    
    this.componentToHex = function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    this.createHex = function(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    this.bloodColorToHex = function(bloodColor){
        var hexArray = ["#a10000","#a15000","#a1a100","#416600","#008141","#008282","#005682","#000056","#2b0057","#6a006a","#77003c","#ff0000",];
        return hexArray[bloodColor];
    }

    //13 possible blood colors, higher the color, rarer it is
    this.randomBlood = function(){
        var bloodArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,10,10,10,11];
        var i =  Math.floor(Math.random()*bloodArray.length);
        return bloodArray[i];
    }
    
    //13 possible colors, based on hemospectrum.
    this.getColor = function(){
        if(this.parent == null && this.bloodColor == null){
            this.bloodColor = this.randomBlood();
        }
        if(this.bloodColor == null){
            this.bloodColor = parent.bloodColor;
        }
        return this.bloodColorToHex(this.bloodColor);
    }
    
    // render to buffer Context, and then at very end render to real context
    this.render = function(){
        //console.log("context is: " + this.context);
        var color = this.getColor();
        if(this.parent != null){
            this.context.beginPath();
            this.context.strokeStyle=color
            this.context.lineWidth = Math.ceil(this.size/2);
            //move to parent's center
            var px = this.parent.x ;
            var py = this.parent.y ;
            this.context.moveTo(px,py);
            //draw line to my x and y;
            //if i can't even make this one work, then curve won't match up either
            this.context.lineTo(this.x,this.y);
            //if i want this to be in the center, need to know if add or subtract?
            //why does it sometimes look fine and othertimes does not?
            //this.context.quadraticCurveTo(cx,cy,this.x,this.y);
            this.context.stroke();
            //also draw two leaves (how to tell where to draw?)
            this.context.fillStyle=color;
            this.context.beginPath();
            context.arc(x,y,this.size/4, 0, 2*Math.PI);
            this.context.fill();
        }else{
            this.context.beginPath();
            this.context.fillStyle=color;
            this.context.fillRect(this.x,this.y,this.size,this.size);
        }
        
    }
    
    this.die = function(){
        var rootShouldDie = this.endOfLifespan();
        //console.log("dead blood color is: " + this.bloodColor );
        //TODO so much cludge, why am i sometimes killing a root who hasn't reached the end of it's lifespan?
        if(this.parent == null && rootShouldDie == false){
            return null;
        }
        if(this.parent == null && rootShouldDie == false){
            console.log("THIS SHOULD NOT HAPPEN!!!!!!!!!!! A root is dying: but end of lifespan is:  " + rootShouldDie );
            this.connectedToRoot = true;//cause i am a root
        }else{
            this.dead = true; //my tile will take care of pruning me
            this.connectedToRoot = false; //cant be connected if dead
        }
    }

    //the cooler your blood, the longer you live, return true or false;
    this.endOfLifespan = function(){
        this.getColor();
        return calcEndOfLifeSpanFromBlood(this.bloodColor, this.age);
    }

    this.tick = function(){
        this.age += 1;
        if(this.parent != null){
            this.connectedToRoot = this.parent.connectedToRoot;
        }
        if(this.connectedToRoot == false && this.parent != null){
            this.die();
        }

    }
}

//useful for testing outside of simulation
function calcEndOfLifeSpanFromBlood(bloodInt, age){
    var num = Math.pow(bloodInt, 1)*40+200;
   // console.log("num is: " + num);
    if(age > num) {
        return true;
    }
    return false;
}