//knows how to draw itself, and whether it is dirt or air.
function PlantTile(x,y,dirt, canvas,context,block_size){
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.context = context;
    this.size = block_size;
    this.dirt = dirt;
    this.plant = null;
    
    this.getColor = function(){
        if(this.dirt == true){
            return "#bc7535"; //make brown if you want it to be a plant metaphor
        }else{
            return "#000000";
        }
    }
    
    this.render = function(){
        this.context.fillStyle="#0000ff";
        var color = this.getColor();
        this.context.fillStyle=color;
        this.context.strokeStyle="#000000"
        this.context.strokeRect(this.x,this.y,this.size,this.size);
        this.context.fillRect(this.x,this.y,this.size,this.size);
        if(this.plant != null){
            this.plant.render();
        }
    }
    
    this.tick = function(){
        if(this.plant != null){
            this.plant.tick();
            if(this.plant.dead){
                this.plant = null;
            }
        }
        
    }
}