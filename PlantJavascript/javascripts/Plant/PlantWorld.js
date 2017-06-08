//knows about all the plant tiles in the world calls render on them

function PlantWorld(canvas,context, block_size){
    this.canvas = canvas;
    this.context = context;
    this.block_size = block_size;
    
    
    this.initWorld = function(){
        var tile_array = new Array(Math.floor(canvas.height/this.block_size));
        for(var i = 0; i<tile_array.length; i++){
            tile_array[i] = new Array(Math.floor(canvas.width/this.block_size));
            var dirt_row = false; //stable for a row
            if(Math.random()*100 > 90){
                dirt_row = true;
            }
            for(var j= 0; j<tile_array[i].length; j++){
                var dirt = dirt_row;
                var p = false;
                if(Math.random()*100>98){//small chance of dirt out of rows to be opposite
                    dirt = !dirt;
                }
                if(dirt==true){
                    if(Math.random()*100 > 98){
                        p = true;
                    }
                }
                var x = j * block_size;
                var y = i * block_size;
                tile_array[i][j] = new PlantTile(x,y,dirt,canvas, context, block_size);
                //add a root to the dirt
                if(p == true){
                    tile_array[i][j].plant = new Plant(x,y,true, true, null,canvas,context,block_size);
                }
            }
        }
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
            var parent = null;
            if(!a.dirt){
                parent = tile.plant;
            }
            if(a.plant == null){
                a.plant =new Plant(a.x,a.y,a.dirt, tile.plant.connectedToRoot, parent,canvas,context,block_size);
                spread_one = true;
            }
        }
        return spread_one;
    }
    
    this.spread2 = function(me,tile,spread_one,i,j){
        if(i<me.world.length-1 && !spread_one){
            var a = me.world[i+1][j];
            var parent = null;
            if(!a.dirt){
                parent = tile.plant;
            }
            if(a.plant == null){
                a.plant =new Plant(a.x,a.y,a.dirt, tile.plant.connectedToRoot, parent,canvas,context,block_size);
                spread_one = true;
            }
        }
        return spread_one;
    }
    
    this.spread3 = function(me,tile,spread_one,i,j){
        if(j>0 && !spread_one){
            var a = me.world[i][j-1];
            var parent = null;
            if(!a.dirt){
                parent = tile.plant;
            }
            if(a.plant == null){
                a.plant =new Plant(a.x,a.y,a.dirt, tile.plant.connectedToRoot, parent,canvas,context,block_size);
                spread_one = true;
            }
        }
        return spread_one;
    }
    
    this.spread4 = function(me,tile,spread_one,i,j){
        if(i>0 && !spread_one){
            var a = me.world[i-1][j];
            var parent = null;
            if(!a.dirt){
                parent = tile.plant;
            }
            if(a.plant == null){
                a.plant =new Plant(a.x,a.y,a.dirt, tile.plant.connectedToRoot, parent,canvas,context,block_size);
                spread_one = true;
            }
        }
        return spread_one;
    }
    
    this.tick = function(me){
        for(var i = 0; i<me.world.length; i++){
            for(var j= 0; j<me.world[i].length; j++){
                me.world[i][j].tick();
                //now, test for spreading
                me.spread(i,j);
            }
        }
        
    }
    
    //need to take me in because 'this' gets blown away if called by set timeout
    this.render = function(me){
        for(var i = 0; i<me.world.length; i++){
            for(var j= 0; j<me.world[i].length; j++){
                //me.world[i][j].tick();
                //now, test for spreading
               // me.spread(i,j);
                me.world[i][j].render();
            }
        }
        
    };

}