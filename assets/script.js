
const key = "d19a427e084cc28ea7bccbc2e7e39e2c";
//fetch today's date
const today = moment().format("DD/MM/YYYY");
console.log(today);

//function to get city name and display current forecast
$('#search-form').on('submit', function(event){
    event.preventDefault();
    var cityName = $('#search-input').val().trim();
    // console.log(cityName);
    //build url to get long and lat of the entered city
    const queryUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityName+ "&appid=" + key;

    $.ajax({
        url: queryUrlGeo,
        method: "GET"
    }).then(function(response){

        //display the city name
        const city = $('<h2>');
        city.text(response[0].name);
        $('#today').append(city);
        $('#today').addClass('border border-primary');

        //display today's date next to the city name
        const dateToday = $('<span>');
        dateToday.addClass('append-icon');
        dateToday.text(today);
        city.append(' (' + today +')');

        //build queryUrl to fetch weather forcast using lat long of entered city
        const lat = response[0].lat
        const long = response[0].lon
        const queryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" +"lon=" + long + "&units=metric&appid=" + key;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
    // console.log(response);
    //display current weather temp
    const tempDiv = $('<p>');
    tempDiv.text("Temp: " + response.list[0].main.temp + " °C");
    $('#today').append(tempDiv);

    //display current weather wind
    const windDiv = $('<p>');
    windDiv.text("Wind: " + response.list[0].wind.speed + " KPH");
    $('#today').append(windDiv);

    //display current weather humidity
    const humidityDiv = $('<p>');
    humidityDiv.text("Humidity: " + response.list[0].main.humidity + " %");
    $('#today').append(humidityDiv);

    //display current weather icon
    const icon = response.list[0].weather[0].icon;
    const iconEl = $('<img>');
    iconEl.attr('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
    city.append(iconEl);

    //Display 5 day forecast heading
    const fiveDayForecast = $('<h2>');
    fiveDayForecast.text('5-Day Forecast:');
    $('#forecast').append(fiveDayForecast);
    console.log(response);

    //Fetching 5 day forecast data from the api and display
    let date= response.list[0].dt;
    let dateToday= moment.unix(date).format("DD/MM/YYYY");

    for (i = 1; i < 40; i++) {
        // let dateFirst;
        let date = response.list[i].dt;
        dateNext = moment.unix(date).format("DD/MM/YYYY");

        


        if(dateToday !== dateNext){
            dateToday = dateNext;
            let temp = response.list[i].main.temp;
            let wind = response.list[i].wind.speed;
            let humidity = response.list[i].main.humidity;
            let icon = response.list[i].weather[0].icon;
            let iconI = $('<img>');
            iconI.attr('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
            let textToDisplay = dateToday+ " Temp: " +temp+ " Wind: " +wind+ " Humidity: " + humidity;

            //create cards for each day
            let card = $('<div>');
            card.addClass('card col-2 m-1');
            let cardBody = $('<div>');
            cardBody.addClass('card-body');
            cardBody.text(textToDisplay);
            card.append(cardBody);
            card.append(iconI)
            $('#forecast').append(card);
        }
    }
  });
});
})
