import React, { useEffect, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import { MdOutlineBedroomParent, MdOutlinePerson } from "react-icons/md";
import './form-sel.scss';

const RoomItem = ({ room, handleDetail, handleRoomSelect, isSelected, services, selectedServices, handleServiceChange }) => {
    const [isChecked, setIsChecked] = useState(isSelected);
    useEffect(() => {
        setIsChecked(isSelected);
    }, [isSelected])
    const toggleCheckbox = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        handleRoomSelect(room, newState); // Pass the room object and new state to the parent component
    };

    return (
        <div key={room.idRoom} className="my-3 p-3 border form-sel">
            <div className="row align-items-center">
                <div className="col-md-2 col-12">
                    <img src={room.avatar} alt={room.name} className="img-fluid rounded object-fit-cover" />
                </div>
                <div className="col-md-6 col-12">
                    <h5 style={{ fontWeight: 'bold' }} className='name-rom'>
                        <a href='#' onClick={(e) => { e.preventDefault(); handleDetail(room); }}>
                            {room.name}
                        </a>
                    </h5>
                    <p><MdOutlineBedroomParent /> {room.area} m<sup>2</sup> <MdOutlinePerson /></p>
                </div>

                <div className="col-md-2 col-6 text-end">
                    <h5>{room.roomType ? room.roomType.price.toLocaleString() : 'N/A'} đ</h5>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center justify-content-end">
                    <FormCheck.Input
                        type='checkbox'
                        checked={isChecked}
                        onChange={toggleCheckbox}
                        style={{ width: 20, height: 20 }}
                    /* //checked: Được sử dụng để xác định trạng thái của checkbox (được chọn hay không).
                        //onChange: Là một callback function để xử lý sự kiện khi checkbox thay đổi trạng thái. */
                    />
                </div>

            </div>
        </div>
    );
};

export default RoomItem;