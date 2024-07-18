import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import i_content from '../../assets/image_1.webp';
import { getAllFeedback } from '../../services/ApiServices';
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getAllFeedback().then(response => {
            setFeedbacks(response.data.data);
        }).catch(error => {
            console.error('Error fetching feedbacks:', error);
        });
    }, []);

    return (
        <>
            <div className='feedback-header row container p-5'>
                <div className='yacht-title col-md mx-4'>
                    <h4 style={{ fontWeight: 'bold' }}>Đánh Giá Từ <br />Người Trải Nghiệm</h4>
                    <div>
                        <img src={i_content} alt="content" />
                    </div>
                </div>
                <p style={{ width: "500px" }} className='col-md mx-4'>
                    Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.
                </p>
            </div>

            <div className='feedback-body'>
                <Carousel>
                    {feedbacks.map(feedback => (
                        <Carousel.Item key={feedback.idFeedback} interval={3000}>
                            <Carousel.Caption>
                                <h3>Du Thuyền: {feedback.idYacht}</h3>
                                <p>{feedback.description}</p>
                                <p>Khách Hàng: {feedback.customer.fullName}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default Feedback;
