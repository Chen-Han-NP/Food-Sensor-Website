/*
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(function (data){
        console.log(data.results[0].gender);
        $(`#content`).text(`\n${data.results[0].gender}`);
    });
*/
function initMap(){
    var location = {lat: 1.352083, lng: 103.819839};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: location
    });
}