import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const BookNowModal = ({ selectedRooms, quantities, totalPrice, show, handleClose }) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đặt Phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedRooms.map(room => (
                    <Row key={room.id} className="my-3 p-3 border">
                        <Col md={2}>
                            <img src={room.image} alt={room.name} className="img-fluid rounded" />
                        </Col>
                        <Col md={6}>
                            <h5>{room.name}</h5>
                            <p>{room.size} - Tối đa: {room.maxGuests}</p>
                        </Col>
                        <Col md={2} className="text-end">
                            <h5>{room.price.toLocaleString()} đ</h5>
                        </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-end">
                            <span className="mx-2">x {quantities[room.id]}</span>
                        </Col>
                    </Row>
                ))}
                <Form>
                    <Form.Group controlId="formCheckInDate" className="mb-3">
                        <Form.Label>Ngày nhận phòng</Form.Label>
                        <Form.Control type="date" min={todayString}/>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ và tên" />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số điện thoại" />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Địa chỉ email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" />
                    </Form.Group>
                    <Form.Group controlId="formRequests" className="mb-3">
                        <Form.Label>Yêu cầu của bạn</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập yêu cầu của bạn" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <h5 className="me-auto">Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
                <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                <Button variant="primary" onClick={handleClose}>Đặt ngay</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookNowModal;
