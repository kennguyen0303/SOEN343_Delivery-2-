function grantPermissions()
{
    if(true)
    {
        var permissionDropDown = document.getElementById("permissionName");
        var permissionName = permissionDropDown.options[permissionDropDown.selectedIndex].value;

        var permissionValueDropDown = document.getElementById("permissionValue");
        var permissionValue = permissionValueDropDown.options[permissionValueDropDown.selectedIndex].value;

        var userSelect = document.getElementById("currentUsersList");
        var userId = userSelect.options[userSelect.selectedIndex].value;

          var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.response);
                }
            };

            xhttp.open("PUT", "http://localhost:8080/api/user/updateUserPermissions/"+userId +"/"+ permissionName +"/"+  permissionValue, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
    }
}

function saveProfiles()
{
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

     }
    };
    xhttp.open("POST", "http://localhost:8080/api/user/userSaving", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function loadProfiles()
{
     var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                getUsers();
            }
         };

        xhttp.open("POST", "http://localhost:8080/api/user/userLoading", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
}

function getUserPermissions(id)
{
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 userPermissions = JSON.parse(this.responseText);
                 return userPermissions;
            }
        };

        xhttp.open("GET", "http://localhost:8080/api/user/userPermissions/"+id, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
}