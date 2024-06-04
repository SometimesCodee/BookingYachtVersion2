import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import BookNowModal from './BookNowModal';
import './FormRoom.scss';
import RoomDetailModal from './RoomDetailModal';
import RoomItem from './RoomItem';
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

    useEffect(() => {
        const newSelectedRooms = rooms.filter(room => quantities[room.id] > 0);
        setSelectedRooms(newSelectedRooms);
        setTotalPrice(newSelectedRooms.reduce((acc, room) => acc + (room.price * quantities[room.id]), 0));
    }, [quantities]);

    const handleQuantityChange = (id, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(0, prevQuantities[id] + delta)
        }));
    };

    const handleReset = () => {
        setQuantities(rooms.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
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
                totalPrice={totalPrice}
                show={showBookNow}
                handleClose={() => setShowBookNow(false)}
            />
        </Container>
    );
};

export default RoomSelection;
