$(document).ready(function() {

//Add eventlistner to the form search to display weather forecast of the searched city
    $('#search-form').on('submit', function(event){
        event.preventDefault();
        //clear previous searched weather details
        weatherSearch()
    });
});

//Function to display current weather and 5 day forecast of the searched city
function weatherSearch(city){
    $('#today').empty();
    $('#forecast').empty();
    const key = "d19a427e084cc28ea7bccbc2e7e39e2c";
    const today = moment().format("DD/MM/YYYY");
    let cityName;
         
    cityName = city || $('#search-input').val().trim();
    
    //build url to get long and lat of the entered city
    const queryUrlGeo = "https://api.openweathermap.org/geo/1.0/direct?q=" +cityName+ "&appid=" + key;

    $.ajax({
        url: queryUrlGeo,
        method: "GET"
    }).then(function(response){
        
        //display the city name and date for today's weather
        const city = $('<h2>').text(response[0].name);
        $('#today').append(city);
        $('#today').addClass('border border-dark');
        city.append(' (' + today +')');

        //Build queryUrl to fetch 5 day weather forcast using lat long of entered city
        const lat = response[0].lat
        const long = response[0].lon
        const queryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" +"lon=" + long + "&units=metric&appid=" + key;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){

            //Display current weather's temp, wind and humidity
            const tempDiv = $('<p>').text("Temp: " + response.list[0].main.temp + " °C").attr('style', 'padding:2px');

            const windDiv = $('<p>').text("Wind: " + response.list[0].wind.speed + " KPH").attr('style', 'padding:2px');

            const humidityDiv = $('<p>').text("Humidity: " + response.list[0].main.humidity + " %").attr('style', 'padding:2px');

            $('#today').append(tempDiv, windDiv, humidityDiv);

            //Display current weather icon next to date
            const icon = response.list[0].weather[0].icon;
            const iconEl = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
            city.append(iconEl);

            //Display 5 day forecast heading
            const fiveDayForecastHeading = $('<h2>').text('5-Day Forecast:').addClass('col-12');
            $('#forecast').append(fiveDayForecastHeading);
    
            //Fetching 5 day forecast data from the api and display in cards
            let date= response.list[0].dt;
            let dateToday= moment.unix(date).format("DD/MM/YYYY");

            for (let i = 1; i < 40; i++) {
                let date = response.list[i].dt;
                dateNext = moment.unix(date).format("DD/MM/YYYY");

                if(dateToday !== dateNext){
                    dateToday = dateNext;
                    let temp = response.list[i].main.temp;
                    let wind = response.list[i].wind.speed;
                    let humidity = response.list[i].main.humidity;
                    let icon = response.list[i].weather[0].icon;
                    let iconUrl = 'https://openweathermap.org/img/wn/' + icon + '.png';
                
                    //Create cards for each day
                    const cardsDiv = $('<div>').addClass('card col-10 col-sm-2 m-2 text-white bg-info');
                    const dateEl = $('<h6>').text(dateToday);
                    const iconEl = $('<img>').attr('src', iconUrl);
                    const tempEl = $('<p>').text('Temp: ' + temp + ' °C');
                    const windEl = $('<p>').text('Wind: ' + wind + ' KPH');
                    const humidityEl = $('<p>').text('Humidity: ' + humidity + '%');
                    cardsDiv.append(dateEl, iconEl, tempEl, windEl, humidityEl);
                    $('#forecast').append(cardsDiv);
                }
                
            }
        });
    });
    displayCityList();
}

//Function to store the searched city in the list and display under search button
function displayCityList(){
    let cityListArray = JSON.parse(localStorage.getItem('searchedCity')) || [];

    cityName = $('#search-input').val().trim();

    if(cityName.length) {
        if(!cityListArray.includes(cityName)){
        cityListArray.push(cityName);
        localStorage.setItem('searchedCity', JSON.stringify(cityListArray));
        }
        //Empty the button list to avoid repeating previously added buttons
        $('#history').empty();
        for(let i = 0; i < cityListArray.length; i++) {
            let historyButton = $('<button>').text(cityListArray[i]);
            historyButton.click(function(){
                
                weatherSearch(cityListArray[i]);
            })

            historyButton.addClass('btn btn-secondary btn-block');
            $('#history').prepend(historyButton);
        }
        return;
    }
}







    