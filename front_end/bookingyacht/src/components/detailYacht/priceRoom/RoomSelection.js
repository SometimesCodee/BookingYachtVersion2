import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import BookNowModal from './BookNowModal';
import './FormRoom.scss';
import RoomDetailModal from './RoomDetailModal';
import RoomItem from './RoomItem';
const services = [
    { id: 1, name: 'Bữa sáng', price: 200000 },
    { id: 2, name: 'Đưa đón sân bay', price: 500000 },
    { id: 3, name: 'Gói spa', price: 700000 },
];
const rooms = [
    { id: 1, name: 'Phòng Delta Suite', size: '33 m²', price: 3550000, maxGuests: 2, image: 'image1.png' },
    { id: 2, name: 'Phòng Ocean Suite', size: '33 m²', price: 3700000, maxGuests: 2, image: 'image2.png' },
    { id: 3, name: 'Phòng Captain Suite', size: '38 m²', price: 3950000, maxGuests: 2, image: 'image3.png' },
    { id: 4, name: 'Phòng Regal Suite', size: '46 m²', price: 4200000, maxGuests: 2, image: 'image4.png' }
];

const RoomSelection = () => {
    const [quantities, setQuantities] = useState(rooms.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
    const [showDetailRom, setShowDetailRom] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showBookNow, setShowBookNow] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedServices, setSelectedServices] = useState(rooms.reduce((acc,room)=>({...acc, [room.id] : []}), {}));
    useEffect(() => {
        const newSelectedRooms = rooms.filter(room => quantities[room.id] > 0);
        setSelectedRooms(newSelectedRooms);
        const totalRoomPrice = newSelectedRooms.reduce((acc, room) => acc + (room.price * quantities[room.id]), 0);
        const totalServicePrice = newSelectedRooms.reduce((acc, room) =>{
            const roomServices = selectedServices[room.id] || [];
            const roomServicePrice = roomServices.reduce((serviceAcc, serviceId) =>{
                const service = services.find(s => s.id === serviceId);
                return serviceAcc + (service ? service.price : 0);
            }, 0);
            return acc + (roomServicePrice * quantities[room.id]);
        } , 0)
        setTotalPrice(totalRoomPrice + totalServicePrice);
        // setTotalPrice(newSelectedRooms.reduce((acc, room) => acc + (room.price * quantities[room.id]), 0));
    }, [quantities, selectedServices]);

    const handleQuantityChange = (id, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(0, prevQuantities[id] + delta)
        }));
    };
    const handleServiceChange = (roomId, serviceId) => {
        setSelectedServices(prevServices => {
            const roomServices = prevServices[roomId] || [];
            const newRoomServices = roomServices.includes(serviceId)
                ? roomServices.filter(id => id !== serviceId)
                : [...roomServices, serviceId];
            return { ...prevServices, [roomId]: newRoomServices };
        });
    };
    const handleReset = () => {
        setQuantities(rooms.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
        setSelectedServices(rooms.reduce((acc, room) => ({ ...acc, [room.id]: [] }), {}));
    };

    const handleDetail = (room) => {
        setSelectedRoom(room);
        setShowDetailRom(true);
    };

    const handleBookNow = () => {
        setShowBookNow(true);
    };

    return (
        <Container>
            <h1>Các loại phòng & giá</h1>
            <div className='form-select'>
                <Button variant="outline-danger" onClick={handleReset}>Xóa lựa chọn</Button>
                {rooms.map(room => (
                    <RoomItem
                        key={room.id}
                        room={room}
                        handleQuantityChange={handleQuantityChange}
                        quantity={quantities[room.id]}
                        handleDetail={handleDetail}
                        services={services}
                        selectedServices={selectedServices[room.id] || []}
                        handleServiceChange={handleServiceChange}
                    />
                ))}
                <div className='my-3'>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <h5>Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
                        </div>
                        <div className="col-md-6 col-12 text-end">
                            <Button variant="secondary" className='rent'>Thuê trọn tàu</Button>
                            <Button variant="custom" className='ms-2' onClick={handleBookNow}>Đặt ngay <FaArrowRightLong/></Button>
                        </div>
                    </div>
                </div>
            </div>
            <RoomDetailModal
                room={selectedRoom}
                show={showDetailRom}
                handleClose={() => setShowDetailRom(false)}
            />
            <BookNowModal
                 selectedRooms={selectedRooms}
                quantities={quantities}
                selectedServices={selectedServices}
                services={services}
                handleQuantityChange={handleQuantityChange}
                handleServiceChange={handleServiceChange}
                totalPrice={totalPrice}
                show={showBookNow}
                handleClose={() => setShowBookNow(false)}
            />
        </Container>
    );
};

export default RoomSelection;
