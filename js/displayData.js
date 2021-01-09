accessToken = 'pk.eyJ1IjoiY2hhbmNlLW5wIiwiYSI6ImNramptc3NpbjFsZmQycW83Z2ZkeHg3ZDgifQ.lbjTyfFz_95mpdQbLpM6qg'

//This function display all the nearby restaurants on the screen for the user
function displayData(current_lat,current_lng){
    //First, set the viewResult button to visible for the users
    $('#viewResBut').css('display','flex');

    //This list stores the original coordinates.
    var from = [current_lng, current_lat];

    //The bounds list stores a rectangle area that restrict the search area.
    var bounds = [current_lng-0.004, current_lat-0.004, current_lng+0.004, current_lat+0.004]

    //Request to the geocoding API to find the 10 nearest restaurants within the bounds of the current location.
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?types=poi&proximity=${current_lng},${current_lat}&bbox=${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]}&country=SG&limit=10&access_token=${accessToken}`
    fetch(url)
    .then(response => response.json())
    .then(function (data){

        //Display on the button how many restaurants are found.
        $('#viewResBut').text(`Found ${data.features.length} Restaurants`)

        //Now find the distance using turf.js external js lib of each restaurant to the current location and store it in the data object.
        var options = { units: 'kilometers' };
        data.features.forEach(function(store) {
            Object.defineProperty(store.properties, 'distance', {
                value: Math.round(turf.distance(from, store.geometry, options) * 1000, 0),
                writable: true,
                enumerable: true,
                configurable: true
            });
        });

        //Using a sort function to arrange the restaurants according to the distance
        data.features.sort(function(a, b) {
            if (a.properties.distance > b.properties.distance) {
              return 1;
            }
            if (a.properties.distance < b.properties.distance) {
              return -1;
            }
            return 0; // a must be equal to b
          });
          
        //Using a for loop to loop thru the sorted data and display them on the sidebar
        for (var i = 0; i < data.features.length; i++){

            var result = data.features[i];

            var result_lat = result.geometry.coordinates[1];
            var result_lng = result.geometry.coordinates[0];

            var distance = result.properties.distance;
            var place_info = result.place_name;
            
            $('#mySidebar').append(`<button type="button" class="btn btn-danger btn-sm" onclick="navigateTo(${result_lat}, ${result_lng}, ${place_info})">${result.text}</button>`)
            $('#mySidebar').append(`<p class='restaurant_cat'> Category: ${result.properties.category} </p>`)
            $('#mySidebar').append(`<p class='restaurant_dist'> Distance: ${distance}m</p>`)
            $('#mySidebar').append(`<a class='restaurant_add' href="javascript:void(0)" onclick="navigateTo(${result_lat}, ${result_lng}, ${place_info})"> <u>${result.properties.address} </u></a>`)
            
            //create a popup


            
        }
        


        

    });
}

/*
async function getDistance(access_token, from, to){
    var url =  `https://api.mapbox.com/directions/v5/mapbox/walking/${from[0]},${from[1]};${to[0]},${to[1]}?access_token=${access_token}`
    return await fetch(url)
    .then(response => response.json())
    .then(function (data){
        var distance = Math.round(data.routes[0].distance,0);
        var walkingTime = Math.round(data.routes[0].duration / 60, 0);
        //console.log("Data: ", data);
        //console.log("Distance search: ", distance, walkingTime);
        return [distance, walkingTime];
    });

}
*/
