import { faDollar, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Col, ProgressBar } from 'react-bootstrap';
import { globalStore } from '../../../store/globalStore';

const Informations = ({ detail, isTvShow }) => {
    const { getGenres } = globalStore();

    return (
        <Col lg={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='detail-text-area'>
                <h1 style={{ color: 'white' }}>{detail.title ?? detail.name}</h1>
                <p></p>
                <Badge bg="dark" style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                    {isTvShow ? 'TV Show' : 'Movie'}
                </Badge>
                <Badge bg={detail.adult ? "danger" : "warning"} style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                    {detail.adult ? '18+' : 'All Ages'}
                </Badge>
                <div style={{ color: 'white' }}>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'yellow', marginRight: '5px', marginLeft: '5px' }} />
                    {(detail.vote_average).toFixed(1)}
                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'green', marginRight: '5px', marginLeft: '10px' }} />
                    {(detail.popularity).toFixed(0)}
                </div>
                {
                    detail?.genres.map(({ id, name }, index) => {
                        return (
                            <Badge bg="success" key={index} style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                                {getGenres(id, isTvShow) ?? console.log(id)}
                            </Badge>
                        )
                    })
                }
                <p></p>
                <div>{detail.adult}</div>
                {detail.runtime &&
                    (<h5 style={{ color: 'white' }}>Runtime</h5>)
                }
                {detail.runtime &&
                    (<ProgressBar variant='warning' now={Math.max(10, detail.runtime / 3)} label={<span style={{ color: 'gray', fontWeight: 'bold' }}>{`${detail.runtime} minutes`}</span>} />)
                }
                <p></p>
                <p style={{ color: '#999999', textAlign: 'left' }}>{detail.overview}</p>
                <p style={{ color: 'white', textAlign: 'left' }}>Release Date: {detail.release_date ?? detail.first_air_date}</p>

                {detail.budget &&
                    (
                        <p style={{ color: 'white', textAlign: 'left' }}>Budget:
                            <FontAwesomeIcon icon={faDollar} style={{ color: 'yellow', marginLeft: '5px' }} />
                            {(detail.budget)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                    )
                }
                {detail.revenue &&
                    (
                        <p style={{ color: 'white', textAlign: 'left' }}>Revenue:
                            <FontAwesomeIcon icon={faDollar} style={{ color: 'yellow', marginLeft: '5px' }} />
                            {(detail.revenue)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                    )
                }
            </div>
        </Col>
    )
}

export default Informations