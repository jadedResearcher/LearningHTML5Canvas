//knows how to draw itself, and whether it is dirt or air.
function Plant(x,y,root, connectedToRoot, parent,canvas,context,block_size){
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.context = context;
    this.size = block_size;
    this.root = root;
    this.age = 0;
    this.dead = false;
    this.connectedToRoot = connectedToRoot;//true if i am a root, or my parents connectedToRoot is true
    this.parent = parent; //this will be null if i am a root
    this.greenColor = null;
    
    this.componentToHex = function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    this.createHex = function(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    
    this.randomGreen = function(){
        var red = Math.floor(Math.random()*255);
        var green = Math.floor(Math.random()*255 + 0); //make mostly green if plant metaphor
        var blue = Math.floor(Math.random()*255);
        return this.createHex(red, green, blue);
    }
    
    this.getColor = function(){
        if(this.parent == null){
            this.greenColor = this.randomGreen();
        }
        if(this.root == true){
            return "#000000";//make light brown if plant metaphor
        }else{
            //if i am a root, set my green color
            //otherwise, use parents green color
            if(this.greenColor == null){
                this.greenColor = parent.greenColor;
            }
            return this.greenColor;
        }
    }
    
    
    
    
    this.render = function(){
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
        console.log("dead");
        this.dead = true; //my tile will take care of pruning me
        this.connectedToRoot = false; //cant be connected if dead
    }
    
    
    this.tick = function(){
        if(this.root == false){
            this.connectedToRoot = this.parent.connectedToRoot;
        }
        if(this.connectedToRoot == false){
            this.die();
        }

    }
}