import React, { useEffect, useState } from 'react';


export const Weather = () => {

  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);

  const CurrentDate = new Date()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = months[CurrentDate.getMonth()];
  const day = CurrentDate.getDay();
  const year = CurrentDate.getFullYear();
  const formatedDate = `${month} ${day} ,${year}`


  const Api_key = 'b70735fb37f62b83e4096f437e2bd0d9'

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`)

      const data = await response.json()
      console.log(data)
      setWeatherData(data)

    } catch (error) {
      console.log(error)

    }

  }

  useEffect(() => {
    fetchWeatherData()

  }, [])

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setCity(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeatherData()

  }

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case 'Clouds':
        return './cloud.png';
      case 'Rain':
        return './rain.png';
      case 'Mist':
        return './snow.png';
      case 'Haze':
        return './drizzle.png';
      case 'Smoke':
        return './snow.png'
      case 'Clear':
        return './clear.png'
      default:
        return null;
    }
  }
  return (
    <div className=' bg-blue-500 h-120 p-28 text-center rounded my-28 flex flex-col '>

      {weatherData && (
        <>
          <h1 className='text-white'>{formatedDate}</h1>
          <div className='my-1 flex flex-col'>
            <h2 className='text-2xl text-white font-semibold '>{weatherData.name}</h2>

            <img src={getWeatherIconUrl(weatherData.weather[0].main)} alt='Weather Icon' className='w-28 m-auto ' />

            <h2 className='text-4xl font-semibold relative top-[-20px] text-white mt-5'>{weatherData.main.temp}</h2>
            <h2 className='relative top-[-15px] text-white text-xl'>{weatherData.weather[0].main}

            </h2>
            <form className='bg-[#ebfffc] rounded ' onSubmit={handleSubmit}>
              <input type='text' placeholder='Enter City Name' className='p-2 border-none outline-none'
                onChange={handleInputChange} />
              <button type='submit' className=' p-3'>Get Weather</button>
            </form>
          </div>


        </>


      )}













    </div>
  )
}
