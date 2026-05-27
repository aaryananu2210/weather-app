let cityInput = document.querySelector("#cityInput");
let button = document.querySelector("#btn");

let city = document.querySelector("#city");
let temp = document.querySelector("#temp");
let condition = document.querySelector("#condition");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windspeed");

let resetButton = document.querySelector("#resetBtn");
let weatherIcon = document.querySelector("#weatherIcon");

function clearWeather() {
    city.innerText = "";
    temp.innerText = "";
    condition.innerText = "";
    humidity.innerText = "";
    windSpeed.innerText = "";

    weatherIcon.src = "";
}

function getWeather() {

    let cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        + cityName
        + "&appid="
        + API_KEY
        + "&units=metric"
    )

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        console.log(data);

        if (data.cod == 200) {

            city.innerText =
            "📍 " + data.name;

            temp.innerText =
            "🌡️ TEMPERATURE: "
            + data.main.temp + "°C";

            condition.innerText =
            "☁️ WEATHER: "
            + data.weather[0].main;

            humidity.innerText =
            "💧 HUMIDITY: "
            + data.main.humidity + "%";

            windSpeed.innerText =
            "💨 WIND SPEED: "
            + data.wind.speed + " Km/h";

            let iconCode =
            data.weather[0].icon;

            weatherIcon.src =
            "https://openweathermap.org/img/wn/"
            + iconCode
            + "@2x.png";

        } else {

            city.innerText =
            "❌ City not found / API issue";

            temp.innerText = "";
            condition.innerText = "";
            humidity.innerText = "";
            windSpeed.innerText = "";

            weatherIcon.src = "";
        }
    })

    .catch(function () {
        city.innerText =
        "❌ Something went wrong";
    });
}

button.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeather();
    }

    if (event.key === "Escape") {
        cityInput.value = "";
        clearWeather();
    }
});

resetButton.addEventListener("click", function () {
    cityInput.value = "";
    clearWeather();
});