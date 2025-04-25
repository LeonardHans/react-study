import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import MovieSlide from '../../common/MovieSlide/MovieSlide';
import { useDetailQuery } from '../../hooks/useDetail';
import { useRecommendationsQuery } from '../../hooks/useRecommendations';
import './MovieDetail.style.css';
import Informations from './components/Informations';
import Poster from './components/Poster';
import Reviews from './components/Reviews';

const MovieDetail = () => {
    console.log('MovieDetail', useLocation()?.state);

    const { movie, isTvShow } = useLocation()?.state;
    const { data, isLoading, isError, error } = useDetailQuery({ id: movie.id, isTvShow });

    console.log(movie, isTvShow);

    useEffect(() => {
    }, [data, isLoading]);

    if (isLoading) {
        return <ClipLoader color='gray' loading={!isLoading} size={200} style={{ backgroundColor: 'black' }} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    const { detail, reviews } = data;

    if (!detail || !reviews) {
        return <ClipLoader color='gray' loading={detail && reviews} size={200} style={{ backgroundColor: 'black' }} />;
    }

    return (
        <div className='detail-main'>
            <Container style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Row>
                    <Poster posterPath={detail.poster_path} title={movie.title ?? movie.name} id={movie.id} isTvShow={isTvShow}></Poster>
                    <Informations detail={detail} isTvShow={isTvShow} />
                </Row>
                <hr style={{ color: 'white' }} />
                <Row>
                    <Reviews reviews={reviews} />
                </Row>
                <hr style={{ color: 'white' }} />
                <Row>
                    <MovieSlide useApi={useRecommendationsQuery} title='Recommendations' id={movie.id} isTvShow={isTvShow} />
                </Row>
                <hr style={{ color: 'white' }} />
            </Container >
        </div>
    )
}

export default MovieDetail