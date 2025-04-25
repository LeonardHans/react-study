import React from 'react'
import MovieSlide from '../../common/MovieSlide/MovieSlide'
import { useLeospickQuery } from '../../hooks/useLeospick'
import { usePopularMoviesQuery } from '../../hooks/usePopularMovies'
import { usePopularTvShowsQuery } from '../../hooks/usePopularTvShows'
import './Home.style.css'
import Banner from './components/Banner/Banner'

const Home = () => {
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