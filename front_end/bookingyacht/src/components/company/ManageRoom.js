import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiFillHome } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

const ManageRoom = () => {
    return (
        <div className='container'>
            <div >
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='mt-1' /> <p>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <div className='d-flex my-5 room p-3' style={{ gap: 50 }}>
                <div>Image</div>
                <div>
                    <p>Phòng Junior có ban công riêng</p>
                    <p>28m</p>
                </div>
                <div>5,300,000 đ/KHÁCH</div>

                <div className='d-flex' style={{ gap: 30 }}>

                    <Button className='btn btn-light'>View Image Room</Button>
                    <Button className='btn btn-warning'>View Services</Button>
                    <Button className='btn btn-primary'>Update</Button>
                    <Button className='btn btn-danger'>Delete</Button>

                </div>

            </div>
        </div>
    );
};

export default ManageRoom;