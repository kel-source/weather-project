//Current Location Date & Time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[now.getMonth()];
  return `${day} ${date} ${month} | ${formatHours(timestamp)}`;
  }

  //Forecast Hours
  function formatHours(timestamp) {
    let now = new Date(timestamp);
    let hours = now.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }
  
  //Location Data
  function showLocationData(response) {
    //City & Country
    city = response.data.name;
    let country = response.data.sys.country;
    let h1 = document.querySelector("h1");
    //Weather Description
    let weatherDescription = response.data.weather[0].description;
    let showWeatherDescription = document.querySelector("#weather-description");
    //Temperature
    temperatureCelcius = Math.round(response.data.main.temp);
    let h2 = document.querySelector("#temperature");
    //Humidity
    let humidity = Math.round(response.data.main.humidity);
    let showHumidity = document.querySelector("#humidity");
    //Wind Speed
    let windSpeed = Math.round(response.data.wind.speed);
    let showWindSpeed = document.querySelector("#wind-speed");
    let showBeaufortScale = document.querySelector("#beaufort-scale");
    //Date
    let todayDate = document.querySelector("#today-date");
    //Weather Icon
    let icon = document.querySelector("#icon");
    let showWeatherIcon = response.data.weather[0].icon;
  
    //City & Country
    h1.innerHTML = `${city} (${country})`;
    //Weather Description
    showWeatherDescription.innerHTML = weatherDescription;
    //Temperature
    h2.innerHTML= temperatureCelcius;
    //Humidity
    showHumidity.innerHTML = humidity;
    //Wind Speed
    showWindSpeed.innerHTML = windSpeed;
    if (windSpeed <= 2) {
    showBeaufortScale.innerHTML = "calm".fontcolor("#D2D3C9");
    } else if (windSpeed <= 5) {
      showBeaufortScale.innerHTML= "light air".fontcolor("#41AEA9");
    } else if (windSpeed <= 11) {
      showBeaufortScale.innerHTML = "light breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 19) {
      showBeaufortScale.innerHTML = "gentle breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 28) {
      showBeaufortScale.innerHTML = "moderate breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 38) {
      showBeaufortScale.innerHTML = "fresh breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 49) {
      showBeaufortScale.innerHTML = "strong breeze".fontcolor("#F6830F");
    } else if (windSpeed <= 61) {
      showBeaufortScale.innerHTML = "high wind".fontcolor("#F6830F");
    } else if (windSpeed <= 74) {
      showBeaufortScale.innerHTML = "gale".fontcolor("#F6830F");
    } else if (windSpeed <= 88) {
      showBeaufortScale.innerHTML = "strong gale".fontcolor("#F6830F");
    } else if (windSpeed <= 102) {
      showBeaufortScale.innerHTML = "storm".fontcolor("#A20A0A");
    } else if (windSpeed <= 117) {
      showBeaufortScale.innerHTML = "violent storm".fontcolor("#A20A0A");
    } else if (windSpeed >= 118) {
      showBeaufortScale.innerHTML = "hurricane force".fontcolor("#A20A0A");
    }
    //Date
    todayDate.innerHTML = formatDate(response.data.dt * 1000);
    //Weather Icon
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${showWeatherIcon}@2x.png`);
    icon.setAttribute("alt", weatherDescription);
  }
  
//Forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecastApi = null;

  for (let index = 0; index < 6; index++) {
    forecastApi = response.data.list[index];
    forecastElement.innerHTML += 
    `<div class="col 2">
      <div class="row">
        <div class="col day">
          ${formatHours(forecastApi.dt * 1000)}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <img src = "http://openweathermap.org/img/wn/${forecastApi.weather[0].icon}@2x.png"/>
        </div>
      </div>
      <div class="row">
        <div class="col forecastTemperatures">
          <strong>${Math.round(forecastApi.main.temp)}</strong>
        </div>
      </div>`;
      }
}

  //Current Location
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "bbf0836e2ed0d460df9b8ac5448ab908";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showLocationData);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
  }
  function getLocationData() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  //Other Location
  function citySubmit(city) {
    let apiKey = "bbf0836e2ed0d460df9b8ac5448ab908";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showLocationData);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
  }

  function cityInputValue(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city");
    citySubmit(cityInputElement.value);
  }

  //Temperature (F)
  function showFahrenheitTemperature(event) {
    event.preventDefault();
    let changeTemperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (temperatureCelcius * 9) / 5 + 32;
    changeTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    let apiKey = "bbf0836e2ed0d460df9b8ac5448ab908";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showForecast);
  }

  //Temperature (C)
  function showCelciusTemperature(event) {
    event.preventDefault();
    let changeTemperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    changeTemperatureElement.innerHTML = temperatureCelcius;

    citySubmit(city);
  }

  let city = null;
  let temperatureCelcius = null;

  //Current Location
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", getLocationData);

  //Other Location
  let enterCity = document.querySelector("#city-enter");
  enterCity.addEventListener("submit", cityInputValue);

  //Temperature (F)
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

  //Temperature (C)
  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", showCelciusTemperature);

  citySubmit("London");