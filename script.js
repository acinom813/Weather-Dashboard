var APIKey = "8be70af8b0843b55f72823c370fc7eb2";

//declare variables
var currentUvIndex = $("#uv-index");
var currentTemperature = $("#temperature");
var currentHumidity = $("#humidity");

var cities = localStorage.getItem("cityObject") ? JSON.parse(localStorage.getItem("cityObject")) : []
//if there is nothing in the local storage then it will return an empty array. Otherwise produce each item in the array as an object

//1.City name is entered, search is conducted with API: create button with event listener

$("#search-button").on("click", function (event) {
  event.preventDefault();
  var cityName = $(".city-name").val();
  displayWeather(cityName)
cities.push(cityName)
 
localStorage.setItem("cityObject",  JSON.stringify(cities)); //stores the array cityObject into the localStorage, takes the object and creates a string of ea. city name

displayCities () //displays the city within the search field

});

function displayWeather(cityName){
  console.log(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
  );
  getWeather(cityName);
  getForecast(cityName);
}


function displayCities() {  //this function calls the selector city-list to display searched cities and stores them
  $(".city-list").empty()
  console.log(cities)
  for (let i = 0; i < cities.length; i++) {
      $(".city-list").append(`<li class="list-group-item">${cities[i]}</li>`)
    
  }
  $(".city-list").on("click", function (){   //on click that will allow city name within the list to be clicked to retrieve weather.
    var cityName = $(this).text()
    displayWeather(cityName)
  })
}

 displayCities() //globally calls the appended li 
 displayWeather(cities[cities.length-1])// calls the array of cities and shows the most recent index.

//2.API returns current weather conditions for the city to include: city name, date,
//temperature, humidity, wind speed, using function to call each element

function getWeather(cityName) {
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`,
    method: "GET",
  }).then(function (currentWeather) {
    var currentDate = moment(currentWeather.dt, "X").format("(MM/DD/YYYY)");
    var iconcode = currentWeather.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    //console.log("currentWeather", currentWeather)
    UVIndex(currentWeather.coord.lon, currentWeather.coord.lat);
    $("#current-weather").html(`  
       <h4 id="current-city"> ${currentWeather.name} ${currentDate} <img src="${iconurl}"/>  </h4>
       <p>Temperature:
           <span class="current" id="temperature">${currentWeather.main.temp}</span>
       </p>
       <p>Humidity:</p>
       <span class="current" id="humidity">${currentWeather.main.humidity}</span>
       <p>Wind Speed:</p>
       <span class="current" id="wind-speed">${currentWeather.wind.speed}</span>
       
       </div> `);
  });
}

function UVIndex(ln, lt) {
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (currentWeather) {
    // console.log("uVIndex", currentWeather);
    $(currentUvIndex).html(`<p>UV Index:</p>
            <span class="current" id="uv-index">${currentWeather.value}</span>`);
  });
}

//3. 5-day forecast is displayed for the searched city and includes: date, weather icon,
// humidity, and temperature.

function getForecast(cityName) {
  var dayend = false;
  var queryforecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryforecastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
   var index = 0;
    for (let i = 0; i < response.list.length; i++) {
      
      if (response.list[i].dt_txt.includes("3:00")) {
        var date = moment(response.list[i].dt, "X").format("MM/DD/YYYY");
        var iconcode = response.list[i].weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
        var tempF = response.list[i].main.temp;
        var humidity = response.list[i].main.humidity;

        $("#fDate" + index).html(date);
        $("#fImg" + index).html("<img src=" + iconurl + ">");
        $("#fTemp" + index).html(tempF + "&#8457");
        $("#fHumidity" + index).html(humidity + "%");
        index++;
      }
     
      
    }
  });
}



