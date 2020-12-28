/*
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(function (data){
        console.log(data.results[0].gender);
        $(`#content`).text(`\n${data.results[0].gender}`);
    });
*/
let current_position = {
  latitude: 0,
  longitude: 0
}

function getMyLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }

}
function showPosition(position) {
  current_position.latitude = position.coords.latitude;
  current_position.longitude = position.coords.longitude;
  setCoords(position.coords.latitude, position.coords.longitude, 18);
  initMap();
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + 'AIzaSyCHlRzdfgMvGjszjoE4zISUcUHDqXqup80&latlng=' + current_position.latitude + "," + current_position.longitude;
  fetch(url)
    .then(response => response.json())
    .then(function (data){
      //console.log(data)
      $(`#location`).text(data.results[0]['formatted_address']);
    });
  
  console.log("Latitude: " + current_position.latitude + 
    "<br>Longitude: " + current_position.longitude);
  }