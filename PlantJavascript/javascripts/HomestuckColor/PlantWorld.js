//knows about all the plant tiles in the world calls render on them

function PlantWorld(canvas,context, block_size, buffer_canvas, buffer_context){
    this.canvas = canvas;
    this.context = context;
    this.buffer_canvas = buffer_canvas;
    this.buffer_context = buffer_context;
    this.block_size = block_size;

    this.copyBufferCanvasToRealCanvas = function(){
        //console.log("copying buffer" + this.buffer_context);
        //if this line is commented out, then colors draw on white screen, else black screen, no colors
    	this.context.drawImage(this.buffer_canvas, 0, 0);
    }
    
    this.initWorld = function(){
        var tile_array = new Array(Math.floor(canvas.height/this.block_size));
        for(var i = 0; i<tile_array.length; i++){
            tile_array[i] = new Array(Math.floor(canvas.width/this.block_size));

            for(var j= 0; j<tile_array[i].length; j++){
                var dirt = false; //stable for a row
                var p = false;
                if(Math.random()*100 > 98){
                    dirt = true;
                    if(Math.random()*100 > 90){
                        p = true;
                    }
                }
                var x = j * block_size;
                var y = i * block_size;
                tile_array[i][j] = new PlantTile(x,y,dirt,this.buffer_canvas, this.buffer_context, block_size);
                //add a root to the dirt
                if(p == true){
                    tile_array[i][j].plant = new Plant(x,y, true, null,this.buffer_canvas,this.buffer_context,block_size);
                    tile_array[i][j].plant.age = j + Math.floor(Math.random()*100);
                }
            }
        }
        //commit all renders to real canvas
        return tile_array;
    };
    
    this.world = this.initWorld();
    
    //if the tile has a plant in it, it can spread.
    this.spread = function(i,j){
        var spread_one = false;
        var tile = this.world[i][j];
        if(tile.plant != null && Math.random()*100 > 50){
            var arr = [this.spread1, this.spread2, this.spread3, this.spread4];
            for(var k= 0; k<4; k++){
                var index = Math.floor(Math.random() * arr.length);
                spread_one = arr[index](this,tile,spread_one,i,j);
                arr.splice(index,1); //remove from array
                if(spread_one = true){
                    return;
                }
            }
            
        }
    }

    this.spread1 = function(me,tile,spread_one,i,j){
        if(j<me.world[0].length-1 && !spread_one){
            var a = me.world[i][j+1];
            return me.spreadHelper(me, tile, spread_one, a);
        }
        return spread_one;
    }
    
    this.spread2 = function(me,tile,spread_one,i,j){
        if(i<me.world.length-1 && !spread_one){
            var a = me.world[i+1][j];
            return me.spreadHelper(me, tile, spread_one, a);
        }
        return spread_one;
    }
    
    this.spread3 = function(me,tile,spread_one,i,j){
        if(j>0 && !spread_one){
            var a = me.world[i][j-1];
            return me.spreadHelper(me, tile, spread_one, a);
        }
        return spread_one;
    }
    
    this.spread4 = function(me,tile,spread_one,i,j){
        if(i>0 && !spread_one){
            var a = me.world[i-1][j];
            return me.spreadHelper(me, tile, spread_one, a);
        }
        return spread_one;
    }

    this.spreadHelper = function(me, tile, spread_one, target_tile){
        var parent = null;
        if(target_tile.dirt == false){
            parent = tile.plant;
        }
        if(target_tile.plant == null){
            target_tile.plant =new Plant(target_tile.x,target_tile.y, tile.plant.connectedToRoot, parent,me.buffer_canvas,me.buffer_context,block_size);
            spread_one = true;
        }
        return spread_one;
    }

    
    this.tick = function(me){
        var someOneDied = false; //only kill one per tick maximum
        for(var i = 0; i<me.world.length; i++){
            for(var j= 0; j<me.world[i].length; j++){
                me.world[i][j].tick();
                //now, test for spreading
                me.spread(i,j);
                // the odds of me dying should be based on my blood color
                if(someOneDied == false && me.world[i][j].plant && me.world[i][j].plant.parent == null  && me.world[i][j].plant.endOfLifespan()){
                    //console.log("dying");
                    someOneDied = true;
                    me.world[i][j].plant.die();
                }
            }
        }
        
    }
    
    //need to take me in because 'this' gets blown away if called by set timeout
    this.render = function(me){
        me.buffer_context.clearRect(0, 0, canvas.width, canvas.height);
        me.context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i<me.world.length; i++){
            for(var j= 0; j<me.world[i].length; j++){
                //me.world[i][j].tick();
                //now, test for spreading
               // me.spread(i,j);
                me.world[i][j].render();
            }
        }
        me.copyBufferCanvasToRealCanvas();
    };

}