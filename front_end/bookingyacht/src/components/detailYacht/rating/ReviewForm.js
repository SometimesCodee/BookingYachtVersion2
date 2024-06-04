// src/ReviewForm.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Rating.scss'; // Import the CSS file

const ReviewForm = ({ addReview }) => {
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            rating,
            name,
            email,
            phone,
            review,
            date: new Date().toLocaleDateString(),
        };
        addReview(newReview);
        setRating(0);
        setName('');
        setEmail('');
        setPhone('');
        setReview('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rating">
                <Form.Label>Chất lượng</Form.Label>
                <div className="rating">
                    {[...Array(5)].map((star, index) => (
                        <span
                            key={index}
                            className={`star ${index < rating ? 'user-rated' : ''}`}
                            onClick={() => setRating(index + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </Form.Group>
            <Form.Group controlId="name">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="review">
                <Form.Label>Đánh giá của bạn</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
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
