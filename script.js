var APIKey="8be70af8b0843b55f72823c370fc7eb2";
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={8be70af8b0843b55f72823c370fc7eb2}
var citiesSearched= document.querySelector ("cities");
var searchButton = ("search-button")
var currentCity = ("c")




$("#search-button").on("click", function(event){
    event.preventDefault()
   var cityName = $(".city-name").val()
   console.log  (`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
   displayWeather(cityName)

})

function displayWeather(cityName){
    $.ajax ({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`,
        method:"GET"
    }).then(function(currentWeather){
        var currentDate = moment(currentWeather.dt, "X").format("(MM/DD/YYYY)")
        var iconcode = currentWeather.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        console.log("currentWeather", currentWeather)
       $("#current-weather").html(`  
       <h4 id="current-city"> ${currentWeather.name} ${currentDate} <img src="${iconurl}"/>  </h4>
       <p>Temperature:
           <span class="current" id="temperature">${currentWeather.main.temp}</span>
       </p>
       <p>Humidity:</p>
       <span class="current" id="humidity">${currentWeather.main.humidity}</span>
       <p>Wind Speed:</p>
       <span class="current" id="wind-speed">${currentWeather.wind.speed}</span>
       <p>UV Index:</p>
       <span class="current" id="uv-index"></span>
       </div> `)
     })
}


//1.City name is entered, search is conducted with API
//2.API returns current weather conditions for the city to include: city name, date,
//temperature, humidity, wind speed, and UV index.
//3. 5-day forecast is displayed for the searched city and includes: date, weather icon,
// humidity, and temperature.
//4.City name is stored to localStorage for user to retrieve at later time.