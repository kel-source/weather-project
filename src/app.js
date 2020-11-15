function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[now.getMonth()];
  return `${day} ${date} ${month} | ${formatHours(timestamp)}`;
  }

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
  
  function showLocationData(response) {
    city = response.data.name;
    let country = response.data.sys.country;
    let h1 = document.querySelector("h1");
    let weatherDescription = response.data.weather[0].description;
    let showWeatherDescription = document.querySelector("#weather-description");
    temperatureCelcius = Math.round(response.data.main.temp);
    let h2 = document.querySelector("#temperature");
    let humidity = Math.round(response.data.main.humidity);
    let showHumidity = document.querySelector("#humidity");
    let windSpeed = Math.round(response.data.wind.speed);
    let showWindSpeed = document.querySelector("#wind-speed");
    let showBeaufortScale = document.querySelector("#beaufort-scale");
    let todayDate = document.querySelector("#today-date");
    let icon = document.querySelector("#icon");
    let showWeatherIcon = response.data.weather[0].icon;
  
    h1.innerHTML = `${city} (${country})`;
    showWeatherDescription.innerHTML = weatherDescription;
    h2.innerHTML= temperatureCelcius;
    showHumidity.innerHTML = humidity;
    showWindSpeed.innerHTML = windSpeed;
    if (windSpeed <= 2) {
    showBeaufortScale.innerHTML = "Calm".fontcolor("#D2D3C9");
    } else if (windSpeed <= 5) {
      showBeaufortScale.innerHTML= "Light air".fontcolor("#41AEA9");
    } else if (windSpeed <= 11) {
      showBeaufortScale.innerHTML = "Light breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 19) {
      showBeaufortScale.innerHTML = "Gentle breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 28) {
      showBeaufortScale.innerHTML = "Moderate breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 38) {
      showBeaufortScale.innerHTML = "Fresh breeze".fontcolor("#41AEA9");
    } else if (windSpeed <= 49) {
      showBeaufortScale.innerHTML = "Strong breeze".fontcolor("#F6830F");
    } else if (windSpeed <= 61) {
      showBeaufortScale.innerHTML = "High wind".fontcolor("#F6830F");
    } else if (windSpeed <= 74) {
      showBeaufortScale.innerHTML = "Gale".fontcolor("#F6830F");
    } else if (windSpeed <= 88) {
      showBeaufortScale.innerHTML = "Strong gale".fontcolor("#F6830F");
    } else if (windSpeed <= 102) {
      showBeaufortScale.innerHTML = "Storm".fontcolor("#A20A0A");
    } else if (windSpeed <= 117) {
      showBeaufortScale.innerHTML = "Violent storm".fontcolor("#A20A0A");
    } else if (windSpeed >= 118) {
      showBeaufortScale.innerHTML = "Hurricane force".fontcolor("#A20A0A");
    }
    todayDate.innerHTML = formatDate(response.data.dt * 1000);
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${showWeatherIcon}@2x.png`);
    icon.setAttribute("alt", weatherDescription);
  }
  
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecastApi = null;

  for (let index = 0; index < 6; index++) {
    forecastApi = response.data.list[index];
    forecastElement.innerHTML += 
    `<div class="col 2">
      <div class="row">
        <div class="col times">
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
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", getLocationData);
  let enterCity = document.querySelector("#city-enter");
  enterCity.addEventListener("submit", cityInputValue);
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", showCelciusTemperature);

  citySubmit("London");