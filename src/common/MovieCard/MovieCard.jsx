import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { globalStore } from '../../store/globalStore';
import './MovieCard.style.css';

const MovieCard = ({ movie, isTvShow }) => {
    const { getGenres } = globalStore();
    const navigate = useNavigate();

    if (!movie) {
        return <ClipLoader color='gray' loading={!movie} size={200} style={{ backgroundColor: 'black' }} />;
    }

    const handleClick = () => {
        navigate(`/movies/${movie.id}`, { state: { movie, isTvShow } });
    }

    const urlPrefix = 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2';

    return (
        <div className='card' onClick={() => handleClick()} style={{ backgroundImage: `url(${urlPrefix}${movie.poster_path})` }} >
            <div className='overlay'>
                <h1 style={{ textAlign: 'center' }}>{movie.title ?? movie.name}</h1>
                {
                    movie.genre_ids.map((id, index) => {
                        return (
                            <Badge bg="danger" key={index} style={{ color: 'white', textAlign: 'center', margin: '3px' }}>
                                {getGenres(id, isTvShow) ?? console.log(id)}
                            </Badge>
                        )
                    })
                }
                <div>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'yellow', marginRight: '5px', marginLeft: '5px' }} />
                    {(movie.vote_average).toFixed(1)}
                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'green', marginRight: '5px', marginLeft: '10px' }} />
                    {(movie.popularity).toFixed(0)}
                </div>
                <div>{movie.adult}</div>
                <p style={{ color: '#999999', textAlign: 'center' }}>{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard;