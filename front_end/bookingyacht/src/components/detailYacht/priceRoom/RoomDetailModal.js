import React from 'react';
import { Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import Carousel from './Carousel';

const RoomDetailModal = ({ room, show, handleClose }) => {
    if (!room) return null; // Return null if no room is selected
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <Carousel images={[room.image]} />
                    </Col>
                    <Col md={6}>
                        <h5>{room.name}</h5>
                        <p>{room.size} - Tối đa: {room.maxGuests}</p>
                        <ListGroup variant="flush">
                            <ListGroup.Item><FaCheck /> Nhìn ra biển</ListGroup.Item>
                            <ListGroup.Item><FaCheck /> Điều hòa</ListGroup.Item>
                            <ListGroup.Item><FaCheck /> Sạc điện thoại</ListGroup.Item>
                            <ListGroup.Item><FaCheck /> Ban công riêng</ListGroup.Item>
                            <ListGroup.Item><FaCheck /> Wi-Fi</ListGroup.Item>
                            <ListGroup.Item><FaCheck /> Két an toàn</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default RoomDetailModal;
