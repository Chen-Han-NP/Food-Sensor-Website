/*
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(function (data){
        console.log(data.results[0].gender);
        $(`#content`).text(`\n${data.results[0].gender}`);
    });
*/

function getMyLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }

}
function showPosition(position) {
    setCoords(position.coords.latitude, position.coords.longitude, 18);
    initMap();
   console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
  }