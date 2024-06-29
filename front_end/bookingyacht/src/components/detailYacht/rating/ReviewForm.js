// src/ReviewForm.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addFeedback } from '../../../services/ApiServices';
import './Rating.scss'; // Import the CSS file

const ReviewForm = ({addReview, idBooking, idCustomer, idYacht }) => {
    
    const [starRating, setStarRating] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('starRating', starRating);
        formData.append('description', description);
        formData.append('date',new Date().toLocaleDateString());

        try{
           const response = await addFeedback(idBooking,idCustomer,idYacht, formData)
            addReview(response.data.data)
            setStarRating(0);
            setDescription('');
        }catch(error){
            console.error('Error adding feedback:', error);
        }
    };

    const handleStartClick = (rating) =>{
        setStarRating(rating);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rating">
                <Form.Label>Chất lượng</Form.Label>
                <div className="rating">
                    {[1,2,3,4,5].map((star) => (
                        <span
                            key={star}
                            style={{ color: starRating >= star ? 'orange' : 'gray', cursor: 'pointer', fontSize: '1.5rem' }}
                            onClick={() => handleStartClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </Form.Group>
            <Form.Group controlId="review">
                <Form.Label>Đánh giá của bạn</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="dark" type="submit">
                Gửi
            </Button>
        </Form>
    );
};

export default ReviewForm;