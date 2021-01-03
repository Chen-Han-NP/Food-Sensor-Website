
function displayData(){
    for (var i = 0; i<localStorage.length; i++){
        var keyname = 'results' + i;
        var results = JSON.parse(localStorage.getItem(keyname));
        console.log(results)
        
        $('#viewResBut').css('display','flex');
        $('#viewResBut').text(`Found ${localStorage.length} Restaurants`)

        $('#mySidebar').append(`<a>${results.name}</a>`)

    }
  
}