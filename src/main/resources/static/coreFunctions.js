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

function showDoorController(){
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
    element.removeChild(element.lastChild);//remove the old button
    element.appendChild(controller);
    element.appendChild(button)
}


function showWindowController(){
    var window_name_array=["bedroom","kitchen"];
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
    element.removeChild(element.lastChild);//remove the old button
    element.appendChild(controller);
    //add function button
    var button = document.createElement("button");
    button.innerHTML="Open/Close";
    button.id="windowControllerButton";
    button.onclick=function() {
        controlWindow();
    };
    element.appendChild(button);
}


function showLightController(){
    var light_name_array=["entrance","backyard","hallway 1","hallway 2", "garage","kitchen","bedroom","bathroom"];
    var element = document.getElementById("SHCore");
    var controller = document.createElement("select");
    for( var i=0; i< light_array.length; i++) {
        var option = document.createElement("option");
        option.value = i+1;
        option.innerHTML = light_name_array[i];
        controller.appendChild(option);
    }
    controller.id="lightController";//for CSS
    element.removeChild(element.lastChild);//remove the old controller
    element.removeChild(element.lastChild);//remove the old button
    //at here, having a dropdown box with options corresponding to a door
    element.appendChild(controller);
    var button = document.createElement("button");
    button.innerHTML="ON/OFF";
    button.id="lightControllerButton";
    button.onclick=function() {
        switchLight();
    };
    element.appendChild(button);
}
/**
 * Function for switching on/off light
 */
function switchLight(){
    alert("switching light")
}

/**
 * function for controlling doors
 */
function controlDoor(){
    myGameArea.clear(); 
    door_array.forEach(a_door => {
        a_door.speedX=0;
        a_door.speedY=0;
    });
    var option=document.getElementById("doorController").value -1;
    alert("current value: "+option);
    //move left
    if(door_array[option].move_mode=="horizontal")
        if(door_array[option].x>door_array[option].boundary[0]) door_array[option].speedX = -door_array[option].width;
    if(door_array[option].move_mode=="vertical") 
        if(door_array[option].y>door_array[option].boundary[0]) door_array[option].speedY = -door_array[option].heigth;
 //move right
    if(door_array[option].move_mode=="horizontal") 
        if(door_array[option].x<door_array[option].boundary[1]) door_array[option].speedX = door_array[option].width;
 //move down
    if(door_array[option].move_mode=="vertical") 
        if(door_array[option].y<door_array[option].boundary[1]) door_array[option].speedY = door_array[option].heigth;
    //update new position
    door_array.forEach(a_door => {
        a_door.newPos();    
        a_door.update();
    });
}
/**
 * function for controlling windows
 */
function controlWindow(){ // ERROR - DEBUG
    myGameArea.clear(); 
    window_array.forEach(a_window => {
        a_window.speedX=0;
        a_window.speedY=0;
    });
    var option=document.getElementById("windowController").value -1;
    alert("current value: "+option);
    //move left
    if(window_array[option].move_mode=="horizontal")
        if(window_array[option].x>window_array[option].boundary[0]) window_array[option].speedX = -window_array[option].width;
    if(window_array[option].move_mode=="vertical") 
        if(window_array[option].y>window_array[option].boundary[0]) window_array[option].speedY = -20;
 //move right
    if(window_array[option].move_mode=="horizontal") 
        if(window_array[option].x<window_array[option].boundary[1]) window_array[option].speedX = 20;
 //move down
    if(window_array[option].move_mode=="vertical") 
        if(window_array[option].y<window_array[option].boundary[1]) window_array[option].speedY = 20;
    //update new position
    window_array.forEach(a_window => {
        a_window.newPos();    
        a_window.update();
    });
}


