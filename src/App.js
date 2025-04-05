import { useEffect, useState } from 'react';
import './App.css';
import Box from './component/Box';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from 'react-spinners';

const apiKey = '8bb47e4ae02f68dc8ea8910a478e49a4'

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState(null);
  const cities = ['paris', 'new york', 'tokyo'];

  useEffect(() => { /* onMount */
    updateCurrent()
  }, [])

  const fetchWithLoading = async (url) => {
    setLoading(true);
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error('Failed to fetch');
    }
    const data = await res.json();
    setData(data);
    setLoading(false);
  }

  const updateCurrent = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&units=metric`
        await fetchWithLoading(url);
      },
      (err) => {
        console.log(err);
        alert('Unable to get your location. Please check your browser settings.');
      }
    );
    setCityName('current');
  }

  const updateOther = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    await fetchWithLoading(url);
    setCityName(cityName);
  }

  return (<div className="main">
    <div className='vertical-layout'>
      <ClipLoader color='skyblue' loading={loading} size={50} />
      {!loading && (<div>
        <Box data={data}></Box>
        <div className='horizontal-layout'>
          <Button key={-1} variant={cityName == 'current' ? "primary" : "outline-primary"} onClick={() => updateCurrent()}>Current Location</Button>
          {cities.map((city, index) => (
            <Button key={index} variant={cityName == city ? "info" : "outline-info"} onClick={() => updateOther(city)}>{city}</Button>
          ))}
        </div>
      </div>)}
    </div>
  </div>)
}

export default App;
