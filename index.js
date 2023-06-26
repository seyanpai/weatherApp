const apiKey = 'aae4bf859697220bce925270ad74cce2';

const weatherData = document.getElementById('weather-data');

const cityInput = document.getElementById('city-input');

const formElement = document.querySelector('form');

const imgIcon = document.getElementById('icon');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue); //call this function
});

async function getWeatherData(cityValue) { //use async for await
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`); //await for fetch

        if(!response.ok) {//.ok if it returns a result
            throw new Error('Network not ok');
        }

        //need to parse to json / convert response to data / json
        const data = await response.json();

        //console.log(data);//to view the objects in console
        
        //get the data
        const temp = Math.round(data.main.temp - 273.15);
        const clouds = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = {
            feelsLike: Math.round(data.main.feels_like - 273.15),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };

        //manipulation
        //icon
        imgIcon.src = `http://openweathermap.org/img/wn/${icon}.png`
        //temp
        document.querySelector('.temp').innerHTML = `${temp}°C`;
        //status
        document.querySelector('.cloudStatus').innerHTML = clouds.toUpperCase();
        //feelslike
        document.querySelector('.feels-like').innerHTML = `${details.feelsLike}°C`;
        //humidity
        document.querySelector('.humidity').innerHTML = `${details.humidity}%`;
        //windSpeed
        document.querySelector('.wind-speed').innerHTML = `${details.windSpeed}m/s`;

    } catch (error) {
        alert("Enter valid city. Try again.");
    }
}