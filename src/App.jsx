import React, { useState } from 'react';
import axios from 'axios';
import Weather from './components/Weather';

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const API_KEY = "f21b4c899cccd9e952907f3ed4257ac0";

  const searchLocation = (event) => {
    if (event.key === "Enter" && location) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          const newWeatherData = response.data;


          const cityExists = data.find(item => item.name.toLowerCase() === newWeatherData.name.toLowerCase());

          if (cityExists) {

            setData(prevData => [
              newWeatherData,
              ...prevData.filter(item => item.name.toLowerCase() !== newWeatherData.name.toLowerCase())
            ]);
          } else {

            setData(prevData => [newWeatherData, ...prevData]);
          }

          console.log(newWeatherData);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });

      setLocation("");
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center'>
    <h1 className="text-4xl font-bold my-8">Weather App</h1>
    <div className='w-full h-full flex flex-col items-center'>
      <div className='text-center p-4'>
        <input 
          type="text" 
          className='py-3 px-6 w-[700px] text-lg rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md' 
          placeholder="Enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
        />
      </div> 
      <div className='w-full flex flex-col items-center'>
        {data.map((weatherData, index) => (
          <Weather key={index} weatherData={weatherData} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
