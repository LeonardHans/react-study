import React, { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import MovieSlide from '../../common/MovieSlide/MovieSlide'
import { useLeospickQuery } from '../../hooks/useLeospick'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { usePopularMoviesQuery } from '../../hooks/usePopularMovies'
import { usePopularTvShowsQuery } from '../../hooks/usePopularTvShows'
import { globalStore } from '../../store/globalStore'
import './Home.style.css'
import Banner from './components/Banner/Banner'

const Home = () => {
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
        return <ClipLoader color='red' loading={AreLoadedGenres()} size={500} style={{ backgroundColor: 'black' }} />;
    }

    return (
        <div className='home-main'>
            <Banner />
            <MovieSlide useApi={useLeospickQuery} title="Leo's Pick" isTvShow={false} />
            <MovieSlide useApi={usePopularMoviesQuery} title='Popular Movies' isTvShow={false} />
            <MovieSlide useApi={usePopularTvShowsQuery} title='Popular TV Shows' isTvShow={true} />
        </div>
    )
}

export default Home