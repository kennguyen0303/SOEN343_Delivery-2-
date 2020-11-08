//Daniela functions
function addProfile(str) {
  var xhttp;
  alert(str);
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     alert("added successfully");
  };
  }
  var obj = { "role" : str};
  obj = JSON.stringify(obj);
  console.log(obj);
  xhttp.open("POST", "http://localhost:8080/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(obj);

}
//get the profile !
function getProfile() {
  var xhttp;
    window.alert("inside getProfile");
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("showProfile").innerHTML=this.responseText;
  };
  }
  xhttp.open("GET", "http://localhost:8080/api/user", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();

}

function removeAllChildNodes(element) {
if(element){
while(element.firstChild) {
     element.removeChild(element.lastChild);
   }
}

}

function getUserById(id) {
    var xhttp;
    var user;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        return user = JSON.parse(this.responseText);
    }
    };

    xhttp.open("GET", "http://localhost:8080/api/user/userRetrieval/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

// Retrieves users from backend as they are added and displays them in a dropdown list
function getUsers() {
    var xhttp;
    var userArray;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            userArray = JSON.parse(this.responseText);

            var select = document.getElementById("currentUsersList");
            removeAllChildNodes(select);

            //alex attempt
            var select2 = document.getElementById("currentUsersList2");
            removeAllChildNodes(select2);
            //end

            var select3 = document.getElementById("currentUsersList3");
            removeAllChildNodes(select3);

            for( var i=0; i< userArray.length; i++) {
                var option = document.createElement("option");
                option.value = userArray[i].id;
                option.innerHTML = userArray[i].role;
                select.appendChild(option);
            }

            //alex attempt
            for( var i=0; i< userArray.length; i++) {
                var option = document.createElement("option");
                option.value = userArray[i].id;
                option.innerHTML = userArray[i].role;
                select2.appendChild(option);
            }//end

           for( var i=0; i< userArray.length; i++) {
              var option = document.createElement("option");
                option.value = userArray[i].id;
                option.innerHTML = userArray[i].role;
                select3.appendChild(option);
              }

            var item = document.getElementById("availableUsers");

            removeAllChildNodes(item);
            item.appendChild(select);

            //alex attempt start
            var item2 = document.getElementById("availableUsers2");
            removeAllChildNodes(item2);
            item2.appendChild(select2);
            //attempt end

            var item3 = document.getElementById("availableUsers3");
            removeAllChildNodes(item3);
            item3.appendChild(select3);
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/user/allUserRetrieval", true);
    xhttp.send();
}

// Submits the form to add a user
function onAddUserSubmit() {
    var select = document.getElementById("roleSelect");
    var role = select.options[select.selectedIndex].value;
    addUser(role);
}

// Sends the http request to add a user to the backend
function addUser(str) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getUsers();
        }
    };

    var obj = { "role" : str};
    obj = JSON.stringify(obj);
    xhttp.open("POST", "http://localhost:8080/api/user/addUser", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(obj);
}

// Submits the user to delete
function onSubmitDeleteUser() {
    var select = document.getElementById("currentUsersList");
    var userId = select.options[select.selectedIndex].value;
    deleteUser(userId);
}

// Sends the http request to delete a selected user
function deleteUser(id) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getUsers();
        }
    };

    xhttp.open("DELETE", "http://localhost:8080/api/user/userRemoval/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

// Submits the user to edit and the new role to change it with
function onSubmitEditForm() {
    var select = document.getElementById("currentUsersList");
    var userId = select.options[select.selectedIndex].value;
    var newRoleSelect = document.getElementById("newRole")
    var newRole = newRoleSelect.options[newRoleSelect.selectedIndex].value;
    var currentRole = getUserById(userId);

    editUser(newRole, userId);
}

// sends the http request to edit a user role in the backend
function editUser(newRole, id) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getUsers();
        }
    };

    var obj = { "role" : newRole};
    obj = JSON.stringify(obj);
    xhttp.open("PUT", "http://localhost:8080/api/user/userUpdate/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(obj);
}

// Logs in the selected user and logs out old user, if necessary
function onLoginSubmit() {
    var select = document.getElementById("currentUsersList");
    var userId = select.options[select.selectedIndex].value;
    var role = select.options[select.selectedIndex].innerHTML;

    logIn(userId,role);
}

