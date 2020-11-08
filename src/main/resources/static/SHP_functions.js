//global constant for rooms
const rooms = ['entrance', 'hallway', 'kitchen', 'bedroom', 'bathroom', 'garage', 'backyard'];
//global var for lightSchedule
var lightSchedule = [];

//modify the lightSchedule
function setLightSchedule(){

    var time1 = [];
    var time2 = [];
    var pass = true;
    
    for (let i = 0; i < rooms.length; i++) {
        time1[i] = document.getElementById(rooms[i]+1).value;
        time2[i] = document.getElementById(rooms[i]+2).value;
        if ((time1[i] == '' && time2[i] != '') || (time1[i] != '' && time2[i] == '') || (time1[i] != '' && time2[i] == time1[i])) {
            pass = false;
            break;
        }
    }
    //validate the data
    if (!pass) {
        alert("invalid light schedule, please check and enter again");
    } 
    else {
        while (lightSchedule.length >0) {
            lightSchedule.pop();
        }
    
        for (let i = 0; i < rooms.length; i++) {
            var time1 = document.getElementById(rooms[i]+1).value;
            var time2 = document.getElementById(rooms[i]+2).value;
            var element = {room:rooms[i], startTime: time1, endTime:time2};
            lightSchedule.push(element);        
        }
    }
}

//clear all information about light schedule
function resetLightSchedule(){

    while (lightSchedule.length > 0) {
        lightSchedule.pop();
    }

    for (let i = 0; i < rooms.length; i++) {
        document.getElementById(rooms[i]+1).value = '';     
        document.getElementById(rooms[i]+2).value = '';    
    }
    console.log(lightSchedule);
}


class TimeObserver{
    constructor(){
        this.observer;
    }

    update(currentTime){
        //obtain current time
        var currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();
        var timeString = currentHour + ':' + currentMinute;

        //check the on/off of all lights
        for (let i = 0; i < light_array.length; i++) {
            //convert the index of light_array to the corresponding index of lightSchedule
            var lightScheduleIndex;
            if (i == 0) {
                lightScheduleIndex = i;     //entrance
            }
            if(i == 1){
                lightScheduleIndex = 6;     //backyard
            }
            if (i == 2 || i == 3) {
                lightScheduleIndex = 1;     //hallway
            }
            if (i == 4) {
                lightScheduleIndex = 5;     //garage
            }
            if (i == 5) {
                lightScheduleIndex = 2;     //kitchen
            }
            if (i == 6) {
                lightScheduleIndex = 3;     //bedroom
            }
            if (i == 7) {
                lightScheduleIndex = 4;     //bathroom
            }

            //within one day
            if (lightSchedule[lightScheduleIndex].startTime < lightSchedule[lightScheduleIndex].endTime) {
                if(timeString >= lightSchedule[lightScheduleIndex].startTime && timeString <= lightSchedule[lightScheduleIndex].endTime){
                    turnOnLight(i);
                }
                else{
                    turnOffLight(i);
                }
            }

            //overnight
            if (lightSchedule[lightScheduleIndex].startTime > lightSchedule[lightScheduleIndex].endTime) {
                if(timeString >= lightSchedule[lightScheduleIndex].startTime || timeString <= lightSchedule[lightScheduleIndex].endTime){
                    turnOnLight(i);
                }
                else{
                    turnOffLight(i);
                }
            }

            //no value
            if (lightSchedule[lightScheduleIndex].startTime == '') {
                turnOffLight(i);
            }
        }
    }
}

class CurrentTime{
    constructor(){
        this.currentTim;
        this.observers = [];
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyAll(){

        for (let observer of this.observers) {
            
            observer.update(this.currentTime);
        }
    }

    setCurrentTime(){
        this.currentTime = varCurrentTime;
        this.notifyAll()
    }

}

//
function setAwayMode(){

    var userDB;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var userAtHome = 'nobody';
            userDB = JSON.parse(this.responseText);

            for (let i = 0; i < userDB.length; i++) {
                var userLocation = userDB[i].location;
                if (userLocation != 'none' && userLocation != 'entrance' && userLocation != 'backyard') {
                    userAtHome = userDB[i].role;
                } 
            }//end of for loop

            if (document.getElementById('awayModeButton').innerHTML == 'ON') {
                document.getElementById('awayModeButton').innerHTML = 'OFF';
            }

            else if (userAtHome != 'nobody') {
                alert(userAtHome + ' is at home, the away mode can not be activated');
            }
    
            else if (document.getElementById('awayModeButton').innerHTML == 'OFF') {
    
                document.getElementById('awayModeButton').innerHTML = 'ON';
                controlAllDoor('close');

                //save information to SHP log file
                var date = new Date();
                var msg = date + "\tAll doors and windows are closed because the away mode has been turned on.";
                writeToFile(msg);

                //check observer
                UserObserver.update();
            }
        }
    }

    xhttp.open("GET", "http://localhost:8080/api/user/allUserRetrieval", true);
    xhttp.send();
}

function alertConsole(AlertType, timeOfAlert){

    if(AlertType == "Sec")
    {
        var alertText = timeOfAlert +  " An unidentified user has been logged as entering the house. authorities will be notified in " + document.getElementById("authoritiesTime").value + " seconds.";
    }

    var consoleNode = document.createElement("p");
    var consoleText = document.createTextNode(alertText);
    consoleNode.appendChild(consoleText);
    document.getElementById("outputConsole").appendChild(consoleNode);
}

//This method will write msg to a give log file
function writeToFile(msg){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Log information has been saved to the SHP_command.txt');
        }
    }

    xhttp.open('POST', 'http://localhost:8080/api/user/shpWirter/' + msg, true);
    xhttp.send();

}