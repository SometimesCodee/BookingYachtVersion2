// src/ReviewList.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './Rating.scss'; // Import the CSS file

const ReviewList = ({ reviews }) => {
    const totalReviews = reviews.length;
    const averageRating =
        totalReviews === 0 ? 0 : reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    const countStars = (star) => reviews.filter((review) => review.rating === star).length;

    return (
        <div>
        {reviews.map((review, index) => (
            <Card key={index} className="mb-3 comment">
                <Card.Body>
                    <div className="rating">
                        {[...Array(5)].map((star, i) => (
                            <span
                                key={i}
                                className={`star ${i < review.rating ? 'user-rated' : ''}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <Card.Text>{review.review}</Card.Text>
                    <footer className="blockquote-footer">
                        {review.name} - {review.date}
                    </footer>
                </Card.Body>
            </Card>
        ))}
    </div>
    );
};

export default ReviewList;
