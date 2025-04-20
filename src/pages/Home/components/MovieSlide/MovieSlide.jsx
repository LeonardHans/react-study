import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import ClipLoader from 'react-spinners/ClipLoader';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlide.style.css';

const MovieSlide = ({ useApi, title }) => {
    const { data, isLoading, isError, error } = useApi();
    console.log(data, isLoading);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    if (isLoading) {
        return <ClipLoader color='gray' loading={isLoading} size={200} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    return (
        <div style={{ color: 'white' }}>
            <h3>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
                style={{ border: '10px solid red' }}

            /*
            swipeable={false}
            draggable={false}
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
                {console.log('MovieSlide data', data)}
                {data?.data.results.map((movie, index) => {
                    return <MovieCard key={index} movie={movie} isTvShow={title==='Popular TV Shows'}></MovieCard>
                })}
            </Carousel>
        </div>
    )
}

export default MovieSlide;