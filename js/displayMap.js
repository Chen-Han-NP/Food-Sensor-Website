
let map;
var latt = 1.352083;
var lngg = 103.819839;
var current_position = "Singapore";
var zooms = 12;

function setCoords(latt, lngg, zooms){
  this.latt = latt;
  this.lngg = lngg;
  this.zooms = zooms;
}

function initMap(){
    var location = {lat: latt, lng: lngg};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: zooms,
        center: location,
        gestureHandling: "auto"
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map,
      });
    
    
    var input = document.getElementById('my-input-searchbox');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });


  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.getElementById("myLocationBut");
  //locationButton.classList.add("custom-map-control-button");
  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,

          };
          latt = position.coords.latitude;
          lngg = position.coords.longitude;
          
          let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + 'AIzaSyCHlRzdfgMvGjszjoE4zISUcUHDqXqup80&latlng=' + latt + "," + lngg;
          fetch(url)
            .then(response => response.json())
            .then(function (data){

            console.log(data)
            current_position = data.results[0]['formatted_address'];
            infoWindow.setContent(`${current_position}`);
          });
          
         
          infoWindow.setPosition(pos);
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(19);

          marker.ControlPosition(pos);
          
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}



  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);


    
}
