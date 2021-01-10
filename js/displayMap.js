let current_lat = 1.2992724999999998;
let current_lng = 103.855451;

let map;

let userPopUp;
let userMarker;
let accessToken = 'pk.eyJ1IjoiY2hhbmNlLW5wIiwiYSI6ImNramptc3NpbjFsZmQycW83Z2ZkeHg3ZDgifQ.lbjTyfFz_95mpdQbLpM6qg'
var currentMarkers = [];
var currentPopups = [];
let geocoder;

//initialize the obstables that will be shown on the map
var obstacle = turf.buffer(clearances, 0.25, { units: "kilometers" });
var bbox = [0, 0, 0, 0];
var polygon = turf.bboxPolygon(bbox);

mapboxgl.accessToken = accessToken;
var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [current_lng, current_lat], // starting position [lng, lat]
  zoom: 14 // starting zoom
});

//Loads the obstacles on the map
map.on("load", function (e) {
  map.addLayer({
    id: "clearances",
    type: "fill",
    source: {
      type: "geojson",
      data: obstacle,
    },
    layout: {},
    paint: {
      "fill-color": "#f03b20",
      "fill-opacity": 0.5,
      "fill-outline-color": "#f03b20",
    },
  });

  //Add a point indicating the starting point of the person;
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [current_lng, current_lat ]
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
});





//Control the two buttons
const locationButton = document.getElementById("myLocationBut");
const viewButton = document.getElementById("viewResResult");

locationButton.addEventListener("click", () => {
  // using html 5 geolocation to get the current location

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        current_lat = pos.lat;
        current_lng = pos.lng;

        map.flyTo({
          center: [pos.lng, pos.lat],
          zoom : 17
          });

        //get the user's current location info using geocoding api
        mapboxClient.geocoding
        .reverseGeocode({
          query: [pos.lng, pos.lat]
        })
        .send()
        .then(function(response) {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {

            var feature = response.body.features[0];

            clearPopupAndMarker();
            clearEverything();

            userMarker = new mapboxgl.Marker()
            .setLngLat([pos.lng, pos.lat])
            .addTo(map);

            userPopUp = new mapboxgl.Popup({ closeOnClick: false })
              .setLngLat([pos.lng, pos.lat])
              .setHTML(`${feature.place_name}`)
              .addTo(map);

            displayData(current_lat, current_lng);
          }
        });

    },
    
    (error) => {
      this.setState({ location: error, loading: false });
      console.log(error);
    },
    
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }



  
});


setMarker(current_lat, current_lng, map);

//The search bar
geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Enter location manually',
  setZoom: 18

  })
map.addControl(geocoder);

//When the search result is chosen by the user
geocoder.on('result', function(result) {

  current_lat = result.result.geometry.coordinates[1];
  current_lng = result.result.geometry.coordinates[0];
  place_name = result.result.place_name;

  clearPopupAndMarker();
  clearEverything();

  userMarker = new mapboxgl.Marker()
  .setLngLat([current_lng, current_lat])
  .addTo(map);

  userPopUp = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([current_lng, current_lat])
    .setHTML(`${place_name}`)
    .addTo(map);

  displayData(current_lat, current_lng);

})


//Allow the user to zoom in/out
map.addControl(new mapboxgl.NavigationControl());


//functions
function setMarker(lat, lng, map1){
  var marker = new mapboxgl.Marker()
  .setLngLat([lng, lat])
  .addTo(map1);
  currentMarkers.push(marker);
}

function setPopup(lat, lng, map1, text){
  var popup = new mapboxgl.Popup({ closeOnClick: true })
  .setLngLat([lng, lat])
  .setHTML(`<p>${text}</p>`)
  
  .addTo(map1);
  currentPopups.push(popup)
}

//Make sure that when a different restaurant is chosen,
//it won't show the popup and marker of the previous restaurant.
function clearPopupAndMarker(){
  closeSideBar();
  if (currentPopups!==null) {
    for (var i = currentPopups.length - 1; i >= 0; i--) {
      currentPopups[i].remove();
    }
  }

  if (currentMarkers!==null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
  }
}

//Clear everything -  marker, popups and routes when the
//user uses the search bar to find the nearest restaurant of a location.
function clearEverything(){
  if (userMarker){
    userMarker.remove();
  }
  if (userPopUp){
    userPopUp.remove();
  }
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  }

  $('#sidebarContent').empty();
  $('#viewResBut').css('display','flex');

}



//When a restaurant is selected, navigate to the place on the map.
function navigateTo(placeInfo, eLat, eLng){

    var start = [current_lng, current_lat];
    var end = [eLng, eLat]

    map.flyTo({
      center: [eLng, eLat],
      zoom : 17
      });

    clearPopupAndMarker();

    setMarker(eLat, eLng, map)
    closeSideBar();

  
    setPopup(eLat, eLng, map, placeInfo);
    
    //Fetch the nearest route;
    var url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${accessToken}`;
    fetch(url)
    .then(response => response.json())
    .then(function (result){
      var data = result.routes[0];
      var route = data.geometry.coordinates;

      var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };

    // if the route already exists on the map, reset it using setData
    if (map.getSource('route')) {
   
      map.getSource('route').setData(geojson);
    } 
    else { // otherwise, make a new request
    
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
      map.getSource('route').setData(geojson);

    }

    });



}
