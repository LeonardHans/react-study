import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchQuery } from '../../hooks/useSearch';
import './Movies.style.css';

const Movies = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = React.useState(1);
    const keyword = query.get('q');

    const { data, isLoading, isError, error } = useSearchQuery({ keyword, page });
    console.log('data', data);

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    }

    if (isLoading) {
        return <ClipLoader color='gray' loading={isLoading} size={200} style={{ backgroundColor: 'black' }} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    if (data?.data.results.length === 0) {
        return <div style={{ color: 'white', textAlign: 'center', padding: '10px', backgroundColor: 'black', height: '93vh' }}>No results found for "{keyword}"</div>;
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
                        <div style={{ color: 'white', textAlign: 'center', padding: '10px' }}>
                            <h1>Filter</h1>
                        </div>
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row style={{ margin: '0px auto' }}>
                            {data?.data.results.map((movie, index) => (
                                <Col key={index} lg={4} xs={6} style={{ margin: '0px auto' }}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}

export default Movies