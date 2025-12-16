import axios from 'axios';
import React, { useState } from 'react'

export const Weather = () => {

  const [city, setCity] = useState();
  const [weather, setWeather] = useState()

  const handleCityChange = (event) => {
    setCity(event.target.value)

  }
  

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'b70735fb37f62b83e4096f437e2bd0d9'}`)

      setWeather(response)

    } catch (error) {
      console.log('Error fetching weather data', error)

    }
  }

  const handleClick = () => {
    fetchWeather()
  }
  console.log(weather)
  
 

  return (
    <div className='max-w-[500px] m-auto  rounded p-8 
     text-center shadow-xl flex flex-col bg-blue-800'>
      <input type='text' placeholder='Enter City Name' value={city} className=' text-xl p-2 bg-white rounded outline-none' onChange={handleCityChange} />
      <div>
        <button className='bg-[#0d0d69] mt-10 w-[40%] border-none text-white text-xl font-bold rounded cursor-pointer p-4 ' onClick={handleClick}>Get Weather</button>
         </div>

        {weather && (
          <>
            <div className='mt-10 text-white'>
              <h2 className='text-xl'>{weather.data.name }</h2>
              <p className='text-2xl font-bold mt-2'>{Math.floor(weather.data.main.temp )}</p>
              <p className='text-2xl font-bold mt-2'>{weather.data.weather[0].description}</p>
              <p>{weather.data.main.humidity}</p>
            </div>

          </>
        )}
     
    </div>
  )
}
