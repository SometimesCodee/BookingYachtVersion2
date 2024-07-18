import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Rating.scss'; // Import the CSS file
const ReviewList = ({ reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;
    const [paging, setPaging] = useState([]);
    const [pagedReviews, setPagedReviews] = useState([]);

    useEffect(() => {
        updatePaging()
    }, [reviews, currentPage])

    const updatePaging = () => {
        const totalPages = Math.ceil(reviews.length / reviewsPerPage);
        setPaging(Array.from({ length: totalPages }, (_, i) => i + 1));
        setPagedReviews(reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage));
    }
    const formattedDate = (date) => {
        const [year, day, month] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    return (
        <div>
            {pagedReviews.map((review, index) => (
                <Card key={index} className="mb-4 comment">
                    <Card.Body>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{ color: star <= review.starRating ? 'orange' : 'gray', cursor: 'pointer', fontSize: '1.5rem' }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <Card.Text style={{ fontWeight: 'bold' }}>{review.customer.fullName}</Card.Text>
                        <Card.Text>{review.description}</Card.Text>
                        <Card.Text>{formattedDate(review.date)}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {paging.map(page => (
                    <Button
                        key={page}
                        style={{ marginLeft: 5 }}
                        onClick={() => handlePageChange(page)}
                        className='btn-dark'
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;