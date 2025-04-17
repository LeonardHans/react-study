import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './component/NavigationBar';
import Favorite from './page/Favorite';
import Home from './page/Home';
import Login from './page/Login';

function App() {
  const [authentiation, setAuthentication] = useState(false);
  const LoginRoute = ({ page : Page }) => {
    return authentiation ? <Page /> : <Navigate to='/login' />;
  }
  
  return (<div>
    <NavigationBar authentiation={authentiation} setAuthentication={setAuthentication}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setAuthentication={setAuthentication}/>} />
      <Route path="/favorite" element={<LoginRoute page={Favorite}/>} />
    </Routes>
  </div>);
}

export default App;