// Performs the http request to log in the user
function logIn(id, role) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("userDisplay").innerHTML = role ;
        }
    };

    xhttp.open("PUT", "http://localhost:8080/api/user/logIn/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

//Nathan+Abdala function


function changeTabs(evt, SmartHomeTab) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(SmartHomeTab).style.display = "block";
    evt.currentTarget.className += " active";
}

//Ken function for layout
var door_array=[];//the array for doors !
var light_array=[];//array for lights
var window_array=[];//array for window
var room_array=[];//array for the rooms
   function renderLayout()//a function for rendering the layout of the house
   {
        var xmlhttp = new XMLHttpRequest();//creating a request for AJAX to load the layout
            xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {//when the layout file is successfully loaded, executes the below codes
                myObj = JSON.parse(this.responseText);//parse the JSON data to an JAvascript object
                var canvas = document.getElementById("myCanvas");//define the area to draw
                var ctx = canvas.getContext("2d");//a syntax concept, check the w3school
                //drawing starts here
                for (var key1 of Object.keys(myObj)) {//loop over each room in the JSON file, syntax here: loop over an object
                    for (var key2 of Object.keys(myObj[key1])) {//loop over each element of a room
                        //print room_name p/s: hardcode name position need to fix later
                        if(key2=="name"){//if the element is "name", need to print out
                            var temp_room=new room();//initialize a room
                            temp_room.setName(myObj[key1][key2][0]);//set the name for the room
                            ctx.font = "15px Arial";//set the font
                            ctx.fillText(myObj[key1][key2][0],myObj[key1][key2][1],myObj[key1][key2][2]);//format: [0]=room name, [1]: width, [2]: height
                            continue;//move on the other keys
                        }
                        //print the door
                        if(key1=="door"){
                            //each [key2] is an object of a door
                            var temp_door = new door(myObj[key1][key2][0], myObj[key1][key2][1], myObj[key1][key2][2], myObj[key1][key2][3], myObj[key1][key2][4],myObj[key1][key2][5]);
                            if( myObj[key1][key2][2]=="red") {
                                door_array.push(temp_door);//add door
                                room_array.forEach(a_room => {
                                    var room_name=a_room.getName();
                                    if(key2.includes(room_name))
                                        a_room.add_door(door_array.length-1);//take the index of the door
                                });
                            }
                            if( myObj[key1][key2][2]=="blue") {
                                window_array.push(temp_door);//add window 
                            }
                            continue;
                        }
                        //print the door
                        if(key1=="light"){
                            //each [key2] is an object of a door
                            var temp_door = new door(myObj[key1][key2][0], myObj[key1][key2][1], myObj[key1][key2][2], myObj[key1][key2][3], myObj[key1][key2][4],myObj[key1][key2][5]);
                            light_array.push(temp_door);
                            room_array.forEach(a_room => {
                                var room_name=a_room.getName();
                                if(key2.includes(room_name))
                                    a_room.add_light(light_array.length-1);//take the index of the door
                            });
                            continue;
                        }
                        //draw the wall for a room
                        for(var i=0;i<myObj[key1][key2].length;i=i+4){
                            //store the height and width of a room
                            if(key2=="top"){
                                temp_room.set_min_height(myObj[key1][key2][1]);//the first point
                                temp_room.set_min_width(myObj[key1][key2][0]);//the first point
                                var last_index=myObj[key1][key2].length-1;
                                temp_room.set_max_width(myObj[key1][key2][last_index-1]);//consult the layout.json to know why -1
                            }
                            if(key2=="left"){
                                var last_index=myObj[key1][key2].length-1;
                                temp_room.set_max_height(myObj[key1][key2][last_index]);
                            }
                            ctx.moveTo(myObj[key1][key2][i],myObj[key1][key2][i+1]);
                            ctx.lineTo(myObj[key1][key2][i+2],myObj[key1][key2][i+3]);
                            ctx.stroke();
                            
                        }
                    };//finish rendering a room
                    if(key1!=="door"&&key1!=="light") {

                        room_array.push(temp_room);//add the room to the array
                       

                    }
                };
                startGame();//start the movement, challenge: Need to click to render door
            }
        };
        xmlhttp.open("GET", "layout.json", true);
        xmlhttp.send();
            
   }
   //try the game code from w3school with some modification, check w3school for more detials
  
   var option;
