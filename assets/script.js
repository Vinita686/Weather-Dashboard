
const key = "d19a427e084cc28ea7bccbc2e7e39e2c";
//display today's date
const today = moment().format("DD/MM/YYYY");
console.log(today);

//function to get lat and long from geocoding api
$('#search-form').on('submit', function(event){
    event.preventDefault();
    var cityName = $('#search-input').val()
    console.log(cityName);
    // $('#today').text(cityName);
    //
    const queryUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityName+ "&appid=" + key;

    $.ajax({
        url: queryUrlGeo,
        method: "GET"
    }).then(function(response){
        
        const lat = response[0].lat
        const long = response[0].lon
        //build queryUrl to fetch weather forcast
        const queryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" +"lon=" + long + "&appid=" + key;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
    console.log(response);
    const temp = response.list[0].main.temp
    console.log(temp);

    })
});
});
