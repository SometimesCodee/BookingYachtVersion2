import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
const Rating = () => {
    const [reviews, setReviews] = useState([]);

    const addReview = (review) => {
        setReviews([...reviews, review]);
    };

    return (
        <Container>
            <h1>Đánh giá sản phẩm</h1>
            <ReviewForm addReview={addReview} />
            <ReviewList reviews={reviews} />
        </Container>
    );
};

export default Rating;
