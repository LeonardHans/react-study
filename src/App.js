import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Movies from './pages/Movies/Movies';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const [authentiation, setAuthentication] = useState(false);
  const LoginRoute = ({ page : Page }) => {
    return authentiation ? <Page /> : <Navigate to='/login' />;
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* index : path="/" 를 그대로 사용한다는 의미 */}
          <Route index element={<Home />} />
          <Route path="movies">
            {/* sub route : path="movies" */}
            <Route index element={<Movies />} />
            <Route path=":id" element={<MovieDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
