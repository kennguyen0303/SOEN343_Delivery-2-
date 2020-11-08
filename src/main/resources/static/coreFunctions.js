function loadRoomLights()
{
    var loadedText = '';
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for(var key1 of Object.keys(myObj))
            {
                for (var key2 of Object.keys(myObj[key1])){
                    if(key2=="name"){
                        var roomName = myObj[key1][key2][0].toString()
                        loadedText += "<input type='checkbox' onclick='lightAction("+ '"' + roomName + '"'+")' ></input> " +roomName + " </br>   " ;
                    }
                }
            }
            document.getElementById('SHCore').innerHTML = loadedText;
        };
    } 
    xmlhttp.open("GET", "layout.json", true);
    xmlhttp.send();

    console.log(loadedText);
}

function lightAction(debugText)
{
    console.log(debugText);
}
/**
 * Showing the control for the door
 */
function showDoorController(){
    var container = document.createElement("div");
    var door_name_array=["bathroom","bedroom","backyard", "kitchen","garage_inside","entrance","garage_outside"];
    var element = document.getElementById("SHCore");
    var controller = document.createElement("select");
    for( var i=0; i< door_array.length; i++) {
        var option = document.createElement("option");
        option.value = i+1;
        option.innerHTML = door_name_array[i];
        controller.appendChild(option);
    }
    var button = document.createElement("button");
    button.innerHTML="Open/Close";
    button.id="doorControllerButton";
    button.onclick=function() {
        controlDoor();
    };
    controller.id="doorController"// for CSS 
    //at here, having a dropdown box with options corresponding to a door
    element.removeChild(element.lastChild);//remove the old controller
    container.appendChild(controller);
    container.appendChild(button);
    element.appendChild(container);
}

/**
 * Showing the control for windows
 */
function showWindowController(){
    var window_name_array=["bedroom","kitchen"];
    var container=document.createElement("div");//container
    var element = document.getElementById("SHCore");
    var controller = document.createElement("select");
    for( var i=0; i< window_array.length; i++) {
        var option = document.createElement("option");
        option.value = i+1;
        option.innerHTML = window_name_array[i];
        controller.appendChild(option);
    }
    controller.id="windowController";//for CSS
    //at here, having a dropdown box with options corresponding to a door
    element.removeChild(element.lastChild);//remove the old controller
    container.appendChild(controller);
    //add function button
    var button = document.createElement("button");
    button.innerHTML="Open/Close";
    button.id="windowControllerButton";
    button.onclick=function() {
        controlWindow();
    };
    container.appendChild(button);
    element.appendChild(container);
}

/**
 * Showing the control for the light
 */
function showLightController(){
    var light_name_array=["entrance","backyard","hallway 1","hallway 2", "garage","kitchen","bedroom","bathroom"];
    var element = document.getElementById("SHCore");
    var container=document.createElement("div");
    var controller = document.createElement("select");
    for( var i=0; i< light_array.length; i++) {
        var option = document.createElement("option");
        option.value = i+1;
        option.innerHTML = light_name_array[i];
        controller.appendChild(option);
    }
    controller.id="lightController";//for CSS
    element.removeChild(element.lastChild);//remove the old controller
    //at here, having a dropdown box with options corresponding to a door
    container.appendChild(controller);
    var button = document.createElement("button");
    button.innerHTML="ON/OFF";
    button.id="lightControllerButton";
    button.onclick=()=> {
        switchLight();
    };
    container.appendChild(button);
    element.appendChild(container);
    showLightAutoMode();
}
var autoMode=false;//boolean for auto mode
/**
 * showing button to set lights on Auto mode
 */
