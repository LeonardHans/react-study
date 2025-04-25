import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { globalStore } from '../../store/globalStore';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlide.style.css';

const MovieSlide = ({ useApi, title, id, isTvShow }) => {
    const { data, isLoading, isError, error } = useApi({ id, isTvShow });
    const { getResponsive } = globalStore();
    const responsive = getResponsive();

    if (isLoading) {
        return <ClipLoader color='gray' loading={!isLoading} size={200} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    return (
        <div style={{ backgroundColor: 'black', color: 'white' }}>
            <h3>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            /*
            swipeable={false}
            draggable={true}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            */
            >
                {data?.data.results.map((movie, index) => {
                    return <MovieCard key={index} movie={movie} isTvShow={isTvShow}></MovieCard>
                })}
            </Carousel>
        </div>
    )
}

export default MovieSlide;