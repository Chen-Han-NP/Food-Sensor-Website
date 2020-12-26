fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(function (data){
        console.log(data.results[0].gender);
        $(`#content`).text(`\n${data.results[0].gender}`);
    });