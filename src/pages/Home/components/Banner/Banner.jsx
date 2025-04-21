import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { useLeospickQuery } from '../../../../hooks/useLeospick';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, isError, error } = useLeospickQuery();

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const slideMiliseconds = 5000;
    const fadeOutMiliseconds = 1000;

    useEffect(() => {
        setFade(true);

        const interval = setInterval(() => {
            if (isLoading === true) {
                return;
            }

            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % data?.data.results.length);
                setFade(false);
            }, fadeOutMiliseconds);
        }, slideMiliseconds);

        return () => {
            clearInterval(interval);
        };
    }, [index, data]);

    if (isLoading) {
        return <ClipLoader color='gray' loading={isLoading} size={200} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    const urlPrefix = 'https://media.themoviedb.org/t/p/w1066_and_h600_bestv2';

    return (
        <div className='banner'
            style={{ backgroundImage: `url(${urlPrefix}${data?.data.results[index]?.poster_path})` }}>
            <div className={`banner-text-area ${fade ? 'fade-out' : ''}`} style={{ color: 'white' }}>
                <h1>{data?.data.results[index]?.title}</h1>
                <p>{data?.data.results[index]?.overview}</p>
            </div>
        </div >
    )
}

export default Banner