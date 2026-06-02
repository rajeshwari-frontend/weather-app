const apiKey = "84bcc3462a1e93a48fa76677f40e1c2d";


const searchBtn =
document.getElementById("searchBtn");

searchBtn.addEventListener(
    "click",
    getWeather
);

document
.getElementById("cityInput")
.addEventListener(
    "keypress",
    function(event){

        if(event.key === "Enter"){
            getWeather();
        }

    }
);

async function getWeather(){

    const city =
    document
    .getElementById("cityInput")
    .value
    .trim();

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response =
        await fetch(url);

        const data =
        await response.json();

        if(data.cod != 200){

            document
            .getElementById("weatherResult")
            .innerHTML = `
            <p class="error">
                ❌ City Not Found
            </p>
            `;

            return;
        }

        document
        .getElementById("weatherResult")
        .innerHTML = `

        <div class="weather-card">

            <div class="city">
                📍 ${data.name}
            </div>

            <img
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
            alt="Weather Icon">

            <div class="temp">
                ${Math.round(data.main.temp)}°C
            </div>

            <div class="condition">
                ${data.weather[0].main}
            </div>

            <div class="details">

                <div class="box">
                    <h3>💧</h3>
                    <p>${data.main.humidity}%</p>
                    <small>Humidity</small>
                </div>

                <div class="box">
                    <h3>🌬</h3>
                    <p>${data.wind.speed} m/s</p>
                    <small>Wind Speed</small>
                </div>

            </div>

        </div>
        `;

    }
    catch(error){

        document
        .getElementById("weatherResult")
        .innerHTML = `
        <p class="error">
            ⚠ Something went wrong
        </p>
        `;

        console.log(error);

    }
}

