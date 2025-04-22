import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';
import { useMovieGenreQuery } from './hooks/useMovieGenre';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Movies from './pages/Movies/Movies';
import NotFound from './pages/NotFound/NotFound';
import { globalStore } from './store/globalStore';

function App() {
  const [authentiation, setAuthentication] = useState(false);
  const LoginRoute = ({ page : Page }) => {
    return authentiation ? <Page /> : <Navigate to='/login' />;
  }

  const { data: tvShowGenres } = useMovieGenreQuery(true);
  const { data: MovieGenres } = useMovieGenreQuery(false);

  const { setTvShowGenres, setMovieGenres, AreLoadedGenres } = globalStore();

  console.log('tvShowGenres', tvShowGenres);
  console.log('MovieGenres', MovieGenres);
  console.log('AreLoadedGenres', AreLoadedGenres());

  useEffect(() => {
      console.log('setTvShowGenres', tvShowGenres);
      setTvShowGenres(tvShowGenres);
  }, [tvShowGenres]);

  useEffect(() => {
      console.log('setMovieGenres', MovieGenres);
      setMovieGenres(MovieGenres);
  }, [MovieGenres]);

  if (!AreLoadedGenres()) {
      return <ClipLoader color='red' loading={!AreLoadedGenres()} size={500} style={{ backgroundColor: 'black' }} />;
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
