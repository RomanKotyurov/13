const express = require('express')
const app = express()
const port = 3000

app.use('/', express.static('public'))

app.get('/hello', (req, res) => {
  res.send('Привет!')
})

app.get('/api/weather', async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let APIkey = 'cc27a8d46f99850e0959f18b5fe7a4b4'
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&lang=ru`)
    let resWeatherJson = await resWeather.json()
    res.json({
      'city': resWeatherJson.name,
      'weather': resWeatherJson.weather[0].description,
      'temp': resWeatherJson.main.temp,
      'humidity': resWeatherJson.main.humidity,
      'pressure': resWeatherJson.main.pressure,
      'speed': resWeatherJson.wind.speed,
      'icon': resWeatherJson.weather[0].icon
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})