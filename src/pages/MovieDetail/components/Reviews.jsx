import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import './Reviews.style.css';

const Reviews = ({ reviews }) => {
    const [visibleReviewIndex, setVisibleReviewIndex] = useState(null);

    const toggleReview = (index) => {
        setVisibleReviewIndex(prevIndex => prevIndex === index ? null : index);
    };

    if (!reviews) {
        return <ClipLoader color='gray' loading={reviews} size={200} style={{ backgroundColor: 'black' }} />;
    }

    return (
        <div>
            <h2 style={{ color: 'white', textAlign: 'left' }}>Reviews</h2>
            <div className={reviews.results.length > 0 ? 'review-area' : ''}>
                {reviews.results.length > 0 ? reviews?.results.map((review, index) => {
                    return (
                        <Button key={index} variant="secondary" onClick={() => toggleReview(index)} style={{ margin: '3px' }}>
                            {review.author}
                        </Button>
                    );
                }) : <p style={{ color: 'white', textAlign: 'center' }}>No reviews found ...</p>}
            </div>
            {visibleReviewIndex !== null &&
                (<div style={{ marginTop: '5px' }}>
                    <h2 style={{ color: 'white', textAlign: 'left' }}>ㄴ{reviews.results[visibleReviewIndex].author}</h2>
                    <div className={visibleReviewIndex === null ? "comment-box" : "comment-box show"}>
                        <p style={{ color: 'gray' }}>{reviews.results[visibleReviewIndex].content}</p>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Reviews