function showLightAutoMode(){
    var isLightControllerThere;
    try {
        isLightControllerThere=document.getElementById("lightController");
        console.log(isLightControllerThere);
        if(isLightControllerThere){
            var autoButton=document.createElement("button");
            if(!autoMode) autoButton.innerHTML="Click to turn on Auto Mode";
            else autoButton.innerHTML="Auto Mode is ON";
            autoButton.onclick=()=>{
                if(!autoMode){//is Off then On
                    autoMode=true;//turn on
                    autoButton.innerHTML="Auto Mode is ON";
                    console.log("Auto mode: "+autoMode);
                }
                else{//is On then Off
                    autoMode=false;
                    autoButton.innerHTML="Click to turn on Auto Mode";
                    console.log("Auto mode: "+autoMode);
                }
            }
            isLightControllerThere.parentNode.appendChild(autoButton);
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * Function for switching on/off light
 * Can take an integer (Using as an API) or take the value from the control
 * The integer is a value referencing the index in the light_array
 */
function switchLight(val){
    var option;
    if(val==null){
        option =document.getElementById("lightController").value -1;
    }
    else option = val;
    //myGameArea.clear("light"); //clear the old light bulbs
    if(light_array[option].status=="closed"){
        light_array[option].image.src = "on_bulb.png";//switch on
        light_array[option].status="open";
    }
    else {
        light_array[option].status="closed";
        light_array[option].image.src = "off_bulb.png";//switch off
    }
    //update the new pictures
    light_array.forEach(a_light => {
        a_light.update();
    });
}

function turnOnLight(index){
    if(light_array[index].status=="closed"){
        light_array[index].image.src = "on_bulb.png";//switch on
        light_array[index].status="open";
        //update the new pictures
    light_array.forEach(a_light => {
        a_light.update();
    });
    }
}

function turnOffLight(index){
    if(light_array[index].status=="open"){
        light_array[index].image.src = "off_bulb.png";//switch on
        light_array[index].status="closed";
        //update the new pictures
    light_array.forEach(a_light => {
        a_light.update();
    });
    }
}

/**
 * function for controlling doors
 *  Can take an integer (Using as an API) or take the value from the control
 * The integer is a value referencing the index in the door_array
 */
function controlDoor(val){
    var option;
    if(val==null){
        option =document.getElementById("doorController").value -1;
    }
    else option = val;
    if(locked_array_door[option] == "true") //checks if array value is true, if true nothing happens
    {
        var consoleNode = document.createElement("p");
        var alertText = varCurrentTime.toLocaleString("en-US") + " This door is current obstructed";
        var consoleText = document.createTextNode(alertText);
        consoleNode.appendChild(consoleText);
        document.getElementById("outputConsole").appendChild(consoleNode);
        return;
    }
    var id = setInterval(moveDoor, 10);
    function moveDoor(){
        myGameArea.clear("door"); 
        door_array.forEach(a_door => {
            a_door.speedX=0;
            a_door.speedY=0;
        });
        if(door_array[option].status=="closed"){//we need to open it
            //move right
            if(door_array[option].move_mode=="horizontal") 
                if(door_array[option].x<door_array[option].boundary[1]) {
                    door_array[option].speedX = 1;
                    if(door_array[option].x==door_array[option].boundary[1]-1) {
                        clearInterval(id);
                        door_array[option].status="open";//update status, finish opening
                        if([2,4,5,6].includes(option)) setTimeout(controlDoor,5000,option);//auto close door after 5s
                    }
            }
        //move down
            if(door_array[option].move_mode=="vertical") 
                if(door_array[option].y<door_array[option].boundary[1]) {
                    door_array[option].speedY = 1;
                    if(door_array[option].y==door_array[option].boundary[1]-1){
                        clearInterval(id);
                        door_array[option].status="open";//update status, finish opening
                        if([2,4,5,6].includes(option)) setTimeout(controlDoor,5000,option);//auto close door after 5s       
                    }
            }
        }
        else{// need to close
             //move left
            if(door_array[option].move_mode=="horizontal")
                if(door_array[option].x>door_array[option].boundary[0]) {
                    door_array[option].speedX = -1;
                    if(door_array[option].x==door_array[option].boundary[0]+1){
                        clearInterval(id);//this is the last movement to open
                        door_array[option].status="closed";//update status, finish opening  
                    }
            }

            if(door_array[option].move_mode=="vertical") 
                if(door_array[option].y>door_array[option].boundary[0]) {
                    door_array[option].speedY = -1;
                    if(door_array[option].y==door_array[option].boundary[0]+1){
                        clearInterval(id);//this is the last movement to open
                        door_array[option].status="closed";//update status, finish opening  
                    }
            }
        }
        //update new position
        door_array.forEach(a_door => {
            a_door.newPos();    
            a_door.update();
        });
    }
}

/**
 * function for controlling windows
 *  Can take an integer (Using as an API) or take the value from the control
 * The integer is a value referencing the index in the window_array
 */
function controlWindow(val){ 
    var option;
    if(val==null){
        option =document.getElementById("windowController").value -1;
    }
    else option = val;
    if(locked_array_window[option] == "true") //checks if array value is true, if true nothing happens
    {
        var consoleNode = document.createElement("p");
        var alertText = varCurrentTime.toLocaleString("en-US") + " This window is current obstructed";
        var consoleText = document.createTextNode(alertText);
        consoleNode.appendChild(consoleText);
        document.getElementById("outputConsole").appendChild(consoleNode);
        return;
    }
    var id = setInterval(moveWindow, 10);
    function moveWindow(){
        myGameArea.clear("window"); 
        window_array.forEach(a_door => {
            a_door.speedX=0;
            a_door.speedY=0;
        });
        if(window_array[option].status=="closed"){//we need to open it
            //move right
            if(window_array[option].move_mode=="horizontal") 
                if(window_array[option].x<window_array[option].boundary[1]) {
                    window_array[option].speedX = 1;
                    if(window_array[option].x==window_array[option].boundary[1]-1) {
                        clearInterval(id);
                        window_array[option].status="open";//update status, finish opening
                    }
            }
        //move down
            if(window_array[option].move_mode=="vertical") 
                if(window_array[option].y<window_array[option].boundary[1]) {
                    window_array[option].speedY = 1;
                    if(window_array[option].y==window_array[option].boundary[1]-1){
                        clearInterval(id);
                        window_array[option].status="open";//update status, finish opening   
                    }
            }
        }
        else{// need to close
             //move left
            if(window_array[option].move_mode=="horizontal")
                if(window_array[option].x>window_array[option].boundary[0]) {
                    window_array[option].speedX = -1;
                    if(window_array[option].x==window_array[option].boundary[0]+1){
                        clearInterval(id);//this is the last movement to open
                        window_array[option].status="closed";//update status, finish opening  
                    }
            }

            if(window_array[option].move_mode=="vertical") 
                if(window_array[option].y>window_array[option].boundary[0]) {
                    window_array[option].speedY = -1;
                    if(window_array[option].y==window_array[option].boundary[0]+1){
                        clearInterval(id);//this is the last movement to open
                        window_array[option].status="closed";//update status, finish opening  
                    }
            }
        }
        //update new position
        window_array.forEach(a_door => {
            a_door.newPos();    
            a_door.update();
        });
    }
}

/**
 * Controlling all doors and windows for Security part
 * @param {*} option : This param decide the action for the function
 */
function controlAllDoor(option){
    if(option=="close"){
        for(var i=0;i<door_array.length;i++)
            if(door_array[i].status=="open")
                controlDoor(i);
        for(var i=0;i<window_array.length;i++)
            if(window_array[i].status=="open")
                controlWindow(i);
    }
    if(option=="open"){
        for(var i=0;i<door_array.length;i++)
            if(door_array[i].status=="closed")
                controlDoor(i);
        for(var i=0;i<window_array.length;i++)
            if(window_array[i].status=="closed")
                controlWindow(i);
    }
}


//This method will write msg to the SHC log file
function writeToSHCFile(msg){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Log information has been saved to the SHC_command.txt');
        }
    }

    xhttp.open('POST', 'http://localhost:8080/api/user/shcWirter/' + msg, true);
    xhttp.send();

}