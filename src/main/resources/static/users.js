function grantPermissions()
{
    var currentRole = getCurrentUserRole();
    if(currentRole === "Parent")
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
    else
    {
        alert("You do not have the permission to change user permissions");
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


function getCurrentUserPermissions()
{
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

            }
        };

        xhttp.open("GET", "http://localhost:8080/api/user/currentUserPermissions", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var userPermissions = JSON.parse(xhttp.responseText);
        console.log(userPermissions);
        return userPermissions;
}

function getCurrentUserRole()
{
  var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

            }
        };

        xhttp.open("GET", "http://localhost:8080/api/user/currentUser", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var role = JSON.parse(xhttp.responseText).role;
        return role;
}

function writePermissions()
{
    var userPermissions = getCurrentUserPermissions();
    document.getElementById("PermissionsTitle").innerHTML = "Current Permissions for Logged In Profile"
    document.getElementById("AllDoors").innerHTML = "Can lock and unlock all doors: " + userPermissions.lockDoors;
    document.getElementById("AllWindows").innerHTML = "Can open/close all windows: " + userPermissions.openAllWindows;
    document.getElementById("RestrictedWindows").innerHTML = "Can open close windows if in the same room: " + userPermissions.useRestrictedWindows;
    document.getElementById("AllLights").innerHTML = "Can open all lights: " +  userPermissions.useAllLights;
    document.getElementById("RestrictedLights").innerHTML = "Can open lights if in the same room: " + userPermissions.useRestrictedLights;
    document.getElementById("SetAwayMode").innerHTML = "Can set the simulation to away mode: " + userPermissions.canSetAwayMode;
}

function hidePermissions()
{
   document.getElementById("AllDoors").innerHTML = "";
   document.getElementById("AllWindows").innerHTML = "";
   document.getElementById("RestrictedWindows").innerHTML = "";
   document.getElementById("AllLights").innerHTML = "";
   document.getElementById("RestrictedLights").innerHTML = "";
   document.getElementById("SetAwayMode").innerHTML = "";

}