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

function switchLight(){
    alert("switching light")
}
function controlDoor(){
    var value=document.getElementById("doorController").value;
    var temp = "reading value door: "+value;
    alert(temp);
}
function controlWindow(){
    alert("closing window")
}


