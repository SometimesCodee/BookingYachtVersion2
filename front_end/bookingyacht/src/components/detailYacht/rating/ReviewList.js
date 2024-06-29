import React from 'react';
import { Card } from 'react-bootstrap';
import './Rating.scss'; // Import the CSS file

const ReviewList = ({ reviews }) => {
    const formattedDate = (date) =>{
        const [year, day, month] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    return (
        <div>
        {reviews.map((review, index) => (
            <Card key={index} className="mb-4 comment">
                <Card.Body>
                    <div className="rating">
                        {[1,2,3,4,5].map((star) => (
                            <span
                                key={star}
                                style={{ color: star <= review.starRating ? 'orange' : 'gray', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <Card.Text style={{fontWeight : 'bold'}}>{review.customer.fullName}</Card.Text>
                    <Card.Text>{review.description}</Card.Text>
                    <Card.Text>{formattedDate(review.date)}</Card.Text>
                </Card.Body>
            </Card>
        ))}
    </div>
    );
};

export default ReviewList;