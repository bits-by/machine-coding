
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [dataFetched, setDataFetched] = useState(false);
  const [response, setResponse] = useState(null);

  const getWeatherData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf812910b4308a05dde70aadd0064a2c&units=metric`)
    .then((response) => response.json())
    .then((result) => {
      console.log("Result ", result)
      setResponse(result)
      setDataFetched(true)
    })
  }

  const showPosition = (pos) => {
    console.log('Possition ', pos)
    getWeatherData(pos.coords.latitude, pos.coords.longitude);
  }
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-700 text-white">
    <h2 className='text-4xl font-bold mb-6'>Weather-App</h2>
      { dataFetched ? (
        <div className='bg-white text-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center'>
          <div className="text-2xl font-semibold mb-2">{response.name}</div>
          <div className="text-lg font-medium">{`Current Temperature: ${response.main.temp} C`}</div> 
          <div className="text-sm italic text-gray-600 mb-4">{`Description: ${response.weather[0].description}`}</div> 
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div className="bg-gray-100 p-3 rounded-lg shadow-sm">{`Max Temperature: ${response.main.temp_max} C`}</div> 
              <div className="bg-gray-100 p-3 rounded-lg shadow-sm">{`Min Temperature: ${response.main.temp_min} C`}</div> 
              <div className="bg-gray-100 p-3 rounded-lg shadow-sm col-span-2">{`Humidity: ${response.main.humidity} C`}</div> 
            </div>
        </div> )
        : (<div className='className="text-lg font-medium animate-pulse"'> Loading ...</div> )
      }
    </div>
  
  )
}

export default App
