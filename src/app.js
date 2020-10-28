//Current Location Date & Time
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let date = now.getDate();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = `${day} ${date} ${month} | ${hours}:${minutes}`;

//Location Data
function showLocationData(response) {
  console.log(response.data);
  //City & Country
  let city = response.data.name;
  let country = response.data.sys.country;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city} (${country})`;
  //Weather
  let weatherDescription = response.data.weather[0].description;
  let showWeatherDescription = document.querySelector("#weather-description");
  showWeatherDescription.innerHTML = `${weatherDescription}`;
  // //Sunrise
  // let unix = response.data.sys.sunrise;
  // let date = new Date(unix*1000);
  // console.log(date);
  //Temperature (C/F)
  let temperatureCelcius = Math.round(response.data.main.temp);
  let temperatureFarenheit = Math.round(temperatureCelcius *9/5 + 32);
  let h2 = document.querySelector("h2");
  h2.innerHTML=`<strong>${temperatureCelcius}°C</strong> <small>/${temperatureFarenheit}°F</small>`;
  //Humidity
  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}%`;
  //Wind Speed
  let windSpeed = Math.round(response.data.wind.speed);
  let showWindSpeed = document.querySelector("#wind-speed");
  showWindSpeed.innerHTML = `${windSpeed}km/h`;
}

//Current Location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bbf0836e2ed0d460df9b8ac5448ab908";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocationData);
}

function getLocationData() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector(".btn-success");
currentButton.addEventListener("click", getLocationData);


//Other Location
function citySubmit(event) {
  event.preventDefault();
  let h1Change = document.querySelector("#city");
  let apiKey = "bbf0836e2ed0d460df9b8ac5448ab908";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1Change.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocationData);
}

let enterCity = document.querySelector("#city-enter");
enterCity.addEventListener("submit", citySubmit);


