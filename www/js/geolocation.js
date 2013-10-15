/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
  document.addEventListener("deviceready", onDeviceReady, false);
       
       function onDeviceReady() {
       /*
            var networkState = navigator.connection.type;
            if(networkState == Connection.NONE )
                alert("No internet");
                */
         }
         
var getCurrentPosition = function() {
var map = document.getElementById('map');
var success = function(pos) { 
alert('Latitude: '          + pos.coords.latitude          + '\n' +
          'Longitude: '         + pos.coords.longitude         + '\n' +
          'Altitude: '          + pos.coords.altitude          + '\n' +
          'Accuracy: '          + pos.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + pos.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + pos.coords.heading           + '\n' +
          'Speed: '             + pos.coords.speed             + '\n' +
          'Timestamp: '         + pos.timestamp                + '\n');
          
var text = "<div>Latitude: " + pos.coords.latitude + 
"<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
"Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
document.getElementById('cur_position').innerHTML = text;
console.log(text);
map.style.display ='block';
var mapwidth = 270; // a mungy compromise between the 2 sizes
var mapheight = 210; // since we can't get w / h dynamically
map.src ="http://maps.googleapis.com/maps/api/staticmap?center=" + 
pos.coords.latitude + "," + pos.coords.longitude + 
"&zoom=14&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false";
};
var fail = function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
document.getElementById('cur_position').innerHTML = "Error getting geolocation: " + error.code;
console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
};
map.style.display = 'none';
document.getElementById('cur_position').innerHTML = "Getting geolocation . . .";
console.log("Getting geolocation . . .");

navigator.geolocation.getCurrentPosition(success, fail);
};



// api-geolocation Watch Position
var watchID = null;
function clearWatch() { 
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        document.getElementById('cur_position').innerHTML = "";
        document.getElementById('map').style.display = 'none';
    }
}
var wsuccess = function(pos) { 
var map = document.getElementById('map');
document.getElementById('cur_position').innerHTML = "Watching geolocation . . .";
map.style.display ='none';
var text = "<div>Latitude: " + pos.coords.latitude + 
" (watching)<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
"Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
document.getElementById('cur_position').innerHTML = text;
console.log(text);
map.style.display = 'block';
var mapwidth = 270; // a mungy compromise between the 2 sizes
var mapheight = 210; // since we can't get w / h dynamically
map.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + 
pos.coords.latitude + "," + pos.coords.longitude + 
"&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false";
};
var wfail = function(error) { 
document.getElementById('cur_position').innerHTML = "Error getting geolocation: " + error.code;
console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
};
var toggleWatchPosition = function() { 
if (watchID) {
console.log("Stopped watching position");
clearWatch();
// sets watchID = null;
}
else { 
document.getElementById('map').style.display = 'none';
document.getElementById('cur_position').innerHTML = "Watching geolocation . . .";
console.log("Watching geolocation . . .");
var options = { frequency: 3000, maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
}
};
