import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaHome } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfileCustomer } from '../../services/ApiServices';
import Bill from './Bill';
import BookingOrderHistory from './BookingOrderHistory';
import ModalUpdateProfileUser from './ModalUpdateProfileUser';
import ModalChangePassCustomer from './ModalChangePassCustomer';

const Profile = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const idCustomer = useSelector(state => state.account.account.idCustomer);
    const [showModalChangePass, setShowModalChangePass] = useState(false)



    useEffect(() => {
        getProfile();
    }, [])

    const [profile, setProfile] = useState({});

    const handleClose = () => {
        setIsShowModal(false);
        setShowModalChangePass(false)

    }

    const getProfile = async () => {
        let res = await getProfileCustomer(idCustomer);
        if (res && res.data.data !== null) {
            setProfile(res.data.data);
        } else (
            toast.error('Please Fill Information')
        )
    }


    const handleUpdateProfile = () => {
        setIsShowModal(true);
    }

    return (
        <div className="container emp-profile my-3">
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >

                <Tab eventKey="profile" title="Thông tin của bạn">
                    <form>
                        <div className="row">

                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h2>
                                        Tài khoản: {profile.fullName}
                                    </h2>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <Button className='btn btn-infor' onClick={() => handleUpdateProfile()}>Cập nhật thông tin</Button>
                                <Link to='/' className='mx-5' style={{ textDecoration: "none" }}><FaHome className='mb-1' /> Home</Link>
                            </div>
                        </div>
                        <div className="row my-5">

                            <div className="col-md-8">
                                <div className="tab-content profile-tab p-4" id="myTabContent" style={{ border: '2px solid #15bbbe', borderRadius: 25, boxShadow: '0px 0px 5px #15bbbe' }}>
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-2 " >
                                                <label >Id: </label>
                                            </div>
                                            <div className="col-md-10">
                                                <p>{profile.idCustomer}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-2">
                                                <label>Email: </label>
                                            </div>
                                            <div className="col-md-10">
                                                <p>{profile.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <label>Số điện thoại: </label>
                                            </div>
                                            <div className="col-md-10">
                                                <p>{profile.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <label>Địa chỉ: </label>
                                            </div>
                                            <div className="col-md-10">
                                                <p>{profile.address}</p>
                                            </div>
                                        </div><div className="row">
                                            <Link onClick={() => setShowModalChangePass(true)}>Change Password</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="Booking History" title="Lịch sử booking" >
                    <BookingOrderHistory />
                </Tab >
                <Tab eventKey="Bill" title="Hóa đơn">
                    <Bill
                        idCustomer={idCustomer}
                    />
                </Tab>
            </Tabs >


            <ModalUpdateProfileUser
                show={isShowModal}
                handleClose={handleClose}
                profile={profile}
                getProfile={getProfile}
            />
            <ModalChangePassCustomer
                show={showModalChangePass}
                handleClose={handleClose}
            />
        </div >

    );
};

export default Profile;