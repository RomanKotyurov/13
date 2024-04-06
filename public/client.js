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
        temp.innerText = 'Температура: ' + resJson.temp + ' C'

        let reslog = await fetch('api/log')
        let reslogJson = await reslog.json()
        console.log(reslogJson)

        let logElement = document.getElementById('log')
        let logString = '<div> История наблюдений за погодой </div> <div> --- </div> '
        
        for (const weatherLog of reslogJson) {
            logString += 
            `<div>${weatherLog.date}</div>
            <div>${weatherLog.city},    ${weatherLog.weather},   температура: ${weatherLog.temp} C </div>
            <div> --- </div>`    
        }
        logElement.innerHTML = logString
        
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