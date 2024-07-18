import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addRoomAction, removeRoomAction, resetSelectionAction, setTotalPrice } from '../../../redux/action/OrderAction';
import { getAddingServiceByYacht, getUnbookedRoomsByYachtAndSchedule } from '../../../services/ApiServices';
import BookNowModal from './BookNowModal';
import './FormRoom.scss';
import RoomDetailModal from './RoomDetailModal';
import RoomItem from './RoomItem';
// import OrderReducer from './../../../redux/reducer/OrderReducer';

const RoomSelection = ({ yacht, selectedSchedule }) => {
    const [originalRooms, setOriginalRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [selectedServices, setSelectedServices] = useState({});
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
                //Đoạn mã này tạo ra một đối tượng mà mỗi phòng trong roomsData có một mảng rỗng riêng để lưu trữ các dịch vụ đã chọn.
                setSelectedServices(roomsData.reduce((acc, room) => ({
                    ...acc,
                    [room.idRoom]: []
                }), {}));
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
                const roomPrice = room.roomType.price;
                //room 5 co id_service 6 8 thi se la: {5:[6, 8]}
                const roomServices = selectedServices[room.idRoom] || [];
                //serviceId la cac service id trong roomServices 6, 8
                const servicePrice = roomServices.reduce((serviceTotal, serviceId) => {
                    const service = services.find(service => service.idService === serviceId);
                    return serviceTotal + (service ? service.price : 0);
                }, 0);
                return total + roomPrice + servicePrice;
            }, 0);
            dispatch(setTotalPrice(totalRoomPrice));
        };

        calculateTotalPrice();
    }, [selectedRooms, selectedServices, services, dispatch]);
    const handleServiceChange = (roomId, serviceId) => {
        //prevServices là giá trị trạng thái trước đó của selectedServices.
        setSelectedServices(prevServices => {
            //Lấy mảng các ID dịch vụ đã chọn cho phòng với roomId từ trạng thái trước đó.
            const roomServices = prevServices[roomId] || [];
            //kiem tra xem mang cu da co service do hay chua, neu chua thi them vao, co roi thi loai bo ra
            const newRoomServices = roomServices.includes(serviceId)
                ? roomServices.filter(id => id !== serviceId)
                : [...roomServices, serviceId];
            return { ...prevServices, [roomId]: newRoomServices };
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

    return (
        <Container>
            <h5 className='mb-3'>Phòng trống:</h5>
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
                        services={services}
                        selectedServices={selectedServices[room.id] || []}
                        handleServiceChange={handleServiceChange}
                        handleRoomSelect={hanldeRoomSelect}
                    />
                ))}

                <div className='my-3'>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <Button className='mb-3' variant="outline-danger" onClick={handleReset}>Xóa lựa chọn</Button>
                            <h5><span className='fw-bold'>Tổng tiền:</span> {totalPrice.toLocaleString()} đ</h5>
                        </div>
                        <div className="col-md-6 col-12 text-end">
                            <Button variant="secondary" className='rent' onClick={() => { hanldeRentWhole() }}>Thuê trọn tàu</Button>
                            <Button variant="custom ms-2" onClick={handleBookNow}>Đặt ngay <FaArrowRightLong /></Button>
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