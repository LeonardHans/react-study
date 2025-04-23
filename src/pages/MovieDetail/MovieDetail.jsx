import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { globalStore } from '../../store/globalStore';
import './MovieDetail.style.css';

const MovieDetail = () => {
    const { getGenres } = globalStore();
    const { movie, isTvShow } = useLocation()?.state;
    console.log('MovieDetail', movie);

    const urlPrefix = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';

    return (
        <div className='detail-main'>

            <Container style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Row>
                    <Col lg={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`${urlPrefix}${movie?.poster_path})`} alt="poster" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />
                    </Col>
                    <Col lg={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='detail-text-area'>
                            <h1 style={{ color: 'white' }}>{movie?.title ?? movie?.name}</h1>
                            {
                                movie.genre_ids.map((id, index) => {
                                    return (
                                        <Badge bg="danger" key={index} style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                                            {getGenres(id, isTvShow) ?? console.log(id)}
                                        </Badge>
                                    )
                                })
                            }
                            <div style={{ color: 'white' }}>
                                <FontAwesomeIcon icon={faStar} style={{ color: 'yellow', marginRight: '5px', marginLeft: '5px' }} />
                                {(movie.vote_average).toFixed(1)}
                                <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'green', marginRight: '5px', marginLeft: '10px' }} />
                                {(movie.popularity).toFixed(0)}
                            </div>
                            <div>{movie.adult}</div>
                            <p style={{ color: '#999999', textAlign: 'left' }}>{movie?.overview}</p>
                            <p style={{ color: 'white', textAlign: 'left' }}>Release Date: {movie?.release_date ?? movie?.first_air_date}</p>
                            <p style={{ color: 'white', textAlign: 'left' }}>Rating: {(movie?.vote_average).toFixed(1)}</p>
                            <p style={{ color: 'white', textAlign: 'left' }}>Popularity: {(movie?.popularity).toFixed(0)}</p>
                        </div>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default MovieDetail