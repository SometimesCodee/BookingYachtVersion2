import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { GoCheckCircle } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeRoomAction } from '../../../redux/action/OrderAction';
import { getScheduleByIdApi } from '../../../redux/action/ScheduleAction';
import { createPayment, getCustomerById } from '../../../services/ApiServices';
import { useTranslation } from 'react-i18next';

const BookNowModal = ({
    selectedRooms,
    selectedServices,
    handleServiceChange,
    totalPrice,
    services,
    show,
    handleClose,
    selectedSchedule
}) => {
    const isLogged = useSelector(state => state.account.isAuthenticated);
    console.log('isLogged', isLogged)
    const [customer, setCustomer] = useState(null);
    const { idCustomer } = useSelector(state => state.account.account);
    const [requirements, setRequirements] = useState('');
    const [urlPayment, setUrlPayment] = useState('');
    const { schedule } = useSelector(state => state.ScheduleReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('schedule', schedule)
    console.log('selectedService', selectedServices)

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const res = await getCustomerById(idCustomer);
                setCustomer(res.data.data);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };
        if (idCustomer) {
            getCustomer();
        }
    }, [idCustomer]);



    const handleOnChange = (event) => {
        setRequirements(event.target.value);
    };

    const handleRemoveRoom = (room) => {
        dispatch(removeRoomAction(room));
    };

    const getSelectedRoomIds = () => {
        return selectedRooms.map(room => room.idRoom);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLogged) {
            processPayment();
        } else {
            navigate('/signin');
        }
    };

    useEffect(() => {
        if (selectedSchedule) {
            dispatch(getScheduleByIdApi(selectedSchedule));
        }
    }, [selectedSchedule, dispatch])



    const processPayment = async () => {
        const selectedRoomIds = getSelectedRoomIds();
        console.log('roomid:', selectedRoomIds, 'serverviceid:', selectedServices, 'requirements:', requirements, 'customer:', idCustomer, 'schedule:', selectedSchedule)
        try {

            const res = await createPayment(selectedRoomIds, selectedServices, requirements, idCustomer, selectedSchedule);
            console.log(res);
            setUrlPayment(res.data.data);
            console.log('url', res.data.data);
            window.location.href = res.data.data;
            // window.open(urlPayment, '_blank')
        } catch (error) {
            console.error('Error fetching payment:', error);
        }
    };
    const formatDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1; // Months are 0-indexed
        const year = dateTime.getFullYear();

        // Pad single digit minutes with leading zero
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${formattedMinutes} ${day}/${month}/${year}`;
    };

    const { t } = useTranslation();

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
                <Modal.Title className='fw-bold'>{t('booknow.message1')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedRooms.map(room => (
                    <Row key={room.idRoom} className="my-3 p-3 border rounded border-warning align-items-center">
                        <Col md={2}>
                            <img src={room.avatar} alt={room.name} className="img-fluid rounded" />
                        </Col>
                        <Col md={5}>
                            <h5 className='fw-bold'>{room.name}</h5>
                        </Col>
                        <Col md={3}>
                            <h6 className='fw-bold'>{t('booknow.message2')}</h6>
                            <h5>{room?.roomType?.price?.toLocaleString()} đ</h5>
                        </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-end">
                            <Button onClick={() => handleRemoveRoom(room)} className='btn btn-danger'>{t('booknow.message3')}Hủy</Button>
                        </Col>
                    </Row>
                ))}
                <div className="my-3 p-3 border rounded border-success align-items-center">
                    <strong>{t('booknow.message4')}</strong>
                    {selectedServices.map(serviceId => {
                        const service = services.find(s => s.idService === serviceId);
                        console.log('service', services);
                        return (
                            <div key={serviceId} className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: 'black', fontSize: '14px' }}>{service ? service.service : ''} {service.price.toLocaleString()} đ</span>
                                <Button variant="danger" size="sm" onClick={() => handleServiceChange(serviceId)}>{t('booknow.message5')}Xóa</Button>
                            </div>
                        );
                    })}
                </div>
                <Form id="bookingForm" onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>{t('booknow.message6')}</Form.Label>
                        <Form.Control type="text" readOnly value={schedule ? `${formatDate(schedule.startDate)} - ${formatDate(schedule.endDate)}` : 'Loading...'} />
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>{t('booknow.message7')}</Form.Label>
                        <Form.Control type="text" readOnly value={customer ? customer.fullName : ''} />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Label>{t('booknow.message8')}</Form.Label>
                        <Form.Control type="text" readOnly value={customer ? customer.phone : ''} />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>{t('booknow.message9')}</Form.Label>
                        <Form.Control type="email" readOnly value={customer ? customer.email : ''} />
                    </Form.Group>
                    <Form.Group controlId="formRequests" className="mb-3">
                        <Form.Label>{t('booknow.message10')}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={requirements} onChange={handleOnChange} />
                    </Form.Group>
                    <p style={{ color: 'red', fontSize: '12px' }}>* {t('booknow.message11')}</p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <h5 className="me-auto">{t('booknow.message12')} {totalPrice.toLocaleString()} đ</h5>
                <Button variant="secondary" onClick={handleClose}>{t('booknow.message13')}</Button>
                <Button variant='warning' type="submit" form="bookingForm"><GoCheckCircle style={{ marginRight: '5px' }} />{t('booknow.message14')}Thanh toán</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookNowModal;
