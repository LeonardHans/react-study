import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './component/NavigationBar';
import About from './page/About';
import Home from './page/Home';
import Login from './page/Login';

function App() {
  const [authN, setAuthN] = useState(true);
  const LoginRoute = ({ page : Page }) => {
    return authN ? <Page /> : <Navigate to='/login' />;
  }
  
  const UserPage = () => {
    return (<div>UserPage</div>);
  }
  
  return (<div>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />

      <Route path="/user" element={<LoginRoute page={UserPage}/>} />
    </Routes>
  </div>);
}

export default App;
