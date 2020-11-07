//a constructor
function door(width, height, color, x, y,move_mode) {//in case of human-stick, color=name
    this.gamearea = document.getElementById("myCanvas");
    this.move_mode=move_mode;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.boundary=[]; //boundary for movement
    this.status = "closed";// for doorsm windows and lights
    if (move_mode == "image") {//for human stick
        this.image = new Image();
        this.image.src = "human_stick.png";
        this.name=color;//set the name
        this.location="";//set the location
        this.image.onload=()=>{
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
    }
    if (move_mode == "light") {
        this.image = new Image();
        this.image.src = "off_bulb.png";
        this.name=color;//set the name
        this.image.onload=()=>{
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
    }
    if(this.move_mode=="horizontal"){//make a boundary for movement
        this.boundary=[this.x,(this.x+this.width)];//inital point + width
    }
    if(this.move_mode=="vertical"){//make a boundary for movement
        this.boundary=[this.y,(this.y+this.height)]
    }        
    this.update = function() {
        ctx = myGameArea.canvas.getContext("2d");
        if (move_mode == "light") {
            //display the human stick
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
            //display the name or role
            //ctx.fillText(color,this.x+15,this.y+50);//format: [0]=room name, [1]: width, [2]: height
        }
        else if(move_mode=="image"){
                //display the human stick
                ctx.drawImage(this.image, 
                    this.x, 
                    this.y,
                    this.width, this.height);
                //display the name or role
                //ctx.fillText(color,this.x+15,this.y+50);//format: [0]=room name, [1]: width, [2]: height
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}

//New function for D2 - for Ken
//consider moving to a new javascript file for classes ?
function room(){
    //init the value
    this.name;
    this.min_width;
    this.max_width;
    this.min_height;
    this.max_height;
    this.door_index_array=[];
    this.window_index_array=[];
    //methods 
    //check if a person is inside the room
    this.inside=(a_person)=>{
        if(a_person.x>=this.min_width&&a_person.x<=this.max_width&&
            a_person.y>=this.min_height&&a_person.y<=this.max_height)
                return true;
        else return false;
    }
    //getter
    this.getName=()=>{
        return this.name;
    }
    //setters
    this.setName=(name)=>{
        this.name=name;
        return 1; //for testing, it works
    }
    this.set_min_width=(min_width)=>{
        this.min_width=min_width;
        return 1;
    }
    this.set_max_width=(max_width)=>{
        this.max_width=max_width;
        return 1;
    }
    this.set_min_height=(min_height)=>{
        this.min_height=min_height;
        return 1;
    }
    this.set_max_height=(max_height)=>{
        this.max_height=max_height;
        return 1;
    }
    this.add_window=(index)=>{
        this.window_index_array.push(index);
        return index;
    }
    this.add_door=(index)=>{
        this.door_index_array.push(index);
        return index;
    }

} 
/**
 * 
 * @param {*} a_person : a human stick
 */
function locateRoom(a_person){
    if(a_person.x) true;
}