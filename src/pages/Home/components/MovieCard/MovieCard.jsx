import React from 'react';
import { Badge } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import './MovieCard.style.css';

const MovieCard = ({ movie }) => {
    console.log('MovieCard,', movie);
    if (!movie) {
        return <ClipLoader color='gray' loading={!movie} size={200} />;
    }
    const urlPrefix = 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2';

    return (
        <div className='card' style={{ backgroundImage: `url(${urlPrefix}${movie.poster_path})` }}>
            <div className='overlay'>
                <h1 style={{ textAlign: 'center' }}>{movie.title}</h1>
                {
                    movie.genre_ids.map((id, index) => {
                        return (
                            <Badge bg="danger" key={index} style={{ color: 'white', textAlign: 'center', marginRight: '5px' }}>
                                {id}
                            </Badge>
                        )
                    })
                }
                <div>{movie.vote_average}</div>
                <div>{movie.popularity}</div>
                <div>{movie.adult}</div>
                <p style={{ color: 'white', textAlign: 'center' }}>{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard;