import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
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
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        const countRatings = () => {
            const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            let totalRatings = 0;
            let sumRatings = 0;
            reviews.forEach(review => {
                counts[review.rating]++;
                totalRatings++;
                sumRatings += review.rating;
            });
            setRatingCounts(counts);
            setAverageRating(totalRatings === 0 ? 0 : sumRatings / totalRatings);
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
            <Row className="align-items-center mb-3">
                <Col>
                    <h1 className="mb-0">Đánh giá sản phẩm</h1>
                </Col>
                <Col className="text-end">
                    <span style={{ fontSize: '2rem', color: 'red' }}>
                        {averageRating.toFixed(1)} / 5★
                    </span>
                    <div className="stars" style={{ color: 'red' }}>
                        {[...Array(5)].map((_, index) => (
                            <i key={index} className="bi bi-star-fill"></i>
                        ))}
                    </div>
                </Col>
            </Row>
            <ReviewForm addReview={addReview} />
            <ButtonGroup className="my-3">
                <Button
                    variant={selectedRating === null ? 'primary' : 'outline-primary'}
                    onClick={() => handleSelectRating(null)}
                >
                    Tất cả({reviews.length})
                </Button>
                {[5, 4, 3, 2, 1].map((rating) => (
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
