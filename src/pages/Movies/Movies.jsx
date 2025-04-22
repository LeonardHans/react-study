import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchQuery } from '../../hooks/useSearch';
import './Movies.style.css';

const Movies = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = React.useState(1);
    const keyword = query.get('q');

    const { data, isLoading, isError, error } = useSearchQuery({ keyword, page });
    console.log('data', data);

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className='movies-main'>
            <ReactPaginate zindex={-1}
                previousLabel="Previous"
                nextLabel="Next >"
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
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName="pagination"
                activeClassName="active"
            />
            <Container style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Row>
                    <Col lg={4} xs={12}>
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row>
                            {data?.data.results.map((movie, index) => (
                                <Col key={index} lg={4} xs={12}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movies