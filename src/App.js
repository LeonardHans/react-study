import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './component/NavigationBar';
import About from './page/About';
import Home from './page/Home';
import Login from './page/Login';
import ProductDetail from './page/ProductDetail';

function App() {
  const [authentiation, setAuthentication] = useState(false);
  const LoginRoute = ({ page : Page }) => {
    return authentiation ? <Page /> : <Navigate to='/login' />;
  }
  
  return (<div>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login setAuthentication={setAuthentication}/>} />
      <Route path="/product/:id" element={<LoginRoute page={ProductDetail}/>} />
    </Routes>
  </div>);
}

export default App;
