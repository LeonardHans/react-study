import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, isFetching, isPending, isError, error } = usePopularMoviesQuery();

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const slideMiliseconds = 5000;
    const fadeOutMiliseconds = 1000;

    console.log(data, index);

    useEffect(() => {
        setFade(true);

        const interval = setInterval(() => {
            console.log('isLoading', index, isLoading, isFetching, isPending, data);
            if (isLoading === true) {
                setFade(false);
                return;
            }

            setTimeout(() => {
                console.log('fade', fade, index);
                setIndex((prevIndex) => (prevIndex + 1) % data?.data.results.length);
                setFade(false);
            }, fadeOutMiliseconds);
        }, slideMiliseconds);

        return () => {
            clearInterval(interval);
        };
    }, [index]);

    if (isLoading) {
        return <h1 style={{ color: 'white' }}>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    const urlPrefix = 'https://media.themoviedb.org/t/p/w1066_and_h600_bestv2';

    return (
        <div className='banner'
            style={{ backgroundImage: `url(${urlPrefix}${data?.data.results[index]?.poster_path})` }}>
            <div className={`banner-text-area ${fade ? 'fade-out' : ''}`}>
                <h1 style={{ color: 'white' }}>{data?.data.results[index]?.title}</h1>
                <p style={{ color: 'white' }}>{data?.data.results[index]?.overview}</p>
            </div>
        </div >
    )
}

export default Banner