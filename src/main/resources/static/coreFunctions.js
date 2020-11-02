function loadRoomLights()
{
    var loadedText = "";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for(var key1 of Object.keys(myObj))
            {
                for (var key2 of Object.keys(myObj[key1])){
                    if(key2=="name"){
                        //console.log(myObj[key1][key2][0]);
                        loadedText = loadedText.concat(myObj[key1][key2][0], " ");
                    }
                }
            }
        };
    } 
    xmlhttp.open("GET", "layout.json", true);
    xmlhttp.send();

    document.getElementById('SHCore').innerHTML = loadedText;
    console.log(loadedText);
}