function startGame() {
    myGameArea.start();
}


function updateGameArea() {
    myGameArea.clear("image"); 
    // myGameArea.clear("door"); 
    // myGameArea.clear("light"); 
    user_array.forEach(user => {
        user.speedX=0;
        user.speedY=0;
    });
    // window_array.forEach(a_window => {
    //     a_window.speedX=0;
    //     a_window.speedY=0;
    // });
    var option = document.getElementById("control_option").value - 1;//minus 1 since array start from 0
    if (myGameArea.key && myGameArea.key == 37) {//move left
        user_array[option].speedX = -1;
    }
    if (myGameArea.key && myGameArea.key == 38) {//move up
        user_array[option].speedY = -1;
    }
    if (myGameArea.key && myGameArea.key == 39) {//move right
        user_array[option].speedX = 1;
    }
    if (myGameArea.key && myGameArea.key == 40) {//move down
        user_array[option].speedY = 1;
    }
    // if (myGameArea.key && myGameArea.key == 37) {//move left
    //     if(door_array[option].move_mode=="horizontal")
    //         if(door_array[option].x>door_array[option].boundary[0]) door_array[option].speedX = -1;
    //      }
    // if (myGameArea.key && myGameArea.key == 38) {//move up
    //     if(door_array[option].move_mode=="vertical") 
    //     if(door_array[option].y>door_array[option].boundary[0]) door_array[option].speedY = -1;
    //     }  
    // if (myGameArea.key && myGameArea.key == 39) {//move right
    //     if(door_array[option].move_mode=="horizontal") 
    //     if(door_array[option].x<door_array[option].boundary[1]) door_array[option].speedX = 1;
    // }
    // if (myGameArea.key && myGameArea.key == 40) {//move down
    //     if(door_array[option].move_mode=="vertical") 
    //     if(door_array[option].y<door_array[option].boundary[1]) door_array[option].speedY = 1;
    
    // }
        
    //key in control is the update function
    //update the now position for every door, otherwise it will not be shown
    user_array.forEach(user => {
        user.newPos();    
        user.update();
        //update location ?
        room_array.forEach(a_room => {
            if(a_room.insideRoom(user)){//if the user is inside a room
                // //turn on light in the room
                a_room.light_index_array.forEach(an_index => {
                    console.log(an_index);
                    turnOnLight(an_index);
                });
                user.location=a_room.getName();//update the location
                console.log("Current location: "+user.location);
            }

        });
        
    });
}
//--------------------------------------
//alex functions
function showContext() {
    document.getElementById('SHSystem').style.display = 'none';
}

//************Function for Alex part prepared by Ken  */

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  var xAxis = 0;
  var yAxis = 0;
  var obstacle = null;
  function onCoordinatesSubmit() {
    xAxis = document.getElementById('xAxis').value;
    yAxis = document.getElementById('yAxis').value;

    //validation
    if (xAxis < 0 || yAxis < 0) {
        alert("input error");
        xAxis = 0;
        yAxis = 0;
        document.getElementById('xAxis').value = null;
        document.getElementById('yAxis').value = null;
    }
    else {
        //add human/image: choose the last parameter as image
        //add obstacle: "put sthing else"
        obstacle = new door(10, 10, "green", xAxis, yAxis, "horizontal");
        obstacle.update();
    }

    //block the door1
    if(xAxis>40 && xAxis<60 && yAxis>192 && yAxis<207) {
        //change the boundary of door1
        door_array[0].boundary = [door_array[0].x, xAxis-20];
    }
    if(xAxis>133 && xAxis<148 && yAxis>40 && yAxis<60){
        //change the boundary of door2
        door_array[1].boundary = [door_array[1].y, yAxis-20];

    }
    if(xAxis>283 && xAxis<298 && yAxis>80 && yAxis<100) {
        door_array[2].boundary = [door_array[2].y, yAxis-20];
    }
    if(xAxis>283 && xAxis<298 && yAxis>280 && yAxis<300) {
        door_array[3].boundary = [door_array[3].y, yAxis-20];
    }

}

