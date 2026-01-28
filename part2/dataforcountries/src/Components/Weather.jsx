import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!country?.capital?.[0] || !apiKey) return

    const capital = country.capital[0]

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`

    axios
      .get(url)
      .then(res => setWeather(res.data))
      .catch(err =>
        console.error('Weather error:', err.response?.data || err.message)
      )
  }, [country, apiKey])

  if (!weather) return <div>Loading weather...</div>

  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      <div>Temperature: {weather.main.temp} °C</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>Wind: {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather
