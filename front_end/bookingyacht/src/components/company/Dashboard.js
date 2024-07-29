import React from 'react';
import Form from 'react-bootstrap/Form';
import './Dashboard.scss'
const Dashboard = () => {
    return (
        <div className='container'>
            <div>
                <div className='d-flex'>
                    <Form.Select style={{ width: 'fit-content' }} >
                        <option>Month</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Form.Select style={{ width: 'fit-content' }} >
                        <option>Year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </Form.Select>
                </div>
                <div className='d-flex booking'>
                    <div className='child'>Total Booking</div>
                    <div className='child'>Confirm Booking</div>
                    <div className='child'>cancel Booking</div>
                    <div className='child'>Pending Booking</div>
                </div>
                <div className='d-flex revenue'>
                    <div className='child1'>Revenue Booking</div>
                    <div className='child1'>Revenue Service</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;