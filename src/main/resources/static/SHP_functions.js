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
        if ((time1[i] == '' && time2[i] != '') || (time1[i] != '' && time2[i] == '')) {
            pass = false;
            break;
        }
    }
    //validate the data
    if (!pass) {
        alert("Please make sure you enter both times or none of the times for each room");
    } else {
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
    console.log(lightSchedule);
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
        //check the on/off of all lights
        for (let i = 0; i < rooms.length; i++) {
            //within one day
            if (lightSchedule[i].startTime < lightSchedule[i].endTime) {
                if(currentTime > lightSchedule[i].startTime && lightSchedule[i].endTime){
                    //turn on the light
                }
                else{
                    //turn off the light
                }
            }

            //overnight
            if (lightSchedule[i].startTime > lightSchedule[i].endTime) {
                if(currentTime > lightSchedule[i].startTime || lightSchedule[i].endTime){
                    //turn on the light
                }
                else{
                    //turn off the light
                }
            }

            //no value
            if (lightSchedule[i].startTime == '') {
                //turn off the light
            }
            
        }

    }
}

class CurrentTime{
    constructor(){
        this.currentTime;
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
        this.currentTime = document.getElementById('time').innerHTML;
        this.observers.notifyAll()
    }

}

//
function setAwayMode(){

    if (document.getElementById('awayModeButton').innerHTML == 'OFF') {
        document.getElementById('awayModeButton').innerHTML = 'ON';
        console.log(document.getElementById('awayModeButton').innerHTML);
        controlAllDoor('close');
    }
    else if (document.getElementById('awayModeButton').innerHTML == 'ON') {
        document.getElementById('awayModeButton').innerHTML = 'OFF';
        console.log(document.getElementById('awayModeButton').innerHTML);
    }
}