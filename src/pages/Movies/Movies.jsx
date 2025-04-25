import { faArrowDown, faArrowUp, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchQuery } from '../../hooks/useSearch';
import { globalStore } from '../../store/globalStore';
import './Movies.style.css';

const Movies = () => {
    const { movieGenres } = globalStore();
    const [query] = useSearchParams();
    const [page, setPage] = useState(1);
    //const [filter, setFilter] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState(null);

    const keyword = query.get('q');

    const { data, isLoading, isError, error } = useSearchQuery({ keyword, page, filter: null });
    let movies = data?.data.results;

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    }

    const clearFilter = () => {
        console.log('clearFilter', filteredMovies, movies);
        setFilteredMovies(movies?.slice());
    }

    const updateFilter = ({ type, key }) => {
        let filtered = movies.slice();
        switch (type) {
            case 'genre':
                key = Number(key);
                filtered = filtered.filter(movie => movie.genre_ids.includes(key));
                break;
            case 'popularity':
                if (key === 'asc') {
                    filtered.sort((a, b) => a.popularity - b.popularity);
                }
                else {
                    filtered.sort((a, b) => b.popularity - a.popularity);
                }
                break;
            case 'voteAverage':
                if (key === 'asc') {
                    filtered.sort((a, b) => a.vote_average - b.vote_average);
                }
                else {
                    filtered.sort((a, b) => b.vote_average - a.vote_average);
                }
                break;
            default:
                console.warn('something went wrong');
                break;
        }

        console.log('filtered', filtered, movies);

        setFilteredMovies([].concat(filtered));
    }

    useEffect(() => {
        setFilteredMovies(movies?.slice());
    }, [data]);

    if (isLoading || !filteredMovies) {
        return <ClipLoader color='red' loading={!isLoading && filteredMovies} size={200} style={{ backgroundColor: 'black', height: '50vh' }} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    if (movies?.length === 0) {
        return <h1 style={{ color: 'white', textAlign: 'center', padding: '10px', backgroundColor: 'black', height: '90vh' }}>No results found for "{keyword}"</h1>;
    }

    return (
        <div className='movies-main'>
            <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageCount={data?.data.total_pages ?? 0} // total page count
                forcePage={page - 1} // current page
                onPageChange={handlePageChange}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                containerClassName="pagination"
                activeClassName="active"
            />
            <Container style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Row>
                    <Col lg={4} xs={12}>
                        <div className='filter-box'>
                            <h1 style={{ color: 'gray' }}>Filters</h1>
                            <Button onClick={clearFilter}>Clear</Button>
                            <DropdownButton
                                as={ButtonGroup}
                                key='Sort'
                                id='dropdown-variants-success'
                                variant='success'
                                title='Sort'
                                style={{ marginLeft: '5px' }}
                            >
                                <Dropdown.Item eventKey="1" onClick={() => updateFilter({ type: 'popularity', key: 'asc' })}>
                                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'black', marginRight: '5px', marginLeft: '5px' }} />
                                    Popularity
                                    <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '5px', marginLeft: '5px' }} />
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => updateFilter({ type: 'popularity', key: 'desc' })}>
                                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'black', marginRight: '5px', marginLeft: '5px' }} />
                                    Popularity
                                    <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '5px', marginLeft: '5px' }} />
                                </Dropdown.Item>
                                <Dropdown.Divider />

                                <Dropdown.Item eventKey="3" onClick={() => updateFilter({ type: 'voteAverage', key: 'asc' })}>
                                    <FontAwesomeIcon icon={faStar} style={{ color: 'black', marginRight: '5px', marginLeft: '5px' }} />
                                    VoteAverage
                                    <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '5px', marginLeft: '5px' }} />
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="4" onClick={() => updateFilter({ type: 'voteAverage', key: 'desc' })}>
                                    <FontAwesomeIcon icon={faStar} style={{ color: 'black', marginRight: '5px', marginLeft: '5px' }} />
                                    VoteAverage
                                    <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '5px', marginLeft: '5px' }} />
                                </Dropdown.Item>
                                <Dropdown.Divider />
                            </DropdownButton>
                            <DropdownButton
                                as={ButtonGroup}
                                key='genres'
                                id='dropdown-variants-danger'
                                variant='danger'
                                title='Genres'
                                style={{ marginLeft: '5px' }}
                            >
                                {
                                    Object.entries(movieGenres).map(([key, name]) => {
                                        return (<Dropdown.Item eventKey={key} onClick={() => updateFilter({ type: 'genre', key })}>{name}</Dropdown.Item>)
                                    })
                                }
                            </DropdownButton>
                        </div>
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row style={{ margin: '0px auto' }}>
                            {filteredMovies?.length > 0 ?
                                (filteredMovies.map((movie, index) => (
                                    <Col key={index} lg={4} xs={6} style={{ margin: '0px auto' }}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))) : (<h1 style={{ color: 'white', textAlign: 'center', padding: '10px', backgroundColor: 'black', height: '90vh' }}>No a filtered movie! Please change or clear the filter.</h1>)
                            }
                        </Row>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}

export default Movies