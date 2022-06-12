var city = document.getElementById("cityInput");
var searchBtn = document.querySelector("#searchBtn");
var localCityEl = document.querySelector("#city");
var temperatureEl = document.querySelector('#temperature');
var windSpeedEl = document.querySelector('#wind-speed');
var humidityEl = document.querySelector('#humidity');
var uvEl = document.querySelector('#uv-index');
var ApiKey = "fa7d52ba051ca9699cdf472c349d267c";
var newCityBtn = document.getElementsByClassName("list")
var mainIcon = document.getElementById("mainIcon")

var formerCities = JSON.parse(localStorage.getItem(pastSearches))

if (formerCities){
  var pastSearches = formerCities
}

//searches
var pastSearches = []

//forecast data
var forecastDatesEl = document.getElementById("forecast-dates")
var iconEl = document.getElementById("icon")
var forecastTempEl = document.getElementById("forecast-temperature")
var forecastWindEl = document.getElementById("forecast-wind-speed")
var forecastHumidityEl = document.getElementById("forecast-humidity")

//forecast day 2 
var forecast1DatesEl = document.getElementById("forecast-dates1")
var icon1El = document.getElementById("icon1")
var forecast1TempEl = document.getElementById("forecast-temperature1")
var forecast1WindEl = document.getElementById("forecast-wind-speed1")
var forecast1HumidityEl = document.getElementById("forecast-humidity1")

//forecast day 3 
var forecast2DatesEl = document.getElementById("forecast-dates2")
var icon2El = document.getElementById("icon2")
var forecast2TempEl = document.getElementById("forecast-temperature2")
var forecast2WindEl = document.getElementById("forecast-wind-speed2")
var forecast2HumidityEl = document.getElementById("forecast-humidity2")

//forecast day 4 
var forecast3DatesEl = document.getElementById("forecast-dates3")
var icon3El = document.getElementById("icon3")
var forecast3TempEl = document.getElementById("forecast-temperature3")
var forecast3WindEl = document.getElementById("forecast-wind-speed3")
var forecast3HumidityEl = document.getElementById("forecast-humidity3")

//forecast day 5 
var forecast4DatesEl = document.getElementById("forecast-dates4")
var icon4El = document.getElementById("icon4")
var forecast4TempEl = document.getElementById("forecast-temperature4")
var forecast4WindEl = document.getElementById("forecast-wind-speed4")
var forecast4HumidityEl = document.getElementById("forecast-humidity4")


  // CITY DATA
  function apiParameters(event) {
    console.log(event.target)

    //Check the event.target.innerHTML
    event.target.innerHTML
    //if that value is equal to Search, we know the user clicked the search button, so we should use city.value in our queryURL
    if (event.target.className === "list") {
      console.log("hit")
    }
    //if that value is something else, we should use event.target.HTML since it will be the city value already clicked


    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city.value + "&appid=" + ApiKey; 
      fetch(queryURL)
      .then(function(getApi){
        return getApi.json();
      })
      .then(function (data) {
        document.querySelector("#forecast").classList.remove("hide")

        var unixTime = data.dt * 1000
        var today = moment(unixTime).format("M/D/YYYY")
        var imageElement = document.createElement("img");

      localCityEl.textContent = data.name + " " + today + " " + data.weather[0].icon;
      windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
      humidityEl.textContent = "Humidity: " + data.main.humidity + " %";

      //temp data for Farheinheit
        return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=" + ApiKey + "&units=imperial")
      }) .then(function (response) {
          return response.json();
      })  
      .then (function (tempData) {
      console.log(tempData)
      temperatureEl.textContent = "Temp: " + tempData.main.temp + " deg F";

        var lat = tempData.coord.lat
        var lon = tempData.coord.lon

    //UV Index
      return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + ApiKey)
      }) .then(function (response) {
          return response.json();
      })  
      .then (function (data1) {
      console.log(data1)
      uvEl.textContent = "UV Index: " + data1.current.uvi

        if (data1.current.uvi < 4) {
          uvEl.classList.add("green")
        } else if (data1.current.uvi < 8) {
          uvEl.classList.add(".yellow")
        } else {
          uvEl.classList.add("red");
        }
      
      var lat1 = data1.lat;
      var lon1 = data1.lon;
      
      // 5 Day Forecast
      return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat1 + "&lon=" + lon1 + "&units=imperial&appid=" + ApiKey)
      }) .then(function (forecast) {
          return forecast.json();
      })  
      .then (function (forecastData) {
      console.log(forecastData)

      //tomorrow date
      var unixTomorrow = (forecastData.list[1].dt_txt)
      var tomorrow = moment(unixTomorrow).format("M/D/YYYY")

      //2nd day date
      var unixSecond = (forecastData.list[9].dt_txt)
      var secondDay = moment(unixSecond).format("M/D/YYYY")

      //3rd day date
      var unixThird = (forecastData.list[18].dt_txt)
      var thirdDay = moment(unixThird).format("M/D/YYYY")

      //4th day
      var unixFourth = (forecastData.list[27].dt_txt)
      var fourthDay = moment(unixFourth).format("M/D/YYYY")

      //5th day
      var unixFifth = (forecastData.list[36].dt_txt)
      var fifthDay = moment(unixFifth).format("M/D/YYYY")


      for (var i = 8; i < forecastData.list[i]; i + 8);

      forecastDatesEl.textContent = tomorrow + " " + forecastData.list[8].weather[0].icon;
      forecastTempEl.textContent = "Temp: " + forecastData.list[8].main.temp + " deg F"
      forecastWindEl.textContent = "Wind Speed: " + forecastData.list[8].wind.speed + " MPH"
      forecastHumidityEl.textContent = "Humidity: " + forecastData.list[8].main.humidity + " %"

      forecast1DatesEl.textContent = secondDay + " " + forecastData.list[16].weather[0].icon;
      forecast1TempEl.textContent = "Temp: " + forecastData.list[16].main.temp + " deg F"
      forecast1WindEl.textContent = "Wind Speed: " + forecastData.list[16].wind.speed + "MPH"
      forecast1HumidityEl.textContent = "Humidity: " + forecastData.list[16].main.humidity + " %"
      
      forecast2DatesEl.textContent = thirdDay + " " + forecastData.list[24].weather[0].icon;
      forecast2TempEl.textContent = "Temp: " + forecastData.list[24].main.temp + " deg F"
      forecast2WindEl.textContent = "Wind Speed: " + forecastData.list[24].wind.speed + "MPH"
      forecast2HumidityEl.textContent = "Humidity: " + forecastData.list[24].main.humidity + " %"

      forecast3DatesEl.textContent = fourthDay + " " + forecastData.list[32].weather[0].icon;
      forecast3TempEl.textContent = "Temp: " + forecastData.list[32].main.temp + " deg F"
      forecast3WindEl.textContent = "Wind Speed: " + forecastData.list[32].wind.speed + "MPH"
      forecast3HumidityEl.textContent = "Humidity: " + forecastData.list[32].main.humidity + " %"

      forecast4DatesEl.textContent = fifthDay + " " + forecastData.list[39].weather[0].icon;
      forecast4TempEl.textContent = "Temp: " + forecastData.list[39].main.temp + " deg F"
      forecast4WindEl.textContent = "Wind Speed: " + forecastData.list[39].wind.speed + "MPH"
      forecast4HumidityEl.textContent = "Humidity: " + forecastData.list[39].main.humidity + " %"
     
  
    });
  };

  


  //past Searches
  function pushCities() {
    pastSearches.unshift(city.value)

    var ul = document.querySelector("#history");
  localStorage.setItem("city", pastSearches)
  var liList = $("history")
  var li = document.createElement("button");
  li.textContent = pastSearches[0];
  liList.append(pastSearches[0])
  li.classList.add("list")
  ul.append(li)
  

  li.addEventListener("click", apiParameters)
  }


  searchBtn.addEventListener('click', apiParameters);
  searchBtn.addEventListener('click', pushCities);
