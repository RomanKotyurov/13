const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
require('dotenv').config()

app.use('/', express.static('public'))

mongoose.connect(process.env.MONGODB_URI)
const Weather = mongoose.model('Weather', {
  date: String,
  city: String,
  weather: String,
  temp: String,
 });


app.get('/api/weather', async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let APIkey = 'cc27a8d46f99850e0959f18b5fe7a4b4'
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&lang=ru`)
    let resWeatherJson = await resWeather.json()

    let temp = Math.round(resWeatherJson.main.temp - 273)
    let city = resWeatherJson.name
    let weather = resWeatherJson.weather[0].description
    let date = new Date()

    const newWeather = new Weather({
      'date': date,
      'city': city,
      'weather': weather,
      'temp': temp
    });
    await newWeather.save()
    res.json(newWeather)
})

app.get('/api/log', async (req, res) => {
  let log = await Weather.find()
res.json(log)
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})