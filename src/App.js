import { useEffect, useState } from 'react';
import './App.css';
import Box from './component/Box';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = '8bb47e4ae02f68dc8ea8910a478e49a4'

function App() {

  const [data, setData] = useState(null);
  const cities = ['paris', 'new york', 'tokyo'];

  useEffect( () => { /* onMount */
    updateCurrent()
  }, [] )

  const updateCurrent = () => {
    navigator.geolocation.getCurrentPosition( async (pos) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&units=metric`
      const res = await fetch(url)
      const data = await res.json();
      setData(data);
    })
  }

  const updateOther = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    const res = await fetch(url)
    const data = await res.json();
    setData(data);
  }

  return (<div className="main"> 
      <div className='vertical-layout'>
        <Box data={data}></Box>
        <div className='horizontal-layout'>
          <Button variant="primary" onClick={ () => updateCurrent() }>Current Location</Button>
          {cities.map( (city) => (
            <Button variant="info" onClick={ () => updateOther(city) }>{city}</Button>
          ))}
        </div>
      </div>

  </div>)
}

export default App;
