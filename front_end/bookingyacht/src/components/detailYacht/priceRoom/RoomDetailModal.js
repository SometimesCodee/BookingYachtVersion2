import React, { useEffect, useState } from 'react';
import { Carousel, Col, Image, ListGroup, Modal, Row } from 'react-bootstrap';
import { FcOk } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomImagesApi } from '../../../redux/action/RoomImageAction';


const RoomDetailModal = ({ selectedRoom, show, handleClose }) => {
    const { roomImages } = useSelector(state => state.RoomImageReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedRoom && selectedRoom.idRoom) {
            dispatch(getAllRoomImagesApi(selectedRoom.idRoom));
        }
    }, [selectedRoom, dispatch]);

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!selectedRoom) return null;

    const handleSelect = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    const getImageApi = `https://yachtbookingbackend.azurewebsites.net/api/customer/file/`;
    const utilities = selectedRoom.roomType?.utilities ? selectedRoom.roomType.utilities.split('.').filter(sentence => sentence.trim()) : [];

    const renderUtilities = () => {
        return utilities.map((util, index) => (
            <p key={index}><FcOk /> {util}</p>
        ));
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className='p-4'>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false} indicators={false} interval={null}>
                            {roomImages.map((image, index) => (
                                <Carousel.Item key={image.idRoomImage} className='object-fit-cover' style={{ height: '400px' }}>
                                    <Image src={`${getImageApi}${image.imageRoom}`} alt={`Slide ${index}`} fluid className='img1' />
                                </Carousel.Item>
                            ))}

                        </Carousel>
                    </Col>
                    <Col md={12} className='mt-3'>
                        <h5 style={{ fontWeight: 'bold' }}>{selectedRoom.name}</h5>
                        <ListGroup variant="flush">
                            {renderUtilities()}
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default RoomDetailModal;
