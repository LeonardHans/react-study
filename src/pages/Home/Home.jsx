import React from 'react'
import { useLeospickQuery } from '../../hooks/useLeospick'
import { usePopularMoviesQuery } from '../../hooks/usePopularMovies'
import { usePopularTvShowsQuery } from '../../hooks/usePopularTvShows'
import './Home.style.css'
import Banner from './components/Banner/Banner'
import MovieSlide from './components/MovieSlide/MovieSlide'

const Home = () => {
    return (
        <div className='main'>
            <Banner />
            <MovieSlide useApi={useLeospickQuery} title="Leo's pick" />
            <MovieSlide useApi={usePopularMoviesQuery} title='Popular Movies' />
            <MovieSlide useApi={usePopularTvShowsQuery} title='Popular TV Shows' />
        </div>
    )
}

export default Home