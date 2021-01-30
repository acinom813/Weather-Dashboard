var APIKey="8be70af8b0843b55f72823c370fc7eb2";
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={8be70af8b0843b55f72823c370fc7eb2}



//1.City name is entered, search is conducted with API: create button with event listener

$("#search-button").on("click", function(event){
    event.preventDefault()
   var cityName = $(".city-name").val()
   console.log  (`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
   displayWeather(cityName)

})

//2.API returns current weather conditions for the city to include: city name, date,
//temperature, humidity, wind speed, using function to call each element

function displayWeather(cityName){
    $.ajax ({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&uvi?lat={lat}&lon={lon}&units=imperial&&appid=${APIKey}`,
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
    <span class="current" id="uv-index">${currentWeather.coord.lon.lat}</span>
       </div> `)
     })
}


//3. 5-day forecast is displayed for the searched city and includes: date, weather icon,
// humidity, and temperature.
function fiveDay(cityid){
    var dayend = false;
    var queryforecastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+'&appid='+APIKey;
    $.ajax({
        url:queryforecastURL,
        method:"GET"
    
    }).then(function(response) {
        for (let i = 0; i < 5; i++) {
            var date = new Date((response.list[((i+1) *8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempK= response.list [((i+1)*8)-1].main.temp;
            var tempF = (((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
            
            $('#fDate'+ i).html(date);
            $('#fImg'+ i).html("<img src="+ iconurl+">");
            $('#fTemp' + i).html(tempF+"&#8457");
            $('#fHumidity' + i).html(humidity+'%');

            
        }

});




//4.City name is stored to localStorage for user to retrieve at later time.

function storeCity(){
    var elList = document.getElementById("city-list");
    $(elList).attr('class', 'city-list');
    $('.city-list').append(elList);
}


/*$(".list-group-item").on("click", function () {
    var cityName = localStorage.getItem("cityName");
})*/