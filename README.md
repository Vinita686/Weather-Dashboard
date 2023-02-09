# Weather-Dashboard

## Description : 
This project is a Weather Dashboard application that will run in the browser and feature dynamically updated HTML and CSS. The application allows the user to get
current weather conditions of a city and also 5 day's forecast.


## Usage : 
- When a user enters a city name in the search bar, they are presented with current and future conditions for that city and that city is added to the search history.
- When a user views the current weather conditions for that city they are presented with:
1. The city name.
2. The date.
3. An icon representation of weather conditions.
4. The temperature
5. The humidity
6. The wind speed
- It also presents the future weather conditions for that city they with a 5-day forecast that displays:
1. The date
2. An icon representation of weather conditions
3. The temperature
4. The humidity
- When a user clicks on a city in the search history they are again presented with current and future conditions for that city.


## Mock-Up :
The following image shows the screenshot of the application 
![Screenshot](/assets/images/Screenshot.png)


## Key Features: 
- Two different endpoints were used to retrieve the required weather data from OpenWeatherMap APIs.
- localStorage is used to store persistent data.
- jQuery event listeners are used to identify whether a user wishes to search for a city (including past city).
- Moment.js is used to convert unix timestamp to MM/DD/YYYY format.
- New buttons were created for each searched city using jquery.
- Bootstrap classes were used for styling of new components (e.g. cards for each day of the five day forecast).



## Link :

Deployed Application URL : https://vinita686.github.io/Weather-Dashboard/


