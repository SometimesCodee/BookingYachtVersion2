import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { getFeedbackByIdYacht } from '../../../services/ApiServices';
import ReviewList from './ReviewList';
import { useTranslation } from 'react-i18next';
import { gt } from 'lodash';
const Rating = ({ yachtId }) => {
    const [reviews, setReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [ratingCounts, setRatingCounts] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    });
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getFeedbackByIdYacht(yachtId)
                const data = response.data.data;
                setReviews(data)
                calculateRatings(data)
            } catch (error) {
                console.log('Error fetching reviews:', error)
            }
        }
        fetchReviews();
    }, [yachtId]);


    const calculateRatings = (reviews) => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => {
                counts[review.starRating]++;
                return acc + review.starRating;
            }, 0);
            setAverageRating((totalRating / reviews.length).toFixed(1));
            setRatingCounts(counts);
        } else {
            setAverageRating(0);
        }
    };

    const handleSelectRating = (rating) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };

    const filteredReviews = selectedRating !== null
        ? reviews.filter(review => review.starRating === selectedRating)
        : reviews;

    const { t } = useTranslation();

    return (
        <Container>

            <Row className="align-items-center mb-3">
                <Col>
                    <h4 style={{ fontWeight: 'bold' }} className="mb-0">{t('rating.message1')}</h4>
                </Col>
                <Col className="text-end">
                    <span style={{ fontSize: '2rem', color: 'red' }}>
                        {averageRating} / 5★
                    </span>
                </Col>
            </Row>
            <ButtonGroup className="my-3">
                <Button
                    variant={selectedRating === null ? 'dark' : 'outline-dark'}
                    onClick={() => handleSelectRating(null)}
                >
                    {t('rating.message2')}({reviews.length})
                </Button>
                {[5, 4, 3, 2, 1].map((rating) => (
                    <Button
                        key={rating}
                        variant={selectedRating === rating ? 'dark' : 'outline-dark'}
                        onClick={() => handleSelectRating(rating)}
                    >
                        {rating} {t('rating.message3')} ({ratingCounts[rating]})
                    </Button>
                ))}
            </ButtonGroup>
            <ReviewList reviews={filteredReviews} />
        </Container>
    );
};

export default Rating;