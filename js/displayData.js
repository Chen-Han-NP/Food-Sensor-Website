accessToken = 'pk.eyJ1IjoiY2hhbmNlLW5wIiwiYSI6ImNramptc3NpbjFsZmQycW83Z2ZkeHg3ZDgifQ.lbjTyfFz_95mpdQbLpM6qg'

function displayData(lat,lng){

    $('#viewResBut').css('display','flex');
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?types=poi&proximity=${lng},${lat}&access_token=${accessToken}`
              fetch(url)
              .then(response => response.json())
              .then(function (data){
  
              console.log(data.features);

              $('#viewResBut').text(`Found ${data.features.length} Restaurants`)


              for (var i = 0; i < data.features.length; i++){
                var result = data.features[i];
                var result_lat = result.geometry.coordinates[1];
                var result_lng = result.geometry.coordinates[0];
                $('#mySidebar').append(`<button type="button" class="btn btn-danger" onclick="navigateTo(${result_lat}, ${result_lng})">${result.text}</button>`)
                $('#mySidebar').append(`<p class='restaurant_cat'> Category: ${result.properties.category} </p>`)
                $('#mySidebar').append(`<p class='restaurant_add'> ${result.properties.address} </p>`)
                
                popup = new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat([result_lng, result_lat])
                .setHTML(`${result.place_name}`)
                .addTo(map);
                   
              }

            });
    /*
    for (var i = 0; i<localStorage.length; i++){
        var keyname = 'results' + i;
        var results = JSON.parse(localStorage.getItem(keyname));
        //console.log(results)
        
        
        $('#viewResBut').text(`Found ${localStorage.length} Restaurants`)

        $('#mySidebar').append(`<a>${results.name}</a>`)

    }
    */
  
}

