import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
const Rating = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null); // Lưu trữ số sao được chọn
    const [ratingCounts, setRatingCounts] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    });
    useEffect(() => {
        const countRatings = () => {
            const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            reviews.forEach(review => {
                counts[review.rating]++;
            });
            setRatingCounts(counts);
        };
        countRatings();
    }, [reviews]);
    const addReview = (review) => {
        setReviews([...reviews, review]);
    };

    const handleSelectRating = (rating) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };

    return (
        <Container>
            <h1>Đánh giá sản phẩm</h1>
            <ReviewForm addReview={addReview} />
            <ButtonGroup className="my-3">
                <Button
                    variant={selectedRating === null ? 'primary' : 'outline-primary'}
                    onClick={() => handleSelectRating(null)}
                >
                    Tất cả({reviews.length})
                </Button>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                        key={rating}
                        variant={selectedRating === rating ? 'primary' : 'outline-primary'}
                        onClick={() => handleSelectRating(rating)}
                    >
                        {rating} Sao ({ratingCounts[rating]})
                    </Button>
                ))}
            </ButtonGroup>
            <ReviewList reviews={selectedRating !== null ? reviews.filter(review => review.rating === selectedRating) : reviews} />
        </Container>
    );
};

export default Rating;
