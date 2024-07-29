import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Dashboard.scss'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { getAllBooking, getBookingByYear, getStatisticBooking, getStatisticService } from '../../services/ApiServices';
import { useSelector } from 'react-redux';
import { set } from 'lodash';
const Dashboard = () => {


    const idCompany = useSelector(state => state.account.account.idCompany)
    const [totalBooking, setTotalBooking] = useState('');
    const [totalService, setTotalService] = useState('');
    const [allBooking, setAllBooking] = useState({});
    const [allBookingByYear, setAllBookingByYear] = useState([]);

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        getTotalBooking();
        getTotalService();
        getAllBookingStatus();
        getAllBookingByYear();
    }, [month, year])

    const getTotalBooking = async () => {
        let res = await getStatisticBooking(idCompany, month, year)
        console.log('nkk', res)
        if (res && res.data && res.data.data) {
            setTotalBooking(res.data.data);
        } else if (res.data.data === 0) {
            setTotalBooking(res.data.data)
        }
    }
    const getTotalService = async () => {
        let res = await getStatisticService(idCompany, month, year)
        if (res && res.data && res.data.data) {
            setTotalService(res.data.data);
        } else if (res.data.data === 0) {
            setTotalService(res.data.data)
        }
    }
    const getAllBookingStatus = async () => {
        let res = await getAllBooking(idCompany, month, year)
        if (res && res.data && res.data.data) {
            setAllBooking(res.data.data);
        }
    }
    const getAllBookingByYear = async () => {
        let res = await getBookingByYear(idCompany, year)
        if (res && res.data && res.data.data) {
            setAllBookingByYear(res.data.data);
        }
    }
    console.log('totalb', totalBooking)
    const total = Object.values(allBooking).reduce((sum, count) => sum + count, 0);

    return (
        <div>
            <div className='p-2 container'>
                <div className='d-flex'>
                    <Form.Select onChange={(event) => setMonth(event.target.value)} style={{ width: 'fit-content' }} >
                        <option value='7'>July</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </Form.Select>
                    <Form.Select onChange={(event) => setYear(event.target.value)} className='mx-3' style={{ width: 'fit-content' }} >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </Form.Select>
                </div>
                <div className='d-flex booking'>
                    <div style={{ backgroundColor: '#F8F0E3' }} className='child'>
                        <div className='d-flex justify-content-between'>
                            <h4 className='fw-bold'>{total ? total : 0}</h4>
                            <FaCalendar />
                        </div>
                        <p>Total Booking</p>
                    </div>
                    <div style={{ backgroundColor: '#F4FAF8' }} className='child'>
                        <div className='d-flex justify-content-between'>
                            <h4 className='fw-bold'>{allBooking.Confirmed ? allBooking.Confirmed : 0}</h4>
                            <FaCalendarCheck />
                        </div>
                        <p>Confirmed Booking</p>
                    </div>
                    <div style={{ backgroundColor: '#FBF2F2' }} className='child'>
                        <div className='d-flex justify-content-between'>
                            <h4 className='fw-bold'>{allBooking.Cancelled ? allBooking.Cancelled : 0}</h4>
                            <FaCalendarTimes />
                        </div>
                        <p>Cancel Booking</p>
                    </div>
                    <div style={{ backgroundColor: '#F2F6FD' }} className='child'>
                        <div className='d-flex justify-content-between'>
                            <h4 className='fw-bold'>{allBooking.Pending ? allBooking.Pending : 0}</h4>
                            <FaCalendarDay />
                        </div>
                        <p>Pending Booking</p>
                    </div>
                </div>
                <div style={{ backgroundColor: "#F5F6F7" }} className='d-flex revenue my-2 py-2'>
                    <div style={{ backgroundColor: 'white' }} className='child1 mx-5'>
                        <div className='d-flex justify-content-between'>
                            <h4 className='fw-bold'>{totalBooking.toLocaleString() === "0" ? 0 : totalBooking.toLocaleString()} vnd</h4>
                            <FaMoneyCheckAlt />
                        </div>
                        <p>Revenue Booking</p>
                    </div>
                    <div style={{ backgroundColor: 'white' }} className='child1'>
                        <div className='d-flex justify-content-between'>
                            <h4 className='fw-bold'>{totalService.toLocaleString() === "0" ? 0 : totalService.toLocaleString()} vnd</h4>
                            <FaMoneyCheckAlt />
                        </div>
                        <p>Revenue Service</p>
                    </div>
                </div>
            </div>
            <div className='my-5 graph'>
                <BarChart width={1100} height={250} data={allBookingByYear}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confirm" fill="#82ca9d" />
                    <Bar dataKey="cancel" fill="red" />
                </BarChart>
            </div>
        </div>
    );
};

export default Dashboard;