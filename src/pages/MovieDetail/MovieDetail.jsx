import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDetailQuery } from '../../hooks/useDetail';
import { globalStore } from '../../store/globalStore';
import './MovieDetail.style.css';

const MovieDetail = () => {
    const { getGenres } = globalStore();
    const { movie, isTvShow } = useLocation()?.state;
    const { data: detail } = useDetailQuery({ id: movie.id, isTvShow });

    console.log('MovieDetail', detail);

    const urlPrefix = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';

    if (!detail) {
        return <ClipLoader color='gray' loading={!movie} size={200} style={{ backgroundColor: 'black' }} />;
    }

    return (
        <div className='detail-main'>
            <Container style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Row>
                    <Col lg={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`${urlPrefix}${detail.poster_path})`} alt="poster" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />
                    </Col>
                    <Col lg={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='detail-text-area'>
                            <h1 style={{ color: 'white' }}>{detail.title ?? detail.name}</h1>
                            <p></p>
                            <Badge bg="primary" style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                                {isTvShow ? 'TV Show' : 'Movie'}
                            </Badge>
                            {
                                detail?.genres.map(({ id, name }, index) => {
                                    return (
                                        <Badge bg="danger" key={index} style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                                            {getGenres(id, isTvShow) ?? console.log(id)}
                                        </Badge>
                                    )
                                })
                            }
                            <div style={{ color: 'white' }}>
                                <FontAwesomeIcon icon={faStar} style={{ color: 'yellow', marginRight: '5px', marginLeft: '5px' }} />
                                {(detail.vote_average).toFixed(1)}
                                <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'green', marginRight: '5px', marginLeft: '10px' }} />
                                {(detail.popularity).toFixed(0)}
                            </div>
                            <p></p>
                            <div>{detail.adult}</div>
                            <h5 style={{ color: 'white' }}>Runtime</h5>
                            <ProgressBar variant='warning' now={detail.runtime / 3} label={`${detail.runtime} minutes`} />
                            <p></p>
                            <p style={{ color: '#999999', textAlign: 'left' }}>{detail.overview}</p>
                            <p style={{ color: 'white', textAlign: 'left' }}>Release Date: {detail.release_date ?? detail.first_air_date}</p>
                            <p style={{ color: 'white', textAlign: 'left' }}>Budget: ${(detail.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                            <p style={{ color: 'white', textAlign: 'left' }}>Revenue: ${(detail.revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        </div>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default MovieDetail