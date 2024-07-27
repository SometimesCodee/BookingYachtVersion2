import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentReturn = () => {

    const [payment, setPayment] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        urlParams.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const paymentData = {
            vnp_Amount: urlParams.get('vnp_Amount'),
            vnp_BankCode: urlParams.get('vnp_BankCode'),
            vnp_BankTranNo: urlParams.get('vnp_BankTranNo'),
            vnp_CardType: urlParams.get('vnp_CardType'),
            vnp_OrderInfo: urlParams.get('vnp_OrderInfo'),
            vnp_PayDate: urlParams.get('vnp_PayDate'),
            vnp_ResponseCode: urlParams.get('vnp_ResponseCode'),
            vnp_TmnCode: urlParams.get('vnp_TmnCode'),
            vnp_TransactionNo: urlParams.get('vnp_TransactionNo'),
            vnp_TransactionStatus: urlParams.get('vnp_TransactionStatus'),
            vnp_TxnRef: urlParams.get('vnp_TxnRef'),
            vnp_SecureHash: urlParams.get('vnp_SecureHash')
        };

        setPayment(paymentData);
        savePaymentDataToBackend(paymentData);
    }, []);

    const savePaymentDataToBackend = async (data) => {
        try {
            // const response = await paymentReturn(data);
            const response = await axios.post(
                `http://localhost:8080/api/payment/payment-callback`,
                qs.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            console.log('Payment data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving payment data:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        const hour = dateString.slice(8, 10);
        const minute = dateString.slice(10, 12);
        const second = dateString.slice(12, 14);

        const date = new Date(
            year,
            month - 1, // months are zero-based
            day,
            hour,
            minute,
            second
        );

        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };

    const formatAmount = (amount) => {
        if (!amount) return 'N/A';

        const formattedAmount = (amount / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${formattedAmount} VND`;
    };

    return (
        <Container className='mt-5 my-5'>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <Card className="text-center">
                        <Card.Header>
                            <h1 className={payment?.vnp_ResponseCode === '00' ? 'text-success' : 'text-danger'}>
                                {payment?.vnp_ResponseCode === '00' ? 'Payment Successful' : 'Payment Failed'}
                            </h1>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {payment?.vnp_ResponseCode === '00'
                                    ? 'Thank you for your purchase!'
                                    : 'There was an issue with your payment.'}
                            </Card.Text>
                            <hr />
                            {payment && (
                                <>
                                    <Card.Text>
                                        <strong>Chi Tiết Giao Dịch</strong><br />
                                        Mã Giao Dịch: {payment.vnp_TransactionNo || 'N/A'}<br />
                                        Ngày và Giờ: {formatDate(payment.vnp_PayDate)}<br />
                                        Tổng Tiền: {formatAmount(payment.vnp_Amount)}<br />
                                        Phương Thức Thanh Toán: {payment.vnp_CardType || 'N/A'}
                                    </Card.Text>
                                    <hr />
                                    <Card.Text>
                                        <strong>Tóm Tắt Đơn Đặt Chỗ</strong><br />
                                        Mã Tham Chiếu: {payment.vnp_TxnRef || 'N/A'}<br />
                                        Các mặt hàng đã mua: {decodeURIComponent(payment.vnp_OrderInfo) || 'N/A'}<br />
                                    </Card.Text>
                                    <hr />
                                    <Card.Text>
                                        <strong>Thông Tin Khách Hàng</strong><br />
                                        Mã Ngân Hàng: {payment.vnp_BankCode || 'N/A'}<br />
                                        Số Giao Dịch Ngân Hàng: {payment.vnp_BankTranNo || 'N/A'}
                                    </Card.Text>
                                    <hr />
                                    <div className="button-group">
                                        <Button variant="secondary" onClick={() => navigate('/duthuyen')}>Tiếp Tục Đặt Thuyền</Button>
                                        {payment?.vnp_ResponseCode === '00' && (
                                            <Button variant="info" onClick={() => navigate('/profile')}>Xem Lịch Sử Đặt Thuyền</Button>
                                        )}
                                    </div>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentReturn;