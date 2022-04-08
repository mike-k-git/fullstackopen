import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [lat, lon] = country.capitalInfo.latlng
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then((response) => setWeather(response.data))
  }, [apiKey, lat, lon])
  return (
    <div>
      <h4>Weather in {country.capital[0]}</h4>
      {weather ? (
        <>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      ) : (
        'Loading'
      )}
    </div>
  )
}

export default Weather
