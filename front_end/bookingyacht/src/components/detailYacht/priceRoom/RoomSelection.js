import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addRoomAction, removeRoomAction, resetSelectionAction, setTotalPrice } from '../../../redux/action/OrderAction';
import { getAddingServiceByYacht, getUnbookedRoomsByYachtAndSchedule } from '../../../services/ApiServices';
import BookNowModal from './BookNowModal';
import './FormRoom.scss';
import RoomDetailModal from './RoomDetailModal';
import RoomItem from './RoomItem';
import { useTranslation } from 'react-i18next';

const RoomSelection = ({ yacht, selectedSchedule }) => {
    const [originalRooms, setOriginalRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [showBookNow, setShowBookNow] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showDetailRoom, setShowDetailRoom] = useState(false);
    const [services, setServices] = useState([]);

    const dispatch = useDispatch()

    const selectedRooms = useSelector(state => state.OrderReducer.selectedRooms);
    const totalPrice = useSelector(state => state.OrderReducer.totalPrice);

    console.log(selectedRooms)

    useEffect(() => {
        const getUnBookedRoomList = async () => {
            try {
                const responseRoom = await getUnbookedRoomsByYachtAndSchedule(yacht.idYacht, selectedSchedule);
                const roomsData = responseRoom.data.data;
                setOriginalRooms(roomsData);
                const initialRoomType = roomsData.length > 0 ? roomsData[0].roomType.type : null;
                setSelectedRoomType(initialRoomType);
                setFilteredRooms(roomsData.filter(room => room.roomType.type === initialRoomType));
                const responseServices = await getAddingServiceByYacht(yacht.idYacht);
                setServices(responseServices.data.data);
            } catch (error) {
                console.error('Error fetching unbooked rooms:', error);
            }
        };

        if (yacht && selectedSchedule) {
            getUnBookedRoomList();
        }
    }, [yacht, selectedSchedule]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const totalRoomPrice = selectedRooms.reduce((total, room) => {
                return total + room.roomType.price;
            }, 0);

            const totalServicePrice = selectedServices.reduce((total, serviceId) => {
                const service = services.find(service => service.idService === serviceId);
                return total + (service ? service.price : 0);
            }, 0);

            dispatch(setTotalPrice(totalRoomPrice + totalServicePrice));
        };

        calculateTotalPrice();
    }, [selectedRooms, selectedServices, services, dispatch]);
    const handleServiceChange = (serviceId) => {
        //prevServices là giá trị trạng thái trước đó của selectedServices.
        setSelectedServices(prevServices => {
            const newSelectedServices = prevServices.includes(serviceId)
                ? prevServices.filter(id => id !== serviceId)
                : [...prevServices, serviceId];
            return newSelectedServices;
        });
    };

    const hanldeRoomSelect = (room, isSelected) => {
        if (isSelected) {
            dispatch(addRoomAction(room))
        } else {
            dispatch(removeRoomAction(room))
        }
    };

    const handleReset = () => {
        dispatch(resetSelectionAction())
    };
    const handleDetail = (room) => {
        setSelectedRoom(room);
        setShowDetailRoom(true);
    };

    const handleBookNow = () => {
        setShowBookNow(true);
    };
    const cssButtonClicked = {
        backgroundColor: '#6AE4E7',
        color: 'balck'
    }
    const hanldeRentWhole = () => {
        handleReset();
        originalRooms.forEach(room => {
            dispatch(addRoomAction(room))
        })
        handleBookNow()
    }
    const renderRoomType = () => {
        const uniqueRoomTypes = [...new Set(originalRooms.map(room => room.roomType.type))];
        return uniqueRoomTypes.map(roomType => (
            <button
                key={roomType}
                className="btn btn-outline-info mx-2 "
                style={{
                    width: '100px',
                    ...(selectedRoomType === roomType ? cssButtonClicked : {})
                }}
                onClick={() => filterByRoomType(roomType)}
                disabled={selectedRoomType === roomType}
            >
                {roomType}
            </button>
        ));
    }

    const filterByRoomType = (roomType) => {
        setSelectedRoomType(roomType);
        const filtered = originalRooms.filter(room => room.roomType.type === roomType);
        setFilteredRooms(filtered);
    }

    const { t } = useTranslation();

    return (
        <Container>
            <h5 className='mb-3'>{t('roomslect.message1')}</h5>
            {renderRoomType()}
            <div className='form-select mt-3'>
                {filteredRooms.map(room => (
                    <RoomItem
                        key={room.idRoom}
                        room={room}
                        //checks if the current room's idRoom exists in the selectedRooms array.
                        //If a room with the same idRoom is found in selectedRooms, isSelected will be true; otherwise, it will be false.
                        isSelected={selectedRooms.some(selectedRoom => selectedRoom.idRoom === room.idRoom)}
                        handleDetail={handleDetail}
                        handleRoomSelect={hanldeRoomSelect}
                    />
                ))}

                <hr></hr>
                <div className='service-selection'>
                    <p style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '7px', marginBottom: '0px' }}>{t('roomslect.message2')}</p>
                    {services.map(service => (
                        <Form.Check
                            style={{ fontSize: '14px' }}
                            key={service.idService}
                            type="checkbox"
                            label={`${service.service} (+ ${service.price.toLocaleString()} đ)`}
                            // checked={selectedServices.includes(service.idService)}
                            onChange={() => handleServiceChange(service.idService)}
                        />
                    ))}
                </div>

                <div className='my-3'>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <Button className='mb-3' variant="outline-danger" onClick={handleReset}>{t('roomslect.message3')}</Button>
                            <h5><span className='fw-bold'>{t('roomslect.message4')}</span> {totalPrice.toLocaleString()} đ</h5>
                        </div>
                        <div className="col-md-6 col-12 text-end">
                            <Button variant="secondary" className='rent' onClick={() => { hanldeRentWhole() }}>{t('roomslect.message5')}</Button>
                            <Button variant="custom ms-2" onClick={handleBookNow}>{t('roomslect.message6')} <FaArrowRightLong /></Button>
                        </div>
                    </div>
                </div>
            </div>
            {console.log('selectedServices', selectedServices)}
            {console.log('selectedRoom', selectedRooms)}
            <BookNowModal
                selectedSchedule={selectedSchedule}
                selectedRooms={selectedRooms}
                selectedServices={selectedServices}
                services={services}
                totalPrice={totalPrice}
                show={showBookNow}
                handleClose={() => setShowBookNow(false)}
                handleServiceChange={handleServiceChange}
            />
            <RoomDetailModal
                selectedRoom={selectedRoom}
                show={showDetailRoom}
                handleClose={() => setShowDetailRoom(false)}
            />
        </Container>
    );
};

export default RoomSelection;