let loadButton = document.getElementById('loadButton')
loadButton.onclick = () => {

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('latitude: ' + latitude);
        console.log('longitude: ' + longitude);

        let res = await fetch(`api/weather?lat=${latitude}&lon=${longitude}`)
        let resJson = await res.json()

        console.log(resJson)

        let name = document.getElementById('name')
        name.innerText = 'Ваша локация: ' + resJson.city

        let weather = document.getElementById('weather')
        weather.innerText = 'Сейчас ' + resJson.weather

        let temp = document.getElementById('temp')
        temp.innerText = 'Температура: ' + Math.round(resJson.temp - 273) + ' C'

        let hum = document.getElementById('hum')
        hum.innerText = 'Влажность: ' + resJson.humidity + ' %'

        let press = document.getElementById('press')
        press.innerText = 'Давление: ' + Math.round(resJson.pressure / 1.33321995)  + ' мм. рт. ст.'

        let wind = document.getElementById('wind')
        wind.innerText = 'Ветер: ' + resJson.speed  + ' м/сек'

        let picture_bg = document.getElementById('picture-bg')
        picture_bg.classList.toggle('display-none')

        let picture = document.getElementById('picture')
        picture.src = `https://openweathermap.org/img/wn/${resJson.icon}@2x.png`
        
      }
    
      function error() {
        let name = document.getElementById('name')
        name.innerText = "Невозможно получить ваше местоположение"
      } 
      if (!navigator.geolocation) {
        let name = document.getElementById('name')
        name.innerText = "Геолокация не поддерживается вашим браузером";
      } else {
        let name = document.getElementById('name')
        name.innerText  = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
      }
}