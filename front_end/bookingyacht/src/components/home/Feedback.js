import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import i_content from '../../assets/image_1.webp';
import { getAllFeedback } from '../../services/ApiServices';
import { useTranslation } from 'react-i18next';
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getAllFeedback().then(response => {
            setFeedbacks(response.data.data);
        }).catch(error => {
            console.error('Error fetching feedbacks:', error);
        });
    }, []);

    const { t } = useTranslation();

    return (
        <>
            <div className='feedback-header row container p-5'>
                <div className='yacht-title col-md mx-4'>
                    <h4 style={{ fontWeight: 'bold' }}>{t('feedback.message1')} <br />{t('feedback.message2')}</h4>
                    <div>
                        <img src={i_content} alt="content" />
                    </div>
                </div>
                <div className='col-md mx-4'>

                </div>
                <p style={{ width: "400px" }} className='col-md mx-4'>
                    {t('feedback.message3')}
                </p>
            </div>

            <div className='feedback-body'>
                <Carousel>
                    {feedbacks.map(feedback => (
                        <Carousel.Item key={feedback.idFeedback} interval={3000}>
                            <Carousel.Caption>
                                <h3>{t('feedback.yacht')} {feedback.idYacht}</h3>
                                <p>{feedback.description}</p>
                                <p>{t('feedback.customer')} {feedback.customer.fullName}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default Feedback;