//Nathan and alex functions
function resetCoordinates() {
    document.getElementById('xAxis').value = null;
    document.getElementById('yAxis').value = null;
    //the following code does not work for now
    xAxis = 0;
    yAxis = 0;
    obstacle.width = 0;
    obstacle.height = 0;
    obstacle.update();
    renderLayout();
}

var user_array=[];//an array for controlling the user in the house
function placeUser(){

    if(document.getElementById('awayModeButton').innerHTML == "ON")
    {
        alertConsole("Sec", varCurrentTime.toUTCString());
    }
    //obtain the user
    var userIndex = document.getElementById('currentUsersList2').selectedIndex;
    var userID = document.getElementById('currentUsersList2').options[userIndex].value;
    var userName = document.getElementById('currentUsersList2').options[userIndex].innerHTML;
    
    //obtain the room
    var roomName = document.getElementById('availableRooms').value;

    //determine the coordinates of the user for each room
    var positionX = 0;
    var positionY = 0;
    //NEED TO UPDATE FOR THE NEW LAYOUT !
    if(roomName == "living_room") {
        positionX = 35;
        positionY = 75;
    } 
    if(roomName == "kitchen") {
        positionX = 185;
        positionY = 75;
    }
    if(roomName == "outdoor") {
        positionX = 385;
        positionY = 225;
    }

    //place img in the layout
    var selectedUser = new door(15, 20, "", positionX, positionY, "image");
    user_array.push(selectedUser);//push into the array

    
    var temp_element=document.createElement("option");
    var element = document.getElementById("control_option");//access the dropdown box
    temp_element.value=user_array.length;
    temp_element.innerHTML=userName;
    element.appendChild(temp_element);//add to the dropdown
    selectedUser.update();

    //store user location into backend
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getUsers();
        }
    };
    xhttp.open("PUT", "http://localhost:8080/api/user/updateUserLocation/" + userID + "/" + roomName, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    //observe the location
    if (document.getElementById('awayModeButton').innerHTML == 'ON') {
        UserObserver.update();
    }
    
}

 var varCurrentTime = new Date();

function refreshTime() {
    setInterval(() => {
        //currentTime + 1
        tikTok();
    }, 1000);
}

function newTime() {
	var y = prompt("enter a year (October 13, 2014 11:13:00)", 0);
	varCurrentTime = new Date(y);
}

function tikTok() {

    var second = varCurrentTime.getSeconds() + 1;
    varCurrentTime.setSeconds(second);
    document.getElementById('time').innerHTML = varCurrentTime.toLocaleString("en-US");

    

    if (document.getElementById('awayModeButton').innerHTML == 'ON') {
        if (lightSchedule.length == 0) {
            return;
        }
        else{
            var timeNow = new CurrentTime();
            var timeObserver = new TimeObserver();
            timeNow.addObserver(timeObserver)
            timeNow.setCurrentTime();
        }
        
    }
    

}

// CONFLICT RESOLVED !

//user should be able to set the time to pass before sending notification
var eclipsedTime = 0;
function setEclipseTime(){
    eclipsedTime = document.getElementById('eclipseTime').value;
}



//obversers classes here
class UserObserver {
    constructor(){
        // this.eclipsedTime = eclipsedTime;
    }

    static update(){

        const currentTime = new Date();
        var timeInfo = currentTime.toUTCString();

        //obtain the users
        var xhttp = new XMLHttpRequest();
        var userDB;

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                userDB = JSON.parse(this.responseText);
                
                for (let i = 0; i < userDB.length; i++) {
                    if (userDB[i].location != "none" && userDB[i].location != "entrance" && userDB[i].location != "backyard") {
                        //generate information
                        var info = timeInfo + "\tNotification to Parent: " + userDB[i].role + " is in the house's " + userDB[i].location;

                        //TODO obtain user eclipsed time
                        while(new Date() - currentTime < eclipsedTime);

                        //notify the user
                        alert(info);

                        //append info to output console
                        var outputConsole = document.getElementById('outputConsole');
                        var pTag = document.createElement('P');
                        var contents = document.createTextNode(info);
                        pTag.appendChild(contents);
                        outputConsole.appendChild(pTag);
                        
                    }
                }
            }
        }

        xhttp.open("GET", "http://localhost:8080/api/user/allUserRetrieval", true);
        xhttp.send();
    }
}