const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// calling the listne event in a function //
search.addEventListener('click', () => {

    //using api key from open weather api

    const APIkey = 'cd6af3beef078d2976aff5286f791eff'
    const city = document.querySelector('.search-box input').value;

    if (city === '')
    return;

    //api is featching
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display ='none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.dispaly = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'image/sun.png';
                    break;

                case 'Rain':
                    image.src = 'image/rainy-day.png';
                    break;

                case 'Snow':
                    image.src = 'image/snowy.png';
                    break;

                case 'Clouds':
                    image.src = 'image/partly-cloudy.png';
                    break;

                case 'Haze':
                    image.src = 'image/haze.png';
                    break;

                case 'Mist':
                    image.src = 'image/haze.png';
                    break;    

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


    });
    
});
