import React from 'react';
import { Button } from 'react-bootstrap';
import { MdOutlineBedroomParent, MdOutlinePerson } from "react-icons/md";
import './form-sel.scss';
const RoomItem = ({ room, handleQuantityChange, quantity, handleDetail }) => {
    return (
        <div key={room.id} className="my-3 p-3 border form-sel">
            <div className="row">
                <div className="col-md-2 col-12">
                    <img src={room.image} alt={room.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6 col-12">
                    <h5 className='name-rom'><a href='#' onClick={(e) => {e.preventDefault(); handleDetail(room);}}>{room.name}</a></h5>
                    <p><MdOutlineBedroomParent /> {room.size} - Tối đa:  {room.maxGuests} <MdOutlinePerson /></p>
                </div>
                <div className="col-md-2 col-6 text-end">
                    <h5>{room.price.toLocaleString()} đ<br/>
                    /khách</h5>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center justify-content-end">
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(room.id, -1)}>-</Button>
                    <span className="mx-2">{quantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(room.id, 1)}>+</Button>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
